"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Lenis from "lenis";
import { FaGithub as Github, FaLinkedinIn as Linkedin } from "react-icons/fa";
import {
  Home, Briefcase, FolderGit2, Cpu, GraduationCap, Mail, FileText, Sun, Moon, Search,
} from "lucide-react";
import { profile } from "@/lib/data";
import { goTo } from "@/lib/cn";

/* Smooth scrolling */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    (window as unknown as { __lenis: Lenis }).__lenis = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-accent to-accent2"
    />
  );
}

/* Cursor-following glow */
export function CursorGlow() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 120, damping: 20 });
  const sy = useSpring(y, { stiffness: 120, damping: 20 });
  useEffect(() => {
    const m = (e: PointerEvent) => {
      x.set(e.clientX - 300);
      y.set(e.clientY - 300);
    };
    window.addEventListener("pointermove", m);
    return () => window.removeEventListener("pointermove", m);
  }, [x, y]);
  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="cursor-glow pointer-events-none fixed left-0 top-0 z-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgb(var(--accent)/0.12),transparent_65%)]"
    />
  );
}

/* Animated aurora backdrop */
export function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="dotgrid absolute inset-0" />
      <div
        className="absolute -left-[10%] -top-[20%] h-[60vw] max-h-[900px] w-[60vw] max-w-[900px] animate-aurora rounded-full blur-[120px]"
        style={{ background: "rgb(var(--accent))", opacity: "calc(var(--aurora) * 0.55)" }}
      />
      <div
        className="absolute -right-[10%] top-[10%] h-[55vw] max-h-[800px] w-[55vw] max-w-[800px] animate-aurora rounded-full blur-[130px] [animation-delay:-8s]"
        style={{ background: "rgb(var(--accent2))", opacity: "calc(var(--aurora) * 0.6)" }}
      />
    </div>
  );
}

/* Floating, magnifying dock */
const items = [
  { id: "top", label: "Home", Icon: Home },
  { id: "experience", label: "Experience", Icon: Briefcase },
  { id: "projects", label: "Projects", Icon: FolderGit2 },
  { id: "skills", label: "Skills", Icon: Cpu },
  { id: "education", label: "Education", Icon: GraduationCap },
  { id: "contact", label: "Contact", Icon: Mail },
];

function DockItem({
  mouseX,
  label,
  active,
  onClick,
  href,
  children,
}: {
  mouseX: MotionValue<number>;
  label: string;
  active?: boolean;
  onClick?: () => void;
  href?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const dist = useTransform(mouseX, (v) => {
    const b = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return v - b.x - b.width / 2;
  });
  const size = useSpring(useTransform(dist, [-150, 0, 150], [44, 70, 44]), { mass: 0.1, stiffness: 180, damping: 14 });
  const [hover, setHover] = useState(false);
  const inner = (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      className={`relative grid aspect-square place-items-center rounded-full border transition-colors ${
        active ? "border-accent/60 bg-accent/15 text-accent" : "border-line bg-surface/80 text-fg"
      }`}
    >
      <AnimatePresence>
        {hover && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute -top-9 whitespace-nowrap rounded-md border border-line bg-surface px-2 py-1 text-xs"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
      {children}
    </motion.div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      {inner}
    </a>
  ) : (
    <button onClick={onClick} aria-label={label}>
      {inner}
    </button>
  );
}

export function Dock({ onPalette }: { onPalette: () => void }) {
  const mouseX = useMotionValue(Infinity);
  const [active, setActive] = useState("top");
  const [dark, setDark] = useState(true);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center">
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 120, damping: 16 }}
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="pointer-events-auto flex max-w-[96vw] items-end gap-2 rounded-full border border-line bg-surface/70 px-3 py-2.5 shadow-2xl shadow-black/30 backdrop-blur-xl"
    >
      {items.map(({ id, label, Icon }) => (
        <DockItem key={id} mouseX={mouseX} label={label} active={active === id} onClick={() => goTo(id)}>
          <Icon className="h-[42%] w-[42%]" />
        </DockItem>
      ))}
      <span className="mx-1 h-8 w-px self-center bg-line" />
      <DockItem mouseX={mouseX} label="Resume" href={profile.resume}>
        <FileText className="h-[42%] w-[42%]" />
      </DockItem>
      <DockItem mouseX={mouseX} label="GitHub" href={profile.github}>
        <Github className="h-[42%] w-[42%]" />
      </DockItem>
      <DockItem mouseX={mouseX} label="LinkedIn" href={profile.linkedin}>
        <Linkedin className="h-[42%] w-[42%]" />
      </DockItem>
      <span className="mx-1 h-8 w-px self-center bg-line" />
      <DockItem mouseX={mouseX} label="Search (Ctrl K)" onClick={onPalette}>
        <Search className="h-[42%] w-[42%]" />
      </DockItem>
      <DockItem mouseX={mouseX} label="Theme" onClick={toggle}>
        {dark ? <Sun className="h-[42%] w-[42%]" /> : <Moon className="h-[42%] w-[42%]" />}
      </DockItem>
    </motion.nav>
    </div>
  );
}

/* Ctrl/Cmd + K command palette */
export function Palette({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const cmds = useMemo(
    () => [
      ...items.map((i) => ({ label: `Go to ${i.label}`, run: () => goTo(i.id) })),
      { label: "Open resume (PDF)", run: () => window.open(profile.resume, "_blank") },
      { label: "Open GitHub", run: () => window.open(profile.github, "_blank") },
      { label: "Open LinkedIn", run: () => window.open(profile.linkedin, "_blank") },
      { label: "Send email", run: () => (window.location.href = `mailto:${profile.email}`) },
      {
        label: "Copy email address",
        run: () => navigator.clipboard?.writeText(profile.email).catch(() => {}),
      },
    ],
    []
  );
  const list = cmds.filter((c) => c.label.toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      } else if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, setOpen]);

  useEffect(() => {
    if (open) {
      setQ("");
      setSel(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const run = (i: number) => {
    list[i]?.run();
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] grid place-items-start justify-center bg-black/60 pt-[18vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ y: -16, scale: 0.97 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -16, scale: 0.97 }}
            onClick={(e) => e.stopPropagation()}
            className="w-[min(560px,92vw)] overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
          >
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setSel(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setSel((s) => Math.min(s + 1, list.length - 1));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setSel((s) => Math.max(s - 1, 0));
                } else if (e.key === "Enter") run(sel);
              }}
              placeholder="Type a command or search…"
              className="w-full border-b border-line bg-transparent px-5 py-4 text-base outline-none placeholder:text-muted"
            />
            <ul className="max-h-80 overflow-auto p-2">
              {list.map((c, i) => (
                <li key={c.label}>
                  <button
                    onMouseEnter={() => setSel(i)}
                    onClick={() => run(i)}
                    className={`w-full rounded-lg px-3 py-2.5 text-left text-sm ${
                      i === sel ? "bg-accent/15 text-accent" : "text-muted"
                    }`}
                  >
                    {c.label}
                  </button>
                </li>
              ))}
              {!list.length && <li className="px-3 py-6 text-center text-sm text-muted">No results</li>}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
