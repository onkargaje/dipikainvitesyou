import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, SectionTitle } from "./Reveal";
import { events } from "@/lib/wedding";
import { Calendar, Clock, MapPin, Shirt, X } from "lucide-react";
import engagementBg from "@/assets/event-engagement.jpg";
import haldiBg from "@/assets/event-haldi.jpg";
import sangeetBg from "@/assets/event-sangeet.jpg";
import phereBg from "@/assets/event-phere.jpg";
import varmalaBg from "@/assets/event-varmala.jpg";

const themeBg: Record<string, string> = {
  engagement: engagementBg,
  haldi: haldiBg,
  sangeet: sangeetBg,
  phere: phereBg,
  varmala: varmalaBg,
};

type EventItem = (typeof events)[number];

export const EventCards = () => {
  const [active, setActive] = useState<EventItem | null>(null);

  return (
    <section className="py-12 md:py-20 px-4 md:px-6">
      <div className="container max-w-5xl">
        <Reveal>
          <SectionTitle
            eyebrow="Wedding Functions"
            title="The Celebrations"
            subtitle="Magical events, woven together with love, laughter and tradition."
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:gap-8">
          {events.map((e, i) => {
            const floatClass = ["animate-float", "animate-float-delay-1", "animate-float-delay-2", "animate-float-delay-3"][i % 4];
            return (
              <Reveal key={e.key} delay={i * 0.08} className="opacity-100">
                <button
                  type="button"
                  onClick={() => setActive(e)}
                  className={`group relative w-full text-left rounded-3xl overflow-hidden shadow-[0_15px_40px_-15px_hsl(var(--gold)/0.4)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_-15px_hsl(var(--gold)/0.6)] aspect-[3/4] max-w-md mx-auto flex flex-col items-center justify-start px-6 py-12 md:px-16 md:py-20 bg-cream ${floatClass}`}
                  style={{
                    backgroundImage: `url(${themeBg[e.theme]})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  aria-label={`Open ${e.name} details`}
                >
                  <div className="relative z-10 text-center w-full flex-col flex items-center justify-start">
                    <div className="bg-transparent rounded-2xl px-5 py-6 md:px-8 md:py-8 max-w-sm">
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
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Pop-out modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[90] flex items-center justify-center px-4 py-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(ev) => ev.stopPropagation()}
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-cream shadow-[0_30px_80px_-20px_hsl(var(--gold)/0.7)] glow-rose"
              style={{
                backgroundImage: `url(${themeBg[active.theme]})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full bg-cream/90 hover:bg-cream flex items-center justify-center text-rose shadow-md transition-transform hover:scale-110"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative z-[1] px-8 py-12 md:px-12 md:py-16 text-center">
                <p className="uppercase tracking-[0.4em] text-rose/70 text-[0.7rem] md:text-xs">
                  Wedding Function
                </p>
                <h3 className="mt-2 mb-8 font-extrabold font-serif text-rose text-4xl md:text-6xl">
                  {active.name}
                </h3>

                <ul className="space-y-3 md:space-y-4 inline-block text-left">
                  <Row icon={<Calendar className="h-5 w-5" />} value={active.date} large />
                  <Row icon={<Clock className="h-5 w-5" />} value={active.time} large />
                  <Row icon={<MapPin className="h-5 w-5" />} value={active.venue} large />
                  {active.dress && active.dress.trim() && (
                    <Row icon={<Shirt className="h-5 w-5" />} value={active.dress} large />
                  )}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Row = ({
  icon,
  value,
  large = false,
}: {
  icon: React.ReactNode;
  value: string;
  large?: boolean;
}) => (
  <li className="flex items-start gap-3">
    <span className="mt-1 text-gold-deep">{icon}</span>
    <p
      className={`font-serif leading-snug font-semibold whitespace-pre-line text-left text-foreground ${
        large ? "text-base md:text-xl" : "text-xs md:text-lg"
      }`}
    >
      {value}
    </p>
  </li>
);
