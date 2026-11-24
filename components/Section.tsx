import Reveal from "./Reveal";

export default function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-5 py-20 md:py-28">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-accent">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      </Reveal>
      <div className="mt-10">{children}</div>
    </section>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-line bg-surface px-2 py-1 font-mono text-[11px] text-muted">
      {children}
    </span>
  );
}
