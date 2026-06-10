import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone, ScanLine, Copy, Phone, ArrowLeft, CheckCircle2, Mail } from "lucide-react";
import { UPI_ACCOUNTS, buildUpiUrl } from "@/lib/upi";
import { toast } from "sonner";
import phonepeQR from "@/assets/phonepe-qr.png.asset.json";

const Pay = () => {
  const [params] = useSearchParams();
  const accountId = params.get("account") || "primary";
  const amountRaw = params.get("amount");
  const amount = amountRaw && !isNaN(Number(amountRaw)) ? Number(amountRaw) : undefined;
  const note = params.get("note") || "Matrix Minds Payment";
  const productTitle = params.get("title") || undefined;

  const account = useMemo(
    () => UPI_ACCOUNTS.find((a) => a.id === accountId) || UPI_ACCOUNTS[0],
    [accountId]
  );

  const upiLink = buildUpiUrl(account.vpa, { amount, name: account.name, note });
  const phonepeLink = `phonepe://pay?pa=${encodeURIComponent(account.vpa)}&pn=${encodeURIComponent(
    account.name
  )}&cu=INR${amount ? `&am=${amount}` : ""}&tn=${encodeURIComponent(note)}`;
  // Dynamic UPI QR (any UPI app) — used when amount is set so QR includes amount
  const dynamicQR = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=10&data=${encodeURIComponent(
    upiLink
  )}`;

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied`, { description: text });
    } catch {
      toast.error("Copy failed");
    }
  };

  const mailConfirm = `mailto:matrixmindsha@gmail.com?subject=${encodeURIComponent(
    `Payment confirmation${productTitle ? ` — ${productTitle}` : ""}`
  )}&body=${encodeURIComponent(
    `Hi Matrix Minds,\n\nI have paid ${amount ? `₹${amount}` : "the amount"} to ${account.vpa} (${account.bank}).\n${
      productTitle ? `Product: ${productTitle}\n` : ""
    }UPI Transaction ID: \nMy email: \n\nPlease send my files / receipt.\n\nThanks!`
  )}`;

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-background via-background to-primary/10">
      <Helmet>
        <title>Pay Matrix Minds — UPI / PhonePe / QR</title>
        <meta name="description" content="Secure UPI payment to Matrix Minds. Pay via PhonePe, GPay, Paytm, BHIM, or scan the QR." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Button asChild variant="ghost" size="sm" className="mb-4 font-orbitron">
          <Link to="/"><ArrowLeft className="mr-2 w-4 h-4" /> Back to site</Link>
        </Button>

        <div className="text-center mb-8 animate-fade-in">
          <p className="text-xs uppercase tracking-widest text-accent font-bold mb-2">Secure UPI Checkout</p>
          <h1 className="font-orbitron text-3xl md:text-4xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-2">
            Pay {amount ? `₹${amount}` : "Matrix Minds"}
          </h1>
          {productTitle && (
            <p className="text-muted-foreground text-sm">For: <strong className="text-foreground">{productTitle}</strong></p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            Paying <strong className="text-foreground">{account.holder || account.name}</strong> · {account.bank}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* PhonePe QR */}
          <Card className="bg-card/60 backdrop-blur-md border-primary/30 hover-scale">
            <CardContent className="p-6 flex flex-col items-center">
              <div className="flex items-center gap-2 mb-3">
                <ScanLine className="w-5 h-5 text-[#5f259f]" />
                <h2 className="font-orbitron font-black text-lg">PhonePe QR</h2>
              </div>
              <div className="rounded-2xl bg-white p-3 shadow-2xl shadow-primary/20">
                <img
                  src={phonepeQR.url}
                  alt="PhonePe QR — Scan and Pay N Anitha"
                  className="w-56 h-auto rounded-md"
                  loading="eager"
                />
              </div>
              <p className="text-[11px] text-muted-foreground text-center mt-3">
                Open PhonePe → Scan & Pay → enter ₹{amount ?? "amount"}
              </p>
            </CardContent>
          </Card>

          {/* Dynamic UPI QR (any app) */}
          <Card className="bg-card/60 backdrop-blur-md border-accent/30 hover-scale">
            <CardContent className="p-6 flex flex-col items-center">
              <div className="flex items-center gap-2 mb-3">
                <ScanLine className="w-5 h-5 text-accent" />
                <h2 className="font-orbitron font-black text-lg">Any UPI App QR</h2>
              </div>
              <div className="rounded-2xl bg-white p-3 shadow-2xl shadow-accent/20">
                <img src={dynamicQR} alt="UPI QR" className="w-56 h-56" loading="lazy" />
              </div>
              <p className="text-[11px] text-muted-foreground text-center mt-3">
                GPay · Paytm · BHIM · Cred · any UPI app{amount ? " · amount pre-filled" : ""}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Action buttons */}
        <Card className="bg-card/60 backdrop-blur-md border-primary/30 mt-6">
          <CardContent className="p-6 space-y-3">
            <h2 className="font-orbitron font-black text-lg mb-2 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-primary" /> Pay from your phone
            </h2>

            <Button asChild variant="hero" size="lg" className="w-full font-orbitron font-bold">
              <a href={phonepeLink}>
                <Smartphone className="mr-2 w-4 h-4" /> Open in PhonePe
              </a>
            </Button>

            <Button asChild variant="matrix" size="lg" className="w-full font-orbitron font-bold">
              <a href={upiLink}>
                <Smartphone className="mr-2 w-4 h-4" /> Pay via any UPI app
              </a>
            </Button>

            {/* UPI ID row */}
            <div className="rounded-xl border border-primary/30 bg-background/40 p-3 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">UPI ID</p>
                <p className="font-mono text-sm font-bold truncate">{account.vpa}</p>
              </div>
              <Button size="sm" variant="outline" onClick={() => copy(account.vpa, "UPI ID")}>
                <Copy className="w-3.5 h-3.5 mr-1" /> Copy
              </Button>
            </div>

            {/* Phone row */}
            {account.phone && (
              <div className="rounded-xl border border-accent/30 bg-background/40 p-3 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Mobile (UPI)</p>
                  <p className="font-mono text-sm font-bold truncate">+91 {account.phone}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => copy(account.phone!, "Mobile number")}>
                    <Copy className="w-3.5 h-3.5" />
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <a href={`tel:+91${account.phone}`}><Phone className="w-3.5 h-3.5" /></a>
                  </Button>
                </div>
              </div>
            )}

            {/* Account switcher */}
            <div className="flex gap-2 pt-2">
              {UPI_ACCOUNTS.map((a) => {
                const active = a.id === account.id;
                const search = new URLSearchParams(params);
                search.set("account", a.id);
                return (
                  <Link
                    key={a.id}
                    to={`/pay?${search.toString()}`}
                    className={`flex-1 text-center text-xs font-orbitron font-bold px-3 py-2 rounded-lg border transition ${
                      active
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    {active && <CheckCircle2 className="inline w-3 h-3 mr-1" />}
                    {a.label}
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* After payment */}
        <Card className="bg-gradient-to-br from-accent/15 to-primary/10 border-accent/40 mt-6">
          <CardContent className="p-6">
            <h2 className="font-orbitron font-black text-lg mb-2">After payment</h2>
            <ol className="text-sm text-foreground/90 space-y-1.5 list-decimal pl-5">
              <li>Take a screenshot of the success page from your UPI app.</li>
              <li>Email us with the transaction ID{productTitle ? ` and product name (${productTitle})` : ""}.</li>
              <li>Your files / receipt will be sent within 24 hours.</li>
            </ol>
            <Button asChild variant="hero" size="lg" className="w-full font-orbitron font-bold mt-4">
              <a href={mailConfirm}>
                <Mail className="mr-2 w-4 h-4" /> Email payment confirmation
              </a>
            </Button>
            <p className="text-[11px] text-muted-foreground text-center mt-3">
              Support: matrixmindsha@gmail.com · +91 9942658278
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Pay;
