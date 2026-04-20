import { Reveal } from "./Reveal";

interface PhotoBlockProps {
  image: string;
  caption?: string;
  title?: string;
  text?: string;
  variant?: "center" | "left" | "right" | "feature";
  rotate?: number;
}

export const PhotoBlock = ({
  image,
  caption,
  title,
  text,
  variant = "center",
  rotate = 0,
}: PhotoBlockProps) => {
  if (variant === "feature") {
    return (
      <section className="py-24 md:py-32 px-6">
        <div className="container max-w-3xl">
          <Reveal>
            <div
              className="polaroid mx-auto max-w-2xl"
              style={{ transform: `rotate(${rotate}deg)` }}
            >
              <img
                src={image}
                alt={caption || title || ""}
                loading="lazy"
                className="w-full aspect-[4/5] object-cover rounded-sm"
              />
              {caption && (
                <p className="absolute bottom-3 left-0 right-0 text-center font-script text-2xl text-rose">
                  {caption}
                </p>
              )}
            </div>
            {title && (
              <div className="text-center mt-10">
                <h3 className="font-serif text-3xl md:text-4xl text-foreground">{title}</h3>
                {text && (
                  <p className="text-muted-foreground mt-3 max-w-xl mx-auto leading-relaxed">
                    {text}
                  </p>
                )}
              </div>
            )}
          </Reveal>
        </div>
      </section>
    );
  }

  if (variant === "left" || variant === "right") {
    const reverse = variant === "right";
    return (
      <section className="py-20 md:py-28 px-6">
        <div
          className={`container max-w-5xl grid md:grid-cols-2 gap-10 md:gap-16 items-center ${
            reverse ? "md:[&>*:first-child]:order-2" : ""
          }`}
        >
          <Reveal>
            <div
              className="polaroid max-w-md mx-auto"
              style={{ transform: `rotate(${rotate}deg)` }}
            >
              <img
                src={image}
                alt={caption || title || ""}
                loading="lazy"
                className="w-full aspect-square object-cover rounded-sm"
              />
              {caption && (
                <p className="absolute bottom-3 left-0 right-0 text-center font-script text-xl text-rose">
                  {caption}
                </p>
              )}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className={reverse ? "md:text-right" : ""}>
              {title && (
                <h3 className="font-serif md:text-4xl text-foreground mb-4 text-lg text-center">{title}</h3>
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

  // center with overlay text
  return (
    <section className="py-20 md:py-28 px-6">
      <div className="container max-w-3xl">
        <Reveal>
          <div className="relative polaroid max-w-xl border-0 px-0 text-center mx-0 border-secondary-foreground text-primary-foreground bg-destructive-foreground">
            <img
              src={image}
              alt={title || caption || ""}
              loading="lazy"
              className="w-full aspect-[4/5] object-contain text-sm rounded py-0 border-none shadow-none opacity-100 mx-0 px-0 border-8"
            />
            {title && (
              <div className="absolute inset-3 bottom-12 flex items-end justify-center pointer-events-none">
                <div className="bg-gradient-to-t from-black/40 to-transparent absolute inset-0 rounded-sm" />
                <p className="relative font-script text-4xl md:text-5xl text-ivory pb-6 px-4 text-center drop-shadow-lg">
                  {title}
                </p>
              </div>
            )}
            {caption && !title && (
              <p className="absolute bottom-3 left-0 right-0 text-center font-script text-2xl text-rose">
                {caption}
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
