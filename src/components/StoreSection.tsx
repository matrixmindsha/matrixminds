import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Cpu, BarChart3, ShieldAlert, Smartphone, Check, Mail, Download, LogIn, LogOut, BarChart } from "lucide-react";
import { useAuth, useStoreAccess } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const UPI_ID = "9942658278@ptyes";
const PAYEE = "Matrix Minds";
const INTL_EMAIL = "matrixmindsha@gmail.com";

const buildUpi = (amt: number, note: string) =>
  `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE)}&cu=INR&am=${amt}&tn=${encodeURIComponent(note)}`;

const buildIntlMail = (title: string, usd: number) =>
  `mailto:${INTL_EMAIL}?subject=${encodeURIComponent(`International order: ${title} ($${usd})`)}&body=${encodeURIComponent(
    `Hi Matrix Minds,\n\nI'd like to buy "${title}" for $${usd} USD. Please send me PayPal / Wise / card payment instructions.\n\nMy email: (your email here)\n\nThanks!`
  )}`;

type Currency = "INR" | "USD";

type Product = {
  id: string;
  title: string;
  price: number;
  usdPrice: number;
  tagline: string;
  bullets: string[];
  Icon: typeof Brain;
  accent: string;
  pdf: string;
  zip: string;
};

const PRODUCTS: Product[] = [
  { id: "ai", title: "AI Mastery", price: 499, usdPrice: 9, tagline: "Founder-grade introduction to AI in 2026.", bullets: ["8 chapters · transformers, RAG, prompt engineering", "4 runnable Python scripts (perceptron, NN, LLM, RAG)", "Lifetime updates"], Icon: Brain, accent: "from-primary/20 to-accent/10", pdf: "AI_Mastery.pdf", zip: "AI_Mastery_SourceCode.zip" },
  { id: "ml", title: "Machine Learning", price: 499, usdPrice: 9, tagline: "End-to-end workflow from data to deployed model.", bullets: ["8 chapters · trees, boosting, evaluation, MLOps", "5 source files incl. XGBoost + FastAPI serving", "Lifetime updates"], Icon: Cpu, accent: "from-accent/20 to-primary/10", pdf: "Machine_Learning.pdf", zip: "Machine_Learning_SourceCode.zip" },
  { id: "ds", title: "Data Science", price: 499, usdPrice: 9, tagline: "SQL, Python, statistics, experimentation.", bullets: ["8 chapters · EDA, A/B testing, storytelling", "Pandas, SQL, A/B test & Streamlit dashboard code", "Lifetime updates"], Icon: BarChart3, accent: "from-primary/20 to-accent/10", pdf: "Data_Science.pdf", zip: "Data_Science_SourceCode.zip" },
  { id: "eh", title: "Ethical Hacking", price: 699, usdPrice: 12, tagline: "Legal, hands-on offensive security.", bullets: ["8 chapters · OWASP Top 10, pentest workflow, reporting", "5 defensive scripts (scanner, SSRF guard, SQLi safe-vs-unsafe)", "Lifetime updates"], Icon: ShieldAlert, accent: "from-accent/20 to-primary/10", pdf: "Ethical_Hacking.pdf", zip: "Ethical_Hacking_SourceCode.zip" },
];

const StoreSection = () => {
  const [currency, setCurrency] = useState<Currency>("INR");
  const { user } = useAuth();
  const { isAdmin, checking } = useStoreAccess(user?.id);
  const [downloading, setDownloading] = useState<string | null>(null);

  const fmt = (p: Product) => (currency === "INR" ? `₹${p.price}` : `$${p.usdPrice}`);

  const handleDownload = async (productId: string, file: string) => {
    setDownloading(file);
    try {
      const { data, error } = await supabase.functions.invoke("get-download", {
        body: { productId, file },
      });
      if (error || !data?.url) throw new Error(data?.error || error?.message || "Download failed");
      window.open(data.url, "_blank");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setDownloading(null);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
  };

  return (
    <section id="store" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Admin gate bar */}
        <div className="flex justify-end mb-4">
          {!user ? (
            <Button asChild variant="outline" size="sm" className="font-orbitron">
              <Link to="/auth">
                <LogIn className="mr-2 w-4 h-4" /> Admin sign in
              </Link>
            </Button>
          ) : isAdmin ? (
            <div className="flex gap-2 items-center">
              <span className="text-xs font-orbitron text-accent">ADMIN MODE</span>
              <Button asChild variant="outline" size="sm" className="font-orbitron">
                <Link to="/analytics"><BarChart className="mr-2 w-4 h-4" /> Analytics</Link>
              </Button>
              <Button variant="outline" size="sm" className="font-orbitron" onClick={handleSignOut}>
                <LogOut className="mr-2 w-4 h-4" /> Sign out
              </Button>
            </div>
          ) : (
            <Button variant="outline" size="sm" className="font-orbitron" onClick={handleSignOut}>
              <LogOut className="mr-2 w-4 h-4" /> Sign out
            </Button>
          )}
        </div>

        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest text-accent font-bold mb-2">Matrix Minds Store</p>
          <h2 className="font-orbitron text-3xl md:text-5xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-3">
            eBooks + Source Code
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Drafted by <strong>S. Hareedh</strong>, Founder of Matrix Minds.
            Pay once and we email you the PDF + source code — no account needed.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-full border border-primary/30 bg-background/60 backdrop-blur p-1">
            {(["INR", "USD"] as Currency[]).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-4 py-1.5 text-sm font-orbitron font-bold rounded-full transition ${
                  currency === c ? "bg-gradient-to-r from-primary to-accent text-primary-foreground" : "text-muted-foreground hover:text-foreground"
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
            const { id, title, tagline, bullets, Icon, accent, price, usdPrice, pdf, zip } = product;
            return (
              <Card key={id} className={`bg-gradient-to-br ${accent} via-transparent border-primary/30 backdrop-blur-md`}>
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-primary/15 shrink-0">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-orbitron text-xl md:text-2xl font-black text-foreground">{title}</h3>
                      <p className="text-sm text-muted-foreground">{tagline}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-orbitron text-2xl md:text-3xl font-black text-accent">{fmt(product)}</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">one-time</div>
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

                  <div className="space-y-2">
                    {isAdmin ? (
                      <>
                        <Button
                          variant="hero" size="lg"
                          className="w-full font-orbitron font-bold"
                          disabled={downloading === pdf}
                          onClick={() => handleDownload(id, pdf)}
                        >
                          <Download className="mr-2 w-4 h-4" />
                          {downloading === pdf ? "Preparing…" : "Download PDF"}
                        </Button>
                        <Button
                          variant="matrix" size="lg"
                          className="w-full font-orbitron font-bold"
                          disabled={downloading === zip}
                          onClick={() => handleDownload(id, zip)}
                        >
                          <Download className="mr-2 w-4 h-4" />
                          {downloading === zip ? "Preparing…" : "Download Source Code"}
                        </Button>
                      </>
                    ) : currency === "INR" ? (
                      <Button asChild variant="hero" size="lg" className="w-full font-orbitron font-bold">
                        <a href={buildUpi(price, `${title} — Matrix Minds`)}>
                          <Smartphone className="mr-2 w-4 h-4" /> Pay ₹{price} via UPI
                        </a>
                      </Button>
                    ) : (
                      <Button asChild variant="hero" size="lg" className="w-full font-orbitron font-bold">
                        <a href={buildIntlMail(title, usdPrice)}>
                          <Mail className="mr-2 w-4 h-4" /> Pay ${usdPrice} — Email for PayPal
                        </a>
                      </Button>
                    )}

                    {!isAdmin && (
                      <p className="text-[10px] text-muted-foreground text-center">
                        {currency === "INR" ? (
                          <>UPI: <span className="font-mono">{UPI_ID}</span> · Resources sent to your email from <span className="font-mono">{INTL_EMAIL}</span></>
                        ) : (
                          <>PayPal / Wise / card via <span className="font-mono">{INTL_EMAIL}</span></>
                        )}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8 max-w-2xl mx-auto">
          After your payment, Matrix Minds emails you the eBook PDF and source code ZIP directly to your inbox.
          No sign-up required for customers. Ethical Hacking material is for authorised, legal practice only.
        </p>
        {checking && user && (
          <p className="text-center text-[10px] text-muted-foreground mt-2">Checking admin access…</p>
        )}
      </div>
    </section>
  );
};

export default StoreSection;
