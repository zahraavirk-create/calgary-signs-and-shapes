import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="bg-ink pt-36 pb-20 text-ink-foreground">
      <div className="container-x fade-up">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display mt-4 max-w-4xl text-5xl md:text-7xl">{title}</h1>
        {children && <div className="mt-6 max-w-2xl text-lg text-ink-muted">{children}</div>}
      </div>
    </section>
  );
}

export function SampleBadge() {
  return <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">Sample</span>;
}
