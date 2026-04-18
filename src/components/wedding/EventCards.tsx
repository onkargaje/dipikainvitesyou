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

        <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
          {events.map((e, i) => (
            <Reveal key={e.key} delay={i * 0.1} className="opacity-100 border-destructive-foreground border-none shadow-none rounded py-0 border-0">
              <article
                className="group relative w-full text-left rounded-3xl overflow-hidden border-gold/40 shadow-[0_15px_40px_-15px_hsl(var(--gold)/0.4)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_-15px_hsl(var(--gold)/0.6)] hover:border-gold/70 min-h-[460px] flex-col border-0 opacity-100 py-[200px] px-[234px] flex items-center justify-start"
                style={{
                  backgroundImage: `url(${themeBg[e.theme]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Dark gradient for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20 opacity-25 my-[23px] text-center bg-destructive-foreground px-0 py-0" />

                <div className="relative p-7 md:p-8 text-center border-none text-secondary-foreground opacity-100 border-secondary-foreground shadow-none bg-transparent gap-0 items-center justify-start flex flex-col px-[150px] py-[100px] my-0 mx-0">
                  <p className="uppercase tracking-[0.4em] opacity-80 text-center text-xs text-secondary-foreground mx-[49px] px-0 mr-[45px] mb-0 my-0 py-0">
                    Function 0{i + 1}
                  </p>
                  <h3 className="text-4xl mb-5 drop-shadow-lg my-0 py-0 font-extrabold font-serif md:text-xl text-secondary-foreground bg-transparent">
                    {e.name}
                  </h3>

                  <ul className="space-y-2.5 mx-0">
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
    <p className="font-serif text-base md:text-lg leading-snug my-0 py-0 text-center text-secondary-foreground opacity-100 shadow-none font-extrabold">{value}</p>
  </li>
);
