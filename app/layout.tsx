import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://portfolio-punkuz.punkuzshah.workers.dev"
  ),
  title: "Punkuz Shah | Senior Full-Stack Software Engineer",
  description:
    "Explore the portfolio of Punkuz Shah, a software engineer with nearly 9 years of experience in React, Node.js, TypeScript, AWS, and AI-driven software development.",

  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },

  openGraph: {
    title: "Punkuz Shah | Senior Full-Stack Software Engineer",
    description:
      "Full-stack engineering, cloud architecture, and AI-powered products. Explore my projects and experience.",
    url: "https://portfolio-punkuz.punkuzshah.workers.dev",
    siteName: "Punkuz Shah Portfolio",
    type: "website",
    locale: "en_AU",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Punkuz Shah - Software Engineering Portfolio",
      },
    ],
  },
};
