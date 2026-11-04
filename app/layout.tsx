import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Punkuz Shah — Full-Stack Engineer",
  description:
    "Punkuz Shah is a senior full-stack engineer building thoughtful products, cloud systems, and AI-native software.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Punkuz Shah — Full-Stack Engineer",
    description: "Products with polish. Systems with backbone.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
