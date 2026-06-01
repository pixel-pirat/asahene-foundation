import { createFileRoute } from "@tanstack/react-router";
import { AdminShell, Card } from "@/components/admin/AdminShell";
import { CrudList } from "@/components/admin/CrudList";
import { useStore, addItem, updateItem, removeItem } from "@/lib/store";
import { WorldMap } from "@/components/WorldMap";

export const Route = createFileRoute("/admin/countries")({
  head: () => ({ meta: [{ title: "Countries — Admin" }] }),
  component: CountriesAdmin,
});

function CountriesAdmin() {
  const countries = useStore((d) => d.countries);
  return (
    <AdminShell title="Performance Countries">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="font-display text-lg font-bold">Live Preview</h2>
          <p className="mt-1 text-xs text-muted-foreground">Updates as you edit. Use cx/cy 0–100 (percent of map width/height).</p>
          <div className="mt-4"><WorldMap /></div>
        </Card>

        <CrudList
          title="Country Pins"
          items={countries}
          empty={{ name: "", cx: 50, cy: 50, home: false }}
          fields={[
            { name: "name", label: "Country", full: true },
            { name: "cx", label: "X (0–100)", type: "number" },
            { name: "cy", label: "Y (0–100)", type: "number" },
            { name: "home", label: "Home country?", type: "checkbox" },
          ]}
          onAdd={(v) => addItem("countries", v)}
          onUpdate={(id, v) => updateItem("countries", id, v)}
          onRemove={(id) => removeItem("countries", id)}
          renderRow={(c) => (
            <div className="flex items-center gap-3">
              <span className={`h-3 w-3 rounded-full ${c.home ? "bg-primary" : "bg-[var(--flag-red)]"}`} />
              <span className="font-medium">{c.name}</span>
              <span className="ml-auto text-xs text-muted-foreground tabular-nums">{c.cx}, {c.cy}</span>
            </div>
          )}
        />
      </div>
    </AdminShell>
  );
}
