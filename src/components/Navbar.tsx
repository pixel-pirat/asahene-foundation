import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logoSrc from "@/assets/Group 182.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/ensemble", label: "Ensemble" },
  { to: "/ghana-day", label: "Ghana Day 2025" },
  { to: "/awards", label: "Awards" },
  { to: "/media", label: "Media" },
  { to: "/support", label: "Support" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="kente-stripe h-1.5 w-full" />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src={logoSrc}
            alt="Asahene Foundation logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            style={{ mixBlendMode: "multiply" }}
          />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-base font-bold text-foreground sm:text-lg">
              Asahene Foundation
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              A Trend in Our Culture
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-primary" }}
              inactiveProps={{ className: "text-foreground/75 hover:text-primary" }}
              className="rounded-md px-3 py-2 text-sm font-medium transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/support"
          className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition hover:shadow-lg hover:brightness-110 lg:inline-flex"
        >
          Donate
        </Link>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="rounded-md p-2 text-foreground lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-primary" }}
                inactiveProps={{ className: "text-foreground/80" }}
                className="rounded-md px-3 py-3 text-base font-medium"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/support"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
            >
              Donate
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
