"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Clock, CheckCircle2 } from "lucide-react";
import { C, F_DISPLAY, F_BODY, F_MONO, chamfer } from "@/lib/theme";
import { PageHeader, PrimaryButton } from "@/components/ui";

function StatusStep({ label, active, done }: { label: string; active?: boolean; done?: boolean }) {
  return (
    <div className="flex-1 flex flex-col items-center text-center">
      <div className="w-9 h-9 flex items-center justify-center mb-2" style={{ background: done ? C.ignite : active ? C.ink : C.steel, color: done || active ? C.paper : C.graphiteLight, ...chamfer(6) }}>
        {done ? <CheckCircle2 size={16} /> : <Clock size={16} />}
      </div>
      <span style={{ fontFamily: F_MONO, fontSize: 11, color: active ? C.ink : C.graphiteLight, fontWeight: active ? 700 : 500 }}>{label}</span>
    </div>
  );
}

export default function ExpertReviewPage() {
  const [turnaround, setTurnaround] = useState("72hr");
  const [level, setLevel] = useState("Standard");
  const [addCall, setAddCall] = useState(false);

  const checkoutHref = `/checkout?plan=${encodeURIComponent("Expert Review")}&turnaround=${encodeURIComponent(turnaround)}&level=${encodeURIComponent(level)}&call=${addCall ? "1" : "0"}`;

  return (
    <div>
      <PageHeader eyebrow="Paid add-on" title="A hiring manager's eye, before they see it." sub="Certified reviewers critique your AI draft line by line and hand back a revised version." />
      <div className="max-w-6xl mx-auto px-6 pb-16 grid md:grid-cols-2 gap-10">
        <div className="p-6 bg-white border" style={{ borderColor: C.steelLine, ...chamfer(18) }}>
          <h3 className="mb-4" style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink, fontSize: 18 }}>Order a review</h3>
          <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.graphiteLight }} className="mb-2">TURNAROUND</div>
          <div className="flex gap-2 mb-5">
            {["72hr", "24hr rush"].map((t) => (
              <button key={t} onClick={() => setTurnaround(t)} className="flex-1 py-2 text-sm font-semibold"
                style={{ fontFamily: F_DISPLAY, background: turnaround === t ? C.ink : C.steel, color: turnaround === t ? C.paper : C.graphite, ...chamfer(8) }}>
                {t}
              </button>
            ))}
          </div>
          <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.graphiteLight }} className="mb-2">REVIEWER LEVEL</div>
          <div className="flex gap-2 mb-6">
            {["Standard", "Senior"].map((l) => (
              <button key={l} onClick={() => setLevel(l)} className="flex-1 py-2 text-sm font-semibold"
                style={{ fontFamily: F_DISPLAY, background: level === l ? C.ink : C.steel, color: level === l ? C.paper : C.graphite, ...chamfer(8) }}>
                {l}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 mb-6" style={{ fontFamily: F_BODY, fontSize: 13, color: C.ink }}>
            <input type="checkbox" checked={addCall} onChange={(e) => setAddCall(e.target.checked)} /> Add a 1-on-1 feedback call
          </label>
          <PrimaryButton href={checkoutHref} className="w-full justify-center">Continue to payment</PrimaryButton>
          <p className="mt-3 text-center" style={{ fontFamily: F_MONO, fontSize: 11, color: C.graphiteLight }}>Leads to checkout — no real payment is processed yet.</p>
        </div>
        <div className="p-6 bg-white border" style={{ borderColor: C.steelLine, ...chamfer(18) }}>
          <h3 className="mb-6" style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink, fontSize: 18 }}>Status tracker</h3>
          <div className="flex items-center mb-10">
            <StatusStep label="Submitted" done />
            <div style={{ flex: 1, height: 2, background: C.ignite }} />
            <StatusStep label="In review" active />
            <div style={{ flex: 1, height: 2, background: C.steelLine }} />
            <StatusStep label="Delivered" />
          </div>
          <div className="p-4" style={{ background: C.steel, ...chamfer(10) }}>
            <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.graphiteLight }} className="mb-1">CURRENT STATUS</div>
            <p style={{ fontFamily: F_BODY, fontSize: 14, color: C.ink }}>Your {level.toLowerCase()} reviewer picked this up 6 hours ago — expected delivery within {turnaround}.</p>
          </div>
          <p className="mt-6" style={{ fontFamily: F_BODY, fontSize: 13, color: C.graphite }}>
            When feedback is delivered, you'll get inline comments directly on your CV plus a short written summary — and one round of revisions is included.
          </p>
        </div>
      </div>
    </div>
  );
}
