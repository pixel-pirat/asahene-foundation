import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminShell, Card, Btn } from "@/components/admin/AdminShell";
import { useStore, markSubmissionRead, removeSubmission, type SubmissionKind, type Submission } from "@/lib/store";
import { Mail, Trash2, Check } from "lucide-react";

export const Route = createFileRoute("/admin/submissions")({
  head: () => ({ meta: [{ title: "Inbox — Admin" }] }),
  component: SubmissionsAdmin,
});

const KINDS: { value: SubmissionKind | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "contact", label: "Contact" },
  { value: "booking", label: "Booking" },
  { value: "registration", label: "Registration" },
  { value: "volunteer", label: "Volunteer" },
  { value: "partner", label: "Partner" },
];

function SubmissionsAdmin() {
  const all = useStore((d) => d.submissions);
  const [filter, setFilter] = useState<SubmissionKind | "all">("all");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = filter === "all" ? all : all.filter((s) => s.kind === filter);
  const current = filtered.find((s) => s.id === selected) ?? filtered[0];

  const markRead = (id: string) => markSubmissionRead(id, true);
  const remove = (id: string) => removeSubmission(id);
  const clearAll = () => { if (confirm("Delete ALL submissions?")) all.forEach((s) => removeSubmission(s.id)); };

  return (
    <AdminShell title="Submissions Inbox">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {KINDS.map((k) => {
          const count = k.value === "all" ? all.length : all.filter((s) => s.kind === k.value).length;
          return (
            <button
              key={k.value}
              onClick={() => setFilter(k.value)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${filter === k.value ? "bg-primary text-primary-foreground" : "bg-card border border-border hover:border-primary/50"}`}
            >
              {k.label} <span className="ml-1 opacity-70">{count}</span>
            </button>
          );
        })}
        <Btn variant="ghost" className="ml-auto text-destructive" onClick={clearAll}>
          <Trash2 className="h-4 w-4" /> Clear all
        </Btn>
      </div>

      <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
        <Card className="p-0">
          {filtered.length === 0 ? (
            <p className="p-6 text-center text-sm text-muted-foreground">No submissions.</p>
          ) : (
            <ul className="max-h-[70vh] overflow-y-auto divide-y divide-border">
              {filtered.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => { setSelected(s.id); if (!s.read) markRead(s.id); }}
                    className={`flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-muted/40 ${current?.id === s.id ? "bg-muted/60" : ""}`}
                  >
                    <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${s.read ? "bg-transparent" : "bg-primary"}`} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-primary">{s.kind}</span>
                        <span className="ml-auto text-[10px] text-muted-foreground">{new Date(s.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="mt-1 truncate text-sm font-medium">{s.data.name || s.data.org || s.data.email || "Submission"}</p>
                      <p className="truncate text-xs text-muted-foreground">{s.data.subject || s.data.message || s.data.interest || s.data.skills || ""}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          {current ? <Detail s={current} onRemove={() => { remove(current.id); setSelected(null); }} /> : <p className="text-center text-sm text-muted-foreground">Select a submission.</p>}
        </Card>
      </div>
    </AdminShell>
  );
}

function Detail({ s, onRemove }: { s: Submission; onRemove: () => void }) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase text-primary">{s.kind}</span>
          <h2 className="mt-2 font-display text-xl font-bold">{s.data.name || s.data.org || "Submission"}</h2>
          <p className="text-xs text-muted-foreground">{new Date(s.createdAt).toLocaleString()}</p>
        </div>
        <div className="flex gap-2">
          {s.data.email && (
            <a href={`mailto:${s.data.email}`} className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">
              <Mail className="h-4 w-4" /> Reply
            </a>
          )}
          <Btn variant="ghost" className="text-destructive" onClick={onRemove}><Trash2 className="h-4 w-4" /> Delete</Btn>
        </div>
      </div>
      <dl className="mt-6 grid gap-3 sm:grid-cols-2">
        {Object.entries(s.data).map(([k, v]) => (
          <div key={k} className="rounded-lg border border-border bg-muted/30 p-3">
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{k}</dt>
            <dd className="mt-1 break-words text-sm">{v || <span className="text-muted-foreground italic">empty</span>}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground"><Check className="h-3 w-3" /> Marked as read</p>
    </div>
  );
}
