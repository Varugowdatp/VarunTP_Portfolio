"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { FaGithub as Github, FaLinkedinIn as Linkedin } from "react-icons/fa";
import { profile } from "@/lib/data";
import { goTo } from "@/lib/cn";
import { Magnetic, useScramble } from "./UI";

const roles = ["Java Backend Engineer", "Spring Boot Developer", "Full-Stack Builder", "Flutter App Developer"];

const code = `@RestController
@RequestMapping("/api/v1/users")
public class UserController {

  @GetMapping("/{id}")
  public ResponseEntity<User> get(@PathVariable Long id) {
    return ResponseEntity.ok(service.find(id));
  }
}`;

function hl(line: string) {
  const parts = line.split(/(@\w+|"[^"]*"|\b(?:public|class|return|new)\b|\b[A-Z]\w+\b)/g);
  return parts.map((p, i) => {
    if (!p) return null;
    let c = "";
    if (/^@\w+/.test(p)) c = "text-amber-300";
    else if (/^"/.test(p)) c = "text-emerald-300";
    else if (/^(public|class|return|new)$/.test(p)) c = "text-violet-400";
    else if (/^[A-Z]/.test(p)) c = "text-sky-300";
    return (
      <span key={i} className={c}>
        {p}
      </span>
    );
  });
}

function Terminal() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((x) => (x >= code.length + 60 ? 0 : x + 1)), 38);
    return () => clearInterval(id);
  }, []);
  const lines = code.slice(0, Math.min(n, code.length)).split("\n");
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-[#0b0b12]/90 shadow-2xl shadow-black/40 backdrop-blur">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
        <span className="h-3 w-3 rounded-full bg-green-400/80" />
        <span className="ml-3 font-mono text-xs text-white/40">UserController.java</span>
      </div>
      <pre className="h-[230px] overflow-hidden p-5 font-mono text-[13px] leading-[1.65] text-slate-200">
        {lines.map((l, i) => (
          <div key={i} className="whitespace-pre">
            <span className="mr-4 inline-block w-4 select-none text-right text-white/25">{i + 1}</span>
            {hl(l)}
            {i === lines.length - 1 && <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-emerald-300" />}
          </div>
        ))}
      </pre>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-line bg-surface/90 px-3.5 py-2.5 text-sm font-medium shadow-lg backdrop-blur">
      {children}
    </div>
  );
}

export default function Hero() {
  const [ri, setRi] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setRi((x) => (x + 1) % roles.length), 2800);
    return () => clearInterval(id);
  }, []);
  const role = useScramble(roles[ri]);
  const name = useScramble("Varun T P");

  return (
    <section id="top" className="relative flex items-center lg:min-h-[100svh]">
      <div className="mx-auto grid w-full max-w-[1500px] grid-cols-12 items-center gap-10 px-5 pb-16 pt-24 sm:px-6 lg:px-14 lg:pb-28">
        {/* LEFT */}
        <div className="col-span-12 lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 px-4 py-2 text-sm backdrop-blur"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            Product Engineer @ Tata Consultancy Services
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-7 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl xl:text-[5.5rem]"
          >
            Hi, I&apos;m
            <br />
            <span className="gradient-text font-mono">{name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-5 h-9 font-mono text-xl text-accent sm:text-2xl"
          >
            {"> "}
            {role}
            <span className="ml-1 inline-block h-5 w-2.5 translate-y-0.5 animate-blink bg-accent" />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted"
          >
            I build reliable backends and products people use. REST APIs with Spring Boot, relational and NoSQL data
            models, and cross-platform apps in Flutter and React. 350+ DSA problems solved.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <button
                onClick={() => goTo("projects")}
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent2 px-6 py-3.5 font-semibold text-black shadow-lg shadow-accent/20"
              >
                View projects
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface/70 px-6 py-3.5 font-medium backdrop-blur transition hover:border-accent"
              >
                <Download className="h-4 w-4" /> Resume
              </a>
            </Magnetic>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-surface/70 transition hover:border-accent hover:text-accent">
              <Github className="h-5 w-5" />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-surface/70 transition hover:border-accent hover:text-accent">
              <Linkedin className="h-5 w-5" />
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 flex items-center gap-2 font-mono text-xs text-muted"
          >
            <MapPin className="h-3.5 w-3.5" /> {profile.location} · Press{" "}
            <kbd className="rounded border border-line bg-surface px-1.5 py-0.5">Ctrl</kbd>
            <kbd className="rounded border border-line bg-surface px-1.5 py-0.5">K</kbd> to navigate
          </motion.p>
        </div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="col-span-12 hidden lg:col-span-5 lg:block"
        >
          <div className="mx-auto flex max-w-[520px] flex-col gap-5">
            <div className="flex items-stretch gap-5">
              <div className="conic-border w-[190px] shrink-0 rounded-3xl p-0">
                <div className="overflow-hidden rounded-3xl bg-surface">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/photo.jpg" alt="Varun T P" width={190} height={220} className="block h-[220px] w-full object-cover object-top" />
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-center gap-3">
                <Chip>
                  <span className="text-accent">●</span> CGPA 9.54
                </Chip>
                <Chip>350+ DSA solved</Chip>
                <Chip>Spring Boot · React · Flutter</Chip>
              </div>
            </div>
            <Terminal />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
