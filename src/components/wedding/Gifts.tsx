import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, SectionTitle } from "./Reveal";
import { wedding } from "@/lib/wedding";
import { Copy, QrCode, Check, Landmark, X } from "lucide-react";
import { toast } from "sonner";

export const Gifts = () => {
  const [copied, setCopied] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(wedding.upi);
    setCopied(true);
    toast.success("UPI ID copied");
    setTimeout(() => setCopied(false), 2000);
  };

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=${encodeURIComponent(
    wedding.upi
  )}&pn=${encodeURIComponent(wedding.groom + " " + wedding.bride)}`;

  return (
    <section className="py-12 md:py-16 px-6">
      <div className="container max-w-5xl">
        <Reveal>
          <SectionTitle
            eyebrow="With Gratitude"
            title="Your Presence is the Greatest Gift"
            subtitle="If you wish to bless us with a token of love, here are the details."
          />
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          <Reveal delay={0.05}>
            <Card>
              <CardIcon><Copy className="h-5 w-5 text-gold-deep" /></CardIcon>
              <h4 className="font-serif text-2xl mb-1">UPI ID</h4>
              <p className="font-mono text-sm text-muted-foreground mb-6 break-all">{wedding.upi}</p>
              <button
                onClick={copy}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose text-primary-foreground hover:bg-rose/90 transition-colors text-sm"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy ID"}
              </button>
            </Card>
          </Reveal>

          <Reveal delay={0.15}>
            <Card>
              <CardIcon><QrCode className="h-5 w-5 text-gold-deep" /></CardIcon>
              <h4 className="font-serif text-2xl mb-1">Scan & Pay</h4>
              <p className="text-sm text-muted-foreground mb-6">Open any UPI app to scan</p>
              <button
                onClick={() => setQrOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold/60 text-gold-deep hover:bg-gold/10 transition-colors text-sm"
              >
                Show QR Code
              </button>
            </Card>
          </Reveal>

          <Reveal delay={0.25}>
            <Card>
              <CardIcon><Landmark className="h-5 w-5 text-gold-deep" /></CardIcon>
              <h4 className="font-serif text-2xl mb-1">Bank Transfer</h4>
              <div className="text-sm text-muted-foreground space-y-1 mb-2">
                <p>{wedding.bank.name}</p>
                <p className="font-mono">{wedding.bank.account}</p>
                <p className="text-xs opacity-70">IFSC: {wedding.bank.ifsc}</p>
              </div>
            </Card>
          </Reveal>
        </div>
      </div>

      <AnimatePresence>
        {qrOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setQrOpen(false)}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative glass rounded-3xl p-8 text-center max-w-sm w-full"
            >
              <button onClick={() => setQrOpen(false)} className="absolute top-3 right-3 p-2 rounded-full hover:bg-foreground/10">
                <X className="h-5 w-5" />
              </button>
              <h4 className="font-serif text-2xl mb-2">Scan with any UPI app</h4>
              <div className="bg-white p-4 rounded-2xl inline-block mt-2">
                <img src={qrUrl} alt="UPI QR" width={240} height={240} className="rounded-lg" />
              </div>
              <p className="font-mono text-xs text-muted-foreground mt-4 break-all">{wedding.upi}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="glass rounded-3xl p-8 h-full text-center hover:shadow-[0_20px_50px_-15px_hsl(var(--gold)/0.4)] hover:-translate-y-1 transition-all duration-500 bg-grain">
    {children}
  </div>
);

const CardIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center mx-auto mb-4 ring-1 ring-gold/30">
    {children}
  </div>
);
