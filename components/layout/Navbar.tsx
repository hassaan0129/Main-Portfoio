"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useMagnetic } from "@/hooks/useMagnetic";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Trial", href: "#process" },
  { label: "About", href: "#about" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.3);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-6 z-50 flex justify-center px-4 sm:px-6">
        <nav className="flex w-full max-w-4xl items-center justify-between rounded-full border border-white/10 bg-[#111111]/60 px-2 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:gap-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:hidden"
            aria-label="Toggle mobile menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <ul className="hidden items-center gap-8 pl-6 sm:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative py-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-white transition-transform duration-300 ease-[var(--ease-premium)] group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-2">
            <a
              href="https://www.linkedin.com/in/agenz-productions-166733363/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect on LinkedIn"
              className="group flex h-10 items-center gap-2 rounded-full border border-white/10 px-4 text-sm font-medium text-white/70 transition-all duration-300 hover:border-[#0077b5] hover:bg-[#0077b5] hover:text-white hover:shadow-[0_0_12px_rgba(0,119,181,0.4)]"
            >
              <span className="text-xs font-bold transition-transform group-hover:scale-110" aria-hidden="true">
                in
              </span>
              <span className="hidden sm:inline-block">Connect</span>
            </a>

            <a
              ref={ctaRef}
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="flex h-10 items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-4 text-xs font-bold text-black shadow-[0_4px_14px_rgba(255,255,255,0.25)] transition-transform hover:scale-[1.03] sm:gap-2 sm:px-6 sm:text-sm"
            >
              <span aria-hidden="true" className="text-[10px]">*</span>
              Start a Paid Trial
            </a>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-[var(--bg-primary)]/95 backdrop-blur-xl transition-all duration-500 ease-[var(--ease-premium)] sm:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <nav
          className={`flex flex-col items-center gap-10 transition-transform duration-500 ease-[var(--ease-premium)] ${
            isOpen ? "translate-y-0" : "translate-y-8"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-5xl font-serif text-[var(--accent)] transition-colors hover:text-[var(--highlight)]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
