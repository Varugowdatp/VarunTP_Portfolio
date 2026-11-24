"use client";
import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
import { cn } from "@/lib/cn";
import TechIcon from "./TechIcon";

/* Fade + rise on scroll */
export function FadeIn({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Card with cursor-following spotlight + subtle 3D tilt */
export function SpotCard({
  children,
  className,
  tilt = true,
}: {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    if (tilt) {
      ry.set((x / r.width - 0.5) * 6);
      rx.set(-(y / r.height - 0.5) * 6);
    }
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      className={cn("spot rounded-2xl", className)}
    >
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}

/* Count-up number */
export function Counter({
  to,
  decimals = 0,
  suffix = "",
}: {
  to: number;
  decimals?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.8, ease: "easeOut", onUpdate: (x) => setV(x) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {v.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* Scramble text effect */
const CH = "!<>-_\\/[]{}—=+*^?#01";
export function useScramble(text: string) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    let frame = 0;
    const total = 22;
    const id = setInterval(() => {
      frame++;
      const p = frame / total;
      setOut(
        text
          .split("")
          .map((c, i) => (c === " " || i < p * text.length ? c : CH[Math.floor(Math.random() * CH.length)]))
          .join("")
      );
      if (frame >= total) {
        clearInterval(id);
        setOut(text);
      }
    }, 30);
    return () => clearInterval(id);
  }, [text]);
  return out;
}

/* Infinite marquee */
export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
      }}
    >
      <div className="flex w-max animate-marquee gap-4 py-2 hover:[animation-play-state:paused]">
        {row.map((t, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 rounded-full border border-line bg-surface/60 px-5 py-2.5 text-sm text-muted backdrop-blur"
          >
            <TechIcon name={t} className="h-4 w-4 text-accent" />
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

/* Button that gets pulled toward the cursor */
export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 15 });
  const onMove = (e: MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: ReactNode; sub?: string }) {
  return (
    <FadeIn className="mb-12 max-w-2xl">
      <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-accent">
        <span className="h-px w-10 bg-accent" />
        {eyebrow}
      </p>
      <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-lg text-muted">{sub}</p>}
    </FadeIn>
  );
}

export function Chip({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-bg/60 px-2.5 py-1 font-mono text-[11px] text-muted">
      <TechIcon name={name} className="h-3 w-3" />
      {name}
    </span>
  );
}

export { useTransform };
