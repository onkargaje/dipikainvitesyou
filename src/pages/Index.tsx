import { Hero } from "@/components/wedding/Hero";
import { PhotoBlock } from "@/components/wedding/PhotoBlock";
import { Countdown } from "@/components/wedding/Countdown";
import { Quote } from "@/components/wedding/Quote";
import { EventCards } from "@/components/wedding/EventCards";
import { Gifts } from "@/components/wedding/Gifts";
import { Blessings } from "@/components/wedding/Blessings";
import { ScratchReveal } from "@/components/wedding/ScratchReveal";
import { MapSection } from "@/components/wedding/MapSection";
import { Footer } from "@/components/wedding/Footer";
import { PetalField, FloatingOrbs } from "@/components/wedding/PetalField";
import photo1 from "@/assets/photo-1.jpg";
import photo2 from "@/assets/photo-2.jpg";
import photo3 from "@/assets/photo-3.jpg";
import photo4 from "@/assets/photo-4.jpg";

const Index = () => {
  return (
    <main className="relative overflow-x-hidden">
      <FloatingOrbs />
      <PetalField density={20} />

      <div className="relative z-10">
        <Hero />

        <PhotoBlock
          variant="center"
          image="/03d08843-e59b-4a05-80de-c1bacc56b7ae.jpg"
          title="Our Beginning"
        />

        <Countdown />

        <PhotoBlock
          variant="left"
          image={photo2}
          title="Two Souls, One Story"
          text="From quiet conversations to whispered promises — every moment led us here. To this season, this love, this forever."
          rotate={-2}
        />

        <Quote />

        <PhotoBlock
          variant="right"
          image={photo3}
          title="A Little Laughter"
          text="Because love is grand, but laughter is the music it dances to. Here's to a lifetime of inside jokes and stolen smiles."
          rotate={2}
        />

        <EventCards />

        <PhotoBlock
          variant="feature"
          image={photo4}
          caption="Forever begins here"
        />

        <Blessings />
        <ScratchReveal />
        <MapSection />
        <Footer />
      </div>
    </main>
  );
};

export default Index;
