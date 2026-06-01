import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import drumsImg from "@/assets/drums.jpg";
import xyloImg from "@/assets/xylophone.jpg";
import ensembleImg from "@/assets/ensemble.jpg";
import festivalImg from "@/assets/festival.jpg";
import heroImg from "@/assets/hero-dance.jpg";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/ensemble")({
  head: () => ({
    meta: [
      { title: "Cultural Ensemble — Asahene Foundation" },
      { name: "description", content: "Formerly Amamere Folk Music & Dance Ensemble — gallery, instruments and performance reel." },
    ],
  }),
  component: EnsemblePage,
});

const defaultGallery = [
  { id: "d1", url: heroImg, alt: "Ensemble" },
  { id: "d2", url: drumsImg, alt: "Drums" },
  { id: "d3", url: ensembleImg, alt: "Ensemble" },
  { id: "d4", url: xyloImg, alt: "Xylophone" },
  { id: "d5", url: festivalImg, alt: "Festival" },
  { id: "d6", url: heroImg, alt: "Ensemble" },
];

export default function EnsemblePage() {
  const instruments = useStore((d) => d.instruments);
  const storedGallery = useStore((d) => d.gallery);
  const members = useStore((d) => d.members);
  const youtubeVideo = useStore((d) => d.videos.find((v) => v.platform === "youtube"));
  const gallery = storedGallery.length > 0 ? storedGallery : defaultGallery;
  return (
    <>
      <PageHeader
        eyebrow="Formerly Amamere"
        title="The Cultural Ensemble"
        subtitle="Authentic Ghanaian repertoire — from Adowa and Kete to Kpanlogo, Bamaya and Agbadza."
      />

      {/* Gallery */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-2xl font-bold">Gallery</h2>
        <p className="mt-1 text-sm text-muted-foreground">A glimpse of the ensemble in motion.</p>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
          {gallery.map((g, i) => (
            <div key={g.id} className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-muted">
              <img
                src={g.url}
                alt={g.alt || `Ensemble photo ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </section>

      {/* Video embeds */}
      <section className="bg-secondary text-secondary-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Watch</p>
            <h2 className="mt-2 font-display text-2xl font-bold">YouTube playlist</h2>
            <div className="mt-4 aspect-video overflow-hidden rounded-xl border border-primary/20">
              {youtubeVideo ? (
                <iframe
                  title={youtubeVideo.title}
                  className="h-full w-full"
                  src={youtubeVideo.embedUrl}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : <div className="grid h-full w-full place-items-center text-sm text-secondary-foreground/60">No video set yet.</div>}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Facebook</p>
            <h2 className="mt-2 font-display text-2xl font-bold">Video gallery</h2>
            <div className="mt-4 flex aspect-video flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary/30 bg-secondary/40 p-6 text-center">
              <p className="font-display text-lg font-semibold text-secondary-foreground">Facebook video gallery</p>
              <p className="mt-2 text-sm text-secondary-foreground/70">Embed coming soon.</p>
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
        </div>
      </section>

      {/* Instruments */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-2xl font-bold">Traditional Instruments</h2>
        <p className="mt-1 text-sm text-muted-foreground">The voices that carry our story.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {instruments.map((i) => (
            <div key={i.id} className="rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lg">
              <h3 className="font-display text-lg font-bold text-foreground">{i.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{i.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {members.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
          <h2 className="font-display text-2xl font-bold">Meet the Ensemble</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((m) => (
              <div key={m.id} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                {m.photo
                  ? <img src={m.photo} alt={m.name} className="h-16 w-16 shrink-0 rounded-full object-cover" />
                  : <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-secondary text-primary font-display text-xl font-bold">{m.name.charAt(0)}</div>}
                <div>
                  <h3 className="font-display font-bold">{m.name}</h3>
                  <p className="text-xs text-primary">{m.role}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export { EnsemblePage };