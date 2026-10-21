import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Signs Plus CNC Calgary" },
      { name: "description", content: "Contact Signs Plus CNC in Calgary, Alberta for custom signage, printing and CNC fabrication." },
      { property: "og:title", content: "Contact Signs Plus CNC" },
      { property: "og:description", content: "Get in touch about your next signage or fabrication project." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

const input = "w-full rounded-md border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring";

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's talk about your project." />
      <section className="container-x grid gap-12 py-20 md:grid-cols-5">
        <div className="space-y-8 md:col-span-2">
          {[
            ["Email", "[To be verified]"],
            ["Phone", "[To be verified]"],
            ["Address", "Calgary, Alberta (full address pending approval)"],
            ["Hours", "[To be verified]"],
            ["Social", "[Links to be added]"],
          ].map(([k, v]) => (
            <div key={k}><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{k}</p><p className="mt-1 text-lg font-semibold">{v}</p></div>
          ))}
          <Link to="/quote" className="inline-flex rounded-md bg-primary px-6 py-3 font-bold text-primary-foreground">Request a Quote</Link>
        </div>
        <form
          className="space-y-5 rounded-xl border p-8 md:col-span-3"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            const r = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
            if (!r.success) { setErrors(Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message]))); return; }
            setErrors({}); setSent(true);
          }}
        >
          {sent ? (
            <p className="text-lg font-semibold">Thanks — your message form is ready. Sending will be connected in the next phase.</p>
          ) : (
            <>
              {(["name", "email"] as const).map((f) => (
                <label key={f} className="block"><span className="mb-1.5 block text-sm font-semibold capitalize">{f}</span><input name={f} type={f === "email" ? "email" : "text"} className={input} />{errors[f] && <span className="text-sm text-destructive">{errors[f]}</span>}</label>
              ))}
              <label className="block"><span className="mb-1.5 block text-sm font-semibold">Message</span><textarea name="message" rows={6} className={input} />{errors["message"] && <span className="text-sm text-destructive">{errors["message"]}</span>}</label>
              <button className="rounded-md bg-ink px-6 py-3 font-bold text-ink-foreground hover:bg-primary">Send Message</button>
            </>
          )}
        </form>
      </section>
    </>
  );
}
