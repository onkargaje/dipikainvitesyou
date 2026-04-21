import { motion, useReducedMotion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import { wedding } from "@/lib/wedding";

export const Hero = () => {
  const reduced = useReducedMotion();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grain">
      {/* Background image — full cover, no zoom */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
        {/* Readability overlay — darker top, transparent bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/35" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl py-24 md:py-32">
        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-script md:text-9xl text-ivory leading-[0.9] mb-2 text-5xl"
          style={{ textShadow: "0 4px 30px hsl(0 0% 0% / 0.6)" }}
        >
          {wedding.groom}
        </motion.h1>

        <motion.div
          initial={reduced ? false : { opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex items-center justify-center gap-4 my-4"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/80" />
          <span className="font-serif italic text-gold text-5xl drop-shadow-lg">&</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/80" />
        </motion.div>

        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-script md:text-9xl text-ivory leading-[0.9] text-5xl"
          style={{ textShadow: "0 4px 30px hsl(0 0% 0% / 0.6)" }}
        >
          {wedding.bride}
        </motion.h1>

        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.1 }}
          className="font-serif italic text-lg md:text-2xl text-ivory/90 mt-8 drop-shadow-md"
        >
          {wedding.tagline}
        </motion.p>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          className="uppercase tracking-[0.5em] text-ivory mt-6 text-xs drop-shadow-md"
        >
          Save the Date · {wedding.dateLabel}
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.7 }}
          className="mt-10 max-w-2xl mx-auto"
        >
          <p className="font-serif text-ivory text-base md:text-2xl leading-relaxed whitespace-pre-line drop-shadow-md">
            {`॥ समञ्जन्तु विश्वे देवाः\nसमापो हृदयानि नौ ।\nसं मातरिश्वा सं धाता\nसमुदेष्ट्रि दधातु नौ ॥`}
          </p>
          <p className="mt-4 font-serif italic text-ivory/85 text-sm md:text-base drop-shadow">
            May divine forces unite your hearts and keep you together in harmony forever.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
