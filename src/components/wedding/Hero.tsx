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

      <div className="relative z-10 text-center px-6 max-w-4xl pt-[40vh] md:pt-[35vh] pb-[8vh]">
        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-script text-ivory leading-[0.9] mb-2"
          style={{
            fontSize: "clamp(2.75rem, 11vw, 6rem)",
            textShadow: "0 4px 30px hsl(0 0% 0% / 0.6)",
          }}
        >
          {wedding.groom}
        </motion.h1>

        <motion.div
          initial={reduced ? false : { opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex items-center justify-center gap-4 my-3"
        >
          <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent to-gold/80" />
          <span className="font-serif italic text-gold text-4xl sm:text-5xl drop-shadow-lg">&</span>
          <div className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent to-gold/80" />
        </motion.div>

        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-script text-ivory leading-[0.9]"
          style={{
            fontSize: "clamp(2.75rem, 11vw, 6rem)",
            textShadow: "0 4px 30px hsl(0 0% 0% / 0.6)",
          }}
        >
          {wedding.bride}
        </motion.h1>

        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.1 }}
          className="font-serif italic text-ivory/90 mt-6 drop-shadow-md"
          style={{ fontSize: "clamp(1rem, 3.5vw, 1.5rem)" }}
        >
          {wedding.tagline}
        </motion.p>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          className="uppercase tracking-[0.4em] sm:tracking-[0.5em] text-ivory mt-5 text-[0.7rem] sm:text-xs drop-shadow-md"
        >
          Save the Date · {wedding.dateLabel}
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.7 }}
          className="mt-8 max-w-2xl mx-auto"
        >
          <p
            className="font-shlok text-ivory whitespace-pre-line drop-shadow-md"
            style={{
              fontSize: "clamp(1rem, 3.6vw, 1.5rem)",
              lineHeight: 1.8,
              letterSpacing: "0.02em",
            }}
          >
            {`॥ समञ्जन्तु विश्वे देवाः\nसमापो हृदयानि नौ ।\nसं मातरिश्वा सं धाता\nसमुदेष्ट्रि दधातु नौ ॥`}
          </p>
          <p
            className="mt-4 font-serif italic text-ivory/85 drop-shadow"
            style={{ fontSize: "clamp(0.85rem, 2.6vw, 1rem)" }}
          >
            May divine forces unite your hearts and keep you together in harmony forever.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
