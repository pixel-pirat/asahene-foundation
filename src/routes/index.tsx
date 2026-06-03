import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import heroImg from "@/assets/photos/performance-3.jpg";
import { useStore } from "@/lib/store";

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
  const settings = useStore((d) => d.settings);
  const { hero, event, mission } = settings;
  const { days, hours, minutes, seconds } = useCountdown(new Date(event.dateISO));
  const heroSrc = hero.heroImage || heroImg;

  return (
    <>
      {/* Hero — video background with image fallback */}
      <section className="relative isolate overflow-hidden min-h-[75vh] flex items-end">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={heroSrc}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/performance-1.mp4" type="video/mp4" />
          {/* fallback for when video isn't available (e.g. after CDN upload) */}
          <img src={heroSrc} alt="Asahene Foundation dancers performing" className="h-full w-full object-cover" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/75 via-secondary/60 to-secondary/95" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start px-4 py-28 sm:px-6 sm:py-36 lg:py-44 w-full">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-secondary/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            {hero.eyebrow}
          </span>
          <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.05] text-secondary-foreground sm:text-5xl lg:text-7xl">
            {hero.titleA}{" "}
            <span className="text-gradient-gold">{hero.titleB}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-secondary-foreground/85 sm:text-lg">
            {hero.subtitle}
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
        <div className="kente-stripe h-1.5 w-full absolute bottom-0 left-0" />
      </section>

      {/* Countdown */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="rounded-2xl border border-primary/30 bg-card p-6 shadow-sm sm:p-8">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Countdown</p>
                <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl">{event.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{new Date(event.dateISO).toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
              </div>
              <div className="grid w-full grid-cols-4 gap-2 sm:w-auto sm:gap-3">
                {[
                  { label: "Days", value: days },
                  { label: "Hours", value: hours },
                  { label: "Min", value: minutes },
                  { label: "Sec", value: seconds },
                ].map((u) => (
                  <div key={u.label} className="rounded-xl bg-secondary px-3 py-3 text-center text-secondary-foreground sm:px-5 sm:py-4">
                    <div className="font-display text-2xl font-bold text-primary sm:text-3xl tabular-nums">{String(u.value).padStart(2, "0")}</div>
                    <div className="text-[10px] uppercase tracking-wider text-secondary-foreground/70">{u.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission + performance photo */}
      <section className="bg-background">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{mission.eyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{mission.heading}</h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{mission.body1}</p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{mission.body2}</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {mission.stats.map((s) => (
              <div key={s.v} className="rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:shadow-lg">
                <div className="h-1 w-8 rounded-full bg-primary" />
                <div className="mt-4 font-display text-3xl font-bold">{s.k}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance highlights — real photos */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <h2 className="font-display text-2xl font-bold">Highlights</h2>
        <p className="mt-1 text-sm text-muted-foreground">The ensemble in action.</p>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
          {[
            { src: "/src/assets/photos/performance-1.jpg", label: "Performance" },
            { src: "/src/assets/photos/event-1.jpg", label: "Ghana Day" },
            { src: "/src/assets/photos/gallery-4.jpg", label: "Ensemble" },
            { src: "/src/assets/photos/performance-2.jpg", label: "Performance" },
            { src: "/src/assets/photos/event-2.jpg", label: "Event" },
            { src: "/src/assets/photos/gallery-8.jpg", label: "Celebration" },
          ].map((img) => (
            <div key={img.src} className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-muted">
              <img
                src={img.src}
                alt={img.label}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </section>

      {/* Inline performance video */}
      <section className="bg-secondary text-secondary-foreground">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Watch</p>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">See us perform</h2>
            <p className="text-secondary-foreground/70 max-w-lg">Traditional music, dance and theatre arts — live and in full colour.</p>
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-primary/20 shadow-xl">
            <video
              controls
              playsInline
              poster="/src/assets/photos/performance-3.jpg"
              className="w-full aspect-video bg-secondary"
            >
              <source src="/videos/performance-2.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="relative overflow-hidden bg-secondary border-t border-secondary-foreground/10">
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
