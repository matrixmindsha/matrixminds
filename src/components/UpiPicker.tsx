import { useState } from "react";
import { Check, Copy, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UPI_ACCOUNTS, type UpiAccount } from "@/lib/upi";
import { toast } from "sonner";

type Props = {
  value?: string;
  onChange?: (acc: UpiAccount) => void;
  compact?: boolean;
};

const UpiPicker = ({ value, onChange, compact }: Props) => {
  const [selected, setSelected] = useState<string>(value ?? UPI_ACCOUNTS[0].id);

  const handlePick = (acc: UpiAccount) => {
    setSelected(acc.id);
    onChange?.(acc);
  };

  const copy = async (vpa: string) => {
    try {
      await navigator.clipboard.writeText(vpa);
      toast.success("UPI ID copied", { description: vpa });
    } catch {
      toast.error("Could not copy");
    }
  };

  return (
    <div className="space-y-2">
      {!compact && (
        <p className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <CreditCard className="w-3.5 h-3.5" /> Choose UPI account
        </p>
      )}
      <div className="grid sm:grid-cols-2 gap-2">
        {UPI_ACCOUNTS.map((acc) => {
          const active = acc.id === selected;
          return (
            <button
              key={acc.id}
              type="button"
              onClick={() => handlePick(acc)}
              className={`group text-left rounded-xl border p-3 transition-all ${
                active
                  ? "border-primary bg-primary/10 shadow-[0_0_0_1px_hsl(var(--primary))]"
                  : "border-border bg-background/40 hover:border-primary/40"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-semibold text-foreground">{acc.label}</span>
                {active ? (
                  <Check className="w-4 h-4 text-primary" />
                ) : (
                  <span className="text-[10px] text-muted-foreground">Tap to select</span>
                )}
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-sm font-bold text-foreground truncate select-all">
                  {acc.vpa}
                </span>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    copy(acc.vpa);
                  }}
                >
                  <Copy className="w-3.5 h-3.5" />
                </Button>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default UpiPicker;
