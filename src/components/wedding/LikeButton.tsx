import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getSessionId } from "@/lib/session";

type Kind = "blessing" | "photo";

interface LikeButtonProps {
  kind: Kind;
  itemId: string;
  /** Optional initial count for instant render (e.g. seeded blessings) */
  initialCount?: number;
  /** Notify parent of changes (used for sorting) */
  onChange?: (count: number, liked: boolean) => void;
  size?: "sm" | "md";
  variant?: "card" | "overlay";
}

const tableFor = (k: Kind) => (k === "blessing" ? "blessing_likes" : "photo_likes");
const colFor = (k: Kind) => (k === "blessing" ? "blessing_id" : "photo_id");

export const LikeButton = ({
  kind,
  itemId,
  initialCount = 0,
  onChange,
  size = "sm",
  variant = "card",
}: LikeButtonProps) => {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [pulse, setPulse] = useState(0);
  const sessionId = getSessionId();
  const table = tableFor(kind);
  const col = colFor(kind) as "blessing_id";

  useEffect(() => {
    let cancelled = false;
    (async () => {
      // Count
      const { count: c } = await supabase
        .from(table as "blessing_likes")
        .select("*", { count: "exact", head: true })
        .eq(col, itemId);
      // Liked by me
      const { data } = await supabase
        .from(table as "blessing_likes")
        .select("id")
        .eq(col, itemId)
        .eq("session_id", sessionId)
        .maybeSingle();
      if (cancelled) return;
      const total = (c ?? 0) + initialCount;
      setCount(total);
      setLiked(!!data);
      onChange?.(total, !!data);
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId, kind]);

  const toggle = async () => {
    if (busy) return;
    setBusy(true);
    const next = !liked;
    // Optimistic
    setLiked(next);
    setCount((c) => c + (next ? 1 : -1));
    setPulse((p) => p + 1);
    onChange?.(count + (next ? 1 : -1), next);

    if (next) {
      const { error } = await supabase
        .from(table as "blessing_likes")
        .insert({ [col]: itemId, session_id: sessionId } as never);
      if (error && error.code !== "23505") {
        // revert on real error
        setLiked(false);
        setCount((c) => c - 1);
        onChange?.(count - 1, false);
      }
    } else {
      await supabase
        .from(table as "blessing_likes")
        .delete()
        .eq(col, itemId)
        .eq("session_id", sessionId);
    }
    setBusy(false);
  };

  const iconSize = size === "md" ? 20 : 16;
  const isOverlay = variant === "overlay";

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        toggle();
      }}
      aria-pressed={liked}
      aria-label={liked ? "Unlike" : "Like"}
      className={
        isOverlay
          ? "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/35 backdrop-blur-md text-ivory hover:bg-black/50 transition-colors"
          : "inline-flex items-center gap-1.5 text-rose hover:text-rose/80 transition-colors"
      }
    >
      <span className="relative inline-flex">
        <AnimatePresence>
          {liked && (
            <motion.span
              key={`pulse-${pulse}`}
              initial={{ scale: 0.6, opacity: 0.6 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0 rounded-full bg-rose/40 blur-sm"
            />
          )}
        </AnimatePresence>
        <motion.span
          key={liked ? "on" : "off"}
          initial={{ scale: 0.7 }}
          animate={{ scale: liked ? [1, 1.35, 1] : 1 }}
          transition={{ duration: 0.35 }}
          className="relative"
        >
          <Heart
            size={iconSize}
            className={liked ? "fill-rose text-rose" : isOverlay ? "text-ivory" : "text-rose/70"}
          />
        </motion.span>
      </span>
      <span className={`text-xs font-medium tabular-nums ${isOverlay ? "text-ivory" : ""}`}>
        {count}
      </span>
    </button>
  );
};
