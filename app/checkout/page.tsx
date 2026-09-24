"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Star, CreditCard, AlertCircle, ShieldCheck, Lock, RotateCcw } from "lucide-react";
import { C, F_DISPLAY, F_BODY, rounded, softShadow } from "@/lib/theme";
import { PageHeader, PrimaryButton, Card } from "@/components/ui";

type SessionUser = { id: number; email: string; name: string | null; plan: "free" | "premium" };

const PLAN_INCLUDES: Record<string, string[]> = {
  Premium: [
    "Unlimited AI-drafted CVs & cover letters",
    "All 9 templates, including 4 Premium designs",
    "Full ATS optimization report",
    "Unlimited mock interviews + live AI avatar interview",
    "Clean, unwatermarked export",
  ],
  "Expert Review": [
    "Certified human reviewer on your file",
    "Inline, line-by-line comments",
    "Your choice of 24h or 72h turnaround",
    "One revision round included",
  ],
  Free: ["1 AI-drafted CV, watermarked export", "Basic ATS check", "5 free templates"],
};

const TRUST_BADGES = [
  { icon: ShieldCheck, label: "Secured by Flutterwave" },
  { icon: Lock, label: "Encrypted checkout" },
  { icon: RotateCcw, label: "Cancel anytime" },
];

function OrderSummary({ plan, turnaround, level, priceLabel }: { plan: string; turnaround: string | null; level: string | null; priceLabel: string }) {
  const includes = PLAN_INCLUDES[plan] ?? PLAN_INCLUDES.Premium;
  return (
    <Card className="p-7" style={{ background: C.ink }}>
      <div style={{ fontFamily: F_DISPLAY, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "rgba(255,255,255,0.55)" }} className="uppercase mb-3">
        Order summary
      </div>
      <div className="flex items-center justify-between mb-1">
        <span className="flex items-center gap-1.5" style={{ fontFamily: F_DISPLAY, fontWeight: 800, color: C.paper, fontSize: 20 }}>
          {plan === "Premium" && <Star size={16} color={C.gold} fill={C.gold} />} {plan}
        </span>
        <span style={{ fontFamily: F_DISPLAY, fontWeight: 800, color: C.paper, fontSize: 20 }}>{priceLabel}</span>
      </div>
      {turnaround && <p style={{ fontFamily: F_BODY, fontSize: 13, color: "rgba(255,255,255,0.65)" }} className="mb-1">Turnaround: {turnaround}</p>}
      {level && <p style={{ fontFamily: F_BODY, fontSize: 13, color: "rgba(255,255,255,0.65)" }} className="mb-4">Reviewer level: {level}</p>}

      <div className="my-5" style={{ height: 1, background: "rgba(255,255,255,0.12)" }} />

      <div style={{ fontFamily: F_DISPLAY, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "rgba(255,255,255,0.55)" }} className="uppercase mb-3">
        What's included
      </div>
      <ul className="space-y-2.5 mb-6">
        {includes.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <CheckCircle2 size={15} color={C.gold} className="shrink-0 mt-0.5" />
            <span style={{ fontFamily: F_BODY, fontSize: 13, color: "rgba(255,255,255,0.88)", lineHeight: 1.5 }}>{f}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-3">
        {TRUST_BADGES.map((b) => {
          const Icon = b.icon;
          return (
            <span key={b.label} className="flex items-center gap-1.5 px-2.5 py-1.5" style={{ background: "rgba(255,255,255,0.08)", ...rounded(999) }}>
              <Icon size={12} color="rgba(255,255,255,0.7)" />
              <span style={{ fontFamily: F_BODY, fontSize: 10.5, color: "rgba(255,255,255,0.75)" }}>{b.label}</span>
            </span>
          );
        })}
      </div>
    </Card>
  );
}

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
    fetch("/api/auth/me").then((r) => r.json()).then((d) => setUser(d.user)).catch(() => setUser(null));
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
      <div className="max-w-4xl mx-auto px-6 pb-24 grid md:grid-cols-2 gap-6 items-start">
        <OrderSummary plan={plan} turnaround={turnaround} level={level} priceLabel={priceLabel} />

        <div>
          {paymentStatus === "failed" && (
            <div className="p-3 mb-4 flex items-start gap-2" style={{ background: C.coralTint, ...rounded(12) }}>
              <AlertCircle size={16} color={C.coral} className="shrink-0 mt-0.5" />
              <p style={{ fontFamily: F_BODY, fontSize: 12.5, color: C.coral }}>Your last payment attempt didn't complete. No charge was made — try again below.</p>
            </div>
          )}
          {paymentStatus === "error" && (
            <div className="p-3 mb-4 flex items-start gap-2" style={{ background: C.coralTint, ...rounded(12) }}>
              <AlertCircle size={16} color={C.coral} className="shrink-0 mt-0.5" />
              <p style={{ fontFamily: F_BODY, fontSize: 12.5, color: C.coral }}>Something went wrong verifying that payment. If you were charged, contact support — otherwise, try again.</p>
            </div>
          )}

          <Card className="p-7" style={{ border: isPremiumPlan ? `1.5px solid ${C.gold}` : undefined }}>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 flex items-center justify-center shrink-0" style={{ background: C.primaryTint, ...rounded(10) }}>
                <CreditCard size={16} color={C.primary} />
              </div>
              <span style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink, fontSize: 14.5 }}>Payment method</span>
            </div>

            {user === undefined ? (
              <p style={{ fontFamily: F_BODY, fontSize: 13, color: C.graphiteLight }}>Checking your session…</p>
            ) : user && isPremiumPlan && alreadyPremium ? (
              <>
                <div className="p-3 mb-4" style={{ background: C.primaryTint, ...rounded(12) }}>
                  <p style={{ fontFamily: F_BODY, fontSize: 12.5, color: C.primaryDark }}>You're already on Premium.</p>
                </div>
                <PrimaryButton href="/dashboard" className="w-full justify-center">Go to dashboard</PrimaryButton>
              </>
            ) : user && isPremiumPlan ? (
              <>
                {payError && (
                  <div className="p-3 mb-4" style={{ background: C.coralTint, ...rounded(12) }}>
                    <p style={{ fontFamily: F_BODY, fontSize: 12.5, color: C.coral }}>{payError}</p>
                  </div>
                )}
                <PrimaryButton onClick={payWithFlutterwave} className="w-full justify-center" style={{ boxShadow: "0 12px 28px rgba(108,92,231,0.32)" }}>
                  <CreditCard size={16} /> {payLoading ? "Redirecting to Flutterwave…" : `Pay ${priceLabel} with Flutterwave`}
                </PrimaryButton>
                <div className="flex items-center gap-1.5 justify-center mt-4">
                  <Lock size={11} color={C.graphiteLight} />
                  <p style={{ fontFamily: F_BODY, fontSize: 11.5, color: C.graphiteLight }}>
                    You'll be redirected to Flutterwave's secure checkout. Your plan updates automatically once verified.
                  </p>
                </div>
              </>
            ) : user ? (
              <>
                <div className="p-3 mb-4" style={{ background: C.primaryTint, ...rounded(12) }}>
                  <p style={{ fontFamily: F_BODY, fontSize: 12.5, color: C.primaryDark }}>Signed in as {user.email}. Nothing to pay for this plan.</p>
                </div>
                <PrimaryButton href="/dashboard" className="w-full justify-center">Go to dashboard</PrimaryButton>
              </>
            ) : (
              <>
                <div className="p-3 mb-4" style={{ background: C.surface, ...rounded(12) }}>
                  <p style={{ fontFamily: F_BODY, fontSize: 12.5, color: C.graphite }}>Create a real account first — then come back here to pay for {plan}.</p>
                </div>
                <PrimaryButton href={`/signup?next=/checkout?plan=${encodeURIComponent(plan)}`} className="w-full justify-center">Create account to continue</PrimaryButton>
              </>
            )}
          </Card>

          <div className="flex items-center gap-2 justify-center mt-5">
            <ShieldCheck size={13} color={C.graphiteLight} />
            <span style={{ fontFamily: F_BODY, fontSize: 11.5, color: C.graphiteLight }}>256-bit encrypted · PCI-compliant processing via Flutterwave</span>
          </div>
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
