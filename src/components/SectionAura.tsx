type Variant = "blue" | "violet" | "cyan" | "amber" | "emerald" | "rose";

const palette: Record<Variant, { a: string; b: string; grid: string }> = {
  blue:    { a: "hsl(217 91% 60% / 0.18)", b: "hsl(197 71% 47% / 0.14)", grid: "rgba(59,130,246,0.08)" },
  violet:  { a: "hsl(270 91% 65% / 0.18)", b: "hsl(217 91% 60% / 0.12)", grid: "rgba(168,85,247,0.08)" },
  cyan:    { a: "hsl(190 90% 55% / 0.20)", b: "hsl(217 91% 60% / 0.12)", grid: "rgba(34,211,238,0.10)" },
  amber:   { a: "hsl(38 92% 55% / 0.18)",  b: "hsl(20 90% 55% / 0.12)",  grid: "rgba(245,158,11,0.08)" },
  emerald: { a: "hsl(160 84% 45% / 0.18)", b: "hsl(190 90% 50% / 0.12)", grid: "rgba(16,185,129,0.08)" },
  rose:    { a: "hsl(340 85% 60% / 0.18)", b: "hsl(270 91% 60% / 0.12)", grid: "rgba(244,63,94,0.08)" },
};

const SectionAura = ({ variant = "blue", grid = true }: { variant?: Variant; grid?: boolean }) => {
  const p = palette[variant];
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        className="absolute -top-32 -left-32 w-[55%] h-[55%] rounded-full blur-3xl animate-future-float"
        style={{ background: p.a }}
      />
      <div
        className="absolute -bottom-40 -right-20 w-[55%] h-[55%] rounded-full blur-3xl animate-future-float"
        style={{ background: p.b, animationDelay: "1.5s" }}
      />
      {grid && (
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `linear-gradient(${p.grid} 1px, transparent 1px), linear-gradient(90deg, ${p.grid} 1px, transparent 1px)`,
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
          }}
        />
      )}
    </div>
  );
};

export default SectionAura;
