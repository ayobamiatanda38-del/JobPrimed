import React from "react";
import { C, F_DISPLAY, F_BODY, F_MONO, chamfer } from "@/lib/theme";
import { PageHeader, PrimaryButton, SecondaryButton } from "@/components/ui";

function FlowBlock({ index, title, items }: { index: string; title: string; items: string[] }) {
  return (
    <div className="grid md:grid-cols-4 gap-8 py-10 border-t" style={{ borderColor: C.steelLine }}>
      <div className="md:col-span-1">
        <span style={{ fontFamily: F_MONO, color: C.igniteDark, fontSize: 12, fontWeight: 700 }}>{index}</span>
        <h3 className="mt-2 text-2xl" style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink }}>{title}</h3>
      </div>
      <div className="md:col-span-3">
        <ol className="space-y-4">
          {items.map((it, i) => (
            <li key={i} className="flex gap-4">
              <span className="shrink-0 w-7 h-7 flex items-center justify-center text-xs font-bold" style={{ background: C.igniteTint, color: C.igniteDark, fontFamily: F_MONO, ...chamfer(6) }}>
                {i + 1}
              </span>
              <span style={{ fontFamily: F_BODY, color: C.ink, fontSize: 15 }}>{it}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <div>
      <PageHeader eyebrow="How it works" title="Three flows, one continuous draft." sub="Onboarding feeds the editor, the editor feeds the cover letter — you never start from a blank page twice." />
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <FlowBlock index="A" title="Onboarding → First CV" items={[
          "Sign up with email, Google, or LinkedIn.",
          "Choose a starting point: import LinkedIn, upload an existing resume, or start from scratch.",
          "Answer the AI intake questionnaire — target job title, industry, experience level, and an optional job description to tailor against.",
          "The AI generates a first draft and drops you straight into the editor with it pre-filled.",
        ]} />
        <FlowBlock index="B" title="CV Editor" items={[
          "Split-screen layout: form and section editor on the left, live rendered preview on the right.",
          "Sections: Contact Info → Summary → Work Experience → Education → Skills → Certifications → Projects → custom sections.",
          "Per-section AI actions: rewrite, make more concise, add metrics, or tailor to a specific job description.",
          "Switch templates any time — content reflows into the new design instantly.",
          "The ATS checker panel scores the draft in real time and flags issues as you edit.",
          "Export to PDF, DOCX, or a shareable link.",
        ]} />
        <FlowBlock index="C" title="Cover Letter" items={[
          "Pulls directly from your existing CV data plus the target job title or description.",
          "The AI drafts a full letter — you edit inline and pick a tone: formal, conversational, or confident.",
          "Styling automatically matches your chosen CV template.",
        ]} />
      </div>
      <div className="flex justify-center gap-4 pb-24">
        <PrimaryButton href="/mock-interview">See the interview flow</PrimaryButton>
        <SecondaryButton href="/expert-review">See the review flow</SecondaryButton>
      </div>
    </div>
  );
}
