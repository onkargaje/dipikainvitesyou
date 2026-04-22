import { useEffect, useMemo, useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { Reveal, SectionTitle } from "./Reveal";
import { Send, Sparkles, Pencil, X, Crown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LikeButton } from "./LikeButton";
import { getSessionId } from "@/lib/session";

interface Blessing {
  id: string;
  name: string;
  message: string;
  like_count: number;
  created_at: string;
  session_id: string | null;
  isSeed?: boolean;
}

// Stable random count between 10-20 for seeded blessings (per session)
const seedRand = (key: string) => {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0;
  return 10 + (Math.abs(h) % 11);
};

const SEED_RAW = [
  { id: "s1", name: "Kshitij", message: "Wishing you a lifetime of love, laughter, and beautiful memories. ✨" },
  { id: "s2", name: "Mom & Dad", message: "May your love story be a beautiful one. Cheers to forever!" },
  { id: "s3", name: "Shivani", message: "\"From sitting by your side in the office to standing by you as your bridesmaid — what a beautiful journey to witness. Wishing you both a lifetime of love, laughter, and happiness. Congratulations Cuties❤️🧿\"" },
  { id: "s4", name: "Onkar", message: "Two hearts, one soul — congratulations on your beautiful journey." },
  { id: "s5", name: "Manisha", message: "I'm so happy to see you starting this new chapter. Just don't forget me now that you're becoming a \"responsible married woman\" (I'll still expect the same drama, okay? 😄)\n\nLove you always 💕" },
];

const seed: Blessing[] = SEED_RAW.map((s) => ({
  ...s,
  like_count: seedRand(s.id),
  created_at: "2026-01-01T00:00:00Z",
  session_id: null,
  isSeed: true,
}));

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(80, "Name too long"),
  message: z.string().trim().min(1, "Please write a message").max(1000, "Message too long"),
});

const EDIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MY_BLESSINGS_KEY = "my_blessings_v1";

interface MyBlessingMeta {
  id: string;
  submittedAt: number;
}

const loadMine = (): MyBlessingMeta[] => {
  try {
    return JSON.parse(localStorage.getItem(MY_BLESSINGS_KEY) || "[]");
  } catch {
    return [];
  }
};
const saveMine = (m: MyBlessingMeta[]) =>
  localStorage.setItem(MY_BLESSINGS_KEY, JSON.stringify(m));

