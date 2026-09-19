import React from "react";
import { CheckCircle2, Star, Lock } from "lucide-react";
import { C, F_DISPLAY, F_BODY, rounded } from "@/lib/theme";
import { PageHeader, PrimaryButton, SecondaryButton, Card } from "@/components/ui";
import { TEMPLATES } from "@/lib/templates";

const PRICING = [
  { name: "Free", price: "$0", period: "forever", highlight: false, cta: "Start free",
    features: ["1 AI-drafted CV, watermarked export", "Basic ATS check", "2 mock interview questions per session", "5 Free templates"] },
  { name: "Premium", price: "$14", period: "per month", highlight: true, cta: "Get Premium",
    features: ["Unlimited AI CVs & cover letters", "Full ATS optimization report", "Unlimited mock interviews", "All 9 templates, including 4 Premium designs", "1-on-1 live AI avatar interviews", "Clean, unwatermarked export"] },
  { name: "Expert Review", price: "$39", period: "one-time add-on", highlight: false, cta: "Add a review",
    features: ["Certified human reviewer", "Inline, line-by-line comments", "Choice of 24h or 72h turnaround", "One revision round included"] },
];

export default function PricingPage() {
  const premiumTemplates = TEMPLATES.filter((t) => t.tier === "Premium").slice(0, 3);

  return (
    <div>
      <PageHeader
        eyebrow="Pricing"
        title="Free to start. Premium if you're serious."
        sub="Mock interviews run a short free sample on every plan — Premium unlocks everything, including a live 1-on-1 with an AI interviewer."
      />
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-6">
          {PRICING.map((tier) => (
            <div
              key={tier.name}
              className="p-8 flex flex-col relative"
              style={{
                background: tier.highlight ? C.primary : C.paper,
                border: tier.highlight ? "none" : `1px solid ${C.surfaceLine}`,
                boxShadow: tier.highlight ? "0 16px 40px rgba(108,92,231,0.28)" : "0 8px 24px rgba(20,20,43,0.06)",
                ...rounded(24),
              }}
            >
              {tier.highlight && (
                <span className="self-start mb-4 px-3 py-1 text-xs font-bold flex items-center gap-1" style={{ background: C.gold, color: C.paper, fontFamily: F_DISPLAY, ...rounded(999) }}>
                  <Star size={11} fill={C.paper} /> MOST POPULAR
                </span>
              )}
              <h3 style={{ fontFamily: F_DISPLAY, fontWeight: 800, color: tier.highlight ? C.paper : C.ink, fontSize: 20 }}>{tier.name}</h3>
              <div className="my-4 flex items-baseline gap-2">
                <span style={{ fontFamily: F_DISPLAY, fontWeight: 800, color: tier.highlight ? C.paper : C.ink, fontSize: 36 }}>{tier.price}</span>
                <span style={{ fontFamily: F_BODY, color: tier.highlight ? "rgba(255,255,255,0.75)" : C.graphite, fontSize: 13 }}>{tier.period}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 size={16} color={tier.highlight ? C.paper : C.primary} className="shrink-0 mt-0.5" />
                    <span style={{ fontFamily: F_BODY, color: tier.highlight ? "rgba(255,255,255,0.92)" : C.graphite, fontSize: 13.5 }}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={`/checkout?plan=${encodeURIComponent(tier.name)}`}
                className="w-full py-3 text-center font-semibold"
                style={{
                  background: tier.highlight ? C.paper : C.primary,
                  color: tier.highlight ? C.primary : C.paper,
                  fontFamily: F_DISPLAY,
                  ...rounded(999),
                }}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-6 p-6" style={{ background: C.surface, ...rounded(20) }}>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Lock size={16} color={C.gold} />
              <h4 style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink, fontSize: 15 }}>Templates locked behind Premium</h4>
            </div>
            <a href="/templates" style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.primary, fontSize: 13.5 }}>See all templates →</a>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {premiumTemplates.map((t) => (
              <div key={t.slug} className="p-3 bg-white" style={{ border: `1.5px solid ${C.gold}`, ...rounded(12) }}>
                <div style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink, fontSize: 13 }} className="mb-0.5">{t.name}</div>
                <div style={{ fontFamily: F_BODY, fontSize: 11, color: C.graphiteLight }}>{t.profession}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 p-6 flex items-center justify-between flex-wrap gap-4" style={{ background: C.surface, ...rounded(20) }}>
          <div>
            <div style={{ fontFamily: F_DISPLAY, fontSize: 11, color: C.primaryDark, fontWeight: 700, textTransform: "uppercase" }} className="mb-1">Upsell</div>
            <h4 style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink, fontSize: 16 }}>Career Services</h4>
            <p style={{ fontFamily: F_BODY, color: C.graphite, fontSize: 13.5 }}>1-on-1 coaching calls, LinkedIn optimization, and job placement support.</p>
          </div>
          <SecondaryButton>Learn more</SecondaryButton>
        </div>
      </div>
    </div>
  );
}
