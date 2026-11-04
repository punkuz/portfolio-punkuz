"use client";

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";

type Capability = {
  id: "product" | "backend" | "cloud" | "quality";
  label: string;
  number: string;
  title: string;
  summary: string;
  file: string;
  code: React.ReactNode;
};

const capabilities: Capability[] = [
  { id: "product", label: "Product", number: "01", title: "Interfaces that feel intentional.", summary: "React, Redux, Next.js, Vite, Three.js, D3.js, responsive HTML/CSS", file: "product-thinking.ts", code: <><b>const</b> experience = {`{`}<br />&nbsp;&nbsp;clarity: <i>true</i>,<br />&nbsp;&nbsp;performance: <i>true</i>,<br />&nbsp;&nbsp;details: <span>&quot;considered&quot;</span><br />{`}`};</> },
  { id: "backend", label: "Backend", number: "02", title: "Services built to keep their promises.", summary: "Node.js, Nest.js, Express, Go, REST, GraphQL, WebSockets, microservices", file: "architecture.ts", code: <><b>design</b>({`{`}<br />&nbsp;&nbsp;boundaries: <span>&quot;clear&quot;</span>,<br />&nbsp;&nbsp;failureModes: <span>&quot;known&quot;</span>,<br />&nbsp;&nbsp;evolution: <i>true</i><br />{`}`});</> },
  { id: "cloud", label: "Cloud", number: "03", title: "Infrastructure that earns confidence.", summary: "AWS Lambda, S3, SQS, EC2, CodePipeline, Docker, CI/CD, event-driven systems", file: "delivery.yml", code: <>observe: <i>true</i><br />automate: <i>true</i><br />recover: <span>gracefully</span><br />ship: <b>continuously</b></> },
  { id: "quality", label: "Quality", number: "04", title: "Quality as a system, not a phase.", summary: "TDD, unit/integration/E2E tests, Jest, SonarQube, Grafana, code review", file: "confidence.test.ts", code: <><b>expect</b>(system)<br />&nbsp;&nbsp;.toBeObservable()<br />&nbsp;&nbsp;.toBeTested()<br />&nbsp;&nbsp;.toBeMaintainable();</> },
];

function usePortfolioMotion(rootRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = [...root.querySelectorAll<HTMLElement>(".reveal")];
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    reveals.forEach((element) => observer.observe(element));
    const progress = root.querySelector<HTMLElement>(".scroll-progress i");
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (progress) progress.style.height = `${max ? (scrollY / max) * 100 : 0}%`;
    };
    addEventListener("scroll", updateProgress, { passive: true });
    if (reduced) return () => { observer.disconnect(); removeEventListener("scroll", updateProgress); };

    const canvas = root.querySelector<HTMLCanvasElement>("#particles");
    const context = canvas?.getContext("2d");
    let animation = 0;
    let dots: Array<{ x: number; y: number; r: number; v: number; a: number }> = [];
    const resize = () => {
      if (!canvas || !context) return;
      canvas.width = innerWidth * devicePixelRatio;
      canvas.height = innerHeight * devicePixelRatio;
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      dots = Array.from({ length: Math.min(55, Math.floor(innerWidth / 22)) }, () => ({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, r: Math.random() * 1.2 + 0.2, v: Math.random() * 0.12 + 0.03, a: Math.random() * 0.3 + 0.08 }));
    };
    const draw = () => {
      if (!context) return;
      context.clearRect(0, 0, innerWidth, innerHeight);
      dots.forEach((dot) => {
        dot.y -= dot.v;
        if (dot.y < -5) dot.y = innerHeight + 5;
        context.beginPath(); context.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2); context.fillStyle = `rgba(91, 232, 218, ${dot.a})`; context.fill();
      });
      animation = requestAnimationFrame(draw);
    };
    resize(); draw(); addEventListener("resize", resize);
    return () => { observer.disconnect(); removeEventListener("scroll", updateProgress); removeEventListener("resize", resize); cancelAnimationFrame(animation); };
  }, [rootRef]);
}

