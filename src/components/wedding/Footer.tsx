import { wedding } from "@/lib/wedding";

export const Footer = () => (
  <footer className="relative py-16 px-6 text-center">
    <div className="container max-w-2xl">
      <p className="font-script text-5xl text-rose mb-4">
        {wedding.groom} & {wedding.bride}
      </p>
      <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
        {wedding.dateLabel}
      </p>
      <div className="divider-ornament" />
      <p className="text-sm text-muted-foreground italic">
        Made with love, for those who love us.
      </p>
    </div>
  </footer>
);
