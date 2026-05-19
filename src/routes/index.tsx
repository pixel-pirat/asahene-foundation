import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Award, Globe2, Heart, Music2 } from "lucide-react";
import heroImg from "@/assets/hero-dance.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Asahene Foundation — Preserving Ghanaian Culture" },
      { name: "description", content: "Ghanaian cultural ensemble preserving theatre arts, music and dance. Join us for Ghana Day 2025 in South Australia." },
    ],
  }),
  component: Index,
});

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function Index() {
  const { days, hours, minutes, seconds } = useCountdown(new Date("2025-04-21T00:00:00+09:30"));

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt="Asahene Foundation dancers performing in kente"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/85 via-secondary/70 to-secondary/95" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start px-4 py-28 sm:px-6 sm:py-36 lg:py-44">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-secondary/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Est. 2006 • Renamed 2023
          </span>
          <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.05] text-secondary-foreground sm:text-5xl lg:text-7xl">
            Preserving Ghanaian Culture Through{" "}
            <span className="text-gradient-gold">Music & Dance</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-secondary-foreground/85 sm:text-lg">
            Asahene Foundation — Honoring Our Roots, Building Our Future.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/ensemble" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition hover:brightness-110">
              Explore Our Ensemble <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/ghana-day" className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-secondary/40 px-6 py-3 text-sm font-semibold text-secondary-foreground backdrop-blur hover:bg-secondary/70">
              Support Ghana Day 2025
            </Link>
          </div>
        </div>
        <div className="kente-stripe h-1.5 w-full" />
      </section>

      {/* Countdown */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="rounded-2xl border border-primary/30 bg-card p-6 shadow-sm sm:p-8">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Countdown</p>
                <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl">
                  Ghana Day 2025 — South Australia
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">Easter Monday, 21 April 2025</p>
              </div>
              <div className="grid w-full grid-cols-4 gap-2 sm:w-auto sm:gap-3">
                {[
                  { label: "Days", value: days },
                  { label: "Hours", value: hours },
                  { label: "Min", value: minutes },
                  { label: "Sec", value: seconds },
                ].map((u) => (
                  <div key={u.label} className="rounded-xl bg-secondary px-3 py-3 text-center text-secondary-foreground sm:px-5 sm:py-4">
                    <div className="font-display text-2xl font-bold text-primary sm:text-3xl tabular-nums">
                      {String(u.value).padStart(2, "0")}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-secondary-foreground/70">{u.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-background">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our Mission</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              Honoring tradition. Touching lives.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Asahene Foundation exists to preserve Ghanaian culture at home and
              abroad — through authentic music, dance and theatre arts — while
              touching lives and supporting the less privileged in our communities.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Founded in 2006 as the Amamere Folks Music and Dance Ensemble and
              renamed in 2023 in honor of our mentor, the late Evans Badu, we
              carry our heritage forward with pride.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { icon: Music2, k: "2006", v: "Founded as Amamere" },
              { icon: Globe2, k: "15+", v: "Countries performed" },
              { icon: Award, k: "6+", v: "Major awards won" },
              { icon: Heart, k: "100s", v: "Lives touched yearly" },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:shadow-lg">
                <s.icon className="h-6 w-6 text-primary" />
                <div className="mt-4 font-display text-3xl font-bold">{s.k}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="relative overflow-hidden bg-secondary">
        <div className="kente-stripe h-1.5 w-full" />
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-14 sm:px-6 md:flex-row">
          <div>
            <h3 className="font-display text-2xl font-bold text-secondary-foreground sm:text-3xl">
              Bring Ghanaian heritage to your stage.
            </h3>
            <p className="mt-2 text-secondary-foreground/70">Book performances, workshops, or partner with us.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/contact" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:brightness-110">Book the ensemble</Link>
            <Link to="/support" className="rounded-full border border-primary/40 px-6 py-3 text-sm font-semibold text-secondary-foreground hover:bg-secondary-foreground/5">Become a partner</Link>
          </div>
        </div>
      </section>
    </>
  );
}
