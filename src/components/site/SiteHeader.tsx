import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Our Work" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  const solid = scrolled || open;
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${solid ? "bg-ink/95 backdrop-blur border-b border-ink-foreground/10" : "bg-transparent"}`}>
      <div className="container-x flex h-18 items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2 text-ink-foreground">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-sm font-extrabold text-primary-foreground">S+</span>
          <span className="text-lg font-extrabold tracking-tight">Signs Plus <span className="text-primary">CNC</span></span>
        </Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }} className="text-sm font-semibold text-ink-muted transition-colors hover:text-ink-foreground" activeProps={{ className: "text-ink-foreground" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/quote" className="hidden rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition hover:brightness-110 sm:inline-flex">Get a Quote</Link>
          <button className="text-ink-foreground lg:hidden" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="container-x flex flex-col gap-1 pb-6 lg:hidden" aria-label="Mobile">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-3 text-lg font-semibold text-ink-foreground border-b border-ink-foreground/10">{n.label}</Link>
          ))}
          <Link to="/quote" onClick={() => setOpen(false)} className="mt-4 rounded-md bg-primary py-3 text-center font-bold text-primary-foreground">Get a Quote</Link>
        </nav>
      )}
    </header>
  );
}
