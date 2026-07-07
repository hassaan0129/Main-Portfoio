"use client";

import { useRef } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
];

export function Navbar() {
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.3);

  return (
    <header className="fixed inset-x-0 top-6 z-40 flex justify-center px-6">
      <nav className="flex w-full max-w-4xl items-center justify-between gap-4 rounded-full border border-white/10 bg-black/40 px-3 py-2 backdrop-blur-xl">
        <a href="#" className="flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 hover:bg-white/5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-black">
            H
          </span>
          <span className="text-sm font-medium text-white">Hamza</span>
        </a>

        <ul className="hidden items-center gap-1 sm:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          ref={ctaRef}
          href="#contact"
          className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
        >
          <span aria-hidden="true">✦</span> Let&apos;s Talk
        </a>
      </nav>
    </header>
  );
}