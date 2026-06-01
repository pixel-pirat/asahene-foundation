import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { CrudList } from "@/components/admin/CrudList";
import { useStore, addItem, updateItem, removeItem } from "@/lib/store";

export const Route = createFileRoute("/admin/affiliations")({
  head: () => ({ meta: [{ title: "Affiliations — Admin" }] }),
  component: AffiliationsAdmin,
});

function AffiliationsAdmin() {
  const items = useStore((d) => d.affiliations);
  return (
    <AdminShell title="Affiliations">
      <CrudList
        title="Affiliations & Partners"
        description="Shown on the About page."
        items={items}
        empty={{ name: "" }}
        fields={[{ name: "name", label: "Organization name", full: true }]}
        onAdd={(v) => addItem("affiliations", v)}
        onUpdate={(id, v) => updateItem("affiliations", id, v)}
        onRemove={(id) => removeItem("affiliations", id)}
        renderRow={(a) => <p className="font-medium">{a.name}</p>}
      />
    </AdminShell>
  );
}
