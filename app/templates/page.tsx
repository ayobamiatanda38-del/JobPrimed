"use client";
import React, { useEffect, useState } from "react";
import { C, F_DISPLAY, F_BODY, rounded } from "@/lib/theme";
import { PageHeader } from "@/components/ui";
import TemplateCard from "@/components/TemplateCard";
import { TEMPLATES, PROFESSIONS, STYLES } from "@/lib/templates";

type SessionUser = { id: number; email: string; name: string | null; plan: "free" | "premium" };

function FilterRow({
  label,
  options,
  active,
  onSelect,
}: {
  label: string;
  options: readonly string[];
  active: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div className="mb-6">
      <div style={{ fontFamily: F_BODY, fontSize: 12, fontWeight: 600, color: C.graphiteLight }} className="mb-2">
        {label}
      </div>
      <div className="flex gap-2 flex-wrap">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className="px-4 py-2 text-sm font-semibold transition-colors"
            style={{
              fontFamily: F_DISPLAY,
              background: active === opt ? C.ink : C.surface,
              color: active === opt ? C.paper : C.graphite,
              ...rounded(999),
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  const [profession, setProfession] = useState("All");
  const [styleFilter, setStyleFilter] = useState<(typeof STYLES)[number]>("All");
  const [user, setUser] = useState<SessionUser | null | undefined>(undefined);

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => setUser(d.user)).catch(() => setUser(null));
  }, []);

  const filtered = TEMPLATES.filter((t) => {
    const matchesProfession = profession === "All" || t.profession === profession;
    const matchesStyle = styleFilter === "All" || (styleFilter === "Free" ? t.tier === "Free" : t.style === styleFilter);
    return matchesProfession && matchesStyle;
  });

  const isPremiumUser = user?.plan === "premium";

  return (
    <div style={{ background: C.paper }}>
      <PageHeader
        eyebrow="Templates"
        title="Professional templates for any profession."
        sub="Browse by style or by profession — every template is ATS-safe by default."
      />
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <FilterRow label="STYLE" options={STYLES} active={styleFilter} onSelect={(v) => setStyleFilter(v as (typeof STYLES)[number])} />
        <FilterRow label="PROFESSION" options={PROFESSIONS} active={profession} onSelect={setProfession} />

        {filtered.length === 0 ? (
          <p style={{ fontFamily: F_BODY, fontSize: 14, color: C.graphiteLight }}>
            No templates match that combination — try a different Style or Profession.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((t) => (
              <TemplateCard key={t.slug} t={t} isPremiumUser={isPremiumUser} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
