"use client";
import React, { useState } from "react";
import Link from "next/link";
import { C, F_DISPLAY, F_MONO, chamfer } from "@/lib/theme";
import { PageHeader } from "@/components/ui";

const TEMPLATES = [
  { name: "Ledger", category: "Professional", accent: C.ink, layout: "two-col" },
  { name: "Signal", category: "Simple", accent: C.ignite, layout: "one-col" },
  { name: "Foundry", category: "Creative", accent: C.charge, layout: "two-col" },
  { name: "Baseline", category: "Simple", accent: C.graphite, layout: "one-col" },
  { name: "Ledger Bold", category: "Professional", accent: C.ink, layout: "two-col" },
  { name: "Aperture", category: "Creative", accent: C.gold, layout: "one-col" },
];

function TemplatePreview({ t }: { t: (typeof TEMPLATES)[number] }) {
  return (
    <div className="p-5 bg-white border" style={{ borderColor: C.steelLine, ...chamfer(16) }}>
      <div className="mb-4 p-4" style={{ background: C.steel, ...chamfer(10) }}>
        {t.layout === "two-col" ? (
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-1 space-y-2">
              <div style={{ height: 28, background: t.accent, ...chamfer(4) }} />
              {[70, 50, 60].map((w, i) => <div key={i} style={{ height: 5, width: `${w}%`, background: C.steelLine }} />)}
            </div>
            <div className="col-span-2 space-y-2">
              {[100, 90, 95, 40, 85, 70].map((w, i) => <div key={i} style={{ height: 5, width: `${w}%`, background: C.steelLine }} />)}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div style={{ height: 20, width: "50%", background: t.accent, ...chamfer(4) }} />
            {[100, 95, 90, 85, 60, 92, 88].map((w, i) => <div key={i} style={{ height: 5, width: `${w}%`, background: C.steelLine }} />)}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink, fontSize: 15 }}>{t.name}</div>
          <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.graphiteLight }}>{t.category.toUpperCase()}</div>
        </div>
        <Link
          href={`/editor?template=${encodeURIComponent(t.name)}`}
          className="px-3 py-2 text-xs font-semibold"
          style={{ background: C.ink, color: C.paper, fontFamily: F_DISPLAY, ...chamfer(6) }}
        >
          Use template
        </Link>
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  const CATS = ["All", "Simple", "Professional", "Creative"];
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? TEMPLATES : TEMPLATES.filter((t) => t.category === cat);
  return (
    <div>
      <PageHeader eyebrow="Templates" title="Every template is ATS-safe by default." sub="Switch templates any time — your content reflows instantly, nothing gets re-typed." />
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="flex gap-2 mb-10 flex-wrap">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className="px-4 py-2 text-sm font-semibold"
              style={{ fontFamily: F_DISPLAY, background: cat === c ? C.ink : C.steel, color: cat === c ? C.paper : C.graphite, ...chamfer(8) }}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((t) => <TemplatePreview key={t.name} t={t} />)}
        </div>
      </div>
    </div>
  );
}
