import { NextResponse } from "next/server";
import { getSessionUser, setUserPlan, setSessionCookie } from "@/lib/auth";

// Flips the current account to Premium in the database and re-signs the
// session cookie so the change takes effect immediately. There is no real
// payment processor behind this — see the checkout page and README for
// exactly what "real" means here.
export async function POST() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "You need to be logged in." }, { status: 401 });
  }
  const updated = await setUserPlan(user.id, "premium");
  await setSessionCookie(updated);
  return NextResponse.json({ user: updated });
}
