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
}

const PetalShape = ({ size, hue }: { size: number; hue: number }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true">
    <defs>
      <radialGradient id={`pg-${hue}`} cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor={`hsl(${hue}, 70%, 92%)`} />
        <stop offset="60%" stopColor={`hsl(${hue}, 60%, 82%)`} />
        <stop offset="100%" stopColor={`hsl(${hue}, 55%, 72%)`} />
      </radialGradient>
    </defs>
    <path
      d="M16 2 C22 6 28 12 26 22 C24 28 18 30 16 30 C14 30 8 28 6 22 C4 12 10 6 16 2 Z"
      fill={`url(#pg-${hue})`}
    />
  </svg>
);

export const PetalField = ({ density = 18 }: { density?: number }) => {
  const [count, setCount] = useState(density);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) setCount(0);
    else if (isMobile) setCount(Math.floor(density / 2.2));
  }, [density]);

  const petals = useMemo<Petal[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 14 + Math.random() * 14,
        size: 14 + Math.random() * 22,
        blur: Math.random() < 0.4 ? Math.random() * 2 : 0,
        opacity: 0.4 + Math.random() * 0.5,
        drift: 40 + Math.random() * 120,
        hue: [350, 345, 355, 12, 340][Math.floor(Math.random() * 5)],
      })),
    [count]
  );

  if (count === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
    >
      <style>{`
        @keyframes petal-fall {
          0% { transform: translate3d(0, -10vh, 0) rotate(0deg); opacity: 0; }
          10% { opacity: var(--op, 0.7); }
          90% { opacity: var(--op, 0.7); }
          100% { transform: translate3d(var(--drift, 60px), 110vh, 0) rotate(540deg); opacity: 0; }
        }
      `}</style>
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
            willChange: "transform, opacity",
          }}
        >
          <PetalShape size={p.size} hue={p.hue} />
        </div>
      ))}
    </div>
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
