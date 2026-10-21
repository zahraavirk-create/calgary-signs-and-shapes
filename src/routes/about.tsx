import { createFileRoute } from "@tanstack/react-router";
import shop from "@/assets/hero-cnc.jpg";
import { PageHero } from "@/components/site/PageHero";
import { CtaBand } from "./index";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Family-Operated Sign Shop Calgary — Signs Plus CNC" },
      { name: "description", content: "Signs Plus CNC is a Calgary signage and CNC fabrication business focused on quality, precision and service." },
      { property: "og:title", content: "About Signs Plus CNC" },
      { property: "og:description", content: "Quality, precision and customer service from a Calgary sign and fabrication shop." },
    ],
  }),
  component: About,
});

const values = ["Quality over shortcuts", "Precision in every cut", "Honest communication", "Respect for your budget and timeline"];
const process = ["Consultation & quote", "Design & proofing", "Fabrication & finishing", "Quality check & handoff"];

function About() {
  return (
    <>
      <PageHero eyebrow="About us" title="Built with care, cut with precision.">
        A family-operated business focused on quality, precision and customer service. <em>(Description pending owner approval.)</em>
      </PageHero>
      <section className="container-x grid gap-12 py-24 md:grid-cols-2">
        <div>
          <h2 className="display text-3xl md:text-5xl">Our story</h2>
          <p className="mt-6 text-muted-foreground">[Placeholder — founding date, company history, and how Signs Plus CNC got started.]</p>
          <h3 className="mt-10 text-xl font-bold">What we do</h3>
          <p className="mt-3 text-muted-foreground">Custom signage, professional printing and CNC fabrication for businesses, contractors, real estate professionals, events and individuals across Calgary.</p>
          <h3 className="mt-10 text-xl font-bold">Our approach to craftsmanship</h3>
          <p className="mt-3 text-muted-foreground">Every job is reviewed by hand for feasibility, materials and finish before production starts.</p>
        </div>
        <img src={shop} alt="Workshop placeholder — CNC machine" loading="lazy" className="aspect-[4/5] w-full rounded-xl object-cover" />
      </section>
      <section className="bg-secondary py-24">
        <div className="container-x grid gap-12 md:grid-cols-2">
          <div><h2 className="display text-3xl">Production process</h2><ol className="mt-6 space-y-4">{process.map((p, i) => <li key={p} className="flex gap-4 rounded-lg border bg-card p-5"><span className="font-extrabold text-primary">0{i + 1}</span>{p}</li>)}</ol></div>
          <div><h2 className="display text-3xl">Our values</h2><ul className="mt-6 space-y-4">{values.map((v) => <li key={v} className="rounded-lg border bg-card p-5 font-semibold">{v}</li>)}</ul></div>
        </div>
      </section>
      <section className="container-x py-24">
        <h2 className="display text-3xl">Team</h2>
        <p className="mt-4 text-muted-foreground">[Placeholder — team biographies and experience to be added.]</p>
      </section>
      <CtaBand />
    </>
  );
}
