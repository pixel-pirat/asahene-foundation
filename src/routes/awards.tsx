import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { WorldMap } from "@/components/WorldMap";
import { Trophy } from "lucide-react";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/awards")({
  head: () => ({
    meta: [
      { title: "Awards & Recognition — Asahene Foundation" },
      { name: "description", content: "International festivals, awards and recognition spanning four continents." },
    ],
  }),
  component: AwardsPage,
});

function AwardsPage() {
  const awards = useStore((d) => [...d.awards].sort((a, b) => Number(b.year) - Number(a.year)));
  const countries = useStore((d) => d.countries);
  return (
    <>
      <PageHeader
        eyebrow="Honors"
        title="Awards & International Recognition"
        subtitle="A decade of excellence across the world's premier traditional music stages."
      />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-2xl font-bold">Timeline</h2>
        <div className="mt-8 relative border-l-2 border-primary/30 pl-8">
          {awards.map((a) => (
            <div key={a.id} className="relative mb-8 last:mb-0">
              <span className="absolute -left-[42px] grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground shadow">
                <Trophy className="h-4 w-4" />
              </span>
              <div className="rounded-2xl border border-border bg-card p-5 transition hover:border-primary/50 hover:shadow-lg">
                <p className="font-display text-sm font-bold text-primary">{a.year}</p>
                <h3 className="mt-1 font-display text-lg font-bold">{a.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary text-secondary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Worldwide</p>
          <h2 className="mt-2 font-display text-3xl font-bold">Festivals & Countries</h2>
          <p className="mt-2 max-w-2xl text-secondary-foreground/75">
            Asahene / Amamere has performed across {countries.length} countries — bringing Ghanaian traditional arts to international audiences.
          </p>
          <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
            <WorldMap />
            <div className="rounded-2xl border border-primary/20 bg-secondary/40 p-6">
              <h3 className="font-display text-lg font-bold">Where we've performed</h3>
              <ul className="mt-4 grid grid-cols-2 gap-y-2 text-sm text-secondary-foreground/85">
                {countries.map((c) => (
                  <li key={c.id} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {c.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}