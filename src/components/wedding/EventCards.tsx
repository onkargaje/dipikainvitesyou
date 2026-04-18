import { Reveal, SectionTitle } from "./Reveal";
import { events } from "@/lib/wedding";
import { Calendar, Clock, MapPin, Shirt } from "lucide-react";
import engagementBg from "@/assets/event-engagement.jpg";
import haldiBg from "@/assets/event-haldi.jpg";
import sangeetBg from "@/assets/event-sangeet.jpg";
import phereBg from "@/assets/event-phere.jpg";

const themeBg: Record<string, string> = {
  engagement: engagementBg,
  haldi: haldiBg,
  sangeet: sangeetBg,
  phere: phereBg,
};

export const EventCards = () => {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="container max-w-5xl">
        <Reveal>
          <SectionTitle
            eyebrow="Wedding Functions"
            title="The Celebrations"
            subtitle="Four magical evenings, woven together with love, laughter, and tradition."
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:gap-8">
          {events.map((e, i) => (
            <Reveal key={e.key} delay={i * 0.1} className="opacity-100 border-destructive-foreground border-none shadow-none rounded py-0 border-0">
              <article
                className="group relative w-full text-left rounded-3xl overflow-hidden border-gold/40 shadow-[0_15px_40px_-15px_hsl(var(--gold)/0.4)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_-15px_hsl(var(--gold)/0.6)] hover:border-gold/70 min-h-[420px] md:min-h-[520px] flex flex-col items-center justify-start border-0 opacity-100 px-6 py-10 md:px-16 md:py-16"
                style={{
                  backgroundImage: `url(${themeBg[e.theme]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Dark gradient for legibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black/70" />

                <div className="relative z-10 text-center text-secondary-foreground bg-transparent flex flex-col items-center justify-start w-full">
                  <p className="uppercase tracking-[0.4em] opacity-90 text-center text-secondary-foreground text-[0.7rem] md:text-sm">
                    Function 0{i + 1}
                  </p>
                  <h3 className="mt-2 mb-5 md:mb-6 drop-shadow-lg font-extrabold font-serif text-secondary-foreground text-3xl md:text-6xl">
                    {e.name}
                  </h3>

                  <ul className="space-y-2 md:space-y-2.5 inline-block text-left">
                    <Row icon={<Calendar className="h-4 w-4" />} value={e.date} />
                    <Row icon={<Clock className="h-4 w-4" />} value={e.time} />
                    <Row icon={<MapPin className="h-4 w-4" />} value={e.venue} />
                    {e.dress && e.dress.trim() && (
                      <Row icon={<Shirt className="h-4 w-4" />} value={e.dress} />
                    )}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Row = ({ icon, value }: { icon: React.ReactNode; value: string }) => (
  <li className="flex items-start gap-3 py-0">
    <span className="mt-1 opacity-90 text-gold">{icon}</span>
    <p className="font-serif leading-snug text-secondary-foreground font-extrabold text-left text-lg md:text-2xl whitespace-pre-line">{value}</p>
  </li>
);
