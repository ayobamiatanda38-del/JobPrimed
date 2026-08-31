"use client";
import React, { useEffect, useState } from "react";
import { C, F_DISPLAY } from "@/lib/theme";
import { PageHeader } from "@/components/ui";
import TemplateCard from "@/components/TemplateCard";
import { TEMPLATES, PROFESSIONS } from "@/lib/templates";

type SessionUser = { id: number; email: string; name: string | null; plan: "free" | "premium" };

export default function TemplatesPage() {
  const [profession, setProfession] = useState("All");
  const [user, setUser] = useState<SessionUser | null | undefined>(undefined);

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => setUser(d.user));
  }, []);

  const filtered = profession === "All" ? TEMPLATES : TEMPLATES.filter((t) => t.profession === profession);
  const isPremiumUser = user?.plan === "premium";

  return (
    <div>
      <PageHeader
        eyebrow="Templates"
        title="Every template is ATS-safe by default."
        sub="Nine templates across nine professions — switch any time, and your content reflows instantly."
      />
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="flex gap-2 mb-10 flex-wrap">
          {PROFESSIONS.map((p) => (
            <button
              key={p}
              onClick={() => setProfession(p)}
              className="px-4 py-2 text-sm font-semibold"
              style={{
                fontFamily: F_DISPLAY,
                background: profession === p ? C.ink : C.steel,
                color: profession === p ? C.paper : C.graphite,
                clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)",
              }}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((t) => <TemplateCard key={t.slug} t={t} isPremiumUser={isPremiumUser} />)}
        </div>
      </div>
    </div>
  );
}
