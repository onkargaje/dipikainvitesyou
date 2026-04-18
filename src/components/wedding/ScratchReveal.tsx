import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, SectionTitle } from "./Reveal";

export const ScratchReveal = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);
  const drawing = useRef(false);
  const sparkleId = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const setup = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext("2d")!;
      ctx.scale(dpr, dpr);

      const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      grad.addColorStop(0, "#e8c989");
      grad.addColorStop(0.4, "#f5e6b8");
      grad.addColorStop(0.6, "#d4a958");
      grad.addColorStop(1, "#b88940");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, rect.width, rect.height);

      ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
      ctx.font = "italic 20px 'Cormorant Garamond', serif";
      ctx.textAlign = "center";
      ctx.fillText("✨ Scratch to Reveal ✨", rect.width / 2, rect.height / 2);
    };
    setup();
    window.addEventListener("resize", setup);
    return () => window.removeEventListener("resize", setup);
  }, []);

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fill();

    if (Math.random() < 0.3) {
      const id = sparkleId.current++;
      setSparkles((s) => [...s, { id, x, y }]);
      setTimeout(() => setSparkles((s) => s.filter((sp) => sp.id !== id)), 800);
    }

    // Check progress
    if (!revealed && Math.random() < 0.05) {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let cleared = 0;
      for (let i = 3; i < data.length; i += 40) if (data[i] === 0) cleared++;
      if (cleared / (data.length / 40) > 0.45) setRevealed(true);
    }
  };

  const getPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  return (
    <section className="py-24 md:py-32 px-6">
      <div className="container max-w-2xl">
        <Reveal>
          <SectionTitle
            eyebrow="A Little Surprise"
            title="A Note Hidden Just for You"
            subtitle="Scratch the gold to unveil a little secret."
          />
        </Reveal>

        <Reveal delay={0.15}>
          <div
            ref={containerRef}
            className={`relative mx-auto aspect-[4/3] max-w-lg rounded-3xl overflow-hidden glass bg-grain ${revealed ? "animate-pulse-glow" : ""}`}
          >
            {/* Hidden message */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-blush/60 to-cream/80">
              <p className="font-script text-4xl md:text-5xl text-rose mb-3">You make our day complete.</p>
              <p className="text-muted-foreground italic">
                Thank you for being a part of our forever. We can't wait to celebrate with you.
              </p>
              
            </div>

            {/* Scratch canvas */}
            <canvas
              ref={canvasRef}
              className={`absolute inset-0 cursor-grab transition-opacity duration-700 text-sm ${revealed ? "opacity-0 pointer-events-none" : "opacity-100"}`}
              onPointerDown={(e) => {
                drawing.current = true;
                (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
                const { x, y } = getPos(e);
                scratch(x, y);
              }}
              onPointerMove={(e) => {
                if (!drawing.current) return;
                const { x, y } = getPos(e);
                scratch(x, y);
              }}
              onPointerUp={() => (drawing.current = false)}
            />

            <AnimatePresence>
              {sparkles.map((s) => (
                <motion.span
                  key={s.id}
                  initial={{ opacity: 1, scale: 0 }}
                  animate={{ opacity: 0, scale: 1.5, y: -20 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute pointer-events-none text-yellow-200 text-xl"
                  style={{ left: s.x - 8, top: s.y - 8 }}
                >
                  ✦
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
