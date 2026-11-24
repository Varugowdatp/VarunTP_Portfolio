"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FaGithub as Github, FaLinkedinIn as Linkedin } from "react-icons/fa";
import { ArrowUpRight, Mail, Phone, Award, Trophy, Rocket, Code2, Users, MapPin, Copy } from "lucide-react";
import { profile, stats, experience, featured, more, skills, education, achievements, type Project } from "@/lib/data";
import { Chip, Counter, FadeIn, Magnetic, Marquee, SectionHead, SpotCard } from "./UI";
import TechIcon from "./TechIcon";

const wrap = "mx-auto w-full max-w-[1500px] px-6 lg:px-14";
const sec = "relative flex min-h-[100svh] flex-col justify-center py-24";

/* ---------- Stats + marquee ---------- */
export function Stats() {
  const marq = ["Java", "Spring Boot", "Hibernate", "Oracle", "PostgreSQL", "React", "Flutter", "Node.js", "MongoDB", "Firebase", "Git/GitHub", "IntelliJ IDEA", "Postman"];
  const nums = [
    { to: 9.54, d: 2, s: "", label: "CGPA", sub: "B.E. Computer Science" },
    { to: 350, d: 0, s: "+", label: "DSA problems", sub: "GeeksforGeeks + LeetCode" },
    { to: 3, d: 0, s: "", label: "Engineering roles", sub: "TCS · MediCodio · Ignito" },
    { to: 6, d: 0, s: "", label: "Projects shipped", sub: "Backend, web and mobile" },
  ];
  void stats;
  return (
    <section className="relative py-16">
      <div className={wrap}>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {nums.map((n, i) => (
            <FadeIn key={n.label} delay={i * 0.08}>
              <SpotCard className="p-7">
                <p className="gradient-text text-5xl font-semibold tracking-tight">
                  <Counter to={n.to} decimals={n.d} suffix={n.s} />
                </p>
                <p className="mt-3 font-medium">{n.label}</p>
                <p className="mt-1 text-sm text-muted">{n.sub}</p>
              </SpotCard>
            </FadeIn>
          ))}
        </div>
        <div className="mt-12">
          <Marquee items={marq} />
        </div>
      </div>
    </section>
  );
}

