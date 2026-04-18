import { Reveal } from "./Reveal";

export const Quote = () => (
  <section className="py-16 md:py-20 px-6 relative">
    <div className="container max-w-3xl text-center">
      <Reveal>
        <span className="font-serif text-8xl md:text-9xl text-gold/40 leading-none block">"</span>
        <p className="font-serif italic text-2xl md:text-4xl text-foreground leading-relaxed -mt-6">
          We are tying the sacred bond of marriage
        </p>
        <p className="mt-8 uppercase tracking-[0.4em] text-rose/70 font-sans font-medium text-base">​॥ वयं विवाहबन्धने बद्धौ ॥</p>
      </Reveal>
    </div>
  </section>
);
