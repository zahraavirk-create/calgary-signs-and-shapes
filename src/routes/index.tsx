import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Crosshair, Wrench, Layers, Users, Building2 } from "lucide-react";
import hero from "@/assets/hero-cnc.jpg";
import { services, projects } from "@/lib/site";
import { SampleBadge } from "@/components/site/PageHero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Signs Plus CNC | Custom Signs, Printing & CNC Cutting Calgary" },
      { name: "description", content: "Calgary custom signage, large-format printing and precision CNC fabrication for businesses, contractors, events and individuals." },
      { property: "og:title", content: "Signs Plus CNC — Precision Made. Impact Designed." },
      { property: "og:description", content: "Custom signage, professional printing and CNC fabrication in Calgary, Alberta." },
    ],
  }),
  component: Index,
});

const why = [
  { icon: Crosshair, t: "Precision Craftsmanship", d: "Accurate cuts and clean finishes on every piece we produce." },
  { icon: Wrench, t: "Custom Manufacturing", d: "Built to your dimensions, materials and design — not off a shelf." },
  { icon: Layers, t: "Quality Materials", d: "Materials selected to suit your application and environment." },
  { icon: Users, t: "Personalized Service", d: "Direct communication with the people building your project." },
  { icon: Building2, t: "Commercial & Individual", d: "From a single custom sign to multi-piece commercial projects." },
];

const steps = [
  { t: "Tell Us Your Vision", d: "Submit your idea, measurements, preferred materials, and any artwork." },
  { t: "Receive Your Quote", d: "Our team reviews your project and provides pricing." },
  { t: "Design & Production", d: "Following approval, your project moves into production." },
  { t: "Pickup, Delivery or Installation", d: "The completed project is provided using the fulfillment option confirmed in your quote." },
];

function Index() {
  return (
    <>
      <section className="relative flex min-h-screen items-center overflow-hidden bg-ink text-ink-foreground">
        <img src={hero} alt="CNC router cutting a metal sign panel" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="container-x relative fade-up pt-20">
          <p className="eyebrow">Calgary · Signage · Printing · CNC</p>
          <h1 className="display mt-6 max-w-4xl text-6xl md:text-8xl">
            Precision made.<br /><span className="text-primary">Impact designed.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-ink-muted">
            Custom signage, professional printing, and precision CNC fabrication. Bringing your ideas to life with quality craftsmanship and attention to detail.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/quote" className="inline-flex items-center gap-2 rounded-md bg-primary px-7 py-4 font-bold text-primary-foreground transition hover:brightness-110">Get a Free Quote <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/work" className="inline-flex items-center rounded-md border border-ink-foreground/30 px-7 py-4 font-bold transition hover:bg-ink-foreground/10">Explore Our Work</Link>
          </div>
        </div>
        <a href="#services" aria-label="Scroll down" className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-ink-muted"><ChevronDown /></a>
      </section>

      <section id="services" className="py-24 md:py-32">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">What we do</p>
              <h2 className="display mt-4 text-4xl md:text-6xl">Your Vision.<br />Our Craftsmanship.</h2>
            </div>
            <Link to="/services" className="inline-flex items-center gap-2 font-bold hover:text-primary">All services <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link key={s.slug} to="/services" hash={s.slug} className="group overflow-hidden rounded-xl border bg-card transition hover:-translate-y-1 hover:shadow-xl">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={s.image} alt={s.title} loading="lazy" width={1200} height={912} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">Learn More <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-24 text-ink-foreground md:py-32">
        <div className="container-x">
          <p className="eyebrow">Why choose us</p>
          <h2 className="display mt-4 max-w-3xl text-4xl md:text-6xl">Why Signs Plus CNC?</h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-ink-foreground/10 bg-ink-foreground/10 sm:grid-cols-2 lg:grid-cols-5">
            {why.map(({ icon: Icon, t, d }) => (
              <div key={t} className="bg-ink p-8 transition hover:bg-ink-foreground/5">
                <Icon className="h-7 w-7 text-primary" />
                <h3 className="mt-6 text-lg font-bold">{t}</h3>
                <p className="mt-2 text-sm text-ink-muted">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Featured projects</p>
              <h2 className="display mt-4 text-4xl md:text-6xl">Recent work.</h2>
              <p className="mt-4 text-sm text-muted-foreground">Sample placeholders shown until authentic project photos are uploaded.</p>
            </div>
            <Link to="/work" className="inline-flex items-center gap-2 font-bold hover:text-primary">View portfolio <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {projects.slice(0, 3).map((p) => <ProjectCard key={p.slug} p={p} />)}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24 md:py-32">
        <div className="container-x">
          <p className="eyebrow">How it works</p>
          <h2 className="display mt-4 text-4xl md:text-6xl">Four simple steps.</h2>
          <ol className="mt-14 grid gap-6 md:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.t} className="rounded-xl border bg-card p-8">
                <span className="text-5xl font-extrabold text-primary">0{i + 1}</span>
                <h3 className="mt-6 text-lg font-bold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

export function ProjectCard({ p }: { p: (typeof projects)[number] }) {
  return (
    <Link to="/work/$slug" params={{ slug: p.slug }} className="group block overflow-hidden rounded-xl border bg-card">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute left-4 top-4"><SampleBadge /></div>
      </div>
      <div className="p-6">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{p.category}</p>
        <h3 className="mt-2 text-lg font-bold">{p.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">Materials: {p.materials}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">View Project <ArrowRight className="h-4 w-4" /></span>
      </div>
    </Link>
  );
}

export function CtaBand() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <div className="rounded-2xl bg-ink px-8 py-16 text-center text-ink-foreground md:px-16 md:py-24">
          <h2 className="display mx-auto max-w-3xl text-4xl md:text-6xl">Let's build something that stands out.</h2>
          <p className="mx-auto mt-6 max-w-xl text-ink-muted">From one custom sign to a complete commercial signage project, we're here to help bring your vision to life.</p>
          <Link to="/quote" className="mt-10 inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 font-bold text-primary-foreground transition hover:brightness-110">Request Your Custom Quote <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  );
}
