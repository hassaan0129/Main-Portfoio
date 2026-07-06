import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hamza — High-Performance Video Editing for Digital Commerce",
  description:
    "Premium video editing agency specializing in AI UGC ads, VSLs, Meta/TikTok campaigns, SaaS animation, and motion graphics built to convert.",
  metadataBase: new URL("https://hamza.agency"),
  openGraph: {
    title: "Hamza — Editing That Converts",
    description:
      "High-performance video editing for AI UGC ads, VSLs, and paid social campaigns.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}