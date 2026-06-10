export type UpiAccount = {
  id: string;
  vpa: string;
  name: string;
  label: string;
  bank: string;
  phone?: string;
  holder?: string;
};

export const UPI_ACCOUNTS: UpiAccount[] = [
  {
    id: "primary",
    vpa: "9942658278@ybl",
    name: "Matrix Minds",
    label: "Matrix Minds (PhonePe)",
    bank: "PhonePe / UPI",
    phone: "9942658278",
    holder: "N Anitha",
  },
  {
    id: "icici",
    vpa: "saminathananitha81@okicici",
    name: "Matrix Minds",
    label: "Matrix Minds (ICICI)",
    bank: "ICICI Bank",
    phone: "9942658278",
    holder: "N Anitha",
  },
];

export const PRIMARY_UPI = UPI_ACCOUNTS[0];

export const buildUpiUrl = (
  vpa: string,
  opts: { amount?: number; name?: string; note?: string } = {}
) => {
  const params = new URLSearchParams();
  params.set("pa", vpa);
  params.set("pn", opts.name ?? "Matrix Minds");
  params.set("cu", "INR");
  if (opts.amount && opts.amount > 0) params.set("am", String(opts.amount));
  if (opts.note) params.set("tn", opts.note);
  return `upi://pay?${params.toString()}`;
};
