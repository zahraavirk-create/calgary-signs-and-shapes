import { createFileRoute, Link } from "@tanstack/react-router";
import { services } from "@/lib/site";
import { PageHero } from "@/components/site/PageHero";
import { CtaBand } from "./index";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | Custom Signs, CNC Cutting & Printing Calgary — Signs Plus CNC" },
      { name: "description", content: "Commercial signage, CNC cutting, large-format printing, acrylic and event signage in Calgary." },
      { property: "og:title", content: "Signage & Fabrication Services — Signs Plus CNC" },
      { property: "og:description", content: "Explore custom signage, printing and CNC fabrication services in Calgary." },
    ],
  }),
  component: Services,
});

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{title}</p>
      <ul className="mt-3 space-y-1.5 text-sm">{items.map((i) => <li key={i}>— {i}</li>)}</ul>
    </div>
  );
}

function Services() {
  return (
    <>
      <PageHero eyebrow="Services" title="Signage and fabrication, built to spec.">
        Service details below are placeholders pending confirmation of exact offerings and materials.
      </PageHero>
      <div className="container-x divide-y py-12">
        {services.map((s, i) => (
          <section key={s.slug} id={s.slug} className="grid scroll-mt-24 items-center gap-10 py-16 md:grid-cols-2">
            <img src={s.image} alt={s.title} loading="lazy" className={`aspect-[4/3] w-full rounded-xl object-cover ${i % 2 ? "md:order-2" : ""}`} />
            <div>
              <h2 className="display text-3xl md:text-5xl">{s.title}</h2>
              <p className="mt-4 text-muted-foreground">{s.what}</p>
              <div className="mt-8 grid gap-6 sm:grid-cols-3">
                <List title="Applications" items={s.applications} />
                <List title="Materials" items={s.materials} />
                <List title="Customization" items={s.options} />
              </div>
              <p className="mt-8 text-sm text-muted-foreground"><strong className="text-foreground">Ordering:</strong> submit a quote request → we review and price it → approve and we produce.</p>
              <Link to="/quote" search={{ service: s.slug }} className="mt-6 inline-flex rounded-md bg-primary px-6 py-3 font-bold text-primary-foreground hover:brightness-110">Request Quote</Link>
            </div>
          </section>
        ))}
      </div>
      <CtaBand />
    </>
  );
}
