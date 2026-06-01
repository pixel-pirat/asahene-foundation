import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Users, Award, Image as ImageIcon, Film, Globe, Inbox, Settings as SettingsIcon, Download } from "lucide-react";
import { AdminShell, Card } from "@/components/admin/AdminShell";
import { useStore, exportData, importData, resetAllData } from "@/lib/store";
import { useRef } from "react";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin Dashboard — Asahene Foundation" }] }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const data = useStore((d) => d);
  const fileRef = useRef<HTMLInputElement>(null);

  const stats = [
    { k: "Events", v: 1, to: "/admin/events", icon: Calendar },
    { k: "Ensemble members", v: data.members.length, to: "/admin/ensemble", icon: Users },
    { k: "Awards", v: data.awards.length, to: "/admin/awards", icon: Award },
    { k: "Gallery images", v: data.gallery.length, to: "/admin/gallery", icon: ImageIcon },
    { k: "Videos & press", v: data.videos.length + data.press.length, to: "/admin/media", icon: Film },
    { k: "Press kit files", v: data.pressKit.length, to: "/admin/press-kit", icon: Download },
    { k: "Countries", v: data.countries.length, to: "/admin/countries", icon: Globe },
    { k: "Submissions", v: data.submissions.length, to: "/admin/submissions", icon: Inbox },
  ] as const;

  const recent = data.submissions.slice(0, 5);
  const unread = data.submissions.filter((s) => !s.read).length;

  const onExport = () => {
    const blob = new Blob([exportData()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `asahene-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onImport = (file: File) => {
    file.text().then((t) => {
      try { importData(t); alert("Data imported successfully."); }
      catch { alert("Invalid backup file."); }
    });
  };

  return (
    <AdminShell title="Dashboard">
      {/* Quick stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.k}
            to={s.to}
            className="rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md"
          >
            <s.icon className="h-6 w-6 text-primary" />
            <div className="mt-4 font-display text-3xl font-bold tabular-nums">{s.v}</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.k}</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Recent submissions */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold">Recent submissions</h2>
              <Link to="/admin/submissions" className="text-xs font-semibold text-primary hover:underline">View all{unread ? ` (${unread} unread)` : ""}</Link>
            </div>
            {recent.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">No submissions yet. Public forms will appear here.</p>
            ) : (
              <ul className="mt-4 divide-y divide-border">
                {recent.map((s) => (
                  <li key={s.id} className="flex items-start justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">{s.kind}</span>
                        {!s.read && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                      </div>
                      <p className="mt-1 truncate text-sm font-medium">{s.data.name || s.data.email || s.data.org || "Submission"}</p>
                      <p className="truncate text-xs text-muted-foreground">{s.data.subject || s.data.message || s.data.interest || ""}</p>
                    </div>
                    <span className="shrink-0 text-[11px] text-muted-foreground">{new Date(s.createdAt).toLocaleDateString()}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        {/* Tools */}
        <Card>
          <h2 className="font-display text-lg font-bold">Tools</h2>
          <p className="mt-1 text-xs text-muted-foreground">All site content lives in your browser's localStorage.</p>
          <div className="mt-5 space-y-3">
            <Link to="/admin/settings" className="flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-medium hover:border-primary/50 hover:bg-muted/40">
              <SettingsIcon className="h-4 w-4 text-primary" /> Edit Site Settings
            </Link>
            <button onClick={onExport} className="flex w-full items-center gap-3 rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-medium hover:border-primary/50 hover:bg-muted/40">
              <Download className="h-4 w-4 text-primary" /> Export backup (.json)
            </button>
            <button onClick={() => fileRef.current?.click()} className="flex w-full items-center gap-3 rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-medium hover:border-primary/50 hover:bg-muted/40">
              <Download className="h-4 w-4 -scale-y-100 text-primary" /> Import backup
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) onImport(f); e.target.value = ""; }}
            />
            <button
              onClick={() => { if (confirm("Reset ALL content to defaults? This cannot be undone.")) resetAllData(); }}
              className="flex w-full items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10"
            >
              Reset all data to defaults
            </button>
          </div>
        </Card>
      </div>
    </AdminShell>
  );
}
