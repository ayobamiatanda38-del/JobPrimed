import { NextRequest, NextResponse } from "next/server";
import { verifyTransaction } from "@/lib/flutterwave";
import { getSessionUser, setUserPlan, setSessionCookie } from "@/lib/auth";

// Flutterwave redirects the customer's browser here after checkout. We
// re-verify the transaction server-side with the secret key rather than
// trusting the redirect query params alone — that verification step is
// what actually decides whether the account gets upgraded.
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const status = url.searchParams.get("status");
  const transactionId = url.searchParams.get("transaction_id");
  const site = url.origin;

  if (status !== "successful" || !transactionId) {
    return NextResponse.redirect(`${site}/checkout?plan=Premium&payment=failed`);
  }

  try {
    const result = await verifyTransaction(transactionId);
    const tx = result?.data;

    if (!tx || tx.status !== "successful") {
      return NextResponse.redirect(`${site}/checkout?plan=Premium&payment=failed`);
    }

    const user = await getSessionUser();
    if (!user) {
      return NextResponse.redirect(`${site}/login`);
    }

    const updated = await setUserPlan(user.id, "premium");
    await setSessionCookie(updated);
    return NextResponse.redirect(`${site}/dashboard?payment=success`);
  } catch (err) {
    console.error(err);
    return NextResponse.redirect(`${site}/checkout?plan=Premium&payment=error`);
  }
}
