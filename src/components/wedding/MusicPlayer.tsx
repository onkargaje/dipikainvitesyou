import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface Props {
  /** when true, attempt to start playing */
  active: boolean;
}

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

  return (
    <>
      <audio ref={audioRef} src="/bg-music.mp4" loop preload="auto" />
      <button
        onClick={toggle}
        aria-label={muted ? "Unmute music" : "Mute music"}
        className={`fixed bottom-6 right-6 z-[80] h-12 w-12 rounded-full glass flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 ${
          playing && !muted ? "animate-pulse-soft" : ""
        }`}
      >
        <span className="relative h-5 w-5 flex items-center justify-center">
          <Volume2
            className={`absolute h-5 w-5 text-rose transition-all duration-300 ${
              muted || !playing ? "opacity-0 scale-50" : "opacity-100 scale-100"
            }`}
          />
          <VolumeX
            className={`absolute h-5 w-5 text-rose transition-all duration-300 ${
              muted || !playing ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}
          />
        </span>
        {playing && !muted && (
          <span className="absolute inset-0 rounded-full ring-2 ring-rose/40 animate-ping" />
        )}
      </button>
    </>
  );
};
