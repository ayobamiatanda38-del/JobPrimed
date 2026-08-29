"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { C, F_DISPLAY, F_BODY } from "@/lib/theme";
import { PageHeader } from "@/components/ui";

const FAQS = [
  { q: "What happens to my data once I upload it?", a: "Your CV, answers, and interview transcripts are used only to generate your materials. You can delete your account and its data at any time from account settings." },
  { q: "Will my CV actually pass ATS software?", a: "The ATS check scores your draft against parsing patterns common to major applicant tracking systems and flags formatting that tends to break parsers — a strong signal, not a guarantee." },
  { q: "Can I get a refund on Premium or the Expert Review?", a: "Premium can be cancelled any time and refunded within 7 days of charge if unused. Expert Review refunds are available before a reviewer has claimed your document." },
  { q: "How does the Expert Review actually work?", a: "Submit your AI-drafted CV, choose a 24h or 72h turnaround, and a certified reviewer sends back inline comments plus one revised pass." },
  { q: "Is the mock interview graded by a person or the AI?", a: "The AI scores each session against standard interview competencies and gives you a written breakdown. No human reviews mock interviews unless requested separately." },
  { q: "What's free versus paywalled in the mock interview tool?", a: "Free accounts get a 2-question sample per session. Premium unlocks full-length, unlimited sessions across every role type." },
];

export default function FAQPage() {
  const [open, setOpen] = useState(0);
  return (
    <div>
      <PageHeader eyebrow="Questions" title="Before you start." />
      <div className="max-w-3xl mx-auto px-6 pb-24">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} style={{ borderBottom: `1px solid ${C.steelLine}` }}>
              <button onClick={() => setOpen(isOpen ? -1 : i)} className="w-full flex items-center justify-between py-5 text-left gap-4">
                <span style={{ fontFamily: F_DISPLAY, fontWeight: 600, color: C.ink, fontSize: 16 }}>{item.q}</span>
                <ChevronDown size={18} color={C.graphite} style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 150ms", flexShrink: 0 }} />
              </button>
              {isOpen && <p className="pb-5 pr-8" style={{ fontFamily: F_BODY, color: C.graphite, fontSize: 14 }}>{item.a}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
