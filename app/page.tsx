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
    <div className="relative">
      {/* soft color blobs behind the card for depth, instead of a flat white panel */}
      <div
        className="absolute -inset-6 -z-10 hidden sm:block"
        style={{ background: `radial-gradient(60% 60% at 20% 10%, ${C.primaryTint} 0%, transparent 70%), radial-gradient(50% 50% at 90% 90%, ${C.coralTint} 0%, transparent 70%)` }}
      />
      <Card className="p-0 relative overflow-hidden" style={{ maxWidth: 400, marginInline: "auto" }}>
        <div className="flex" style={{ minHeight: 360 }}>
          {/* colored sidebar, mirrors the real CVTemplate component */}
          <div className="w-[34%] px-4 py-6 flex flex-col items-center" style={{ background: `linear-gradient(160deg, ${C.primary}, ${C.primaryDark})` }}>
            <div
              className="w-12 h-12 flex items-center justify-center mb-3"
              style={{ background: "rgba(255,255,255,0.22)", ...rounded(999) }}
            >
              <span style={{ fontFamily: F_DISPLAY, fontWeight: 800, color: C.paper, fontSize: 15 }}>AO</span>
            </div>
            <div className="text-center mb-4" style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.paper, fontSize: 12.5, lineHeight: 1.3 }}>
              Adaeze Okafor
            </div>
            <div className="w-full mb-4">
              <div style={{ fontFamily: F_DISPLAY, fontSize: 8, fontWeight: 700, letterSpacing: "0.06em", color: "rgba(255,255,255,0.65)" }} className="mb-1.5 uppercase">Skills</div>
              {["Campaign Strategy", "Brand Positioning", "Analytics"].map((s) => (
                <div key={s} className="mb-1 px-2 py-1" style={{ background: "rgba(255,255,255,0.16)", ...rounded(999), fontFamily: F_BODY, fontSize: 7.5, color: C.paper }}>
                  {s}
                </div>
              ))}
            </div>
            <div className="w-full">
              <div style={{ fontFamily: F_DISPLAY, fontSize: 8, fontWeight: 700, letterSpacing: "0.06em", color: "rgba(255,255,255,0.65)" }} className="mb-1.5 uppercase">Education</div>
              <div style={{ fontFamily: F_BODY, fontSize: 8, color: "rgba(255,255,255,0.9)", lineHeight: 1.5 }}>B.Sc. Marketing<br />University of Ibadan</div>
            </div>
          </div>
          {/* main column with real-looking copy, not gray placeholder bars */}
          <div className="flex-1 px-5 py-6">
            <div style={{ fontFamily: F_DISPLAY, fontWeight: 800, fontSize: 15, color: C.ink }}>Adaeze Okafor</div>
            <div style={{ fontFamily: F_BODY, fontSize: 10.5, color: C.primaryDark, fontWeight: 600 }} className="mb-3">Senior Trade Marketing Manager</div>
            <div style={{ fontFamily: F_DISPLAY, fontWeight: 700, fontSize: 9, color: C.ink }} className="mb-1.5 pb-1 border-b" >Summary</div>
            <p style={{ fontFamily: F_BODY, fontSize: 8, lineHeight: 1.6, color: C.graphite }} className="mb-4">
              Trade marketing lead with 8 years driving retail activation across 400+ outlets, lifting category share 6pts in FY25.
            </p>
            <div style={{ fontFamily: F_DISPLAY, fontWeight: 700, fontSize: 9, color: C.ink }} className="mb-1.5 pb-1 border-b">Experience</div>
            <div className="mb-1" style={{ fontFamily: F_DISPLAY, fontWeight: 700, fontSize: 8.5, color: C.ink }}>Trade Marketing Manager · Duncan &amp; Vale</div>
            <ul className="mb-1" style={{ paddingLeft: 12, listStyle: "disc", color: C.graphite }}>
              <li style={{ fontFamily: F_BODY, fontSize: 7.5, lineHeight: 1.6 }}>Launched 12 SKUs across West Africa, +18% volume YoY.</li>
              <li style={{ fontFamily: F_BODY, fontSize: 7.5, lineHeight: 1.6 }}>Managed ₦210M annual trade spend across 6 regions.</li>
            </ul>
          </div>
        </div>
        <div
          className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold flex items-center gap-1"
          style={{ background: C.success, color: C.paper, ...rounded(999), boxShadow: softShadow }}
        >
          <CheckCircle2 size={11} /> ATS 96/100
        </div>
      </Card>
      <div
        className="absolute -bottom-4 -left-4 px-3 py-2 flex items-center gap-1.5 hidden sm:flex"
        style={{ background: C.paper, ...rounded(14), boxShadow: softShadow, border: `1px solid ${C.surfaceLine}` }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={12} fill={C.gold} color={C.gold} />
        ))}
        <span style={{ fontFamily: F_BODY, fontSize: 11, color: C.graphite, fontWeight: 600 }} className="ml-1">4.8/5 from job seekers</span>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      <section
        className="relative overflow-hidden"
        style={{ background: `radial-gradient(70% 60% at 85% 0%, ${C.primaryTint} 0%, transparent 60%), ${C.paper}` }}
      >
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