export const Blessings = () => {
  const [list, setList] = useState<Blessing[]>(seed);
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [, tick] = useState(0);
  const sessionId = getSessionId();

  // Refresh edit-window countdown
  useEffect(() => {
    const t = setInterval(() => tick((x) => x + 1), 30_000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("blessings")
        .select("id, name, message, like_count, created_at, session_id")
        .order("created_at", { ascending: false })
        .limit(100);
      if (cancelled || !data) return;
      const live: Blessing[] = data.map((d) => ({
        id: d.id,
        name: d.name,
        message: d.message,
        like_count: d.like_count ?? 0,
        created_at: d.created_at,
        session_id: d.session_id,
      }));
      setList([...live, ...seed]);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const sorted = useMemo(() => {
    return [...list].sort((a, b) => {
      const ca = likeCounts[a.id] ?? a.like_count;
      const cb = likeCounts[b.id] ?? b.like_count;
      if (cb !== ca) return cb - ca;
      return (b.created_at || "").localeCompare(a.created_at || "");
    });
  }, [list, likeCounts]);

  const mine = loadMine();
  const canEdit = (b: Blessing) => {
    const meta = mine.find((m) => m.id === b.id);
    if (!meta) return false;
    return Date.now() - meta.submittedAt < EDIT_WINDOW_MS;
  };
  const editTimeLeft = (b: Blessing) => {
    const meta = mine.find((m) => m.id === b.id);
    if (!meta) return 0;
    return Math.max(0, EDIT_WINDOW_MS - (Date.now() - meta.submittedAt));
  };

  const startSubmit = (e: FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ name, message: msg });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setConfirmOpen(true);
  };

  const doSubmit = async () => {
    const parsed = schema.safeParse({ name, message: msg });
    if (!parsed.success) return;
    setSubmitting(true);

    if (editingId) {
      const { data, error } = await supabase
        .from("blessings")
        .update({ name: parsed.data.name, message: parsed.data.message })
        .eq("id", editingId)
        .eq("session_id", sessionId)
        .select("id, name, message, like_count, created_at, session_id")
        .single();
      setSubmitting(false);
      setConfirmOpen(false);
      if (error || !data) {
        toast.error("Could not update. Edit window may have expired.");
        return;
      }
      setList((l) => l.map((b) => (b.id === editingId ? { ...b, ...data } : b)));
      setEditingId(null);
      setName("");
      setMsg("");
      setSuccess("Your blessing has been updated");
      setTimeout(() => setSuccess(null), 2800);
      return;
    }

    const { data, error } = await supabase
      .from("blessings")
      .insert({ name: parsed.data.name, message: parsed.data.message, session_id: sessionId })
      .select("id, name, message, like_count, created_at, session_id")
      .single();
    setSubmitting(false);
    setConfirmOpen(false);
    if (error || !data) {
      toast.error("Could not send blessing. Please try again.");
      return;
    }
    setList((l) => [
      { ...data, like_count: data.like_count ?? 0 } as Blessing,
      ...l,
    ]);
    saveMine([...mine, { id: data.id, submittedAt: Date.now() }]);
    setName("");
    setMsg("");
    setSuccess("Your blessing has been saved ❤️");
    setTimeout(() => setSuccess(null), 2800);
  };

  const beginEdit = (b: Blessing) => {
    setEditingId(b.id);
    setName(b.name);
    setMsg(b.message);
    document.getElementById("blessing-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setName("");
    setMsg("");
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
            <form
              id="blessing-form"
              onSubmit={startSubmit}
              className="glass rounded-3xl p-8 space-y-4 bg-grain"
            >
              {editingId && (
                <div className="flex items-center justify-between text-xs text-rose">
                  <span className="inline-flex items-center gap-1.5">
                    <Pencil className="h-3.5 w-3.5" /> Editing your blessing
                  </span>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Cancel
                  </button>
                </div>
              )}
              <div>
                <label className="block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
                  Your Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={80}
                  className="w-full bg-background/60 border border-border focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 rounded-xl px-4 py-3 font-serif text-lg"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
                  Your Message
                </label>
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
                {submitting
                  ? "Sending..."
                  : editingId
                  ? "Update Blessing"
                  : "Send Blessing"}
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
                    {success}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>

          <Reveal delay={0.2} className="lg:col-span-3">
            {sorted.length === 0 ? (
              <div className="text-center text-muted-foreground italic py-10">
                No blessings yet — be the first to leave one ✨
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4 max-h-[560px] overflow-y-auto pr-2 scrollbar-hide">
                <AnimatePresence initial={false}>
                  {sorted.map((b, i) => {
                    const isTop = i < 3;
                    const editable = canEdit(b);
                    const minsLeft = Math.ceil(editTimeLeft(b) / 60000);
                    return (
                      <motion.div
                        key={b.id}
                        layout
                        initial={{ opacity: 0, y: 15, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.45, layout: { duration: 0.5, type: "spring", bounce: 0.15 } }}
                        className={`glass rounded-2xl p-5 relative bg-grain ${
                          isTop ? "ring-1 ring-rose/30 shadow-[0_0_24px_hsl(var(--rose)/0.15)]" : ""
                        }`}
                      >
                        {isTop && (
                          <div className="absolute -top-2.5 left-4 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-rose to-rose/80 text-primary-foreground text-[10px] font-medium tracking-wide shadow-md">
                            <Crown className="h-3 w-3" /> Most Loved
                          </div>
                        )}
                        <div className="absolute top-4 right-4">
                          <LikeButton
                            kind="blessing"
                            itemId={b.id}
                            initialCount={b.isSeed ? b.like_count : 0}
                            onChange={(count) =>
                              setLikeCounts((prev) => ({ ...prev, [b.id]: count }))
                            }
                          />
                        </div>
                        <p className="text-sm leading-relaxed text-foreground/90 italic pr-14 whitespace-pre-line">
                          "{b.message}"
                        </p>
                        <div className="flex items-end justify-between mt-3 gap-2">
                          <p className="font-script text-xl text-rose">- {b.name}</p>
                          {editable && (
                            <button
                              type="button"
                              onClick={() => beginEdit(b)}
                              className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-rose transition-colors"
                              title={`You can edit for ${minsLeft} more min`}
                            >
                              <Pencil className="h-3 w-3" /> Edit ({minsLeft}m)
                            </button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </Reveal>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {confirmOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-md"
              onClick={() => !submitting && setConfirmOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative glass rounded-3xl p-8 max-w-md w-full bg-background/95 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => !submitting && setConfirmOpen(false)}
                className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-foreground/10 transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              <h3 className="font-serif text-2xl text-foreground mb-2">
                {editingId ? "Update your blessing?" : "Send this blessing?"}
              </h3>
              <p className="text-sm text-muted-foreground mb-5">
                Are you sure you want to {editingId ? "update" : "submit"} this blessing?
              </p>
              <div className="rounded-xl bg-background/60 border border-border p-4 mb-5 max-h-40 overflow-y-auto">
                <p className="text-sm italic text-foreground/90 whitespace-pre-line">"{msg}"</p>
                <p className="font-script text-lg text-rose mt-2">- {name}</p>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmOpen(false)}
                  disabled={submitting}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-full border border-border hover:bg-foreground/5 transition-colors disabled:opacity-60"
                >
                  <Pencil className="h-4 w-4" /> Edit
                </button>
                <button
                  type="button"
                  onClick={doSubmit}
                  disabled={submitting}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-gradient-to-r from-rose to-rose/90 text-primary-foreground disabled:opacity-60"
                >
                  {submitting ? "Sending..." : "Confirm"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
