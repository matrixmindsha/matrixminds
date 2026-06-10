import { useMemo } from "react";
import { buildUpiUrl } from "@/lib/upi";
import { ScanLine } from "lucide-react";

type Props = {
  vpa: string;
  name?: string;
  amount?: number;
  note?: string;
  size?: number;
  caption?: string;
};

const UpiQR = ({ vpa, name = "Matrix Minds", amount, note, size = 180, caption }: Props) => {
  const upiUri = useMemo(() => buildUpiUrl(vpa, { amount, name, note }), [vpa, amount, name, note]);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=8&data=${encodeURIComponent(upiUri)}`;

  return (
    <div className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-primary/30 bg-background/70 backdrop-blur-md shadow-[0_0_24px_hsl(var(--primary)/0.15)]">
      <div className="rounded-xl bg-white p-2 shadow-inner">
        <img
          src={qrUrl}
          alt={`Scan to pay ${name} via UPI`}
          width={size}
          height={size}
          loading="lazy"
          className="block rounded-md"
        />
      </div>
      <p className="text-xs font-orbitron font-bold text-foreground flex items-center gap-1.5">
        <ScanLine className="w-3.5 h-3.5 text-accent" /> Scan with any UPI app
      </p>
      <p className="text-[11px] text-muted-foreground font-mono select-all">{vpa}</p>
      {amount ? (
        <p className="text-[11px] text-accent font-orbitron font-bold">Amount: ₹{amount}</p>
      ) : null}
      {caption && <p className="text-[10px] text-muted-foreground text-center">{caption}</p>}
    </div>
  );
};

export default UpiQR;
