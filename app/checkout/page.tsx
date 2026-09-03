"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Star, CreditCard, AlertCircle } from "lucide-react";
import { C, F_DISPLAY, F_BODY, F_MONO, chamfer } from "@/lib/theme";
import { PageHeader, PrimaryButton } from "@/components/ui";

type SessionUser = { id: number; email: string; name: string | null; plan: "free" | "premium" };

function CheckoutContent() {
  const params = useSearchParams();
  const plan = params.get("plan") || "Premium";
  const turnaround = params.get("turnaround");
  const level = params.get("level");
  const paymentStatus = params.get("payment");
  const [user, setUser] = useState<SessionUser | null | undefined>(undefined);
  const [payError, setPayError] = useState<string | null>(null);
  const [payLoading, setPayLoading] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => setUser(d.user));
  }, []);

  const priceLabel = plan === "Free" ? "$0" : plan === "Premium" ? "$14/mo" : "$39 one-time";
  const isPremiumPlan = plan === "Premium";
  const alreadyPremium = user?.plan === "premium";

  const payWithFlutterwave = async () => {
    setPayError(null);
    setPayLoading(true);
    try {
      const res = await fetch("/api/payments/flutterwave/initiate", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.link) {
        setPayError(data.error || "Payment could not be started. Flutterwave keys may not be configured yet.");
        setPayLoading(false);
        return;
      }
      window.location.href = data.link;
    } catch {
      setPayError("Payment could not be started. Flutterwave keys may not be configured yet.");
      setPayLoading(false);
    }
  };

  return (
    <div>
      <PageHeader eyebrow="Checkout" title={`You're signing up for ${plan}.`} sub="Premium is unlocked only by a real, verified Flutterwave payment." />
      <div className="max-w-lg mx-auto px-6 pb-24">
        {paymentStatus === "failed" && (
          <div className="p-3 mb-4 flex items-start gap-2" style={{ background: C.igniteTint, ...chamfer(8) }}>
            <AlertCircle size={16} color={C.igniteDark} className="shrink-0 mt-0.5" />
            <p style={{ fontFamily: F_BODY, fontSize: 12, color: C.igniteDark }}>Your last payment attempt didn't complete. No charge was made — try again below.</p>
          </div>
        )}
        {paymentStatus === "error" && (
          <div className="p-3 mb-4 flex items-start gap-2" style={{ background: C.igniteTint, ...chamfer(8) }}>
            <AlertCircle size={16} color={C.igniteDark} className="shrink-0 mt-0.5" />
            <p style={{ fontFamily: F_BODY, fontSize: 12, color: C.igniteDark }}>Something went wrong verifying that payment. If you were charged, contact support — otherwise, try again.</p>
          </div>
        )}

        <div className="p-6 bg-white border" style={{ borderColor: isPremiumPlan ? C.gold : C.steelLine, borderWidth: isPremiumPlan ? 1.5 : 1, ...chamfer(18) }}>
          <div className="flex items-center justify-between mb-4">
            <span className="flex items-center gap-1.5" style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink }}>
              {isPremiumPlan && <Star size={16} color={C.gold} fill={C.gold} />} {plan}
            </span>
            <span style={{ fontFamily: F_MONO, fontSize: 12, color: C.graphite }}>{priceLabel}</span>
          </div>
          {turnaround && <p style={{ fontFamily: F_BODY, fontSize: 13, color: C.graphite }} className="mb-1">Turnaround: {turnaround}</p>}
          {level && <p style={{ fontFamily: F_BODY, fontSize: 13, color: C.graphite }} className="mb-4">Reviewer level: {level}</p>}

          {user === undefined ? (
            <p style={{ fontFamily: F_BODY, fontSize: 13, color: C.graphiteLight }}>Checking your session…</p>
          ) : user && isPremiumPlan && alreadyPremium ? (
            <>
              <div className="p-3 mb-4" style={{ background: C.igniteTint, ...chamfer(8) }}>
                <p style={{ fontFamily: F_BODY, fontSize: 12, color: C.igniteDark }}>You're already on Premium.</p>
              </div>
              <PrimaryButton href="/dashboard" className="w-full justify-center">Go to dashboard</PrimaryButton>
            </>
          ) : user && isPremiumPlan ? (
            <>
              {payError && (
                <div className="p-3 mb-4" style={{ background: C.igniteTint, ...chamfer(8) }}>
                  <p style={{ fontFamily: F_BODY, fontSize: 12, color: C.igniteDark }}>{payError}</p>
                </div>
              )}
              <PrimaryButton onClick={payWithFlutterwave} className="w-full justify-center">
                <CreditCard size={16} /> {payLoading ? "Redirecting to Flutterwave…" : "Pay with Flutterwave"}
              </PrimaryButton>
              <p className="mt-3 text-center" style={{ fontFamily: F_MONO, fontSize: 10, color: C.graphiteLight }}>
                You'll be redirected to Flutterwave's secure checkout. Your plan updates automatically once payment is verified.
              </p>
            </>
          ) : user ? (
            <>
              <div className="p-3 mb-4" style={{ background: C.igniteTint, ...chamfer(8) }}>
                <p style={{ fontFamily: F_BODY, fontSize: 12, color: C.igniteDark }}>Signed in as {user.email}. Nothing to pay for this plan.</p>
              </div>
              <PrimaryButton href="/dashboard" className="w-full justify-center">Go to dashboard</PrimaryButton>
            </>
          ) : (
            <>
              <div className="p-3 mb-4" style={{ background: C.steel, ...chamfer(8) }}>
                <p style={{ fontFamily: F_BODY, fontSize: 12, color: C.graphite }}>Create a real account first — then come back here to pay for {plan}.</p>
              </div>
              <PrimaryButton href={`/signup?next=/checkout?plan=${encodeURIComponent(plan)}`} className="w-full justify-center">Create account to continue</PrimaryButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutContent />
    </Suspense>
  );
}
