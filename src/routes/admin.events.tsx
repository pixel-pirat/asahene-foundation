import { createFileRoute } from "@tanstack/react-router";
import { AdminShell, Card, Field, inputCls } from "@/components/admin/AdminShell";
import { CrudList } from "@/components/admin/CrudList";
import { useStore, updateSettings, addItem, updateItem, removeItem } from "@/lib/store";

export const Route = createFileRoute("/admin/events")({
  head: () => ({ meta: [{ title: "Ghana Day Event — Admin" }] }),
  component: EventsAdmin,
});

function EventsAdmin() {
  const event = useStore((d) => d.settings.event);
  const lineup = useStore((d) => d.lineup);

  return (
    <AdminShell title="Ghana Day Event">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="font-display text-lg font-bold">Event Details</h2>
          <p className="mt-1 text-xs text-muted-foreground">Drives the homepage countdown and the Ghana Day page.</p>
          <div className="mt-5 space-y-4">
            <Field label="Event name"><input className={inputCls} value={event.name} onChange={(e) => updateSettings((s) => ({ ...s, event: { ...s.event, name: e.target.value } }))} /></Field>
            <Field label="Date & time" hint="ISO 8601, e.g. 2025-04-21T00:00:00+09:30"><input className={inputCls} value={event.dateISO} onChange={(e) => updateSettings((s) => ({ ...s, event: { ...s.event, dateISO: e.target.value } }))} /></Field>
            <Field label="Location"><input className={inputCls} value={event.location} onChange={(e) => updateSettings((s) => ({ ...s, event: { ...s.event, location: e.target.value } }))} /></Field>
            <Field label="Highlight"><input className={inputCls} value={event.highlight} onChange={(e) => updateSettings((s) => ({ ...s, event: { ...s.event, highlight: e.target.value } }))} /></Field>
            <Field label="Description"><textarea rows={4} className={inputCls} value={event.description} onChange={(e) => updateSettings((s) => ({ ...s, event: { ...s.event, description: e.target.value } }))} /></Field>
          </div>
        </Card>

        <CrudList
          title="Program Lineup"
          description="Order of events shown on the Ghana Day page."
          items={lineup}
          empty={{ label: "", note: "TBA" }}
          fields={[
            { name: "label", label: "Item", placeholder: "Opening Procession & Libation", full: true },
            { name: "note", label: "Note / time", placeholder: "TBA" },
          ]}
          onAdd={(v) => addItem("lineup", v)}
          onUpdate={(id, v) => updateItem("lineup", id, v)}
          onRemove={(id) => removeItem("lineup", id)}
          renderRow={(it) => (
            <div>
              <p className="font-medium">{it.label}</p>
              <p className="text-xs text-muted-foreground">{it.note}</p>
            </div>
          )}
        />
      </div>
    </AdminShell>
  );
}
