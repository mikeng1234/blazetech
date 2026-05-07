"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#savings", label: "Savings" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#installations", label: "Installations" },
  { href: "#estimate", label: "Estimate" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logoSize = scrolled ? "h-9 w-9" : "h-12 w-12";
  const rowPadding = scrolled ? "py-1.5" : "py-3";
  const ctaPadding = scrolled ? "px-5 py-2" : "px-6 py-3";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-surface/90 backdrop-blur-md transition-shadow duration-200 overflow-hidden ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      {/* Decorative geometric pattern (full width) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 600 200"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 w-full h-full opacity-80"
      >
        <defs>
          <linearGradient id="bt-red" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#7a1a00" />
            <stop offset="100%" stopColor="#ad2c00" />
          </linearGradient>
          <linearGradient id="bt-orange" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#e25500" />
            <stop offset="100%" stopColor="#ff8a3d" />
          </linearGradient>
          <linearGradient id="bt-yellow" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffb95c" />
            <stop offset="100%" stopColor="#ffd285" />
          </linearGradient>
          <linearGradient id="bt-blue" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#00658b" />
            <stop offset="100%" stopColor="#3aa8d6" />
          </linearGradient>
        </defs>
        {/* Sweeping curves stacked from outermost (red) to innermost (blue) */}
        <path d="M-20,200 C 60,160 140,80 280,40 C 360,20 460,10 620,-10 L 620,200 Z" fill="url(#bt-red)" />
        <path d="M-20,200 C 40,170 110,110 230,75 C 320,50 420,40 540,30 L 540,200 Z" fill="url(#bt-orange)" />
        <path d="M-20,200 C 30,180 90,140 180,115 C 260,95 340,90 440,85 L 440,200 Z" fill="url(#bt-yellow)" />
        <path d="M-20,200 C 20,190 70,165 140,150 C 200,140 260,138 320,140 L 320,200 Z" fill="url(#bt-blue)" />
      </svg>
      {/* Frosted veil so content stays readable over the pattern */}
      <div className="pointer-events-none absolute inset-0 bg-surface/75 backdrop-blur-md" />

      <div
        className={`relative flex justify-between items-center px-gutter max-w-(--container-max) mx-auto transition-all duration-200 ${rowPadding}`}
      >
        <Link href="#home" className="flex items-center gap-3">
          <Image
            src="/Logo.png"
            alt="Blaze Tech Devt OPC logo"
            width={48}
            height={48}
            className={`${logoSize} object-contain transition-all duration-200`}
            priority
          />
          <span
            className={`hidden sm:block font-display font-bold text-orange-600 leading-tight transition-all duration-200 ${
              scrolled ? "text-base" : "text-lg"
            }`}
          >
            Blaze Tech
            <span
              className={`block font-body text-on-surface-variant tracking-widest ${
                scrolled ? "text-[8px]" : "text-[10px]"
              }`}
            >
              DEVT OPC
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex gap-margin items-center">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-on-surface-variant hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <a
          className={`hidden md:inline-flex items-center justify-center bg-orange-600 text-white text-sm font-bold tracking-wider uppercase rounded-full hover:bg-orange-500 transition-all duration-200 shadow-lg shadow-orange-600/40 hover:shadow-xl hover:shadow-orange-600/50 hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-md ${ctaPadding}`}
          href="#quote"
        >
          Get a Quote
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 text-on-surface"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="material-symbols-outlined">{open ? "close" : "menu"}</span>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-surface-container-high bg-surface px-gutter py-4">
          <nav className="flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2 hover:text-primary"
              >
                {l.label}
              </a>
            ))}
            <a
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center px-6 py-3 bg-orange-600 text-white text-sm font-bold tracking-wider uppercase rounded-full shadow-lg shadow-orange-600/40 active:translate-y-0.5 active:shadow-md transition-all"
              href="#quote"
            >
              Get a Quote
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
