import { useState } from "react";
import { Hero } from "@/components/wedding/Hero";
import { CinematicIntro } from "@/components/wedding/CinematicIntro";
import { MusicPlayer } from "@/components/wedding/MusicPlayer";
import { PhotoBlock } from "@/components/wedding/PhotoBlock";
import { PhotoSlider } from "@/components/wedding/PhotoSlider";
import { Countdown } from "@/components/wedding/Countdown";
import { Quote } from "@/components/wedding/Quote";
import { EventCards } from "@/components/wedding/EventCards";
import { Gifts } from "@/components/wedding/Gifts";
import { Blessings } from "@/components/wedding/Blessings";

import { MapSection } from "@/components/wedding/MapSection";
import { Footer } from "@/components/wedding/Footer";
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

const twoSoulImages = [twoSoul1, twoSoul2, twoSoul3, twoSoul4];
const laughterImages = [laughter2, laughter3, laughter4, laughter5];

const Index = () => {
  const [introDone, setIntroDone] = useState(false);

  return (
    <main className="relative overflow-x-hidden">
      <CinematicIntro onEnter={() => setIntroDone(true)} />
      <MusicPlayer active={introDone} />

      <FloatingOrbs />
      <PetalField density={22} />

      <div className="relative z-10">
        <Hero />

        <PhotoBlock
          variant="center"
          image={ourBeginning}
          title="Our Beginning"
        />

        <Countdown />

        <PhotoSlider
          variant="left"
          images={twoSoulImages}
          title="Two Souls, One Story"
          text="From quiet conversations to whispered promises — every moment led us here. To this season, this love, this forever."
          rotate={-2}
          interval={5500}
          effect="fade"
          aspect="aspect-square"
          showDots
        />

        <Quote />

        <PhotoSlider
          variant="right"
          images={laughterImages}
          title="​A Little Laughter"
          text="Because love is grand, but laughter is the music it dances to. Here's to a lifetime of inside jokes and stolen smiles."
          rotate={2}
          interval={4500}
          effect="slide"
          aspect="aspect-square"
          showDots
          bright
        />

        <EventCards />

        <PhotoBlock
          variant="feature"
          image={foreverBegins}
          caption="Forever begins here"
        />

        <Blessings />
        <MapSection />
        <Footer />
      </div>
    </main>
  );
};

export default Index;
