import { useStore } from "@/lib/store";

export function WorldMap() {
  const countries = useStore((d) => d.countries);
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-secondary p-6 shadow-inner">
      <div className="relative w-full" style={{ aspectRatio: "2 / 1" }}>
        <svg viewBox="0 0 100 50" className="absolute inset-0 h-full w-full opacity-30">
          <g fill="oklch(0.76 0.13 85)">
            <ellipse cx="22" cy="18" rx="14" ry="7" />
            <ellipse cx="25" cy="32" rx="6" ry="9" />
            <ellipse cx="33" cy="38" rx="6" ry="10" />
            <ellipse cx="52" cy="18" rx="14" ry="7" />
            <ellipse cx="52" cy="32" rx="10" ry="11" />
            <ellipse cx="75" cy="22" rx="16" ry="9" />
            <ellipse cx="82" cy="40" rx="6" ry="5" />
          </g>
        </svg>
        {countries.map((c) => (
          <div
            key={c.name}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${c.cx}%`, top: `${c.cy}%` }}
          >
            <span
              className={`block rounded-full ring-2 ring-background/40 ${
                c.home
                  ? "h-4 w-4 bg-primary animate-pulse"
                  : "h-3 w-3 bg-[var(--flag-red)] hover:scale-150 transition-transform"
              }`}
            />
            <span className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded bg-background px-2 py-0.5 text-[10px] font-medium text-foreground opacity-0 shadow group-hover:opacity-100 transition">
              {c.name}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-secondary-foreground/70">
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-primary" /> Home (Ghana)</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-[var(--flag-red)]" /> Performed</span>
        <span className="ml-auto">{countries.length} countries</span>
      </div>
    </div>
  );
}