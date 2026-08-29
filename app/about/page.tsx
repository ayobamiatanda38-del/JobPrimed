import React from "react";
import { Lock, Shield, Users } from "lucide-react";
import { C, F_DISPLAY, F_BODY, F_MONO, chamfer } from "@/lib/theme";
import { PageHeader } from "@/components/ui";

const TRUST_POINTS = [
  { icon: Lock, title: "Your data stays yours", body: "Uploaded resumes and interview transcripts are used only to generate your materials — never sold or used to train models on other users' data." },
  { icon: Shield, title: "Delete anytime", body: "Remove your account and everything tied to it from account settings, no support ticket required." },
  { icon: Users, title: "Human-reviewed, when you want it", body: "Certified reviewers — not just the AI — are available any time you want a second opinion before submitting." },
];

export default function AboutPage() {
  return (
    <div>
      <PageHeader eyebrow="About" title="Built by people who've applied cold too many times." sub="JobPrimed exists because most CV tools stop at the document. We wanted the whole run-up: draft, rehearse, and a second opinion." />
      <div className="max-w-6xl mx-auto px-6 pb-16 grid md:grid-cols-3 gap-6">
        {TRUST_POINTS.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.title} className="p-6 bg-white border" style={{ borderColor: C.steelLine, ...chamfer(16) }}>
              <div className="w-11 h-11 flex items-center justify-center mb-4" style={{ background: C.igniteTint, ...chamfer(8) }}>
                <Icon size={20} color={C.ignite} />
              </div>
              <h3 className="mb-2" style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink, fontSize: 16 }}>{p.title}</h3>
              <p style={{ fontFamily: F_BODY, color: C.graphite, fontSize: 14 }}>{p.body}</p>
            </div>
          );
        })}
      </div>
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="p-8" style={{ background: C.steel, ...chamfer(20) }}>
          <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.graphiteLight }} className="mb-2">TEAM — PLACEHOLDER</div>
          <p style={{ fontFamily: F_BODY, color: C.graphite, fontSize: 14 }}>
            Team bios and photos go here before launch. Keeping this section honestly empty rather than inventing names or credentials.
          </p>
        </div>
      </div>
    </div>
  );
}
