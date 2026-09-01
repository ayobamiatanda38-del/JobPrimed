"use client";
import React from "react";
import Link from "next/link";
import { Lock, Star, ArrowRight } from "lucide-react";
import { C, F_DISPLAY, F_BODY, F_MONO, chamfer } from "@/lib/theme";
import type { Template } from "@/lib/templates";

function tint(hex: string, alpha: string) {
  // Best-effort: return the hex with an alpha suffix works for most modern browsers
  // when hex is 6-digit; falls back gracefully otherwise.
  return hex.length === 7 ? `${hex}${alpha}` : hex;
}

export default function TemplateCard({
  t,
  isPremiumUser,
}: {
  t: Template;
  isPremiumUser: boolean;
}) {
  const locked = t.tier === "Premium" && !isPremiumUser;

  return (
    <div
      className="relative bg-white border overflow-hidden"
      style={{
        borderColor: t.tier === "Premium" ? C.gold : C.steelLine,
        borderWidth: t.tier === "Premium" ? 1.5 : 1,
        ...chamfer(18),
      }}
    >
      {t.tier === "Premium" && (
        <div
          className="absolute top-0 right-0 flex items-center gap-1 px-2.5 py-1 text-xs font-bold z-10"
          style={{ background: C.gold, color: C.ink, fontFamily: F_MONO }}
        >
          <Star size={11} fill={C.ink} /> PREMIUM
        </div>
      )}

      {/* Colorful mini-CV preview — real sections, not abstract bars */}
      <div className="p-3 pb-3">
        <div className="mb-3 overflow-hidden" style={chamfer(10)}>
          {/* Header band in the template's accent color */}
          <div className="px-3 py-2.5" style={{ background: t.accent }}>
            <div style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.paper, fontSize: 12 }}>
              {t.person.name}
            </div>
            <div style={{ fontFamily: F_BODY, color: "rgba(255,255,255,0.85)", fontSize: 9.5 }}>
              {t.person.role}
            </div>
          </div>

          <div className="p-2.5" style={{ background: C.steel }}>
            {/* Summary */}
            <div style={{ fontFamily: F_MONO, fontSize: 7.5, color: t.accent, fontWeight: 700 }} className="mb-0.5">
              SUMMARY
            </div>
            <p style={{ fontFamily: F_BODY, color: C.ink, fontSize: 9, lineHeight: 1.35 }} className="mb-2">
              {t.summary}
            </p>

            {/* Experience */}
            <div style={{ fontFamily: F_MONO, fontSize: 7.5, color: t.accent, fontWeight: 700 }} className="mb-0.5">
              EXPERIENCE
            </div>
            <ul className="mb-2">
              {t.highlights.slice(0, 2).map((h) => (
                <li key={h} className="flex items-start gap-1">
                  <span style={{ color: t.accent, fontSize: 9 }}>•</span>
                  <span style={{ fontFamily: F_BODY, color: C.graphite, fontSize: 8.5, lineHeight: 1.35 }}>{h}</span>
                </li>
              ))}
            </ul>

            {/* Skills as colorful chips */}
            <div style={{ fontFamily: F_MONO, fontSize: 7.5, color: t.accent, fontWeight: 700 }} className="mb-1">
              SKILLS
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              {t.skills.slice(0, 4).map((s) => (
                <span
                  key={s}
                  className="px-1.5 py-0.5"
                  style={{ background: tint(t.accent, "22"), color: t.accent, fontFamily: F_BODY, fontSize: 7.5, fontWeight: 600 }}
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Education */}
            <div style={{ fontFamily: F_MONO, fontSize: 7.5, color: t.accent, fontWeight: 700 }} className="mb-0.5">
              EDUCATION
            </div>
            <p style={{ fontFamily: F_BODY, color: C.graphite, fontSize: 8.5, lineHeight: 1.3 }} className="mb-1">
              {t.education}
            </p>

            {t.extras && (
              <div className="flex flex-wrap gap-1 pt-1.5 mt-1 border-t" style={{ borderColor: C.steelLine }}>
                {t.extras.slice(0, 3).map((e) => (
                  <span
                    key={e}
                    className="px-1.5 py-0.5"
                    style={{ background: C.gold, color: C.ink, fontFamily: F_MONO, fontSize: 7.5, fontWeight: 700 }}
                  >
                    {e}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mb-1">
          <span style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink, fontSize: 14 }}>{t.name}</span>
        </div>
        <div style={{ fontFamily: F_MONO, fontSize: 10, color: C.graphiteLight }} className="mb-3">
          {t.profession.toUpperCase()}
        </div>

        {locked ? (
          <Link
            href="/checkout?plan=Premium"
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold"
            style={{ background: C.gold, color: C.ink, fontFamily: F_DISPLAY, ...chamfer(6) }}
          >
            <Lock size={12} /> Unlock with Premium
          </Link>
        ) : (
          <Link
            href={`/editor?template=${encodeURIComponent(t.name)}`}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold"
            style={{ background: t.accent, color: C.paper, fontFamily: F_DISPLAY, ...chamfer(6) }}
          >
            Use template <ArrowRight size={12} />
          </Link>
        )}
      </div>
    </div>
  );
}
