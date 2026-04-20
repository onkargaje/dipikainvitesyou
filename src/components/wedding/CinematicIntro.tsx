import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onEnter: () => void;
}

export const CinematicIntro = ({ onEnter }: Props) => {
  const [open, setOpen] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleEnter = () => {
    setOpen(false);
    setTimeout(onEnter, 800);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <video
            ref={videoRef}
            src="/intro.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "blur(2px) saturate(1.1) sepia(0.15)" }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

          <div className="relative z-10 h-full w-full flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <p className="font-script text-3xl md:text-5xl text-white/90 mb-2 drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
                You're invited
              </p>
              <h1 className="font-serif text-4xl md:text-7xl text-white mb-8 drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
                Dipika &amp; Family
              </h1>
              <button
                onClick={handleEnter}
                className="group relative inline-flex items-center justify-center px-10 py-4 rounded-full glass-dark border border-white/40 text-white font-serif text-lg tracking-[0.25em] uppercase hover:bg-white/15 transition-all duration-500"
              >
                <span className="relative z-10">Open Invitation</span>
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 glow-gold" />
              </button>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 1.8, duration: 1 }}
                className="text-white/70 text-xs tracking-[0.3em] uppercase mt-8"
              >
                Tap to begin
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
