"use client";
import React from "react";
import Link from "next/link";
import { Lock, Star, ArrowRight } from "lucide-react";
import { C, F_DISPLAY, F_BODY, rounded, softShadow, softShadowHover } from "@/lib/theme";
import type { Template } from "@/lib/templates";

export default function TemplateCard({ t, isPremiumUser }: { t: Template; isPremiumUser: boolean }) {
  const locked = t.tier === "Premium" && !isPremiumUser;

  return (
    <div
      className="relative bg-white overflow-hidden transition-shadow duration-200"
      style={{ boxShadow: softShadow, ...rounded(20) }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = softShadowHover)}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = softShadow)}
    >
      {t.tier === "Premium" && (
        <div
          className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 text-xs font-bold z-10"
          style={{ background: C.gold, color: C.paper, ...rounded(999) }}
        >
          <Star size={10} fill={C.paper} /> PREMIUM
        </div>
      )}

      <div className="p-4 pb-4">
        {/* Mini resume preview — rounded sidebar-style layout echoing real
            resume-builder templates */}
        <div className="mb-3 overflow-hidden flex" style={{ ...rounded(14), background: C.surface, minHeight: 150 }}>
          <div className="w-[34%] p-3 flex flex-col items-center pt-4" style={{ background: t.accent }}>
            <div className="rounded-full flex items-center justify-center mb-2" style={{ width: 32, height: 32, background: "rgba(255,255,255,0.25)" }}>
              <span style={{ fontFamily: F_DISPLAY, fontWeight: 800, color: C.paper, fontSize: 11 }}>
                {t.person.name.split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
            <div style={{ fontFamily: F_BODY, color: "rgba(255,255,255,0.9)", fontSize: 8, textAlign: "center", lineHeight: 1.3 }}>
              {t.skills.slice(0, 3).join(" · ")}
            </div>
          </div>
          <div className="flex-1 p-3">
            <div style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink, fontSize: 10.5 }}>{t.person.name}</div>
            <div style={{ fontFamily: F_BODY, color: C.graphite, fontSize: 8.5 }} className="mb-1.5">{t.person.role}</div>
            <p style={{ fontFamily: F_BODY, color: C.graphite, fontSize: 7.5, lineHeight: 1.35 }} className="mb-1.5">{t.summary}</p>
            {t.highlights.slice(0, 2).map((h) => (
              <div key={h} className="flex items-start gap-1 mb-0.5">
                <span style={{ width: 3, height: 3, borderRadius: 999, background: t.accent, marginTop: 4, flexShrink: 0 }} />
                <span style={{ fontFamily: F_BODY, color: C.graphite, fontSize: 7, lineHeight: 1.3 }}>{h}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-1">
          <span style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink, fontSize: 15 }}>{t.name}</span>
          <span className="px-2 py-0.5 text-[10px] font-semibold" style={{ background: C.primaryTint, color: C.primaryDark, ...rounded(999) }}>
            {t.style}
          </span>
        </div>
        <div style={{ fontFamily: F_BODY, fontSize: 11, color: C.graphiteLight }} className="mb-3">
          {t.profession}
        </div>

        {locked ? (
          <Link
            href="/checkout?plan=Premium"
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 text-sm font-semibold"
            style={{ background: C.gold, color: C.paper, fontFamily: F_DISPLAY, ...rounded(999) }}
          >
            <Lock size={13} /> Unlock with Premium
          </Link>
        ) : (
          <Link
            href={t.slug === "ledger-serif" ? "/editor/ledger-serif" : `/editor?template=${encodeURIComponent(t.name)}`}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 text-sm font-semibold"
            style={{ background: C.primary, color: C.paper, fontFamily: F_DISPLAY, ...rounded(999) }}
          >
            Use template <ArrowRight size={13} />
          </Link>
        )}
      </div>
    </div>
  );
}