/* ---------- Experience ---------- */
export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const h = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <section id="experience" className={sec}>
      <div className={`${wrap} grid grid-cols-12 gap-10`}>
        <div className="col-span-12 lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <SectionHead
            eyebrow="Experience"
            title={<>Where I&apos;ve <span className="gradient-text">worked</span></>}
            sub="From Flutter and Firebase to PERN to enterprise Java at TCS."
          />
        </div>
        <div ref={ref} className="relative col-span-12 lg:col-span-8">
          <div className="absolute bottom-0 left-[11px] top-2 w-px bg-line" />
          <motion.div
            style={{ scaleY: h }}
            className="absolute bottom-0 left-[10px] top-2 w-[3px] origin-top rounded-full bg-gradient-to-b from-accent to-accent2"
          />
          <div className="space-y-8">
            {experience.map((e, i) => (
              <FadeIn key={e.company} delay={0.05} className="relative pl-12">
                <span className="absolute left-0 top-7 grid h-6 w-6 place-items-center rounded-full border-2 border-accent bg-bg">
                  <span className={`h-2 w-2 rounded-full bg-accent ${i === 0 ? "animate-pulse" : ""}`} />
                </span>
                <SpotCard className="p-7" tilt={false}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold">{e.role}</h3>
                      <p className="mt-1 text-accent">{e.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="rounded-full border border-line px-3 py-1 font-mono text-xs">{e.period}</p>
                      <p className="mt-2 flex items-center justify-end gap-1 text-xs text-muted">
                        <MapPin className="h-3 w-3" />
                        {e.place}
                      </p>
                    </div>
                  </div>
                  <ul className="mt-5 space-y-2.5 text-[15px] leading-relaxed text-muted">
                    {e.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {e.stack.map((s) => (
                      <Chip key={s} name={s} />
                    ))}
                  </div>
                </SpotCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Projects ---------- */
function Big({ p, i, className }: { p: Project; i: number; className?: string }) {
  return (
    <FadeIn delay={i * 0.08} className={className}>
      <SpotCard className="flex h-full flex-col p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="font-mono text-xs text-accent2">0{i + 1}</span>
            <h3 className="mt-1 text-2xl font-semibold">{p.name}</h3>
            <p className="text-sm text-accent">{p.tag}</p>
          </div>
          <a
            href={p.links[0].href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${p.name} on GitHub`}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line transition hover:border-accent hover:bg-accent hover:text-black"
          >
            <ArrowUpRight className="h-5 w-5" />
          </a>
        </div>
        <p className="mt-5 text-[15px] leading-relaxed text-muted">{p.problem}</p>
        <ul className="mt-4 space-y-2 text-sm text-muted">
          {p.points.map((x) => (
            <li key={x} className="flex gap-2.5">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent2" />
              {x}
            </li>
          ))}
        </ul>
        {p.impact && (
          <div className="mt-4 flex flex-wrap gap-2">
            {p.impact.map((x) => (
              <span key={x} className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                {x}
              </span>
            ))}
          </div>
        )}
        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {p.stack.map((s) => (
            <Chip key={s} name={s} />
          ))}
        </div>
      </SpotCard>
    </FadeIn>
  );
}

export function Projects() {
  return (
    <section id="projects" className={sec}>
      <div className={wrap}>
        <SectionHead
          eyebrow="Projects"
          title={<>Things I&apos;ve <span className="gradient-text">built</span></>}
          sub="Production-minded systems: clean architecture, real users, measurable impact."
        />
        <div className="grid grid-cols-12 gap-5">
          <Big p={featured[0]} i={0} className="col-span-12 lg:col-span-7" />
          <Big p={featured[1]} i={1} className="col-span-12 lg:col-span-5" />
          <Big p={featured[2]} i={2} className="col-span-12 lg:col-span-5" />
          <div className="col-span-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
            {more.map((p, i) => (
              <FadeIn key={p.name} delay={i * 0.07}>
                <a href={p.links[0].href} target="_blank" rel="noopener noreferrer" className="block h-full">
                  <SpotCard className="group h-full p-5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{p.name}</h4>
                      <ArrowUpRight className="h-4 w-4 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                    </div>
                    <p className="text-xs text-accent">{p.tag}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{p.problem}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.stack.slice(0, 4).map((s) => (
                        <Chip key={s} name={s} />
                      ))}
                    </div>
                  </SpotCard>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Skills ---------- */
export function Skills() {
  return (
    <section id="skills" className={sec}>
      <div className={wrap}>
        <SectionHead
          eyebrow="Skills"
          title={<>Technical <span className="gradient-text">toolkit</span></>}
          sub="What I reach for across the stack."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skills.map((g, i) => (
            <FadeIn key={g.group} delay={i * 0.06}>
              <SpotCard className="h-full p-6">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent2">{g.group}</h3>
                <div className="mt-5 grid grid-cols-2 gap-2.5">
                  {g.items.map((s) => (
                    <motion.div
                      key={s}
                      whileHover={{ y: -3, scale: 1.03 }}
                      className="flex items-center gap-2.5 rounded-xl border border-line bg-bg/50 px-3 py-2.5 text-sm"
                    >
                      <TechIcon name={s} className="h-4 w-4 shrink-0 text-accent" />
                      <span className="truncate">{s}</span>
                    </motion.div>
                  ))}
                </div>
              </SpotCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Education ---------- */
const achIcons = [Users, Code2, Trophy, Rocket];
export function Education() {
  return (
    <section id="education" className={sec}>
      <div className={wrap}>
        <SectionHead
          eyebrow="Education & Recognition"
          title={<>Learning &amp; <span className="gradient-text">leadership</span></>}
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-5">
            {education.map((e, i) => (
              <FadeIn key={e.school} delay={i * 0.1}>
                <SpotCard className="p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold">{e.school}</h3>
                      <p className="mt-1 text-muted">{e.degree}</p>
                      <p className="mt-3 font-mono text-xs text-muted">{e.period}</p>
                    </div>
                    <span className="gradient-text text-3xl font-semibold">{e.score.replace("CGPA ", "")}</span>
                  </div>
                </SpotCard>
              </FadeIn>
            ))}
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {achievements.map((a, i) => {
              const Icon = achIcons[i] ?? Award;
              return (
                <FadeIn key={a.title} delay={i * 0.08}>
                  <SpotCard className="h-full p-6">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-accent/20 to-accent2/20 text-accent">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-semibold">{a.title}</h3>
                    <p className="mt-1 text-sm text-muted">{a.detail}</p>
                  </SpotCard>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
export function Contact() {
  const copy = () => navigator.clipboard?.writeText(profile.email).catch(() => {});
  const links = [
    { Icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { Icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
    { Icon: Linkedin, label: "LinkedIn", value: "varun-tp-8ab642262", href: profile.linkedin },
    { Icon: Github, label: "GitHub", value: "Varugowdatp", href: profile.github },
  ];
  return (
    <section id="contact" className={`${sec} pb-40`}>
      <div className={wrap}>
        <FadeIn>
          <div className="conic-border rounded-[28px]">
            <div className="relative overflow-hidden rounded-[26px] bg-bg p-10 lg:p-16">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent2/20 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
              <p className="relative font-mono text-xs uppercase tracking-[0.25em] text-accent">Contact</p>
              <h2 className="relative mt-4 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight lg:text-7xl">
                Let&apos;s build something <span className="gradient-text">great</span> together.
              </h2>
              <p className="relative mt-6 max-w-xl text-lg text-muted">
                Open to conversations about backend, full-stack and mobile engineering. Email is the fastest way to reach me.
              </p>
              <div className="relative mt-9 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent2 px-7 py-4 font-semibold text-black shadow-lg shadow-accent/20"
                  >
                    <Mail className="h-5 w-5" /> Say hello
                  </a>
                </Magnetic>
                <button onClick={copy} className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface/70 px-5 py-4 text-sm transition hover:border-accent">
                  <Copy className="h-4 w-4" /> Copy email
                </button>
              </div>
              <div className="relative mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {links.map(({ Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group rounded-2xl border border-line bg-surface/60 p-5 backdrop-blur transition hover:border-accent/50"
                  >
                    <Icon className="h-5 w-5 text-accent" />
                    <p className="mt-3 text-xs uppercase tracking-wider text-muted">{label}</p>
                    <p className="mt-1 break-all text-sm group-hover:text-accent">{value}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
        <p className="mt-10 text-center font-mono text-xs text-muted">
          © {new Date().getFullYear()} Varun T P · Systems &gt; Features. Architecture &gt; Templates.
        </p>
      </div>
    </section>
  );
}
