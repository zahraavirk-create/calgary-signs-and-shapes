import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { projects } from "@/lib/site";
import { SampleBadge } from "@/components/site/PageHero";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const p = projects.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — Signs Plus CNC` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: loaderData.name },
          { property: "og:description", content: loaderData.description },
        ]
      : [{ title: "Project not found" }, { name: "robots", content: "noindex" }],
  }),
  component: Detail,
});

function Detail() {
  const p = Route.useLoaderData();
  return (
    <article className="pt-32 pb-24">
      <div className="container-x">
        <Link to="/work" className="text-sm font-semibold text-muted-foreground hover:text-foreground">← All projects</Link>
        <div className="mt-6 flex items-center gap-3"><SampleBadge /><span className="eyebrow">{p.category}</span></div>
        <h1 className="display mt-4 text-4xl md:text-6xl">{p.name}</h1>
        <img src={p.image} alt={p.name} className="mt-10 aspect-[16/9] w-full rounded-xl object-cover" />
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <div><p className="text-xs font-bold uppercase text-muted-foreground">Materials</p><p className="mt-2">{p.materials}</p></div>
          <p className="md:col-span-2 text-lg text-muted-foreground">{p.description}</p>
        </div>
        <Link to="/quote" className="mt-12 inline-flex rounded-md bg-primary px-6 py-3 font-bold text-primary-foreground">Start a similar project</Link>
      </div>
    </article>
  );
}
