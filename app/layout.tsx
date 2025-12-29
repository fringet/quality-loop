import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Walkthrough } from "@/components/walkthrough";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
  title: "Quality Loop | Making Spec Quality Compound",
  description: "The missing connector in Lovie's ecosystem. Turn spec quality into a compounding system by scoring runs, harvesting patterns, and surfacing insights.",
  keywords: ["quality assurance", "spec quality", "AI building", "CloudFlow", "Lovie"],
  authors: [{ name: "Ozan Özgöçer" }],
  openGraph: {
    title: "The Quality Loop",
    description: "Making Spec Quality Compound — A self-improving QA system for AI-first building",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "The Quality Loop - Making Spec Quality Compound",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Quality Loop",
    description: "Making Spec Quality Compound — A self-improving QA system for AI-first building",
    images: ["/og-image.svg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Nav />
        <main>
          {children}
        </main>
        <Walkthrough />
      </body>
    </html>
  );
}
