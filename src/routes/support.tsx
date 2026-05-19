import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Heart, Handshake, Users } from "lucide-react";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support / Get Involved — Asahene Foundation" },
      { name: "description", content: "Donate, sponsor Ghana Day 2025, volunteer or partner with Asahene Foundation." },
    ],
  }),
  component: SupportPage,
});

function SupportPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get Involved"
        title="Support our mission"
        subtitle="Your generosity preserves culture, builds youth and uplifts the less privileged in our communities."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Heart, k: "Donate", v: "Help us support the less privileged through our outreach programmes." },
            { icon: Handshake, k: "Sponsor Ghana Day 2025", v: "Become a corporate sponsor of our flagship South Australia event." },
            { icon: Users, k: "Volunteer", v: "Lend your time and skills to our productions and community work." },
          ].map((c) => (
            <div key={c.k} className="rounded-2xl border border-border bg-card p-7">
              <c.icon className="h-8 w-8 text-primary" />
              <h3 className="mt-4 font-display text-xl font-bold">{c.k}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary text-secondary-foreground">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-2xl font-bold">Donate</h2>
          <p className="mt-2 text-secondary-foreground/75">Choose an amount that's meaningful to you.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-4">
            {[25, 50, 100, 250].map((a) => (
              <button key={a} className="rounded-xl border border-primary/30 bg-secondary/40 px-4 py-6 text-center font-display text-2xl font-bold text-primary transition hover:bg-primary hover:text-primary-foreground">
                ${a}
              </button>
            ))}
          </div>
          <button className="mt-4 w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground hover:brightness-110">
            Continue to donate
          </button>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <FormCard
          title="Volunteer with us"
          fields={[
            { name: "name", label: "Full name", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "phone", label: "Phone", type: "tel" },
            { name: "skills", label: "Skills / areas of interest", required: true },
          ]}
          cta="Submit application"
        />
        <FormCard
          title="Partner inquiry"
          fields={[
            { name: "org", label: "Organization", required: true },
            { name: "contact", label: "Contact person", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "interest", label: "Partnership interest", required: true },
          ]}
          cta="Send inquiry"
        />
      </section>
    </>
  );
}

function FormCard({
  title, fields, cta,
}: {
  title: string;
  fields: { name: string; label: string; type?: string; required?: boolean }[];
  cta: string;
}) {
  const [done, setDone] = useState(false);
  return (
    <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
      <h3 className="font-display text-2xl font-bold">{title}</h3>
      {done ? (
        <p className="mt-6 rounded-xl border border-primary/30 bg-primary/10 p-5 text-center font-medium">Medaase! We'll be in touch soon.</p>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="mt-5 space-y-4">
          {fields.map((f) => (
            <label key={f.name} className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{f.label}</span>
              <input
                name={f.name}
                type={f.type ?? "text"}
                required={f.required}
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
            </label>
          ))}
          <button type="submit" className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground hover:brightness-110">
            {cta}
          </button>
        </form>
      )}
    </div>
  );
}