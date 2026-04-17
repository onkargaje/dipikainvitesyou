import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, SectionTitle } from "./Reveal";
import { events } from "@/lib/wedding";
import { X, Calendar, Clock, MapPin, Shirt } from "lucide-react";

const themeStyles: Record<string, { bg: string; border: string; text: string; accent: string }> = {
  engagement: {
    bg: "bg-gradient-to-br from-blush/70 to-cream/60",
    border: "border-gold/40",
    text: "text-rose",
    accent: "from-blush to-gold/30",
  },
  haldi: {
    bg: "bg-gradient-to-br from-yellow-100/70 to-amber-50/60",
    border: "border-amber-300/50",
    text: "text-amber-700",
    accent: "from-yellow-200 to-amber-200",
  },
  sangeet: {
    bg: "bg-gradient-to-br from-purple-900/70 to-indigo-900/70",
    border: "border-purple-300/40",
    text: "text-purple-100",
    accent: "from-purple-300 to-pink-300",
  },
  phere: {
    bg: "bg-gradient-to-br from-red-900/70 to-rose-900/70",
    border: "border-amber-400/50",
    text: "text-amber-100",
    accent: "from-amber-300 to-red-300",
  },
};

export const EventCards = () => {
  const [active, setActive] = useState<(typeof events)[number] | null>(null);

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

        <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
          {events.map((e, i) => {
            const s = themeStyles[e.theme];
            return (
              <Reveal key={e.key} delay={i * 0.1}>
                <button
                  onClick={() => setActive(e)}
                  className={`group relative w-full text-left rounded-3xl border ${s.border} ${s.bg} backdrop-blur-md p-8 md:p-10 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_-15px_hsl(var(--gold)/0.5)] hover:border-gold/70 bg-grain`}
                >
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br ${s.accent} mix-blend-overlay`}
                  />
                  <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gold/20 blur-3xl group-hover:bg-gold/40 transition-colors duration-700" />

                  <div className="relative">
                    <p className="text-[0.65rem] uppercase tracking-[0.4em] opacity-70 mb-3">
                      Function 0{i + 1}
                    </p>
                    <h3 className={`font-serif text-4xl md:text-5xl ${s.text} mb-2`}>{e.name}</h3>
                    <p className={`font-script text-2xl ${s.text} opacity-80`}>{e.date}</p>
                    <p className="mt-6 text-sm opacity-80 inline-flex items-center gap-2">
                      Tap to view details
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </p>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-md rounded-3xl border ${themeStyles[active.theme].border} ${themeStyles[active.theme].bg} backdrop-blur-2xl p-8 md:p-10 shadow-2xl bg-grain font-extrabold text-secondary-foreground bg-white`}
            >
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-foreground/10 transition-colors"
                aria-label="Close"
              >
                <X className={`h-5 w-5 ${themeStyles[active.theme].text}`} />
              </button>

              <p className="text-[0.65rem] uppercase tracking-[0.4em] opacity-70 mb-2">
                You are invited to
              </p>
              <h3 className={`font-serif text-5xl mb-1 font-extrabold text-secondary-foreground`}>
                {active.name}
              </h3>
              <div className="divider-ornament my-6" />

              <ul className={`space-y-4 ${themeStyles[active.theme].text}`}>
                <Row icon={<Calendar className="h-4 w-4 text-secondary-foreground" />} label="Date" value={active.date} />
                <Row icon={<Clock className="h-4 w-4 text-secondary-foreground" />} label="Time" value={active.time} />
                <Row icon={<MapPin className="h-4 w-4 text-secondary-foreground" />} label="Venue" value={active.venue} />
                <Row icon={<Shirt className="w-4 text-secondary-foreground opacity-100 py-0 h-[30px] my-[10px]" />} label="​" value={active.dress} />
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Row = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <li className="flex items-start gap-4">
    <span className="mt-1 opacity-70">{icon}</span>
    <div>
      <p className="text-[0.65rem] uppercase tracking-[0.3em] opacity-70 text-secondary-foreground">{label}</p>
      <p className="font-serif text-xl text-secondary-foreground">{value}</p>
    </div>
  </li>
);
