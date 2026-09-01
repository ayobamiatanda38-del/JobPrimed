import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { initiatePayment } from "@/lib/flutterwave";

// Starts a real Flutterwave payment for the Premium subscription and
// returns a redirect link to Flutterwave's hosted checkout page.
export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "You need to be logged in." }, { status: 401 });
  }

  const amount = Number(process.env.FLW_PREMIUM_AMOUNT || "8000");
  const currency = process.env.FLW_CURRENCY || "NGN";
  const origin = new URL(req.url).origin;

  try {
    const link = await initiatePayment({
      amount,
      currency,
      email: user.email,
      name: user.name || undefined,
      txRef: `jobprimed-premium-${user.id}-${Date.now()}`,
      redirectUrl: `${origin}/api/payments/flutterwave/callback`,
    });
    return NextResponse.json({ link });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err?.message || "Could not start the Flutterwave payment." },
      { status: 500 }
    );
  }
}
