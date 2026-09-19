import React from "react";
import { Lock, Shield, Users } from "lucide-react";
import { C, F_DISPLAY, F_BODY, rounded } from "@/lib/theme";
import { PageHeader, Card } from "@/components/ui";

const TRUST_POINTS = [
  { icon: Lock, title: "Your data stays yours", body: "Uploaded resumes and interview transcripts are used only to generate your materials — never sold or used to train models on other users' data." },
  { icon: Shield, title: "Delete anytime", body: "Remove your account and everything tied to it from account settings, no support ticket required." },
  { icon: Users, title: "Human-reviewed, when you want it", body: "Certified reviewers — not just the AI — are available any time you want a second opinion before submitting." },
];

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        eyebrow="About"
        title="Built by people who've applied cold too many times."
        sub="JobPrimed exists because most CV tools stop at the document. We wanted the whole run-up: draft, rehearse, and a second opinion."
      />
      <div className="max-w-6xl mx-auto px-6 pb-16 grid md:grid-cols-3 gap-6">
        {TRUST_POINTS.map((p) => {
          const Icon = p.icon;
          return (
            <Card key={p.title} className="p-7">
              <div className="w-12 h-12 flex items-center justify-center mb-4" style={{ background: C.primaryTint, ...rounded(14) }}>
                <Icon size={22} color={C.primary} />
              </div>
              <h3 className="mb-2 text-lg" style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink }}>{p.title}</h3>
              <p style={{ fontFamily: F_BODY, color: C.graphite, fontSize: 14, lineHeight: 1.6 }}>{p.body}</p>
            </Card>
          );
        })}
      </div>
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="p-8" style={{ background: C.surface, ...rounded(20) }}>
          <div style={{ fontFamily: F_DISPLAY, fontWeight: 700, fontSize: 12, color: C.graphiteLight, textTransform: "uppercase", letterSpacing: "0.04em" }} className="mb-2">
            Team — placeholder
          </div>
          <p style={{ fontFamily: F_BODY, color: C.graphite, fontSize: 14, lineHeight: 1.6 }}>
            Team bios and photos go here before launch. Keeping this section honestly empty rather than inventing names or credentials.
          </p>
        </div>
      </div>
    </div>
  );
}
