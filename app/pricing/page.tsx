import React from "react";
import { CheckCircle2 } from "lucide-react";
import { C, F_DISPLAY, F_BODY, F_MONO, chamfer } from "@/lib/theme";
import { PageHeader, PrimaryButton, SecondaryButton } from "@/components/ui";

const PRICING = [
  { name: "Free", price: "$0", period: "forever", highlight: false, cta: "Start free",
    features: ["1 AI-drafted CV, watermarked export", "Basic ATS check", "2 mock interview questions per session", "Standard templates"] },
  { name: "Premium", price: "$14", period: "per month", highlight: true, cta: "Get Premium",
    features: ["Unlimited AI CVs & cover letters", "Full ATS optimization report", "Unlimited mock interviews", "All templates + inline AI rewrite", "Clean, unwatermarked export"] },
  { name: "Expert Review", price: "$39", period: "one-time add-on", highlight: false, cta: "Add a review",
    features: ["Certified human reviewer", "Inline, line-by-line comments", "Choice of 24h or 72h turnaround", "One revision round included"] },
];

export default function PricingPage() {
  return (
    <div>
      <PageHeader eyebrow="Pricing" title="Free to start. Pay when it counts." sub="Mock interviews run a short free sample on every plan — Premium unlocks unlimited sessions." />
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-6">
          {PRICING.map((tier) => (
            <div key={tier.name} className="p-8 flex flex-col" style={{ background: tier.highlight ? C.ignite : C.ink, ...chamfer(24) }}>
              {tier.highlight && (
                <span className="self-start mb-4 px-2 py-1 text-xs font-bold" style={{ background: C.ink, color: C.paper, fontFamily: F_MONO }}>MOST PRIMED</span>
              )}
              <h3 style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.paper, fontSize: 20 }}>{tier.name}</h3>
              <div className="my-4 flex items-baseline gap-2">
                <span style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.paper, fontSize: 36 }}>{tier.price}</span>
                <span style={{ fontFamily: F_BODY, color: tier.highlight ? "#3A0E05" : "#A6ABB4", fontSize: 13 }}>{tier.period}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 size={16} color={tier.highlight ? C.ink : C.ignite} className="shrink-0 mt-0.5" />
                    <span style={{ fontFamily: F_BODY, color: tier.highlight ? C.ink : "#D5D8DD", fontSize: 13 }}>{f}</span>
                  </li>
                ))}
              </ul>
              <PrimaryButton
                href={`/checkout?plan=${encodeURIComponent(tier.name)}`}
                className="w-full justify-center"
                style={{ background: tier.highlight ? C.ink : C.paper, color: tier.highlight ? C.paper : C.ink }}
              >
                {tier.cta}
              </PrimaryButton>
            </div>
          ))}
        </div>
        <div className="mt-6 p-6 flex items-center justify-between flex-wrap gap-4" style={{ background: C.steel, ...chamfer(16) }}>
          <div>
            <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.igniteDark, fontWeight: 700 }} className="mb-1">UPSELL</div>
            <h4 style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink, fontSize: 16 }}>Career Services</h4>
            <p style={{ fontFamily: F_BODY, color: C.graphite, fontSize: 13 }}>1-on-1 coaching calls, LinkedIn optimization, and job placement support — for once you're already engaged.</p>
          </div>
          <SecondaryButton>Learn more</SecondaryButton>
        </div>
      </div>
    </div>
  );
}
