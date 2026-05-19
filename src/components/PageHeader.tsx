export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-secondary text-secondary-foreground">
      <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_30%_20%,var(--gold),transparent_60%),radial-gradient(circle_at_80%_70%,var(--flag-red),transparent_55%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-secondary-foreground/75 sm:text-lg">
            {subtitle}
          </p>
        )}
      </div>
      <div className="kente-stripe h-1.5 w-full" />
    </section>
  );
}