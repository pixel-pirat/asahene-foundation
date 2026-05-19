import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import drumsImg from "@/assets/drums.jpg";
import xyloImg from "@/assets/xylophone.jpg";
import ensembleImg from "@/assets/ensemble.jpg";
import festivalImg from "@/assets/festival.jpg";
import heroImg from "@/assets/hero-dance.jpg";

export const Route = createFileRoute("/ensemble")({
  head: () => ({
    meta: [
      { title: "Cultural Ensemble — Asahene Foundation" },
      { name: "description", content: "Formerly Amamere Folk Music & Dance Ensemble — gallery, instruments and performance reel." },
    ],
  }),
  component: EnsemblePage,
});

const instruments = [
  { name: "Atumpan (Talking Drums)", desc: "Twin master drums voicing proverbs and royal speech." },
  { name: "Djembe", desc: "Goblet hand drum carrying rhythm and energy." },
  { name: "Gyil (Xylophone)", desc: "Wooden Dagara/Lobi xylophone with calabash resonators." },
  { name: "Kpanlogo Drum", desc: "Conical Ga drum at the heart of urban folk dance." },
  { name: "Dawuro (Bell)", desc: "Forged iron bell that anchors the polyrhythm." },
  { name: "Shekere", desc: "Gourd shaker wrapped in beaded netting." },
];

export default function EnsemblePage() {
  const gallery = [heroImg, drumsImg, ensembleImg, xyloImg, festivalImg, heroImg];
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
          {gallery.map((src, i) => (
            <div key={i} className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-muted">
              <img
                src={src}
                alt={`Ensemble photo ${i + 1}`}
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
              <iframe
                title="Asahene Foundation playlist"
                className="h-full w-full"
                src="https://www.youtube.com/embed/videoseries?list=PLJAPanOB1rkGzTeBMRBvmVseDqujYJFP1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
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
            <div key={i.name} className="rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lg">
              <h3 className="font-display text-lg font-bold text-foreground">{i.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{i.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export { EnsemblePage };