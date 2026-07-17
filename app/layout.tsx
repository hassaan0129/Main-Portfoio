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
  title: "AGENz Productions | White-Label Ad Creative Production",
  description:
    "AI UGC ads, VSL editing, motion graphics, and AI creative production for performance marketing agencies.",
  metadataBase: new URL("https://agenz.agency"),
  openGraph: {
    title: "AGENz Productions | White-Label Ad Creative Production",
    description:
      "AI UGC ads, VSL editing, motion graphics, and AI creative production for performance marketing agencies.",
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
