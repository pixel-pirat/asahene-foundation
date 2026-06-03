import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  LayoutDashboard, Settings as SettingsIcon, Calendar, Users, Award, Image as ImageIcon,
  Film, Newspaper, Download, Globe, Inbox, LogOut, Menu, X, ExternalLink,
} from "lucide-react";
import { useAuth, logout, useStore } from "@/lib/store";
import logoSrc from "@/assets/logo.png";

const nav: { to: string; exact?: boolean; label: string; icon: typeof LayoutDashboard }[] = [
  { to: "/admin", exact: true, label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/settings", label: "Site Settings", icon: SettingsIcon },
  { to: "/admin/events", label: "Ghana Day Event", icon: Calendar },
  { to: "/admin/ensemble", label: "Ensemble & Instruments", icon: Users },
  { to: "/admin/awards", label: "Awards", icon: Award },
  { to: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { to: "/admin/media", label: "Videos & Press", icon: Film },
  { to: "/admin/press-kit", label: "Press Kit", icon: Download },
  { to: "/admin/countries", label: "World Map", icon: Globe },
  { to: "/admin/affiliations", label: "About & Affiliations", icon: Newspaper },
  { to: "/admin/submissions", label: "Inbox", icon: Inbox },
];

export function AdminShell({ children, title }: { children: React.ReactNode; title: string }) {
  const auth = useAuth();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const unread = useStore((d) => d.submissions.filter((s) => !s.read).length);

  useEffect(() => {
    if (!auth) navigate({ to: "/admin/login" });
  }, [auth, navigate]);

  if (!auth) return null;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile topbar */}
      <div className="flex items-center justify-between border-b border-border bg-background px-4 py-3 lg:hidden">
        <Link to="/admin" className="flex items-center gap-2 font-display font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-secondary text-primary ring-2 ring-primary/40">A</span>
          Admin
        </Link>
        <button onClick={() => setOpen((v) => !v)} className="rounded-md p-2" aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${open ? "block" : "hidden"} lg:block fixed lg:sticky inset-x-0 top-12 lg:top-0 z-40 h-[calc(100dvh-3rem)] lg:h-dvh w-full lg:w-64 shrink-0 overflow-y-auto border-r border-border bg-secondary text-secondary-foreground`}
        >
          <div className="hidden lg:block p-5">
            <Link to="/admin" className="flex items-center gap-2.5">
              <img
                src={logoSrc}
                alt="Asahene Foundation logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain brightness-200"
              />
              <span className="flex flex-col leading-tight">
                <span className="font-display text-base font-bold">Asahene</span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-secondary-foreground/60">Admin Console</span>
              </span>
            </Link>
          </div>
          <nav className="px-3 pb-6 pt-2 space-y-1">
            {nav.map((n) => {
              const active = n.exact ? path === n.to : path.startsWith(n.to);
              const Icon = n.icon;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-secondary-foreground/85 hover:bg-secondary-foreground/10 hover:text-secondary-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="flex-1">{n.label}</span>
                  {n.to === "/admin/submissions" && unread > 0 && (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                      {unread}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto border-t border-secondary-foreground/10 p-4 space-y-2 text-xs">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-secondary-foreground/70 hover:text-primary"
            >
              <ExternalLink className="h-3.5 w-3.5" /> View public site
            </a>
            <button
              onClick={() => { logout(); navigate({ to: "/admin/login" }); }}
              className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-secondary-foreground/70 hover:bg-secondary-foreground/10 hover:text-primary"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
            <p className="pt-2 text-secondary-foreground/40">Signed in as {auth.email}</p>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
            <div className="flex items-center justify-between gap-4 px-6 py-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Admin</p>
                <h1 className="font-display text-2xl font-bold leading-tight">{title}</h1>
              </div>
            </div>
          </header>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

/* -------- Shared form primitives -------- */
export function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-muted-foreground">{hint}</span>}
    </label>
  );
}

export const inputCls =
  "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30";

export function Btn({
  variant = "primary", className = "", ...p
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "danger" }) {
  const styles = {
    primary: "bg-primary text-primary-foreground hover:brightness-110",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "bg-transparent text-foreground hover:bg-muted",
    danger: "bg-destructive text-destructive-foreground hover:brightness-110",
  }[variant];
  return (
    <button
      {...p}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition disabled:opacity-50 ${styles} ${className}`}
    />
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-border bg-card p-6 shadow-sm ${className}`}>{children}</div>;
}
