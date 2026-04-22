import { useEffect, useMemo, useState } from "react";

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  blur: number;
  opacity: number;
  drift: number;
  hue: number;
  rotateSpeed: number;
}

const PetalShape = ({ size, hue, glow = false }: { size: number; hue: number; glow?: boolean }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    aria-hidden="true"
    style={
      glow
        ? { filter: `drop-shadow(0 2px 4px hsl(${hue} 50% 60% / 0.35))` }
        : undefined
    }
  >
    <defs>
      <radialGradient id={`pg-${hue}-${size.toFixed(0)}-${glow ? "g" : "n"}`} cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor={`hsl(${hue}, 80%, 95%)`} />
        <stop offset="60%" stopColor={`hsl(${hue}, 65%, 84%)`} />
        <stop offset="100%" stopColor={`hsl(${hue}, 55%, 72%)`} />
      </radialGradient>
    </defs>
    <path
      d="M16 2 C22 6 28 12 26 22 C24 28 18 30 16 30 C14 30 8 28 6 22 C4 12 10 6 16 2 Z"
      fill={`url(#pg-${hue}-${size.toFixed(0)}-${glow ? "g" : "n"})`}
    />
  </svg>
);

interface FieldProps {
  count: number;
  layer: "bg" | "fg";
}

const Field = ({ count, layer }: FieldProps) => {
  const isBg = layer === "bg";
  const petals = useMemo<Petal[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 14,
        duration: isBg ? 22 + Math.random() * 15 : 10 + Math.random() * 12,
        size: isBg ? 26 + Math.random() * 30 : 10 + Math.random() * 18,
        blur: isBg ? 2 + Math.random() * 3 : Math.random() < 0.25 ? Math.random() * 1.2 : 0,
        opacity: isBg ? 0.2 + Math.random() * 0.2 : 0.55 + Math.random() * 0.3,
        drift: (Math.random() < 0.5 ? -1 : 1) * (40 + Math.random() * 140),
        hue: [350, 345, 355, 12, 340][Math.floor(Math.random() * 5)],
        rotateSpeed: 360 + Math.random() * 540,
      })),
    [count, isBg]
  );

  if (count === 0) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 overflow-hidden ${
        isBg ? "z-[1]" : "z-[60]"
      }`}
    >
      {petals.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            top: 0,
            left: `${p.left}%`,
            filter: p.blur ? `blur(${p.blur}px)` : undefined,
            animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
            // @ts-expect-error css var
            "--drift": `${p.drift}px`,
            "--op": p.opacity,
            "--rot": `${p.rotateSpeed}deg`,
            willChange: "transform, opacity",
          }}
        >
          <PetalShape size={p.size} hue={p.hue} glow={!isBg} />
        </div>
      ))}
    </div>
  );
};

export const PetalField = ({ density = 18 }: { density?: number }) => {
  const [counts, setCounts] = useState({ bg: Math.round(density * 0.6), fg: density });

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) setCounts({ bg: 0, fg: 0 });
    else if (isMobile)
      setCounts({ bg: Math.floor(density * 0.35), fg: Math.floor(density / 2) });
  }, [density]);

  return (
    <>
      <style>{`
        @keyframes petal-fall {
          0% { transform: translate3d(0, -10vh, 0) rotate(0deg); opacity: 0; }
          8% { opacity: var(--op, 0.7); }
          50% { opacity: var(--op, 0.7); }
          80% { opacity: calc(var(--op, 0.7) * 0.7); }
          100% { transform: translate3d(var(--drift, 60px), 110vh, 0) rotate(var(--rot, 540deg)); opacity: 0; }
        }
      `}</style>
      <Field count={counts.bg} layer="bg" />
      <Field count={counts.fg} layer="fg" />
    </>
  );
};

export const FloatingOrbs = () => (
  <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    <div className="absolute -top-32 -left-20 h-96 w-96 rounded-full bg-blush/40 blur-3xl animate-float-slow" />
    <div
      className="absolute top-1/3 -right-24 h-[28rem] w-[28rem] rounded-full bg-peach/30 blur-3xl animate-float-slow"
      style={{ animationDelay: "-5s" }}
    />
    <div
      className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-sage/25 blur-3xl animate-float-slow"
      style={{ animationDelay: "-9s" }}
    />
    <div
      className="absolute top-2/3 left-1/2 h-72 w-72 rounded-full bg-lavender/20 blur-3xl animate-float-slow"
      style={{ animationDelay: "-3s" }}
    />
  </div>
);
