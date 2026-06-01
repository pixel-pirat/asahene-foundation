import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Award, ScrollText, UserCircle2 } from "lucide-react";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Asahene Foundation" },
      { name: "description", content: "Our history, director, legal status and affiliations." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const about = useStore((d) => d.settings.about);
  const affiliations = useStore((d) => d.affiliations);
  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        title="From Amamere to Asahene"
        subtitle="A legacy of Ghanaian music and dance, rooted in 2006 and renewed in 2023 in honor of our late mentor, Evans Badu."
      />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">History</p>
            <h2 className="mt-2 font-display text-3xl font-bold">The Journey</h2>
          </div>
          <div className="space-y-5 text-muted-foreground">
            {about.history.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </section>

      <section className="bg-secondary text-secondary-foreground">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <UserCircle2 className="h-10 w-10 text-primary" />
            <h2 className="mt-3 font-display text-2xl font-bold">Director</h2>
          </div>
          <div className="lg:col-span-2">
            <h3 className="font-display text-3xl font-bold text-primary">{about.directorName}</h3>
            <p className="mt-1 text-sm uppercase tracking-wider text-secondary-foreground/70">{about.directorRole}</p>
            <p className="mt-5 leading-relaxed text-secondary-foreground/85">{about.directorBio}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <ScrollText className="mt-1 h-7 w-7 text-primary" />
            <div>
              <h2 className="font-display text-2xl font-bold">Legal Status</h2>
              <p className="mt-2 text-muted-foreground">{about.legalBody}</p>
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {["Certificate of Incorporation", "Certificate to Commence Business"].map((c) => (
              <div key={c} className="flex aspect-[4/3] flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary/40 bg-secondary/5 p-6 text-center">
                <Award className="h-10 w-10 text-primary" />
                <p className="mt-3 font-display text-base font-semibold">{c}</p>
                <p className="mt-1 text-xs text-muted-foreground">Asahene Foundation — Dec 12, 2018</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        <h2 className="font-display text-2xl font-bold">Affiliations</h2>
        <p className="mt-2 text-muted-foreground">Proud member and collaborator with leading cultural and educational bodies.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {affiliations.map((a) => (
            <div key={a.id} className="rounded-xl border border-border bg-card p-5 text-center text-sm font-medium hover:border-primary/50 transition">
              {a.name}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}