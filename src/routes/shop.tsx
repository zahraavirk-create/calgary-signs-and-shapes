import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop | Custom Name, Business & Event Signs — Signs Plus CNC" },
      { name: "description", content: "Order standard custom signs online from Signs Plus CNC in Calgary. Prices in CAD." },
      { property: "og:title", content: "Shop — Signs Plus CNC" },
      { property: "og:description", content: "Standard signage products available to order online." },
    ],
  }),
  component: Shop,
});

const cats = ["Custom Name Signs", "Business Signs", "Event Signs", "Acrylic Products", "Personalized Gifts", "Promotional Signage"];

function Shop() {
  return (
    <>
      <PageHero eyebrow="Shop" title="Online shop — coming soon.">Standard products with clear CAD pricing will be available here. Need something now? Request a quote.</PageHero>
      <section className="container-x grid gap-6 py-20 sm:grid-cols-2 lg:grid-cols-3">
        {cats.map((c) => (
          <div key={c} className="rounded-xl border bg-secondary p-8">
            <h2 className="text-xl font-bold">{c}</h2>
            <p className="mt-2 text-sm text-muted-foreground">Products coming soon.</p>
          </div>
        ))}
        <Link to="/quote" className="rounded-xl bg-primary p-8 font-bold text-primary-foreground">Request a custom quote →</Link>
      </section>
    </>
  );
}
