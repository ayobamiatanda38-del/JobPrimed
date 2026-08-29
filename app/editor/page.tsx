"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { C, F_DISPLAY, F_MONO, chamfer } from "@/lib/theme";
import { PageHeader, PrimaryButton, SecondaryButton } from "@/components/ui";

const TEMPLATES: Record<string, { category: string; accent: string }> = {
  Ledger: { category: "Professional", accent: C.ink },
  Signal: { category: "Simple", accent: C.ignite },
  Foundry: { category: "Creative", accent: C.charge },
  Baseline: { category: "Simple", accent: C.graphite },
  "Ledger Bold": { category: "Professional", accent: C.ink },
  Aperture: { category: "Creative", accent: C.gold },
};

function EditorContent() {
  const params = useSearchParams();
  const templateName = params.get("template") || "Signal";
  const template = TEMPLATES[templateName] || TEMPLATES.Signal;

  return (
    <div>
      <PageHeader eyebrow="Editor preview" title={`Editing with "${templateName}"`} sub="UI preview of the split-screen editor — typing here isn't saved yet." />
      <div className="max-w-6xl mx-auto px-6 pb-24 grid md:grid-cols-2 gap-8">
        <div className="p-6 bg-white border" style={{ borderColor: C.steelLine, ...chamfer(18) }}>
          <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.graphiteLight }} className="mb-4">FORM — SUMMARY SECTION</div>
          <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: C.graphite }}>Professional summary</label>
          <textarea
            defaultValue="Results-driven sales lead with 7+ years across B2B and channel development..."
            rows={5}
            className="w-full mt-2 mb-4 px-3 py-2 border text-sm"
            style={{ borderColor: C.steelLine, fontFamily: "'Inter', sans-serif", ...chamfer(8) }}
          />
          <SecondaryButton>Rewrite this section</SecondaryButton>
        </div>
        <div className="p-6 bg-white border" style={{ borderColor: C.steelLine, ...chamfer(18) }}>
          <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.graphiteLight }} className="mb-4">LIVE PREVIEW — {template.category.toUpperCase()}</div>
          <div style={{ height: 24, width: "45%", background: template.accent, ...chamfer(4) }} className="mb-3" />
          <div className="space-y-2">
            {[100, 92, 88, 70, 95].map((w, i) => <div key={i} style={{ height: 6, width: `${w}%`, background: C.steel }} />)}
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 pb-24 flex gap-4">
        <Link href="/templates" className="inline-flex items-center gap-2 px-6 py-3.5 font-semibold border" style={{ borderColor: C.ink, color: C.ink, fontFamily: F_DISPLAY, ...chamfer(12) }}>
          Back to templates
        </Link>
        <PrimaryButton href="/pricing">Continue to export</PrimaryButton>
      </div>
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense fallback={null}>
      <EditorContent />
    </Suspense>
  );
}
