import { useEffect, useRef, useState } from "react";

interface Props {
  /** when true, attempt to start playing */
  active: boolean;
}

/**
 * Vintage gramophone music toggle with floating notes when playing.
 * Positioned top-right, fixed.
 */
export const MusicPlayer = ({ active }: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.25;
    if (active) {
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }, [active]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (!playing) {
      a.play().then(() => {
        setPlaying(true);
        a.muted = false;
        setMuted(false);
      }).catch(() => {});
      return;
    }
    a.muted = !a.muted;
    setMuted(a.muted);
  };

  const isOn = playing && !muted;

  return (
    <>
      <audio ref={audioRef} src="/bg-music.mp4" loop preload="auto" />

      <div className="fixed top-4 right-4 z-[80] pointer-events-none">
        <div className="relative">
          {/* Floating notes */}
          {isOn && (
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 h-16 w-16 pointer-events-none overflow-visible">
              <span className="music-note music-note-1">♪</span>
              <span className="music-note music-note-2">♫</span>
              <span className="music-note music-note-3">♩</span>
            </div>
          )}

          <button
            onClick={toggle}
            aria-label={muted ? "Unmute music" : "Mute music"}
            className={`pointer-events-auto h-14 w-14 rounded-full glass flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 ${
              isOn ? "animate-pulse-soft" : ""
            }`}
          >
            <Gramophone spinning={isOn} />
          </button>
        </div>
      </div>
    </>
  );
};

const Gramophone = ({ spinning }: { spinning: boolean }) => (
  <svg
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
    aria-hidden="true"
  >
    {/* Horn */}
    <path
      d="M40 6 C 56 14, 60 24, 56 32 L 38 24 C 36 18, 36 12, 40 6 Z"
      fill="hsl(var(--gold-deep))"
      stroke="hsl(var(--rose-dust))"
      strokeWidth="1.2"
    />
    <ellipse cx="48" cy="19" rx="3" ry="6" fill="hsl(var(--rose-dust))" opacity="0.5" />
    {/* Tube/arm */}
    <path
      d="M40 24 L 32 36"
      stroke="hsl(var(--gold-deep))"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    {/* Base */}
    <rect x="14" y="40" width="36" height="12" rx="3" fill="hsl(var(--rose-dust))" />
    <rect x="12" y="50" width="40" height="4" rx="2" fill="hsl(var(--gold-deep))" />
    {/* Record disc */}
    <g
      style={{
        transformOrigin: "32px 46px",
        animation: spinning ? "spin 3s linear infinite" : "none",
      }}
    >
      <circle cx="32" cy="46" r="6" fill="hsl(var(--foreground))" opacity="0.85" />
      <circle cx="32" cy="46" r="1.2" fill="hsl(var(--gold))" />
    </g>
  </svg>
);
