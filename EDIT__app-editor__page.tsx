"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, Star } from "lucide-react";
import { C, F_DISPLAY, F_MONO, chamfer } from "@/lib/theme";
import { PageHeader, PrimaryButton, SecondaryButton } from "@/components/ui";
import { findTemplate } from "@/lib/templates";

type SessionUser = { id: number; email: string; name: string | null; plan: "free" | "premium" };

function EditorContent() {
  const params = useSearchParams();
  const templateName = params.get("template") || "Signal";
  const template = findTemplate(templateName);
  const [user, setUser] = useState<SessionUser | null | undefined>(undefined);

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => setUser(d.user));
  }, []);

  const isPremiumUser = user?.plan === "premium";
  const locked = template.tier === "Premium" && !isPremiumUser;

  if (user === undefined) return null;

  if (locked) {
    return (
      <div>
        <PageHeader eyebrow="Editor" title={`"${template.name}" is a Premium template.`} sub="Upgrade to unlock this template and every other Premium design." />
        <div className="max-w-lg mx-auto px-6 pb-24">
          <div className="p-8 text-center bg-white border" style={{ borderColor: C.gold, borderWidth: 1.5, ...chamfer(20) }}>
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center" style={{ background: C.gold, ...chamfer(12) }}>
              <Lock size={22} color={C.ink} />
            </div>
            <h3 className="mb-2" style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink, fontSize: 18 }}>
              {template.name} · {template.profession}
            </h3>
            <p className="mb-6" style={{ fontFamily: "'Inter', sans-serif", color: C.graphite, fontSize: 13 }}>
              {template.summary}
            </p>
            <PrimaryButton href="/checkout?plan=Premium" className="w-full justify-center" style={{ background: C.gold, color: C.ink }}>
              Unlock with Premium
            </PrimaryButton>
            <Link href="/templates" className="block mt-4 text-sm" style={{ color: C.graphite }}>
              Back to templates
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader eyebrow="Editor preview" title={`Editing with "${template.name}"`} sub="UI preview of the split-screen editor — typing here isn't saved yet." />
      <div className="max-w-6xl mx-auto px-6 pb-24 grid md:grid-cols-2 gap-8">
        <div className="p-6 bg-white border" style={{ borderColor: C.steelLine, ...chamfer(18) }}>
          <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.graphiteLight }} className="mb-4">FORM — SUMMARY SECTION</div>
          <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: C.graphite }}>Professional summary</label>
          <textarea
            defaultValue={template.summary}
            rows={5}
            className="w-full mt-2 mb-4 px-3 py-2 border text-sm"
            style={{ borderColor: C.steelLine, fontFamily: "'Inter', sans-serif", ...chamfer(8) }}
          />
          <SecondaryButton>Rewrite this section</SecondaryButton>
        </div>
        <div className="p-6 bg-white border" style={{ borderColor: C.steelLine, ...chamfer(18) }}>
          <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.graphiteLight }} className="mb-4 flex items-center gap-2">
            LIVE PREVIEW — {template.profession.toUpperCase()}
            {template.tier === "Premium" && <Star size={12} color={C.gold} fill={C.gold} />}
          </div>
          <div style={{ height: 24, width: "55%", background: template.accent, ...chamfer(4) }} className="mb-1" />
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: C.graphite }} className="mb-3">{template.person.name} · {template.person.role}</div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: C.ink }} className="mb-3">{template.summary}</p>
          <ul className="space-y-1.5 mb-3">
            {template.highlights.map((h) => (
              <li key={h} style={{ fontFamily: "'Inter', sans-serif", fontSize: 10.5, color: C.graphite }}>— {h}</li>
            ))}
          </ul>
          {template.extras && (
            <div className="flex flex-wrap gap-1 pt-2 border-t" style={{ borderColor: C.steelLine }}>
              {template.extras.map((e) => (
                <span key={e} className="px-1.5 py-0.5" style={{ background: C.igniteTint, color: C.igniteDark, fontFamily: F_MONO, fontSize: 9 }}>{e}</span>
              ))}
            </div>
          )}
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
