// Thin wrapper around Flutterwave's REST API (v3) — no SDK/native binary
// needed, just plain fetch calls. Requires FLW_SECRET_KEY to be set.
// I have not been able to test this against a real Flutterwave account —
// verify it yourself with Flutterwave's test API keys before going live.

const FLW_BASE = "https://api.flutterwave.com/v3";

function secretKey(): string {
  const key = process.env.FLW_SECRET_KEY;
  if (!key) {
    throw new Error(
      "FLW_SECRET_KEY is not set. Add it in your environment variables (see .env.example)."
    );
  }
  return key;
}

export async function initiatePayment(opts: {
  amount: number;
  currency: string;
  email: string;
  name?: string;
  txRef: string;
  redirectUrl: string;
}): Promise<string> {
  const res = await fetch(`${FLW_BASE}/payments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tx_ref: opts.txRef,
      amount: opts.amount,
      currency: opts.currency,
      redirect_url: opts.redirectUrl,
      customer: { email: opts.email, name: opts.name },
      customizations: {
        title: "JobPrimed Premium",
        description: "JobPrimed Premium subscription",
      },
    }),
  });

  const data = await res.json();
  if (data.status !== "success" || !data?.data?.link) {
    throw new Error(data.message || "Flutterwave did not return a payment link.");
  }
  return data.data.link as string;
}

export async function verifyTransaction(transactionId: string) {
  const res = await fetch(`${FLW_BASE}/transactions/${transactionId}/verify`, {
    headers: { Authorization: `Bearer ${secretKey()}` },
  });
  return res.json();
}
