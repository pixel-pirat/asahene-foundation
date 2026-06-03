import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { useStore } from "@/lib/store";

// Compressed real photos
import perf1 from "@/assets/photos/performance-1.jpg";
import perf2 from "@/assets/photos/performance-2.jpg";
import perf3 from "@/assets/photos/performance-3.jpg";
import event1 from "@/assets/photos/event-1.jpg";
import event2 from "@/assets/photos/event-2.jpg";
import ensembleImg from "@/assets/photos/ensemble.jpg";
import g1 from "@/assets/photos/gallery-1.jpg";
import g2 from "@/assets/photos/gallery-2.jpg";
import g3 from "@/assets/photos/gallery-3.jpg";
import g4 from "@/assets/photos/gallery-4.jpg";
import g5 from "@/assets/photos/gallery-5.jpg";
import g6 from "@/assets/photos/gallery-6.jpg";

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
  { id: "d1", url: perf3, alt: "Asahene performers on stage" },
  { id: "d2", url: perf1, alt: "Traditional dance performance" },
  { id: "d3", url: ensembleImg, alt: "The ensemble" },
  { id: "d4", url: event1, alt: "Ghana Day event" },
  { id: "d5", url: perf2, alt: "Cultural performance" },
  { id: "d6", url: event2, alt: "Festival celebration" },
  { id: "d7", url: g1, alt: "Ensemble rehearsal" },
  { id: "d8", url: g2, alt: "Traditional costume" },
  { id: "d9", url: g3, alt: "Dance showcase" },
  { id: "d10", url: g4, alt: "Stage performance" },
  { id: "d11", url: g5, alt: "Community event" },
  { id: "d12", url: g6, alt: "Cultural gathering" },
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
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
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

      {/* Videos */}
      <section className="bg-secondary text-secondary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-2xl font-bold mb-8">Performances</h2>
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Local video 1 */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">Live Performance</p>
              <div className="overflow-hidden rounded-xl border border-primary/20">
                <video
                  controls
                  playsInline
                  poster={perf3}
                  className="w-full aspect-video bg-secondary/60"
                >
                  <source src="/videos/performance-1.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            {/* Local video 2 */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">Cultural Showcase</p>
              <div className="overflow-hidden rounded-xl border border-primary/20">
                <video
                  controls
                  playsInline
                  poster={event1}
                  className="w-full aspect-video bg-secondary/60"
                >
                  <source src="/videos/performance-2.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            {/* YouTube playlist */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">YouTube Playlist</p>
              <div className="aspect-video overflow-hidden rounded-xl border border-primary/20">
                {youtubeVideo ? (
                  <iframe
                    title={youtubeVideo.title}
                    className="h-full w-full"
                    src={youtubeVideo.embedUrl}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center text-sm text-secondary-foreground/60 bg-secondary/40">
                    No video set yet.
                  </div>
                )}
              </div>
            </div>

            {/* Facebook link */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">Facebook Videos</p>
              <div className="flex aspect-video flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary/30 bg-secondary/40 p-6 text-center">
                <p className="font-display text-lg font-semibold text-secondary-foreground">More on Facebook</p>
                <p className="mt-2 text-sm text-secondary-foreground/70">Our full video archive lives on our Facebook page.</p>
                <a
                  href="https://www.facebook.com/Anamereconcepts/media_set?set=vb.1496125267&type=2"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:brightness-110 transition"
                >
                  Open on Facebook
                </a>
              </div>
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

      {/* Members */}
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
