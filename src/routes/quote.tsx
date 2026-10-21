import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Check, Upload, X } from "lucide-react";
import { services } from "@/lib/site";

export const Route = createFileRoute("/quote")({
  validateSearch: (s: Record<string, unknown>) => ({ service: typeof s.service === "string" ? s.service : undefined }),
  head: () => ({
    meta: [
      { title: "Request a Free Quote | Signs Plus CNC Calgary" },
      { name: "description", content: "Request a custom quote for signage, printing or CNC fabrication. Upload your artwork and project details." },
      { property: "og:title", content: "Request a Quote — Signs Plus CNC" },
      { property: "og:description", content: "Tell us about your project and get a custom quote." },
    ],
  }),
  component: Quote,
});

const STEPS = ["Project Type", "Details", "Artwork", "Your Info", "Review"];
const ACCEPT = [".pdf", ".svg", ".ai", ".eps", ".png", ".jpg", ".jpeg"];
const MAX_MB = 25;

const contactSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().min(7, "Valid phone required").max(30),
});

const input = "w-full rounded-md border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring";

function Field({ label, children, error }: { label: string; children: React.ReactNode; error?: string | undefined }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      {children}
      {error && <span className="mt-1 block text-sm text-destructive">{error}</span>}
    </label>
  );
}

type Key = "serviceType"|"unit"|"quantity"|"usage"|"sides"|"fulfillment"|"product"|"width"|"height"|"material"|"thickness"|"finish"|"description"|"date"|"fullName"|"company"|"email"|"phone"|"location"|"comments"|"hp";
type QData = Partial<Record<Key, string>>;

