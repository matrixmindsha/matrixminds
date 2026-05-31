import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Cpu, BarChart3, ShieldAlert, Download, Smartphone, Check, Mail } from "lucide-react";

const UPI_ID = "9942658278@ptyes";
const PAYEE = "Matrix Minds";
const INTL_EMAIL = "matrixmindsha@gmail.com";
const buildUpi = (amt: number, note: string) =>
  `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE)}&cu=INR&am=${amt}&tn=${encodeURIComponent(note)}`;
const buildIntlMail = (title: string, usd: number) =>
  `mailto:${INTL_EMAIL}?subject=${encodeURIComponent(`International order: ${title} ($${usd})`)}&body=${encodeURIComponent(
    `Hi Matrix Minds,\n\nI'd like to buy "${title}" for $${usd} USD. Please send me PayPal / Wise / card payment instructions.\n\nThanks!`
  )}`;

type Currency = "INR" | "USD";

type Product = {
  id: string;
  title: string;
  price: number;
  usdPrice: number;
  tagline: string;
  bullets: string[];
  pdf: string;
  zip: string;
  Icon: typeof Brain;
  accent: string;
};

const PRODUCTS: Product[] = [
  {
    id: "ai",
    title: "AI Mastery",
    price: 499,
    usdPrice: 9,
    tagline: "Founder-grade introduction to AI in 2026.",
    bullets: ["8 chapters · transformers, RAG, prompt engineering", "4 runnable Python scripts (perceptron, NN, LLM, RAG)", "Lifetime updates"],
    pdf: "/downloads/AI_Mastery.pdf",
    zip: "/downloads/AI_Mastery_SourceCode.zip",
    Icon: Brain,
    accent: "from-primary/20 to-accent/10",
  },
  {
    id: "ml",
    title: "Machine Learning",
    price: 499,
    usdPrice: 9,
    tagline: "End-to-end workflow from data to deployed model.",
    bullets: ["8 chapters · trees, boosting, evaluation, MLOps", "5 source files incl. XGBoost + FastAPI serving", "Lifetime updates"],
    pdf: "/downloads/Machine_Learning.pdf",
    zip: "/downloads/Machine_Learning_SourceCode.zip",
    Icon: Cpu,
    accent: "from-accent/20 to-primary/10",
  },
  {
    id: "ds",
    title: "Data Science",
    price: 499,
    usdPrice: 9,
    tagline: "SQL, Python, statistics, experimentation.",
    bullets: ["8 chapters · EDA, A/B testing, storytelling", "Pandas, SQL, A/B test & Streamlit dashboard code", "Lifetime updates"],
    pdf: "/downloads/Data_Science.pdf",
    zip: "/downloads/Data_Science_SourceCode.zip",
    Icon: BarChart3,
    accent: "from-primary/20 to-accent/10",
  },
  {
    id: "eh",
    title: "Ethical Hacking",
    price: 699,
    usdPrice: 12,
    tagline: "Legal, hands-on offensive security.",
    bullets: ["8 chapters · OWASP Top 10, pentest workflow, reporting", "5 defensive scripts (scanner, SSRF guard, SQLi safe-vs-unsafe)", "Lifetime updates"],
    pdf: "/downloads/Ethical_Hacking.pdf",
    zip: "/downloads/Ethical_Hacking_SourceCode.zip",
    Icon: ShieldAlert,
    accent: "from-accent/20 to-primary/10",
  },
];

const StoreSection = () => {
  const [paid, setPaid] = useState<Record<string, boolean>>({});
  const [currency, setCurrency] = useState<Currency>("INR");

  const fmt = (p: Product) => (currency === "INR" ? `₹${p.price}` : `$${p.usdPrice}`);

  return (
    <section id="store" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest text-accent font-bold mb-2">Matrix Minds Store</p>
          <h2 className="font-orbitron text-3xl md:text-5xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-3">
            eBooks + Source Code
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Drafted by <strong>S. Hareedh</strong>, Founder of Matrix Minds. India pays via UPI;
            international clients pay via PayPal / Wise / card (email us).
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-full border border-primary/30 bg-background/60 backdrop-blur p-1">
            {(["INR", "USD"] as Currency[]).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-4 py-1.5 text-sm font-orbitron font-bold rounded-full transition ${
                  currency === c
                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-pressed={currency === c}
              >
                {c === "INR" ? "₹ INR (India)" : "$ USD (International)"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {PRODUCTS.map((product) => {
            const { id, title, tagline, bullets, pdf, zip, Icon, accent, price, usdPrice } = product;
            const isPaid = paid[id];
            return (
              <Card key={id} className={`bg-gradient-to-br ${accent} via-transparent border-primary/30 backdrop-blur-md`}>
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-primary/15 shrink-0">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-orbitron text-xl md:text-2xl font-black text-foreground">
                        {title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{tagline}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-orbitron text-2xl md:text-3xl font-black text-accent">
                        {fmt(product)}
                      </div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                        one-time
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">
                        {currency === "INR" ? `≈ $${usdPrice}` : `≈ ₹${price}`}
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-1.5 mb-5">
                    {bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-sm text-foreground/85">
                        <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {!isPaid ? (
                    <div className="space-y-2">
                      {currency === "INR" ? (
                        <>
                          <Button asChild variant="hero" size="lg" className="w-full font-orbitron font-bold">
                            <a href={buildUpi(price, `${title} — Matrix Minds`)}>
                              <Smartphone className="mr-2 w-4 h-4" /> Pay ₹{price} via UPI
                            </a>
                          </Button>
                          <p className="text-[10px] text-muted-foreground text-center">
                            UPI: <span className="font-mono">{UPI_ID}</span>
                          </p>
                        </>
                      ) : (
                        <>
                          <Button asChild variant="hero" size="lg" className="w-full font-orbitron font-bold">
                            <a href={buildIntlMail(title, usdPrice)}>
                              <Mail className="mr-2 w-4 h-4" /> Pay ${usdPrice} — Email for PayPal
                            </a>
                          </Button>
                          <p className="text-[10px] text-muted-foreground text-center">
                            International: PayPal / Wise / card via{" "}
                            <span className="font-mono">{INTL_EMAIL}</span>
                          </p>
                        </>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => setPaid((p) => ({ ...p, [id]: true }))}
                      >
                        I've paid — unlock downloads
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <Button asChild variant="hero" size="lg">
                        <a href={pdf} download>
                          <Download className="mr-2 w-4 h-4" /> eBook PDF
                        </a>
                      </Button>
                      <Button asChild variant="matrix" size="lg">
                        <a href={zip} download>
                          <Download className="mr-2 w-4 h-4" /> Source Code
                        </a>
                      </Button>
                      <p className="col-span-2 text-[10px] text-muted-foreground text-center mt-1">
                        Trouble downloading? Email <strong>{INTL_EMAIL}</strong> with your payment ref ID.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8 max-w-2xl mx-auto">
          All content is original, drafted by S. Hareedh for Matrix Minds. Source code is MIT-licensed for
          educational use. Ethical Hacking material is for authorised, legal practice only.
        </p>
      </div>
    </section>
  );
};

export default StoreSection;
