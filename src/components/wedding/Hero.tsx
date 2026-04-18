import { motion, useReducedMotion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import { wedding } from "@/lib/wedding";

export const Hero = () => {
  const reduced = useReducedMotion();
  return (
    <section className="relative min-h-screen flex items-start md:items-center justify-center overflow-hidden bg-grain pt-32 md:pt-0 pb-16">
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover scale-100 opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/30 via-blush/20 to-cream/60" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl py-[300px]">
        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-script md:text-9xl text-rose leading-[0.9] mb-2 text-4xl"
          style={{ textShadow: "0 4px 30px hsl(var(--blush-deep) / 0.4)" }}
        >
          {wedding.groom}
        </motion.h1>

        <motion.div
          initial={reduced ? false : { opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="flex items-center justify-center gap-4 my-4"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/70" />
          <span className="font-serif italic text-gold-deep text-5xl">&</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/70" />
        </motion.div>

        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-script md:text-9xl text-rose leading-[0.9] text-4xl"
          style={{ textShadow: "0 4px 30px hsl(var(--blush-deep) / 0.4)" }}
        >
          {wedding.bride}
        </motion.h1>

        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.4 }}
          className="font-serif italic text-xl md:text-2xl text-muted-foreground mt-8"
        >
          {wedding.tagline}
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.8 }}
          className="mt-12 inline-flex flex-col items-center gap-2 text-rose/70"
        >
          <span className="text-[0.65rem] uppercase tracking-[0.4em]">Scroll</span>
          <span className="block h-10 w-px bg-gradient-to-b from-rose/60 to-transparent animate-pulse" />
        </motion.div>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 2.1 }}
          className="uppercase tracking-[0.5em] text-rose mt-8 text-base"
        >
          Save the Date · {wedding.dateLabel}
        </motion.p>
      </div>
    </section>
  );
};
