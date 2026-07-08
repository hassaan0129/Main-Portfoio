import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { DM_Serif_Display } from "next/font/google";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { Navbar } from "@/components/layout/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
});

export const metadata: Metadata = {
  title: "AGENz — High-Performance Video Editing for Digital Commerce",
  description:
    "Performance creatives engineered to help DTC brands scale through AI UGC ads, VSL editing, and motion graphics.",
  metadataBase: new URL("https://agenz.agency"),
  openGraph: {
    title: "AGENz — Editing That Converts",
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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${dmSerifDisplay.variable}`}>
      <body>
        <SmoothScrollProvider>
          <div className="noise-overlay" aria-hidden="true" />
          <CustomCursor />
          <Navbar />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}