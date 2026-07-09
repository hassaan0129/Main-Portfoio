"use client";

import { useRef, useState, useEffect } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.3);

  // Prevent scrolling when mobile menu is open
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
        <nav className="flex w-full max-w-4xl items-center justify-between sm:gap-4 rounded-full border border-white/10 bg-[#111111]/60 px-2 py-2 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full sm:hidden text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Toggle mobile menu"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            )}
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

          <div className="flex items-center gap-2 ml-auto">
            <a
              href="https://www.linkedin.com/in/agenz-productions-166733363/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect on LinkedIn"
              className="group flex h-10 items-center gap-2 rounded-full border border-white/10 px-4 text-sm font-medium text-white/70 transition-all duration-300 hover:border-[#0077b5] hover:bg-[#0077b5] hover:text-white hover:shadow-[0_0_12px_rgba(0,119,181,0.4)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 transition-transform group-hover:scale-110"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span className="hidden sm:inline-block">Connect</span>
            </a>

            <a
              ref={ctaRef}
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="flex h-10 items-center gap-1.5 rounded-full bg-white px-4 text-xs sm:px-6 sm:text-sm sm:gap-2 font-bold text-black transition-transform hover:scale-[1.03] shadow-[0_4px_14px_rgba(255,255,255,0.25)] whitespace-nowrap"
            >
              <span aria-hidden="true" className="text-[10px]">✦</span> Start a Project
            </a>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-[var(--bg-primary)]/95 backdrop-blur-xl transition-all duration-500 ease-[var(--ease-premium)] sm:hidden flex flex-col items-center justify-center ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
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