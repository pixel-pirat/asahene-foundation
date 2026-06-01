import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { CrudList } from "@/components/admin/CrudList";
import { useStore, addItem, updateItem, removeItem } from "@/lib/store";
import { Newspaper, Film } from "lucide-react";

export const Route = createFileRoute("/admin/media")({
  head: () => ({ meta: [{ title: "Videos & Press — Admin" }] }),
  component: MediaAdmin,
});

function MediaAdmin() {
  const videos = useStore((d) => d.videos);
  const press = useStore((d) => d.press);

  return (
    <AdminShell title="Videos & Press">
      <div className="grid gap-6 lg:grid-cols-2">
        <CrudList
          title="Videos"
          description="YouTube/Facebook embeds shown on Media and Ensemble pages."
          items={videos}
          empty={{ title: "", embedUrl: "", platform: "youtube" }}
          fields={[
            { name: "title", label: "Title", full: true },
            { name: "embedUrl", label: "Embed URL", placeholder: "https://www.youtube.com/embed/...", full: true, hint: "Use the /embed/ URL for YouTube." },
            { name: "platform", label: "Platform (youtube | facebook | other)" },
          ]}
          onAdd={(v) => addItem("videos", v as any)}
          onUpdate={(id, v) => updateItem("videos", id, v as any)}
          onRemove={(id) => removeItem("videos", id)}
          renderRow={(v) => (
            <div className="flex items-start gap-3">
              <Film className="mt-0.5 h-4 w-4 text-primary" />
              <div className="min-w-0">
                <p className="truncate font-medium">{v.title}</p>
                <p className="truncate text-xs text-muted-foreground">{v.embedUrl}</p>
                <span className="mt-1 inline-block rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase text-primary">{v.platform}</span>
              </div>
            </div>
          )}
        />

        <CrudList
          title="Press Mentions"
          items={press}
          empty={{ outlet: "", note: "", url: "", posterUrl: "" }}
          fields={[
            { name: "outlet", label: "Outlet" },
            { name: "note", label: "Note / context" },
            { name: "url", label: "Article URL", type: "url" },
            { name: "posterUrl", label: "Poster image URL", type: "url" },
          ]}
          onAdd={(v) => addItem("press", v)}
          onUpdate={(id, v) => updateItem("press", id, v)}
          onRemove={(id) => removeItem("press", id)}
          renderRow={(p) => (
            <div className="flex items-start gap-3">
              {p.posterUrl
                ? <img src={p.posterUrl} alt={p.outlet} className="h-12 w-12 rounded object-cover" />
                : <Newspaper className="mt-1 h-5 w-5 text-primary" />}
              <div className="min-w-0">
                <p className="font-medium">{p.outlet}</p>
                <p className="truncate text-xs text-muted-foreground">{p.note}</p>
              </div>
            </div>
          )}
        />
      </div>
    </AdminShell>
  );
}
