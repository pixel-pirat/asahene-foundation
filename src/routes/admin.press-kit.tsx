import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { CrudList } from "@/components/admin/CrudList";
import { useStore, addItem, updateItem, removeItem } from "@/lib/store";
import { Download } from "lucide-react";

export const Route = createFileRoute("/admin/press-kit")({
  head: () => ({ meta: [{ title: "Press Kit — Admin" }] }),
  component: PressKitAdmin,
});

function PressKitAdmin() {
  const files = useStore((d) => d.pressKit);
  return (
    <AdminShell title="Press Kit Files">
      <CrudList
        title="Downloadable files"
        description="Logos, bios, high-res photos, fact sheets — accessible from the Media page."
        items={files}
        empty={{ label: "", url: "" }}
        fields={[
          { name: "label", label: "Label", placeholder: "Logo pack (ZIP)" },
          { name: "url", label: "File URL", type: "url", placeholder: "https://...", full: true },
        ]}
        onAdd={(v) => addItem("pressKit", v)}
        onUpdate={(id, v) => updateItem("pressKit", id, v)}
        onRemove={(id) => removeItem("pressKit", id)}
        renderRow={(f) => (
          <div className="flex items-center gap-3">
            <Download className="h-4 w-4 text-primary" />
            <div className="min-w-0">
              <p className="font-medium">{f.label}</p>
              <p className="truncate text-xs text-muted-foreground">{f.url}</p>
            </div>
          </div>
        )}
      />
    </AdminShell>
  );
}
