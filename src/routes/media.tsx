import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Download, Newspaper } from "lucide-react";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/media")({
  head: () => ({
    meta: [
      { title: "Media & Press — Asahene Foundation" },
      { name: "description", content: "Video gallery, press mentions and downloadable press kit." },
    ],
  }),
  component: MediaPage,
});

function MediaPage() {
  const videos = useStore((d) => d.videos);
  const press = useStore((d) => d.press);
  const pressKit = useStore((d) => d.pressKit);
  const pressKitNote = useStore((d) => d.settings.pressKitNote);
  return (
    <>
      <PageHeader
        eyebrow="Media & Press"
        title="Watch, read, and share"
        subtitle="Our work in video, on stage, and in the press."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-2xl font-bold">Video Gallery</h2>
        {videos.length === 0 ? (
          <p className="mt-6 rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">No videos added yet.</p>
        ) : (
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {videos.map((v) => (
              <div key={v.id} className="aspect-video overflow-hidden rounded-xl border border-border">
                <iframe
                  title={v.title}
                  className="h-full w-full"
                  src={v.embedUrl}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <h2 className="font-display text-2xl font-bold">Press Mentions</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {press.map((p) => (
            <a
              key={p.id}
              href={p.url || "#"}
              target={p.url ? "_blank" : undefined}
              rel="noreferrer"
              className="group flex aspect-[3/4] flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-primary/30 bg-card p-4 text-center transition hover:border-primary"
            >
              {p.posterUrl ? (
                <img src={p.posterUrl} alt={p.outlet} className="h-full w-full object-cover" />
              ) : (
                <>
                  <Newspaper className="h-8 w-8 text-primary" />
                  <p className="mt-3 font-display text-sm font-semibold">{p.outlet}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{p.note}</p>
                </>
              )}
            </a>
          ))}
        </div>
      </section>

      <section className="bg-secondary text-secondary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h3 className="font-display text-2xl font-bold">Press Kit</h3>
              <p className="mt-1 text-secondary-foreground/75">{pressKitNote}</p>
            </div>
          </div>
          {pressKit.length === 0 ? (
            <p className="mt-6 text-sm text-secondary-foreground/60">No press kit files have been uploaded yet.</p>
          ) : (
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {pressKit.map((f) => (
                <li key={f.id}>
                  <a href={f.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl border border-primary/30 bg-secondary/40 p-4 text-sm font-semibold transition hover:bg-primary hover:text-primary-foreground">
                    <Download className="h-4 w-4" /> {f.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}