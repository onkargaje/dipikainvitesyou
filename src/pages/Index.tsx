import { lazy, Suspense, useState } from "react";
import { Hero } from "@/components/wedding/Hero";
import { CinematicIntro } from "@/components/wedding/CinematicIntro";
import { MusicPlayer } from "@/components/wedding/MusicPlayer";
import { PhotoBlock } from "@/components/wedding/PhotoBlock";
import { Countdown } from "@/components/wedding/Countdown";
import { PetalField, FloatingOrbs } from "@/components/wedding/PetalField";
import ourBeginning from "@/assets/our-beginning.jpg";
import foreverBegins from "@/assets/forever-begins.jpg";
import twoSoul1 from "@/assets/two-soul-1.jpg";
import twoSoul2 from "@/assets/two-soul-2.jpg";
import twoSoul3 from "@/assets/two-soul-3.jpg";
import twoSoul4 from "@/assets/two-soul-4.jpg";
import laughter2 from "@/assets/laughter-2.jpg";
import laughter3 from "@/assets/laughter-3.jpg";
import laughter4 from "@/assets/laughter-4.jpg";
import laughter5 from "@/assets/laughter-5.jpg";

// Lazy-loaded below-the-fold sections to speed up initial paint
const PhotoSlider = lazy(() =>
  import("@/components/wedding/PhotoSlider").then((m) => ({ default: m.PhotoSlider }))
);
const Quote = lazy(() =>
  import("@/components/wedding/Quote").then((m) => ({ default: m.Quote }))
);
const EventCards = lazy(() =>
  import("@/components/wedding/EventCards").then((m) => ({ default: m.EventCards }))
);
const Gifts = lazy(() =>
  import("@/components/wedding/Gifts").then((m) => ({ default: m.Gifts }))
);
const Blessings = lazy(() =>
  import("@/components/wedding/Blessings").then((m) => ({ default: m.Blessings }))
);
const MapSection = lazy(() =>
  import("@/components/wedding/MapSection").then((m) => ({ default: m.MapSection }))
);
const Footer = lazy(() =>
  import("@/components/wedding/Footer").then((m) => ({ default: m.Footer }))
);

const twoSoulImages = [twoSoul1, twoSoul2, twoSoul3, twoSoul4];
const laughterImages = [laughter2, laughter3, laughter4, laughter5];

const SectionFallback = () => <div className="min-h-[40vh]" aria-hidden />;

const Index = () => {
  const [introDone, setIntroDone] = useState(false);

  return (
    <main className="relative overflow-x-hidden">
      <CinematicIntro onEnter={() => setIntroDone(true)} />
      <MusicPlayer active={introDone} />

      <FloatingOrbs />
      <PetalField density={26} />

      <div className="relative z-10">
        <Hero />

        <PhotoBlock
          variant="center"
          image={ourBeginning}
          title="Our Beginning"
          photoId="our-beginning"
        />

        <Countdown />

        <Suspense fallback={<SectionFallback />}>
          <PhotoSlider
            variant="left"
            images={twoSoulImages}
            title="Two Souls, One Story"
            text="From quiet conversations to whispered promises — every moment led us here. To this season, this love, this forever."
            rotate={-2}
            interval={7000}
            effect="fade"
            aspect="aspect-square"
            showDots
            likeIdPrefix="two-soul"
          />

          <Quote />

          <PhotoSlider
            variant="right"
            images={laughterImages}
            title="​A Little Laughter"
            text="Because love is grand, but laughter is the music it dances to. Here's to a lifetime of inside jokes and stolen smiles."
            rotate={2}
            interval={6000}
            effect="slide"
            aspect="aspect-square"
            showDots
            bright
            likeIdPrefix="laughter"
          />

          <EventCards />

          <PhotoBlock
            variant="feature"
            image={foreverBegins}
            caption="Forever begins here"
            photoId="forever-begins"
          />

          <Blessings />
          <MapSection />
          <Footer />
        </Suspense>
      </div>
    </main>
  );
};

export default Index;
