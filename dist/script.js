const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

addEventListener('load', () => document.querySelector('.loader').classList.add('loaded'));
setTimeout(() => document.querySelector('.loader').classList.add('loaded'), 1800);
document.getElementById('year').textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  document.querySelector('.scroll-progress i').style.height = `${max ? (scrollY / max) * 100 : 0}%`;
}, { passive: true });

if (!reduceMotion && matchMedia('(pointer:fine)').matches) {
  const glow = document.querySelector('.cursor-glow');
  addEventListener('pointermove', (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  });

  document.querySelectorAll('[data-tilt]').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const r = card.getBoundingClientRect();
      const x = (event.clientX - r.left) / r.width - .5;
      const y = (event.clientY - r.top) / r.height - .5;
      card.style.transform = `perspective(1200px) rotateX(${-y * 3}deg) rotateY(${x * 4}deg) translateY(-2px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });

  document.querySelectorAll('.magnetic').forEach((button) => {
    button.addEventListener('pointermove', (event) => {
      const r = button.getBoundingClientRect();
      button.style.transform = `translate(${(event.clientX-r.left-r.width/2)*.08}px,${(event.clientY-r.top-r.height/2)*.08}px)`;
    });
    button.addEventListener('pointerleave', () => { button.style.transform = ''; });
  });
}

document.querySelectorAll('.craft-tabs button').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.craft-tabs button').forEach((item) => item.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  document.getElementById(button.dataset.tab).classList.add('active');
}));

const counterObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (!entry.isIntersecting || reduceMotion) return;
  const target = Number(entry.target.dataset.count);
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / 1100, 1);
    entry.target.textContent = `${Math.round(target * (1 - Math.pow(1 - p, 3)))}+`;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  counterObserver.unobserve(entry.target);
}), { threshold: .7 });
document.querySelectorAll('[data-count]').forEach((el) => counterObserver.observe(el));

if (!reduceMotion) {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let dots = [];
  const resize = () => {
    canvas.width = innerWidth * devicePixelRatio;
    canvas.height = innerHeight * devicePixelRatio;
    ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
    dots = Array.from({length: Math.min(55, Math.floor(innerWidth/22))}, () => ({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.2+.2,v:Math.random()*.12+.03,a:Math.random()*.3+.08}));
  };
  const draw = () => {
    ctx.clearRect(0,0,innerWidth,innerHeight);
    dots.forEach((dot) => {
      dot.y -= dot.v;
      if (dot.y < -5) dot.y = innerHeight + 5;
      ctx.beginPath(); ctx.arc(dot.x,dot.y,dot.r,0,Math.PI*2); ctx.fillStyle=`rgba(183,169,255,${dot.a})`; ctx.fill();
    });
    requestAnimationFrame(draw);
  };
  resize(); addEventListener('resize', resize); draw();
}
