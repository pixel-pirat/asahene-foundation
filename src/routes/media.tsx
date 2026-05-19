import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Download, Newspaper } from "lucide-react";

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
  return (
    <>
      <PageHeader
        eyebrow="Media & Press"
        title="Watch, read, and share"
        subtitle="Our work in video, on stage, and in the press."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-2xl font-bold">Video Gallery</h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="aspect-video overflow-hidden rounded-xl border border-border">
            <iframe
              title="Asahene playlist"
              className="h-full w-full"
              src="https://www.youtube.com/embed/videoseries?list=PLJAPanOB1rkGzTeBMRBvmVseDqujYJFP1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="flex aspect-video flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary/30 bg-card p-6 text-center">
            <p className="font-display text-lg font-semibold">Facebook video gallery</p>
            <p className="mt-2 text-sm text-muted-foreground">Embed coming soon.</p>
            <a
              href="https://www.facebook.com/Anamereconcepts/media_set?set=vb.1496125267&type=2"
              target="_blank"
              rel="noreferrer"
              className="mt-4 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
            >
              Open on Facebook
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <h2 className="font-display text-2xl font-bold">Press Mentions</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {["Ghana Music Awards UK", "MUSIGA Honours", "Parazafik Festival", "Vodafone Ghana"].map((p) => (
            <div key={p} className="flex aspect-[3/4] flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary/30 bg-card p-4 text-center">
              <Newspaper className="h-8 w-8 text-primary" />
              <p className="mt-3 font-display text-sm font-semibold">{p}</p>
              <p className="mt-1 text-xs text-muted-foreground">Poster placeholder</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary text-secondary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center">
          <div>
            <h3 className="font-display text-2xl font-bold">Press Kit</h3>
            <p className="mt-1 text-secondary-foreground/75">Logos, bios, high-res photos and fact sheet.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:brightness-110">
            <Download className="h-4 w-4" /> Download press kit
          </button>
        </div>
      </section>
    </>
  );
}