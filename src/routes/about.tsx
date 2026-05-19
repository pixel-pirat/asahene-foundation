import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Award, ScrollText, UserCircle2 } from "lucide-react";

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
            <p>The group was founded in <strong className="text-foreground">2006</strong> as the <em>Amamere Folks Music and Dance Ensemble</em>, dedicated to performing and preserving Ghana's rich traditional repertoire.</p>
            <p>On <strong className="text-foreground">June 25, 2023</strong>, after the passing of our mentor and friend <strong className="text-foreground">Evans Badu</strong>, the ensemble was renamed <strong className="text-foreground">Asahene Foundation</strong> — a tribute to his vision and a renewed commitment to community service.</p>
            <p>Today the Foundation operates as a registered Ghanaian non-profit, working at home and across the diaspora.</p>
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
            <h3 className="font-display text-3xl font-bold text-primary">Lawrence Quaye</h3>
            <p className="mt-1 text-sm uppercase tracking-wider text-secondary-foreground/70">Director • Dance Instructor</p>
            <p className="mt-5 leading-relaxed text-secondary-foreground/85">
              Lawrence Quaye serves as the Director of Asahene Foundation and is a
              respected Dance Instructor at <strong>Knutsford University College</strong>.
              He leads the artistic direction of the ensemble and represents the
              Foundation at national and international engagements.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <ScrollText className="mt-1 h-7 w-7 text-primary" />
            <div>
              <h2 className="font-display text-2xl font-bold">Legal Status</h2>
              <p className="mt-2 text-muted-foreground">
                Legally incorporated in Ghana under the <strong className="text-foreground">Companies Act, 1963 (Act 179)</strong> on <strong className="text-foreground">December 12, 2018</strong>, as a company limited by guarantee.
              </p>
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
          {["MUSIGA Ghana", "Knutsford University College", "Ghana Music Awards UK", "Diaspora Cultural Partners"].map((a) => (
            <div key={a} className="rounded-xl border border-border bg-card p-5 text-center text-sm font-medium hover:border-primary/50 transition">
              {a}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}