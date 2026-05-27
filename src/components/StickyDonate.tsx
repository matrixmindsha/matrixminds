import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const StickyDonate = () => {
  const scrollToDonate = () => {
    const el = document.getElementById("launch");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Button
      onClick={scrollToDonate}
      variant="hero"
      size="lg"
      aria-label="Support Matrix Minds with a donation"
      className="fixed bottom-24 right-4 z-40 font-orbitron font-bold rounded-full shadow-2xl shadow-primary/40 hover:scale-105 transition-transform px-4 md:px-6"
    >
      <Heart className="w-4 h-4 md:mr-2 animate-pulse" />
      <span className="hidden md:inline">Support Us</span>
    </Button>
  );
};

export default StickyDonate;
