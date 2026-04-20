import { Reveal, SectionTitle } from "./Reveal";
import { wedding } from "@/lib/wedding";
import { MapPin, ExternalLink } from "lucide-react";

export const MapSection = () => (
  <section className="py-24 md:py-32 px-6">
    <div className="container max-w-4xl">
      <Reveal>
        <SectionTitle
          eyebrow="Find Your Way"
          title="The Venue"
          subtitle={wedding.venueFull}
        />
      </Reveal>

      <Reveal delay={0.15}>
        <div className="relative rounded-3xl overflow-hidden glass p-2 group hover:shadow-[0_25px_60px_-15px_hsl(var(--gold)/0.5)] transition-all duration-700">
          <div className="rounded-2xl overflow-hidden ring-1 ring-gold/30">
            <iframe
              title="Wedding venue map"
              src={wedding.mapEmbed}
              className="w-full h-[400px] md:h-[480px] grayscale-[20%] sepia-[15%] group-hover:grayscale-0 group-hover:sepia-0 transition-all duration-700"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="text-center mt-8">
          <a
            href={wedding.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-rose to-rose/90 text-primary-foreground hover:shadow-[0_0_40px_hsl(var(--gold)/0.6)] transition-all duration-500 group"
          >
            <MapPin className="h-4 w-4" />
            Open in Google Maps
            <ExternalLink className="h-3.5 w-3.5 opacity-70 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </Reveal>
    </div>
  </section>
);
