"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { C, F_DISPLAY, F_BODY, F_MONO, chamfer } from "@/lib/theme";
import { PageHeader, PrimaryButton } from "@/components/ui";

type SessionUser = { id: number; email: string; name: string | null };

function CheckoutContent() {
  const params = useSearchParams();
  const plan = params.get("plan") || "Premium";
  const turnaround = params.get("turnaround");
  const level = params.get("level");
  const [user, setUser] = useState<SessionUser | null | undefined>(undefined);

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => setUser(d.user));
  }, []);

  const priceLabel = plan === "Free" ? "$0" : plan === "Premium" ? "$14/mo" : "$39 one-time";

  return (
    <div>
      <PageHeader eyebrow="Checkout" title={`You're signing up for ${plan}.`} sub="No payment processor is connected yet — this step leads into real account creation." />
      <div className="max-w-lg mx-auto px-6 pb-24">
        <div className="p-6 bg-white border" style={{ borderColor: C.steelLine, ...chamfer(18) }}>
          <div className="flex items-center justify-between mb-4">
            <span style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink }}>{plan}</span>
            <span style={{ fontFamily: F_MONO, fontSize: 12, color: C.graphite }}>{priceLabel}</span>
          </div>
          {turnaround && <p style={{ fontFamily: F_BODY, fontSize: 13, color: C.graphite }} className="mb-1">Turnaround: {turnaround}</p>}
          {level && <p style={{ fontFamily: F_BODY, fontSize: 13, color: C.graphite }} className="mb-4">Reviewer level: {level}</p>}

          {user === undefined ? (
            <p style={{ fontFamily: F_BODY, fontSize: 13, color: C.graphiteLight }}>Checking your session…</p>
          ) : user ? (
            <>
              <div className="p-3 mb-4" style={{ background: C.igniteTint, ...chamfer(8) }}>
                <p style={{ fontFamily: F_BODY, fontSize: 12, color: C.igniteDark }}>Signed in as {user.email}. Payment isn't wired up, so nothing is charged — this just confirms the plan against your real account.</p>
              </div>
              <PrimaryButton href="/dashboard" className="w-full justify-center">Go to dashboard</PrimaryButton>
            </>
          ) : (
            <>
              <div className="p-3 mb-4" style={{ background: C.steel, ...chamfer(8) }}>
                <p style={{ fontFamily: F_BODY, fontSize: 12, color: C.graphite }}>Create a real account to continue — payment isn't wired up yet, so this is free for now regardless of plan.</p>
              </div>
              <PrimaryButton href="/signup" className="w-full justify-center">Create account to continue</PrimaryButton>
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
