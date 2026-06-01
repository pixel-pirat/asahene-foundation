import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { CalendarDays, Crown, MapPin } from "lucide-react";
import { useStore, addSubmission } from "@/lib/store";

export const Route = createFileRoute("/ghana-day")({
  head: () => ({
    meta: [
      { title: "Ghana Day 2025 — South Australia | Asahene Foundation" },
      { name: "description", content: "Easter Monday, 21 April 2025. Annual celebration of Ghanaian heritage in South Australia." },
    ],
  }),
  component: GhanaDayPage,
});

function GhanaDayPage() {
  const event = useStore((d) => d.settings.event);
  const lineup = useStore((d) => d.lineup);
  const [submitted, setSubmitted] = useState(false);
  const date = new Date(event.dateISO);
  return (
    <>
      <PageHeader
        eyebrow="Featured Event"
        title={event.name}
        subtitle={event.description}
      />

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 md:grid-cols-3">
        {[
          { icon: CalendarDays, k: "Date", v: date.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long", year: "numeric" }) },
          { icon: MapPin, k: "Location", v: event.location },
          { icon: Crown, k: "Highlight", v: event.highlight },
        ].map((c) => (
          <div key={c.k} className="rounded-2xl border border-border bg-card p-6">
            <c.icon className="h-7 w-7 text-primary" />
            <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{c.k}</p>
            <p className="font-display text-xl font-bold">{c.v}</p>
          </div>
        ))}
      </section>

      <section className="bg-secondary text-secondary-foreground">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <div className="flex items-center gap-3">
            <Crown className="h-8 w-8 text-primary" />
            <h2 className="font-display text-3xl font-bold">Traditional Ruler of the Year</h2>
          </div>
          <p className="mt-4 leading-relaxed text-secondary-foreground/85">
            Each year, attendees and patrons of Ghana Day will appoint a
            <strong className="text-primary"> Traditional Ruler of the Year</strong> — a
            person who embodies the values of Ghanaian heritage, community and
            service. The honoree presides over the day's ceremonies and
            represents the Foundation in cultural matters across the year.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-2xl font-bold">Program Lineup</h2>
        <p className="mt-1 text-sm text-muted-foreground">To be announced.</p>
        <div className="mt-6 space-y-3">
          {lineup.map((p, i) => (
            <div key={p.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 font-display font-bold text-primary">{i + 1}</span>
              <span className="font-medium">{p.label}</span>
              <span className="ml-auto text-xs text-muted-foreground">{p.note}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
          <div className="rounded-2xl border border-primary/30 bg-card p-8 shadow-md">
            <h2 className="font-display text-2xl font-bold">Register Your Interest</h2>
            <p className="mt-1 text-sm text-muted-foreground">We'll be in touch with full event details and tickets.</p>
            {submitted ? (
              <div className="mt-6 rounded-xl border border-primary/40 bg-primary/10 p-6 text-center">
                <p className="font-display text-lg font-semibold">Akwaaba! Thank you for registering.</p>
                <p className="mt-1 text-sm text-muted-foreground">We'll email you soon with next steps.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const data: Record<string, string> = {};
                  fd.forEach((v, k) => (data[k] = String(v)));
                  addSubmission("registration", data);
                  setSubmitted(true);
                }}
                className="mt-6 grid gap-4 sm:grid-cols-2"
              >
                <Field label="Full name" name="name" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone" name="phone" type="tel" />
                <Field label="Number of attendees" name="attendees" type="number" min={1} defaultValue={1} required />
                <div className="sm:col-span-2"><Field label="Country" name="country" required /></div>
                <button
                  type="submit"
                  className="sm:col-span-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
                >
                  Register Your Interest
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <input
        {...props}
        className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
      />
    </label>
  );
}