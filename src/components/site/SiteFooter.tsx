import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-muted">
      <div className="container-x grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-xl font-extrabold text-ink-foreground">Signs Plus <span className="text-primary">CNC</span></p>
          <p className="mt-3 max-w-sm text-sm">Custom signage, professional printing and precision CNC fabrication in Calgary, Alberta.</p>
        </div>
        <div>
          <p className="mb-3 text-sm font-bold text-ink-foreground">Explore</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/services" className="hover:text-ink-foreground">Services</Link></li>
            <li><Link to="/work" className="hover:text-ink-foreground">Our Work</Link></li>
            <li><Link to="/shop" className="hover:text-ink-foreground">Shop</Link></li>
            <li><Link to="/about" className="hover:text-ink-foreground">About Us</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-bold text-ink-foreground">Get in touch</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/contact" className="hover:text-ink-foreground">Contact</Link></li>
            <li><Link to="/quote" className="hover:text-ink-foreground">Request a Quote</Link></li>
            <li>Calgary, Alberta</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10">
        <div className="container-x flex flex-col justify-between gap-2 py-6 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} Signs Plus CNC. All rights reserved.</p>
          <p>Privacy Policy · Terms (coming soon)</p>
        </div>
      </div>
    </footer>
  );
}