function Quote() {
  const { service } = Route.useSearch();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<QData>({ serviceType: service ?? "", unit: "inches", quantity: "1", usage: "indoor", sides: "single", fulfillment: "pickup" });
  const [files, setFiles] = useState<File[]>([]);
  const [fileErr, setFileErr] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<string | null>(null);
  const set = (k: Key) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setData({ ...data, [k]: e.target.value });

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const ok: File[] = [];
    for (const f of Array.from(list)) {
      const ext = "." + f.name.split(".").pop()?.toLowerCase();
      if (!ACCEPT.includes(ext)) { setFileErr(`${f.name}: unsupported file type`); continue; }
      if (f.size > MAX_MB * 1024 * 1024) { setFileErr(`${f.name}: exceeds ${MAX_MB} MB`); continue; }
      ok.push(f);
    }
    setFiles([...files, ...ok].slice(0, 10));
  };

  const next = () => {
    if (step === 0 && !data.serviceType) { setErrors({ serviceType: "Please select a project type" }); return; }
    if (step === 1 && !data.description?.trim()) { setErrors({ description: "Please describe your project" }); return; }
    if (step === 3) {
      const r = contactSchema.safeParse(data);
      if (!r.success) { setErrors(Object.fromEntries(r.error.issues.map((i) => [String(i.path[0]), i.message]))); return; }
    }
    setErrors({});
    setStep(step + 1);
  };

  const submit = () => {
    const id = `SPC-${new Date().toISOString().slice(2, 10).replace(/-/g, "")}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    setDone(id);
    window.scrollTo({ top: 0 });
  };

  if (done) {
    return (
      <section className="container-x max-w-2xl pt-40 pb-24 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="h-8 w-8" /></div>
        <h1 className="display mt-8 text-4xl md:text-5xl">Request received.</h1>
        <p className="mt-4 text-muted-foreground">Your inquiry number is</p>
        <p className="mt-2 text-3xl font-extrabold tracking-wider">{done}</p>
        <p className="mt-6 text-muted-foreground">Our team will review your project details, materials and feasibility before sending a quotation. Submitting a request does not create an order.</p>
        <Link to="/" className="mt-10 inline-flex rounded-md bg-ink px-6 py-3 font-bold text-ink-foreground">Back to home</Link>
      </section>
    );
  }

  return (
    <section className="bg-secondary pt-32 pb-24">
      <div className="container-x max-w-3xl">
        <p className="eyebrow">Custom quote</p>
        <h1 className="display mt-4 text-4xl md:text-6xl">Tell us your vision.</h1>
        <ol className="mt-10 flex gap-2" aria-label="Progress">
          {STEPS.map((s, i) => (
            <li key={s} className="flex-1">
              <div className={`h-1.5 rounded-full ${i <= step ? "bg-primary" : "bg-border"}`} />
              <p className={`mt-2 hidden text-xs font-semibold sm:block ${i === step ? "text-foreground" : "text-muted-foreground"}`}>{i + 1}. {s}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 rounded-xl border bg-card p-6 md:p-10">
          {step === 0 && (
            <fieldset>
              <legend className="text-xl font-bold">What type of project is this?</legend>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {services.map((s) => (
                  <button type="button" key={s.slug} onClick={() => setData({ ...data, serviceType: s.slug })} className={`rounded-lg border-2 p-5 text-left transition ${data.serviceType === s.slug ? "border-primary bg-primary/5" : "hover:border-foreground/30"}`}>
                    <p className="font-bold">{s.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{s.short}</p>
                  </button>
                ))}
              </div>
              {errors.serviceType && <p className="mt-3 text-sm text-destructive">{errors.serviceType}</p>}
            </fieldset>
          )}

          {step === 1 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2"><Field label="Product or service type"><input className={input} value={data.product ?? ""} onChange={set("product")} placeholder="e.g. storefront sign" maxLength={120} /></Field></div>
              <Field label="Width"><input type="number" min={0} className={input} value={data.width ?? ""} onChange={set("width")} /></Field>
              <Field label="Height"><input type="number" min={0} className={input} value={data.height ?? ""} onChange={set("height")} /></Field>
              <Field label="Unit"><select className={input} value={data.unit} onChange={set("unit")}><option value="inches">Inches</option><option value="feet">Feet</option><option value="mm">Millimetres</option></select></Field>
              <Field label="Quantity"><input type="number" min={1} className={input} value={data.quantity} onChange={set("quantity")} /></Field>
              <Field label="Preferred material"><input className={input} value={data.material ?? ""} onChange={set("material")} maxLength={100} /></Field>
              <Field label="Thickness (if applicable)"><input className={input} value={data.thickness ?? ""} onChange={set("thickness")} maxLength={50} /></Field>
              <Field label="Indoor / outdoor"><select className={input} value={data.usage} onChange={set("usage")}><option value="indoor">Indoor</option><option value="outdoor">Outdoor</option><option value="both">Both</option></select></Field>
              <Field label="Sides"><select className={input} value={data.sides} onChange={set("sides")}><option value="single">Single-sided</option><option value="double">Double-sided</option><option value="na">Not applicable</option></select></Field>
              <div className="sm:col-span-2"><Field label="Colour & finish preferences"><input className={input} value={data.finish ?? ""} onChange={set("finish")} maxLength={200} /></Field></div>
              <div className="sm:col-span-2"><Field label="Project description *" error={errors.description}><textarea rows={5} className={input} value={data.description ?? ""} onChange={set("description")} maxLength={3000} /></Field></div>
              <Field label="Preferred completion date"><input type="date" className={input} value={data.date ?? ""} onChange={set("date")} /></Field>
              <Field label="Fulfillment"><select className={input} value={data.fulfillment} onChange={set("fulfillment")}><option value="pickup">Pickup</option><option value="delivery">Delivery inquiry</option><option value="installation">Installation inquiry</option></select></Field>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold">Upload artwork (optional)</h2>
              <p className="mt-1 text-sm text-muted-foreground">PDF, SVG, AI, EPS, PNG or JPG · up to {MAX_MB} MB each · max 10 files</p>
              <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 text-center transition hover:border-primary">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <span className="mt-3 font-semibold">Click to choose files</span>
                <input type="file" multiple accept={ACCEPT.join(",")} className="sr-only" onChange={(e) => { setFileErr(""); addFiles(e.target.files); e.target.value = ""; }} />
              </label>
              {fileErr && <p className="mt-3 text-sm text-destructive">{fileErr}</p>}
              <ul className="mt-4 space-y-2">
                {files.map((f, i) => (
                  <li key={i} className="flex items-center justify-between rounded-md border px-4 py-2 text-sm">
                    <span className="truncate">{f.name} <span className="text-muted-foreground">({(f.size / 1048576).toFixed(1)} MB)</span></span>
                    <button type="button" aria-label="Remove file" onClick={() => setFiles(files.filter((_, j) => j !== i))}><X className="h-4 w-4" /></button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {step === 3 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name *" error={errors.fullName}><input className={input} value={data.fullName ?? ""} onChange={set("fullName")} maxLength={100} /></Field>
              <Field label="Company (optional)"><input className={input} value={data.company ?? ""} onChange={set("company")} maxLength={100} /></Field>
              <Field label="Email *" error={errors.email}><input type="email" className={input} value={data.email ?? ""} onChange={set("email")} maxLength={255} /></Field>
              <Field label="Phone *" error={errors.phone}><input type="tel" className={input} value={data.phone ?? ""} onChange={set("phone")} maxLength={30} /></Field>
              <div className="sm:col-span-2"><Field label="Project location (optional)"><input className={input} value={data.location ?? ""} onChange={set("location")} maxLength={200} /></Field></div>
              <div className="sm:col-span-2"><Field label="Additional comments"><textarea rows={4} className={input} value={data.comments ?? ""} onChange={set("comments")} maxLength={2000} /></Field></div>
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden onChange={set("hp")} />
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold">Review your request</h2>
              <dl className="mt-6 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
                {[
                  ["Project type", services.find((s) => s.slug === data.serviceType)?.title],
                  ["Size", data.width && data.height ? `${data.width} × ${data.height} ${data.unit}` : "—"],
                  ["Quantity", data.quantity],
                  ["Material", data.material || "—"],
                  ["Fulfillment", data.fulfillment],
                  ["Files", `${files.length} attached`],
                  ["Name", data.fullName],
                  ["Email", data.email],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b py-2"><dt className="text-muted-foreground">{k}</dt><dd className="font-semibold">{v}</dd></div>
                ))}
              </dl>
              <p className="mt-6 rounded-md bg-secondary p-4 text-sm text-muted-foreground">Submitting sends a quote request for staff review. It is not an order — pricing is confirmed in your quotation.</p>
            </div>
          )}

          <div className="mt-10 flex justify-between">
            <button type="button" onClick={() => setStep(step - 1)} disabled={step === 0} className="rounded-md border px-6 py-3 font-bold disabled:opacity-40">Back</button>
            {step < 4 ? (
              <button type="button" onClick={next} className="rounded-md bg-ink px-6 py-3 font-bold text-ink-foreground hover:bg-primary">Continue</button>
            ) : (
              <button type="button" onClick={submit} disabled={!!data.hp} className="rounded-md bg-primary px-6 py-3 font-bold text-primary-foreground hover:brightness-110">Submit Request</button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
