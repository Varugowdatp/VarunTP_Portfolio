import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import Section, { Tag } from "@/components/Section";
import {
  profile,
  stats,
  experience,
  featured,
  more,
  skills,
  education,
  achievements,
  type Project,
} from "@/lib/data";

const arrow = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
);

function ProjectCard({ p, i }: { p: Project; i: number }) {
  return (
    <Reveal delay={i * 80}>
      <article className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition hover:border-accent/50 md:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-1 text-xl font-semibold">{p.name}</h3>
            <p className="text-sm text-muted">{p.tag}</p>
          </div>
          <div className="flex shrink-0 gap-2">
            {p.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg border border-line px-3 py-1.5 text-xs transition hover:border-accent hover:text-accent"
              >
                {l.label} {arrow}
              </a>
            ))}
          </div>
        </div>
        <p className="mt-5 text-sm leading-relaxed text-muted">
          <span className="font-medium text-fg">Problem · </span>
          {p.problem}
        </p>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
          {p.points.map((pt) => (
            <li key={pt} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {pt}
            </li>
          ))}
        </ul>
        {p.impact && (
          <div className="mt-5 flex flex-wrap gap-2">
            {p.impact.map((x) => (
              <span key={x} className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                {x}
              </span>
            ))}
          </div>
        )}
        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {p.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      </article>
    </Reveal>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="grid-bg absolute inset-0" aria-hidden />
          <div className="relative mx-auto max-w-5xl px-5 pb-20 pt-36 md:pb-28 md:pt-48">
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-xs text-muted">
                <span className="h-2 w-2 rounded-full bg-accent" />
                {profile.title}
              </p>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-7xl">
                Hi, I&apos;m {profile.name}.
                <br />
                <span className="text-muted">I build reliable backends and products people use.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{profile.summary}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#projects" className="rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-bg transition hover:opacity-90">
                  View projects
                </a>
                <a href={profile.resume} target="_blank" rel="noopener" className="rounded-lg border border-line bg-surface px-5 py-3 text-sm font-medium transition hover:border-accent">
                  Download resume
                </a>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-line px-5 py-3 text-sm font-medium transition hover:border-accent">
                  GitHub
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-line px-5 py-3 text-sm font-medium transition hover:border-accent">
                  LinkedIn
                </a>
              </div>
              <p className="mt-6 font-mono text-xs text-muted">
                📍 {profile.location} · {profile.tagline}
              </p>
            </Reveal>

            <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-surface p-5 md:p-6">
                  <p className="text-3xl font-semibold tracking-tight">{s.value}</p>
                  <p className="mt-1 text-xs text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <Section id="experience" eyebrow="Experience" title="Where I've worked">
          <ol className="relative space-y-10 border-l border-line pl-6 md:pl-8">
            {experience.map((e, i) => (
              <Reveal key={e.company} delay={i * 80}>
                <li className="relative">
                  <span className="absolute -left-[31px] top-2 h-3 w-3 rounded-full border-2 border-accent bg-bg md:-left-[39px]" />
                  <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                    <h3 className="text-lg font-semibold">
                      {e.role} <span className="text-muted">· {e.company}</span>
                    </h3>
                    <p className="font-mono text-xs text-muted">{e.period}</p>
                  </div>
                  <p className="text-sm text-muted">{e.place}</p>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                    {e.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {e.stack.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </Section>

        {/* PROJECTS */}
        <Section id="projects" eyebrow="Projects" title="Things I've built">
          <div className="grid gap-5 lg:grid-cols-2">
            {featured.map((p, i) => (
              <div key={p.name} className={i === 0 ? "lg:col-span-2" : ""}>
                <ProjectCard p={p} i={i} />
              </div>
            ))}
          </div>
          <Reveal>
            <h3 className="mb-4 mt-14 font-mono text-xs uppercase tracking-widest text-muted">More projects</h3>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {more.map((p, i) => (
              <Reveal key={p.name} delay={i * 60}>
                <a
                  href={p.links[0].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full rounded-xl border border-line bg-surface p-5 transition hover:border-accent/50"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{p.name}</h4>
                    <span className="text-muted">{arrow}</span>
                  </div>
                  <p className="text-xs text-accent">{p.tag}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{p.problem}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* SKILLS */}
        <Section id="skills" eyebrow="Skills" title="Technical toolkit">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((g, i) => (
              <Reveal key={g.group} delay={i * 50}>
                <div className="h-full rounded-xl border border-line bg-surface p-5">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-accent">{g.group}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* EDUCATION */}
        <Section id="education" eyebrow="Education & Recognition" title="Background">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              {education.map((e) => (
                <Reveal key={e.school}>
                  <div className="rounded-xl border border-line bg-surface p-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-semibold">{e.school}</h3>
                      <span className="shrink-0 font-mono text-xs text-accent">{e.score}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted">{e.degree}</p>
                    <p className="font-mono text-xs text-muted">{e.period}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
              {achievements.map((a, i) => (
                <Reveal key={a.title} delay={i * 60}>
                  <div className="rounded-xl border border-line bg-surface p-5">
                    <h3 className="font-semibold">{a.title}</h3>
                    <p className="text-sm text-muted">{a.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        {/* CONTACT */}
        <Section id="contact" eyebrow="Contact" title="Let's talk">
          <Reveal>
            <div className="rounded-2xl border border-line bg-surface p-8 md:p-12">
              <p className="max-w-xl text-lg text-muted">
                Open to conversations about backend, full-stack and mobile engineering. The fastest way to reach me is email.
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="mt-6 inline-block break-all rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-bg transition hover:opacity-90"
              >
                {profile.email}
              </a>
              <dl className="mt-8 grid gap-4 text-sm sm:grid-cols-3">
                <div>
                  <dt className="font-mono text-xs text-muted">Phone</dt>
                  <dd><a className="hover:text-accent" href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a></dd>
                </div>
                <div>
                  <dt className="font-mono text-xs text-muted">LinkedIn</dt>
                  <dd><a className="hover:text-accent" href={profile.linkedin} target="_blank" rel="noopener noreferrer">varun-tp-8ab642262</a></dd>
                </div>
                <div>
                  <dt className="font-mono text-xs text-muted">GitHub</dt>
                  <dd><a className="hover:text-accent" href={profile.github} target="_blank" rel="noopener noreferrer">Varugowdatp</a></dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </Section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-5 py-8 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Varun T P</p>
          <p className="font-mono">Systems &gt; Features. Architecture &gt; Templates.</p>
        </div>
      </footer>
    </>
  );
}
