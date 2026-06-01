import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { CrudList } from "@/components/admin/CrudList";
import { useStore, addItem, updateItem, removeItem } from "@/lib/store";

export const Route = createFileRoute("/admin/ensemble")({
  head: () => ({ meta: [{ title: "Ensemble — Admin" }] }),
  component: EnsembleAdmin,
});

function EnsembleAdmin() {
  const members = useStore((d) => d.members);
  const instruments = useStore((d) => d.instruments);

  return (
    <AdminShell title="Ensemble & Instruments">
      <div className="grid gap-6 lg:grid-cols-2">
        <CrudList
          title="Ensemble Members"
          items={members}
          empty={{ name: "", role: "", bio: "", photo: "" }}
          fields={[
            { name: "name", label: "Full name" },
            { name: "role", label: "Role" },
            { name: "photo", label: "Photo URL", type: "url", placeholder: "https://..." },
            { name: "bio", label: "Short bio", type: "textarea" },
          ]}
          onAdd={(v) => addItem("members", v)}
          onUpdate={(id, v) => updateItem("members", id, v)}
          onRemove={(id) => removeItem("members", id)}
          renderRow={(m) => (
            <div className="flex items-center gap-4">
              {m.photo ? (
                <img src={m.photo} alt={m.name} className="h-12 w-12 rounded-full object-cover" />
              ) : (
                <div className="grid h-12 w-12 place-items-center rounded-full bg-secondary font-display font-bold text-primary">{m.name.charAt(0)}</div>
              )}
              <div className="min-w-0">
                <p className="font-medium">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.role}</p>
              </div>
            </div>
          )}
        />

        <CrudList
          title="Traditional Instruments"
          items={instruments}
          empty={{ name: "", desc: "" }}
          fields={[
            { name: "name", label: "Instrument", placeholder: "Atumpan (Talking Drums)" },
            { name: "desc", label: "Description", type: "textarea" },
          ]}
          onAdd={(v) => addItem("instruments", v)}
          onUpdate={(id, v) => updateItem("instruments", id, v)}
          onRemove={(id) => removeItem("instruments", id)}
          renderRow={(i) => (
            <div>
              <p className="font-medium">{i.name}</p>
              <p className="text-xs text-muted-foreground">{i.desc}</p>
            </div>
          )}
        />
      </div>
    </AdminShell>
  );
}
