import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, Gamepad2, Heart, Sparkles } from "lucide-react";
import UpiPicker from "./UpiPicker";
import { UPI_ACCOUNTS, buildUpiUrl, type UpiAccount } from "@/lib/upi";

const HH_URL = "https://hriharionline.lovable.app/";

const LaunchSection = () => {
  const [amount, setAmount] = useState<string>("");
  const numAmount = Number(amount);
  const validAmount = !isNaN(numAmount) && numAmount > 0;
  return (
    <section id="launch" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Launch announcement */}
          <Card className="bg-gradient-to-br from-primary/15 via-accent/10 to-transparent border-primary/40 backdrop-blur-md overflow-hidden relative">
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-primary animate-pulse">
                <Sparkles className="w-3 h-3" /> NOW LAUNCHING
              </span>
            </div>
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-primary/20">
                  <Gamepad2 className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-accent font-semibold">
                    New Release
                  </p>
                  <h3 className="font-orbitron text-2xl md:text-3xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Launching H&H Online
                  </h3>
                </div>
              </div>

              <p className="text-foreground/90 mb-3 font-semibold">
                ⚽ An online football multiplayer card game
              </p>
              <p className="text-muted-foreground mb-6">
                Challenge friends and players across the globe in a fast-paced
                football-themed card battle. Build your squad, play your cards
                right, and climb the leaderboard. Visit, play, and share with
                everyone!
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  variant="hero"
                  size="lg"
                  className="font-orbitron font-bold"
                >
                  <a href={HH_URL} target="_blank" rel="noopener noreferrer">
                    Play H&H Online <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </Button>
                <Button asChild variant="matrix" size="lg">
                  <a href={HH_URL} target="_blank" rel="noopener noreferrer">
                    Visit Site
                  </a>
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-4 break-all">
                {HH_URL}
              </p>
            </CardContent>
          </Card>

          {/* Donation box */}
          <Card className="bg-gradient-to-br from-accent/15 via-primary/10 to-transparent border-accent/40 backdrop-blur-md">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-accent/20">
                  <Heart className="w-8 h-8 text-accent animate-pulse" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-primary font-semibold">
                    Support Us
                  </p>
                  <h3 className="font-orbitron text-2xl md:text-3xl font-black bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                    Fuel Our Growth
                  </h3>
                </div>
              </div>

              <p className="text-muted-foreground mb-6">
                Love what we build? Your donation helps Matrix Minds develop
                more open AI tools, games, and innovative products. Every
                contribution — big or small — powers our next launch.
              </p>

              <div className="rounded-xl border border-accent/30 bg-background/40 p-4 mb-6">
                <p className="text-xs text-muted-foreground mb-1">
                  UPI / Pay To
                </p>
                <p className="font-mono text-lg font-bold text-foreground select-all">
                  {UPI_ID}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Matrix Minds • Founded by Mr. S. Hareedh
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                {[100, 500, 1000].map((amt) => (
                  <Button
                    key={amt}
                    type="button"
                    variant={String(amt) === amount ? "hero" : "outline"}
                    className="border-primary/40 hover:bg-primary/10"
                    onClick={() => setAmount(String(amt))}
                  >
                    ₹{amt}
                  </Button>
                ))}
              </div>

              <div className="mb-4">
                <label className="text-xs text-muted-foreground mb-2 block">
                  Or enter your own amount (₹)
                </label>
                <Input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  placeholder="e.g. 250"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))}
                  className="bg-background/40 border-accent/30 focus-visible:ring-accent"
                />
              </div>

              <Button
                asChild={validAmount}
                disabled={!validAmount}
                variant="hero"
                size="lg"
                className="w-full font-orbitron font-bold"
              >
                {validAmount ? (
                  <a href={buildUpiUrl(numAmount)}>
                    <Heart className="mr-2 w-4 h-4" /> Donate ₹{numAmount}
                  </a>
                ) : (
                  <span>
                    <Heart className="mr-2 w-4 h-4" /> Enter an amount to donate
                  </span>
                )}
              </Button>

              <p className="text-[10px] text-muted-foreground text-center mt-3">
                Opens any UPI app (GPay, PhonePe, Paytm, BHIM…) on your phone.
              </p>

            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LaunchSection;
