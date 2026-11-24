"use client";
import { useEffect, useState } from "react";
import { profile } from "@/lib/data";

const links = [
  ["Experience", "#experience"],
  ["Projects", "#projects"],
  ["Skills", "#skills"],
  ["Education", "#education"],
  ["Contact", "#contact"],
];

function ThemeToggle() {
  const [dark, setDark] = useState(true);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition hover:text-fg"
    >
      {dark ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" /></svg>
      )}
    </button>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition ${
        scrolled || open ? "border-b border-line bg-bg/80 backdrop-blur-md" : ""
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
        <a href="#top" className="font-mono text-sm font-semibold">
          <span className="text-accent">~/</span>varun
        </a>
        <ul className="hidden items-center gap-7 md:flex">
          {links.map(([l, h]) => (
            <li key={h}>
              <a href={h} className="text-sm text-muted transition hover:text-fg">
                {l}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener"
            className="hidden rounded-lg bg-fg px-3.5 py-2 text-sm font-medium text-bg transition hover:opacity-90 sm:block"
          >
            Resume
          </a>
          <ThemeToggle />
          <button
            className="grid h-9 w-9 place-items-center rounded-lg border border-line md:hidden"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>
      {open && (
        <ul className="border-t border-line px-5 pb-4 md:hidden">
          {links.map(([l, h]) => (
            <li key={h}>
              <a href={h} onClick={() => setOpen(false)} className="block py-3 text-muted hover:text-fg">
                {l}
              </a>
            </li>
          ))}
          <li>
            <a href={profile.resume} target="_blank" rel="noopener" className="block py-3 font-medium text-accent">
              Download Resume
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
