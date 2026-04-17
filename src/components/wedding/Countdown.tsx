import { useEffect, useState } from "react";
import { Reveal, SectionTitle } from "./Reveal";
import { wedding } from "@/lib/wedding";

const calc = (target: Date) => {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff / 3600000) % 24),
    m: Math.floor((diff / 60000) % 60),
    s: Math.floor((diff / 1000) % 60),
  };
};

const Cell = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center min-w-[70px] md:min-w-[110px]">
    <div
      key={value}
      className="font-serif text-5xl md:text-7xl text-rose tabular-nums animate-fade-in"
      style={{ textShadow: "0 0 30px hsl(var(--gold) / 0.4)" }}
    >
      {String(value).padStart(2, "0")}
    </div>
    <span className="text-[0.65rem] md:text-xs uppercase tracking-[0.3em] text-muted-foreground mt-2">
      {label}
    </span>
  </div>
);

export const Countdown = () => {
  const target = new Date(wedding.date);
  const [t, setT] = useState(() => calc(target));

  useEffect(() => {
    const id = setInterval(() => setT(calc(target)), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="py-24 md:py-32 px-6 relative">
      <div className="container max-w-3xl">
        <Reveal>
          <SectionTitle eyebrow="Counting Down" title="Until We Say I Do" />
        </Reveal>
        <Reveal delay={0.2}>
          <div className="glass rounded-3xl p-8 md:p-14 text-center bg-grain">
            {t ? (
              <div className="flex justify-center gap-3 md:gap-8 flex-wrap">
                <Cell value={t.d} label="Days" />
                <span className="font-serif text-5xl md:text-7xl text-gold/40 self-start">·</span>
                <Cell value={t.h} label="Hours" />
                <span className="font-serif text-5xl md:text-7xl text-gold/40 self-start">·</span>
                <Cell value={t.m} label="Minutes" />
                <span className="font-serif text-5xl md:text-7xl text-gold/40 self-start">·</span>
                <Cell value={t.s} label="Seconds" />
              </div>
            ) : (
              <p className="font-script text-4xl md:text-6xl text-rose animate-pulse-glow inline-block px-8 py-4 rounded-full">
                The Celebration Begins 💍
              </p>
            )}
            <p className="mt-8 text-sm text-muted-foreground tracking-widest uppercase">
              {wedding.dateLabel} · {wedding.venueShort}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
