import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { projects, projectCategories } from "@/lib/site";
import { PageHero } from "@/components/site/PageHero";
import { ProjectCard } from "./index";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Our Work | Signage & CNC Projects — Signs Plus CNC Calgary" },
      { name: "description", content: "Browse signage, printing, acrylic and CNC fabrication projects by Signs Plus CNC." },
      { property: "og:title", content: "Our Work — Signs Plus CNC" },
      { property: "og:description", content: "A portfolio of custom signage and CNC fabrication projects." },
    ],
  }),
  component: Work,
});

function Work() {
  const [cat, setCat] = useState<string>("All");
  const list = cat === "All" ? projects : projects.filter((p) => p.category === cat);
  return (
    <>
      <PageHero eyebrow="Portfolio" title="Our work.">Sample placeholders are shown until authentic project photographs are uploaded.</PageHero>
      <section className="container-x py-16">
        <div className="flex flex-wrap gap-2" role="tablist">
          {["All", ...projectCategories].map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${cat === c ? "border-ink bg-ink text-ink-foreground" : "hover:border-foreground"}`}>{c}</button>
          ))}
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => <ProjectCard key={p.slug} p={p} />)}
        </div>
      </section>
    </>
  );
}
