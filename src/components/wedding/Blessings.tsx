import { useEffect, useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { Reveal, SectionTitle } from "./Reveal";
import { Heart, Send, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Blessing {
  id: string;
  name: string;
  message: string;
}

const seed: Blessing[] = [
  { id: "s1", name: "Kshitij", message: "Wishing you a lifetime of love, laughter, and beautiful memories. ✨" },
  { id: "s2", name: "Mom & Dad", message: "May your love story be a beautiful one. Cheers to forever!" },
  { id: "s3", name: "Shivani", message: "\"From sitting by your side in the office to standing by you as your bridesmaid — what a beautiful journey to witness. Wishing you both a lifetime of love, laughter, and happiness. Congratulations Cuties❤️🧿\"" },
  { id: "s4", name: "Onkar", message: "Two hearts, one soul — congratulations on your beautiful journey." },
  { id: "s5", name: "Manisha", message: "I'm so happy to see you starting this new chapter. Just don't forget me now that you're becoming a \"responsible married woman\" (I'll still expect the same drama, okay? 😄)\n\nLove you always 💕" },
];

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(80, "Name too long"),
  message: z.string().trim().min(1, "Please write a message").max(1000, "Message too long"),
});

export const Blessings = () => {
  const [list, setList] = useState<Blessing[]>(seed);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("blessings")
        .select("id, name, message")
        .order("created_at", { ascending: false })
        .limit(50);
      if (cancelled || error || !data) return;
      setList((prev) => [...data, ...prev.filter((p) => p.id.startsWith("s"))]);
    })();
    return () => { cancelled = true; };
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ name, message: msg });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const { data, error } = await supabase
      .from("blessings")
      .insert({ name: parsed.data.name, message: parsed.data.message })
      .select("id, name, message")
      .single();
    setSubmitting(false);
    if (error || !data) {
      toast.error("Could not send blessing. Please try again.");
      return;
    }
    setList((l) => [data as Blessing, ...l]);
    setName(""); setMsg("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2400);
  };

  return (
    <section className="py-16 md:py-24 px-6">
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
                  maxLength={80}
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
                  maxLength={1000}
                  className="w-full bg-background/60 border border-border focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 rounded-xl px-4 py-3 resize-none"
                  placeholder="Write your blessings..."
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-gradient-to-r from-rose to-rose/90 text-primary-foreground hover:shadow-[0_0_30px_hsl(var(--gold)/0.5)] transition-all duration-500 group disabled:opacity-60"
              >
                <Send className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                {submitting ? "Sending..." : "Send Blessing"}
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
