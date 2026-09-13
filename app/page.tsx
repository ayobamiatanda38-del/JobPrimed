"use client";
import React from "react";
import Link from "next/link";
import { CheckCircle2, Star, Sparkles } from "lucide-react";
import { C, F_DISPLAY, F_BODY, rounded, softShadow } from "@/lib/theme";
import { Eyebrow, PrimaryButton, SecondaryButton, Card } from "@/components/ui";

const TRUST_STATS = [
  { value: "50,000+", label: "CVs primed" },
  { value: "3.2×", label: "more callbacks reported" },
  { value: "9,400+", label: "mock interviews run" },
  { value: "4.8 / 5", label: "avg. reviewer rating" },
];

function ResumeMockup() {
  return (
    <Card className="p-6 sm:p-8 relative">
      <div className="flex items-center gap-4 mb-5">
        <div
          className="w-16 h-16 flex items-center justify-center shrink-0"
          style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.coral})`, ...rounded(999) }}
        >
          <span style={{ fontFamily: F_DISPLAY, fontWeight: 800, color: C.paper, fontSize: 20 }}>AO</span>
        </div>
        <div>
          <div style={{ fontFamily: F_DISPLAY, fontWeight: 800, fontSize: 20, color: C.ink }}>Adaeze Okafor</div>
          <div style={{ fontFamily: F_BODY, fontSize: 13.5, color: C.primaryDark, fontWeight: 600 }}>Senior Trade Marketing Manager</div>
        </div>
      </div>
      <div className="space-y-2 mb-5">
        {[92, 78, 85, 60].map((w, i) => (
          <div key={i} style={{ height: 8, width: `${w}%`, background: C.surface, ...rounded(999) }} />
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mb-5">
        {["Campaign Strategy", "Brand Positioning", "Analytics"].map((s) => (
          <span key={s} className="px-3 py-1 text-xs font-semibold" style={{ background: C.primaryTint, color: C.primaryDark, fontFamily: F_BODY, ...rounded(999) }}>
            {s}
          </span>
        ))}
      </div>
      <div
        className="absolute -top-3 -right-3 px-3 py-1.5 text-xs font-bold flex items-center gap-1"
        style={{ background: C.success, color: C.paper, ...rounded(999), boxShadow: softShadow }}
      >
        <CheckCircle2 size={13} /> ATS 96/100
      </div>
    </Card>
  );
}

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden" style={{ background: C.paper }}>
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <Eyebrow>AI-powered career prep</Eyebrow>
            <h1 className="text-4xl sm:text-5xl md:text-6xl leading-[1.08] mb-6" style={{ fontFamily: F_DISPLAY, fontWeight: 800, color: C.ink, letterSpacing: "-0.02em" }}>
              Build a resume.
              <br />
              <span style={{ color: C.primary }}>Land a job.</span>
            </h1>
            <p className="text-lg mb-8 max-w-md" style={{ fontFamily: F_BODY, color: C.graphite, lineHeight: 1.6 }}>
              JobPrimed drafts your CV, drills you with real mock interviews, and puts a certified human on
              your file before you hit submit. Free to try.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <PrimaryButton href="/signup">Build my resume</PrimaryButton>
              <SecondaryButton href="/how-it-works">See how it works</SecondaryButton>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[C.primary, C.coral, C.success].map((c, i) => (
                  <div key={i} className="w-8 h-8 border-2" style={{ background: c, borderColor: C.paper, ...rounded(999) }} />
                ))}
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill={C.gold} color={C.gold} />
                ))}
              </div>
              <span style={{ fontFamily: F_BODY, fontSize: 13.5, color: C.graphite }}>Trusted by thousands of job seekers</span>
            </div>
          </div>
          <ResumeMockup />
        </div>
      </section>

      <section style={{ background: C.surface }}>
        <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
          {TRUST_STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div style={{ fontFamily: F_DISPLAY, fontWeight: 800, color: C.ink, fontSize: 30 }}>{s.value}</div>
              <div style={{ fontFamily: F_BODY, color: C.graphite, fontSize: 13.5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24" style={{ background: C.paper }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex justify-center">
            <Eyebrow>What's inside</Eyebrow>
          </div>
          <h2 className="text-3xl md:text-4xl mb-14 max-w-xl mx-auto" style={{ fontFamily: F_DISPLAY, fontWeight: 800, color: C.ink, letterSpacing: "-0.02em" }}>
            Everything you need, one platform.
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              { icon: Sparkles, title: "AI Resume Builder", body: "Pick a template, answer a few prompts, and let AI draft every section." },
              { icon: CheckCircle2, title: "ATS Resume Checker", body: "See exactly how parsers read your resume before a recruiter ever does." },
              { icon: Star, title: "Mock Interviews", body: "Practice with role-specific questions and get scored, honest feedback." },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <Card key={f.title} className="p-7">
                  <div className="w-12 h-12 flex items-center justify-center mb-4" style={{ background: C.primaryTint, ...rounded(14) }}>
                    <Icon size={22} color={C.primary} />
                  </div>
                  <h3 className="mb-2 text-lg" style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink }}>{f.title}</h3>
                  <p style={{ fontFamily: F_BODY, color: C.graphite, fontSize: 14, lineHeight: 1.6 }}>{f.body}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
