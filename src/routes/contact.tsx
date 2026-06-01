import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Facebook, Mail, Phone, Youtube } from "lucide-react";
import { useStore, addSubmission } from "@/lib/store";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Asahene Foundation" },
      { name: "description", content: "Get in touch, book the ensemble or send us a message." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const contact = useStore((d) => d.settings.contact);
  const director = useStore((d) => d.settings.about);
  const [tab, setTab] = useState<"general" | "booking">("general");
  const [done, setDone] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Contact Asahene Foundation"
        subtitle="We'd love to hear from you — for bookings, partnerships, press or general inquiries."
      />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_2fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Director</p>
            <h3 className="mt-1 font-display text-xl font-bold">{director.directorName}</h3>
            <p className="text-sm text-muted-foreground">{director.directorRole}</p>
            <div className="mt-4 space-y-2 text-sm">
              <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> {contact.email}</p>
              <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> {contact.phone}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Follow</p>
            <div className="mt-3 flex gap-3">
              <a href={contact.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-primary hover:bg-primary hover:text-primary-foreground transition">
                <Facebook className="h-4 w-4" />
              </a>
              <a href={contact.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-primary hover:bg-primary hover:text-primary-foreground transition">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="mb-6 inline-flex rounded-full border border-border bg-secondary p-1 text-sm">
            <button onClick={() => { setTab("general"); setDone(false); }} className={`rounded-full px-4 py-2 font-semibold transition ${tab === "general" ? "bg-primary text-primary-foreground" : "text-secondary-foreground/80"}`}>
              General Inquiry
            </button>
            <button onClick={() => { setTab("booking"); setDone(false); }} className={`rounded-full px-4 py-2 font-semibold transition ${tab === "booking" ? "bg-primary text-primary-foreground" : "text-secondary-foreground/80"}`}>
              Booking Request
            </button>
          </div>

          {done ? (
            <div className="rounded-xl border border-primary/30 bg-primary/10 p-6 text-center">
              <p className="font-display text-lg font-semibold">Akwaaba! Message received.</p>
              <p className="mt-1 text-sm text-muted-foreground">We'll respond within 2–3 business days.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const data: Record<string, string> = {};
                fd.forEach((v, k) => (data[k] = String(v)));
                addSubmission(tab === "booking" ? "booking" : "contact", data);
                setDone(true);
              }}
              className="grid gap-4 sm:grid-cols-2"
            >
              <Input label="Full name" name="name" required />
              <Input label="Email" name="email" type="email" required />
              {tab === "booking" ? (
                <>
                  <Input label="Event type" name="type" required />
                  <Input label="Preferred date" name="date" type="date" required />
                  <div className="sm:col-span-2"><Input label="Venue / location" name="venue" required /></div>
                  <div className="sm:col-span-2">
                    <Textarea label="Tell us about your event" name="message" required />
                  </div>
                </>
              ) : (
                <>
                  <div className="sm:col-span-2"><Input label="Subject" name="subject" required /></div>
                  <div className="sm:col-span-2"><Textarea label="Message" name="message" required /></div>
                </>
              )}
              <button type="submit" className="sm:col-span-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground hover:brightness-110">
                Send message
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

function Input({ label, ...p }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <input {...p} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30" />
    </label>
  );
}
function Textarea({ label, ...p }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <textarea rows={5} {...p} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30" />
    </label>
  );
}