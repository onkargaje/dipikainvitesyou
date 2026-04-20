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
    <section className="py-16 md:py-24 px-4 md:px-6">
      <div className="container max-w-5xl">
        <Reveal>
          <SectionTitle
            eyebrow="Wedding Functions"
            title="The Celebrations"
            subtitle="Four magical events, woven together with love, laughter and tradition."
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:gap-8">
          {events.map((e, i) => (
            <Reveal key={e.key} delay={i * 0.1} className="opacity-100">
              <article
                className={`group relative w-full text-left rounded-3xl overflow-hidden shadow-[0_15px_40px_-15px_hsl(var(--gold)/0.4)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_-15px_hsl(var(--gold)/0.6)] aspect-[3/4] max-w-md mx-auto w-full flex flex-col items-center justify-start px-6 py-12 md:px-16 md:py-20 bg-cream animate-float-delay-${i % 4}`}
                style={{
                  backgroundImage: `url(${themeBg[e.theme]})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {/* Dark gradient for legibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 opacity-0 py-0 px-0" />

                <div className="relative z-10 text-center w-full flex-col flex items-center justify-start py-0 mx-auto">
                  <div className="bg-transparent rounded-2xl px-5 py-6 md:px-8 md:py-8 max-w-sm">
                    <p className="uppercase tracking-[0.4em] text-rose/80 text-[0.65rem] md:text-sm">
                      Function 0{i + 1}
                    </p>
                    <h3 className="mt-2 mb-5 md:mb-6 font-extrabold font-serif text-rose md:text-6xl text-3xl">
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
    <span className="mt-1 text-gold-deep">{icon}</span>
    <p className="font-serif leading-snug font-semibold md:text-lg whitespace-pre-line text-left text-foreground text-xs">{value}</p>
  </li>
);
