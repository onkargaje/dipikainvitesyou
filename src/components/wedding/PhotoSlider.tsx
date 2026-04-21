import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Reveal } from "./Reveal";

interface PhotoSliderProps {
  images: string[];
  title?: string;
  text?: string;
  /** ms between auto-slides */
  interval?: number;
  /** "fade" cross-fades; "slide" uses default horizontal slide */
  effect?: "fade" | "slide";
  /** show navigation dots */
  showDots?: boolean;
  /** aspect ratio of the framed window */
  aspect?: string;
  /** apply slow zoom-in to active image */
  zoom?: boolean;
  /** apply slight brightness boost */
  bright?: boolean;
  /** caption layout: alongside (left/right) or none */
  variant?: "left" | "right" | "center";
  rotate?: number;
}

export const PhotoSlider = ({
  images,
  title,
  text,
  interval = 5500,
  effect = "slide",
  showDots = false,
  aspect = "aspect-[4/5]",
  zoom = false,
  bright = false,
  variant = "center",
  rotate = 0,
}: PhotoSliderProps) => {
  const autoplay = Autoplay({
    delay: interval,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
  });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", dragFree: false },
    [autoplay]
  );
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const Frame = (
    <div
      className="polaroid mx-auto max-w-lg md:max-w-xl"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div
        className={`overflow-hidden rounded-sm bg-cream ${aspect} relative`}
        ref={emblaRef}
      >
        <div
          className={`embla__container flex h-full ${
            effect === "fade" ? "embla-fade" : ""
          }`}
        >
          {images.map((src, i) => {
            const isActive = i === selected;
            return (
              <div
                key={src + i}
                className={`embla__slide relative flex-[0_0_100%] h-full ${
                  effect === "fade"
                    ? `absolute inset-0 ${isActive ? "opacity-100 z-10" : "opacity-0 z-0"}`
                    : ""
                }`}
              >
                <img
                  src={src}
                  alt={title ? `${title} ${i + 1}` : `slide ${i + 1}`}
                  loading="lazy"
                  className={`w-full h-full object-contain bg-cream transition-transform ${
                    zoom && isActive ? "animate-slow-zoom" : ""
                  }`}
                  style={
                    bright
                      ? { filter: "brightness(1.08) saturate(1.05) contrast(0.98)" }
                      : undefined
                  }
                />
              </div>
            );
          })}
        </div>
      </div>

      {showDots && (
        <div className="flex justify-center gap-2 mt-3">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === selected ? "w-6 bg-rose" : "w-1.5 bg-rose/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );

  if (variant === "left" || variant === "right") {
    const reverse = variant === "right";
    return (
      <section className="py-20 md:py-28 px-6">
        <div
          className={`container max-w-5xl grid md:grid-cols-2 gap-10 md:gap-16 items-center ${
            reverse ? "md:[&>*:first-child]:order-2" : ""
          }`}
        >
          <Reveal>{Frame}</Reveal>
          <Reveal delay={0.15}>
            <div className={reverse ? "md:text-right" : ""}>
              {title && (
                <h3 className="font-serif md:text-4xl text-foreground mb-4 text-lg text-center">
                  {title}
                </h3>
              )}
              {text && (
                <p className="text-muted-foreground leading-relaxed text-xs">{text}</p>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="container max-w-3xl">
        <Reveal>{Frame}</Reveal>
        {title && (
          <Reveal delay={0.1}>
            <div className="text-center mt-8">
              <h3 className="font-serif text-2xl md:text-4xl text-foreground">{title}</h3>
              {text && (
                <p className="text-muted-foreground mt-3 max-w-xl mx-auto leading-relaxed text-sm">
                  {text}
                </p>
              )}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
};
