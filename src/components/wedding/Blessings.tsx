import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, SectionTitle } from "./Reveal";
import { Heart, Send, Sparkles } from "lucide-react";

interface Blessing {
  id: number;
  name: string;
  message: string;
}

const seed: Blessing[] = [
  { id: 1, name: "Kshitij", message: "Wishing you a lifetime of love, laughter, and beautiful memories. ✨" },
  { id: 2, name: "Mom & Dad", message: "May your love story be a beautiful one. Cheers to forever!" },
  { id: 3, name: "Shivani", message: "​\"From sitting by your side in the office to standing by you as your bridesmaid — what a beautiful journey to witness. Wishing you both a lifetime of love, laughter, and happiness. Congratulations Cuties❤️🧿\"" },
  { id: 4, name: "Onkar", message: "Two hearts, one soul — congratulations on your beautiful journey." },
];

export const Blessings = () => {
  const [list, setList] = useState<Blessing[]>(seed);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !msg.trim()) return;
    setList((l) => [{ id: Date.now(), name: name.trim(), message: msg.trim() }, ...l]);
    setName(""); setMsg("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2400);
  };

  return (
    <section className="py-24 md:py-32 px-6">
      <div className="container max-w-5xl">
        <Reveal>
          <SectionTitle
            eyebrow="Send Love"
            title="Blessings & Wishes"
            subtitle="Leave a little note for us — it would mean the world."
          />
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-8">
          <Reveal delay={0.1} className="lg:col-span-2">
            <form onSubmit={submit} className="glass rounded-3xl p-8 space-y-4 bg-grain">
              <div>
                <label className="block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Your Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-background/60 border border-border focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 rounded-xl px-4 py-3 font-serif text-lg"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Your Message</label>
                <textarea
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  rows={5}
                  className="w-full bg-background/60 border border-border focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 rounded-xl px-4 py-3 resize-none"
                  placeholder="Write your blessings..."
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-gradient-to-r from-rose to-rose/90 text-primary-foreground hover:shadow-[0_0_30px_hsl(var(--gold)/0.5)] transition-all duration-500 group"
              >
                <Send className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                Send Blessing
              </button>

              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-2 text-sage-deep text-sm"
                  >
                    <Sparkles className="h-4 w-4" />
                    Thank you for your beautiful wishes!
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>

          <Reveal delay={0.2} className="lg:col-span-3">
            <div className="grid sm:grid-cols-2 gap-4 max-h-[520px] overflow-y-auto pr-2 scrollbar-hide">
              <AnimatePresence initial={false}>
                {list.map((b, i) => (
                  <motion.div
                    key={b.id}
                    layout
                    initial={{ opacity: 0, y: 15, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: i < 4 ? i * 0.05 : 0 }}
                    className="glass rounded-2xl p-5 relative bg-grain"
                  >
                    <Heart className="h-4 w-4 text-rose/60 absolute top-4 right-4" />
                    <p className="text-sm leading-relaxed text-foreground/90 italic">"{b.message}"</p>
                    <p className="font-script text-xl text-rose mt-3">​- {b.name}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
