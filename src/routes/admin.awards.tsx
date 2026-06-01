import { createFileRoute } from "@tanstack/react-router";
import { Trophy } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { CrudList } from "@/components/admin/CrudList";
import { useStore, addItem, updateItem, removeItem } from "@/lib/store";

export const Route = createFileRoute("/admin/awards")({
  head: () => ({ meta: [{ title: "Awards — Admin" }] }),
  component: AwardsAdmin,
});

function AwardsAdmin() {
  const awards = useStore((d) => [...d.awards].sort((a, b) => Number(b.year) - Number(a.year)));
  return (
    <AdminShell title="Awards & Recognition">
      <CrudList
        title="Awards"
        items={awards}
        empty={{ year: "", title: "", body: "" }}
        fields={[
          { name: "year", label: "Year" },
          { name: "title", label: "Title", full: true },
          { name: "body", label: "Body / awarding org", full: true },
        ]}
        onAdd={(v) => addItem("awards", v)}
        onUpdate={(id, v) => updateItem("awards", id, v)}
        onRemove={(id) => removeItem("awards", id)}
        renderRow={(a) => (
          <div className="flex gap-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><Trophy className="h-4 w-4" /></span>
            <div>
              <p className="text-xs font-bold text-primary">{a.year}</p>
              <p className="font-medium">{a.title}</p>
              <p className="text-xs text-muted-foreground">{a.body}</p>
            </div>
          </div>
        )}
      />
    </AdminShell>
  );
}