function TiltCard({ className, children }: { className: string; children: React.ReactNode }) {
  const move = (event: ReactMouseEvent<HTMLElement>) => {
    if (!matchMedia("(pointer:fine)").matches) return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1200px) rotateX(${-y * 3}deg) rotateY(${x * 4}deg) translateY(-2px)`;
  };
  return <article className={className} onMouseMove={move} onMouseLeave={(event) => { event.currentTarget.style.transform = ""; }}>{children}</article>;
}

function SectionTag({ number, children }: { number: string; children: React.ReactNode }) {
  return <span className="section-tag"><i>{number}</i>{children}</span>;
}

function Header() {
  return <header className="topbar"><nav className="glass-nav" aria-label="Primary navigation">
    <a className="logo brand-lockup" href="#home" aria-label="Punkuz Shah, home"><span className="brand-monogram">PS<span>.</span></span><span className="brand-name">Punkuz Shah<small>Full-Stack Engineer</small></span></a>
    <div className="nav-items"><a href="#veil">Veil Assist</a><a href="#systems">Systems</a><a href="#craft">Craft</a></div>
    <a className="nav-contact" href="mailto:punkuzshah1@gmail.com"><span>Let&apos;s talk</span><i>↗</i></a>
  </nav></header>;
}

function Hero() {
  return <section className="hero" id="home"><div className="hero-art" aria-hidden="true" /><div className="aurora aurora-a" /><div className="aurora aurora-b" />
    <div className="hero-content shell"><div className="hero-status hero-reveal"><i /><span>Melbourne / Australia</span><b>Available for ambitious builds</b></div>
      <h1 className="hero-reveal">Products with <span className="glass-word">polish.</span><br />Systems with <span className="gradient-word">backbone.</span></h1>
      <div className="hero-foot hero-reveal"><p>Senior full-stack engineer with 9+ years turning complex ideas into reliable, beautifully considered software—from interface to infrastructure.</p><div className="hero-actions"><a className="liquid-button" href="#veil"><span>Explore my work</span><i>↓</i></a><a className="quiet-link" href="/assets/Punkuz_Shah_Resume.pdf" download>Résumé <i>↘</i></a></div></div>
      <TiltCard className="hero-float glass-panel hero-reveal"><div className="float-top"><span>Currently building</span><i>LIVE</i></div><strong>Veil Assist</strong><p>Real-time intelligence for high-stakes conversations.</p><div className="audio-mini" aria-hidden="true">{Array.from({ length: 10 }, (_, index) => <b key={index} />)}</div></TiltCard>
    </div></section>;
}

function VeilShowcase() {
  return <section className="veil-section section" id="veil"><div className="shell">
    <div className="section-intro reveal"><SectionTag number="01">Flagship product</SectionTag><h2>Meet <span>Veil Assist.</span></h2><p>Independently imagined, engineered, packaged, and shipped for macOS and Windows.</p></div>
    <div className="veil-stage reveal"><div className="stage-glow" /><div className="product-window glass-panel">
      <div className="window-head"><div className="traffic"><i /><i /><i /></div><span>Veil Assist</span><div className="secure"><i /> Session secure</div></div>
      <div className="window-body"><aside><div className="veil-logo">V</div><button className="active" aria-label="Live session">◉</button><button aria-label="History">⌁</button><button aria-label="Settings">⌘</button><small>01:42</small></aside>
        <div className="conversation"><div className="context-row"><span>LIVE CONTEXT</span><b><i /> Screen + audio</b></div><div className="orb-wrap"><div className="voice-orb"><span /><span /><span /></div></div><div className="live-copy"><small>VEIL IS LISTENING</small><p>“How would you explain your approach to scaling this architecture?”</p></div><div className="answer-card glass-inner"><div><i>✦</i><span>Suggested response</span><b>Now</b></div><p>I&apos;d begin by isolating the highest-pressure paths, then evolve the system around measurable bottlenecks rather than assumptions...</p><button>Expand answer ↗</button></div></div>
        <div className="context-panel"><span>CONTEXT SIGNALS</span><div className="signal-card"><i>▱</i><div><b>On-screen context</b><small>Architecture diagram detected</small></div><em>98%</em></div><div className="signal-card"><i>◉</i><div><b>Conversation</b><small>Question identified</small></div><em>LIVE</em></div><div className="mini-chart"><span>Session confidence</span><svg viewBox="0 0 260 70"><path d="M0 56 C30 50 42 62 72 42 S118 50 140 28 S185 35 210 16 S238 23 260 8" /></svg></div></div>
      </div></div><div className="floating-chip chip-one glass-panel"><i>⌘</i><span>Cross-platform<br /><b>macOS + Windows</b></span></div><div className="floating-chip chip-two glass-panel"><i>✦</i><span>Real-time<br /><b>Context aware</b></span></div></div>
    <div className="veil-story"><div className="story-lead reveal"><span className="eyebrow">The idea</span><h3>Stay present.<br />Veil handles the context.</h3><p>Veil Assist brings on-screen information and live conversation together, helping people respond with confidence during calls and presentations without breaking their flow.</p><a className="liquid-button" href="https://veil-assist-website.timimeromanma.workers.dev/" target="_blank" rel="noreferrer"><span>Visit Veil Assist</span><i>↗</i></a></div>
      <div className="story-grid"><TiltCard className="feature-card glass-panel reveal"><span>01 / Perception</span><div className="feature-icon eye"><i /></div><h4>Understands what&apos;s on screen</h4><p>Captures relevant visual context so assistance stays grounded in what is actually happening.</p></TiltCard><TiltCard className="feature-card glass-panel reveal"><span>02 / Conversation</span><div className="feature-icon rings"><i /><i /><i /></div><h4>Listens to the moment</h4><p>Combines live conversational input with context to respond while the interaction is unfolding.</p></TiltCard><TiltCard className="feature-card glass-panel reveal"><span>03 / Delivery</span><div className="feature-icon bolt">↯</div><h4>Ships like a real product</h4><p>Authentication, session credits, automated tests, and packaged releases across macOS and Windows.</p></TiltCard><article className="feature-card tech-card glass-panel reveal"><span>Built independently</span><div className="tech-orbit">{["Electron", "React", "TypeScript", "Supabase", "Cloudflare"].map((tech) => <i key={tech}>{tech}</i>)}<b>V</b></div></article></div>
    </div></div></section>;
}

function Systems() {
  return <section className="systems-section section" id="systems"><div className="shell"><div className="section-intro split reveal"><SectionTag number="02">Engineering systems</SectionTag><h2>Built for the part<br /><span>users never see.</span></h2><p>Strong products rest on systems that are secure, observable, and designed to evolve.</p></div>
    <div className="systems-grid"><TiltCard className="system-card system-large reveal"><div className="card-no">01</div><div className="pipeline" aria-hidden="true"><span />{Array.from({ length: 4 }, (_, index) => <i key={`i${index}`} />)}{Array.from({ length: 3 }, (_, index) => <b key={`b${index}`} />)}</div><div className="system-copy"><span>Automation at scale</span><h3>Thousands of sites.<br />One resilient pipeline.</h3><p>Automated PDF extraction across mining-company websites using Node.js, Puppeteer, Cheerio, Lambda, and SQS.</p><div className="pills"><i>Node.js</i><i>AWS Lambda</i><i>SQS</i><i>Puppeteer</i></div></div></TiltCard>
      <TiltCard className="system-card reveal"><div className="card-no">02</div><div className="shield"><span>✓</span><i /><i /></div><div className="system-copy"><span>Secure data exchange</span><h3>Healthcare workflows built on trust.</h3><p>Encrypted transfers, signatures, checksums, S3, and SFTP—engineered for data that cannot be treated casually.</p><div className="pills"><i>AWS</i><i>Encryption</i><i>SFTP</i></div></div></TiltCard>
      <TiltCard className="system-card reveal"><div className="card-no">03</div><div className="agent-visual"><div className="node central">AI</div><div className="node n1">Task</div><div className="node n2">Grade</div><div className="node n3">Verify</div><svg viewBox="0 0 300 180"><path d="M150 90L68 45M150 90L238 48M150 90L148 155" /></svg></div><div className="system-copy"><span>AI engineering</span><h3>Evaluation that finds the cracks.</h3><p>RL task-authoring toolkits and grading workflows that capture coding-agent mistakes and verify generated changes.</p><div className="pills"><i>Codex</i><i>Claude Code</i><i>Evaluation</i></div></div></TiltCard>
    </div></div></section>;
}

function Craft() {
  const [active, setActive] = useState<Capability["id"]>("product");
  const capability = capabilities.find((item) => item.id === active) ?? capabilities[0];
  return <section className="craft-section section" id="craft"><div className="shell"><div className="section-intro reveal"><SectionTag number="03">Across the stack</SectionTag><h2>One engineer.<br /><span>Full-system thinking.</span></h2></div><div className="craft-console glass-panel reveal"><div className="console-top"><span>punkuz / capabilities</span><div><i /><i /></div></div><div className="craft-tabs" role="tablist" aria-label="Capabilities">{capabilities.map((item) => <button key={item.id} className={active === item.id ? "active" : ""} onClick={() => setActive(item.id)} role="tab" aria-selected={active === item.id}>{item.label}</button>)}</div><div className="tab-content active" role="tabpanel"><div><span>{capability.number}</span><h3>{capability.title}</h3><p>{capability.summary}</p></div><div className="code-block"><small>{capability.file}</small><code>{capability.code}</code></div></div></div><div className="stats-row reveal"><div><strong>9+</strong><span>Years shaping software</span></div><div><strong>4+</strong><span>Languages used professionally</span></div><div><strong>2+</strong><span>Desktop platforms shipped</span></div><div><strong>∞</strong><span>Curiosity for hard problems</span></div></div></div></section>;
}

function AboutAndContact() {
  return <><section className="about-section section"><div className="shell about-grid"><TiltCard className="identity-card glass-panel reveal"><div className="identity-glow" /><span>PS</span><small>Portrait arriving soon</small><div className="identity-status"><i /> Melbourne, VIC</div></TiltCard><div className="about-copy reveal"><SectionTag number="04">The engineer behind it</SectionTag><h2>Calm in complexity.<br /><span>Restless about quality.</span></h2><p className="about-lead">I care about the whole product—the experience people feel, the architecture beneath it, and the engineers who will inherit it.</p><p>Across nine years I&apos;ve built customer-facing platforms, secure healthcare workflows, data automation, real-time systems, and an independent desktop product. I&apos;m at my best where product judgment and technical depth need to meet.</p><div className="cert-row"><div><i>✦</i><span>AWS Certified Solutions Architect<br /><b>Associate</b></span></div><div><i>⌘</i><span>B.E. Information Science<br /><b>VTU, India</b></span></div></div></div></div></section>
    <section className="contact-section section"><div className="contact-orb" /><div className="shell contact-inner reveal"><SectionTag number="05">Start a conversation</SectionTag><h2>Have an idea that<br />deserves <span>great engineering?</span></h2><p>Let&apos;s turn it into something people remember—and a system you can rely on.</p><div className="contact-actions"><a className="liquid-button large" href="mailto:punkuzshah1@gmail.com"><span>punkuzshah1@gmail.com</span><i>↗</i></a><a className="social-circle" href="https://www.linkedin.com/in/punkuz-shah-66080a9a/" target="_blank" rel="noreferrer">in</a><a className="social-circle" href="https://github.com/punkuz" target="_blank" rel="noreferrer">gh</a></div></div></section></>;
}

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);
  usePortfolioMotion(rootRef);
  const stack = ["TypeScript", "React", "Next.js", "Node.js", "AWS", "System Design", "AI Tooling", "TypeScript", "React", "Next.js", "Node.js", "AWS", "System Design", "AI Tooling"];
  return <div ref={rootRef} className="portfolio"><a className="skip" href="#main">Skip to content</a><canvas id="particles" aria-hidden="true" /><div className="scroll-progress"><i /></div><Header /><main id="main"><Hero /><section className="signal-strip" aria-label="Core expertise"><div className="signal-track">{stack.map((item, index) => <span key={`${item}-${index}`}>{item}<i>✦</i></span>)}</div></section><VeilShowcase /><Systems /><Craft /><AboutAndContact /></main><footer><div className="shell"><a className="logo" href="#home">PS<span>.</span></a><p>Senior Full-Stack Engineer · Melbourne</p><div><span>© {new Date().getFullYear()}</span><a href="/assets/Punkuz_Shah_Resume.pdf" download>Download résumé ↘</a></div></div></footer></div>;
}
