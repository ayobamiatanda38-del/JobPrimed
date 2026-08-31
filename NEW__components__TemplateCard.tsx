"use client";
import React from "react";
import Link from "next/link";
import { Lock, Star, ArrowRight } from "lucide-react";
import { C, F_DISPLAY, F_BODY, F_MONO, chamfer } from "@/lib/theme";
import type { Template } from "@/lib/templates";

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
          className="absolute top-0 right-0 flex items-center gap-1 px-2.5 py-1 text-xs font-bold"
          style={{ background: C.gold, color: C.ink, fontFamily: F_MONO }}
        >
          <Star size={11} fill={C.ink} /> PREMIUM
        </div>
      )}

      {/* Mini resume preview with real content */}
      <div className="p-4 pb-3">
        <div className="mb-3 p-3" style={{ background: C.steel, ...chamfer(10) }}>
          <div className="flex items-center gap-2 mb-2">
            <div
              className="rounded-none shrink-0"
              style={{ width: 22, height: 22, background: t.accent, ...chamfer(4) }}
            />
            <div className="min-w-0">
              <div
                className="truncate"
                style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink, fontSize: 12 }}
              >
                {t.person.name}
              </div>
              <div className="truncate" style={{ fontFamily: F_BODY, color: C.graphite, fontSize: 10 }}>
                {t.person.role}
              </div>
            </div>
          </div>
          <p
            className="mb-2"
            style={{ fontFamily: F_BODY, color: C.ink, fontSize: 10, lineHeight: 1.4 }}
          >
            {t.summary}
          </p>
          <ul className="space-y-1 mb-2">
            {t.highlights.map((h) => (
              <li key={h} className="flex items-start gap-1.5">
                <span style={{ color: t.accent, fontSize: 10, lineHeight: "14px" }}>—</span>
                <span style={{ fontFamily: F_BODY, color: C.graphite, fontSize: 9.5, lineHeight: 1.4 }}>{h}</span>
              </li>
            ))}
          </ul>
          {t.extras && (
            <div className="flex flex-wrap gap-1 pt-1.5 border-t" style={{ borderColor: C.steelLine }}>
              {t.extras.map((e) => (
                <span
                  key={e}
                  className="px-1.5 py-0.5"
                  style={{ background: C.igniteTint, color: C.igniteDark, fontFamily: F_MONO, fontSize: 8.5 }}
                >
                  {e}
                </span>
              ))}
            </div>
          )}
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
            style={{ background: C.ink, color: C.paper, fontFamily: F_DISPLAY, ...chamfer(6) }}
          >
            Use template <ArrowRight size={12} />
          </Link>
        )}
      </div>
    </div>
  );
}
