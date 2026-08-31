"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Upload, Sparkles, Mic, Award, FileText, MessageSquare, Star, ChevronRight } from "lucide-react";
import { C, F_DISPLAY, F_BODY, F_MONO, chamfer } from "@/lib/theme";
import { Eyebrow, PrimaryButton, SecondaryButton } from "@/components/ui";

const TRUST_STATS = [
  { value: "50,000+", label: "CVs primed" },
  { value: "3.2×", label: "more callbacks reported" },
  { value: "9,400+", label: "mock interviews run" },
  { value: "4.8 / 5", label: "avg. reviewer rating" },
];

const STEPS = [
  { n: "01", icon: Upload, title: "Import or start fresh", body: "Pull in your LinkedIn profile or an old resume, or start from a blank primer." },
  { n: "02", icon: Sparkles, title: "AI drafts your CV & letter", body: "Answer a few targeting questions and the AI writes a tailored CV and cover letter, ATS-checked as it goes." },
  { n: "03", icon: Mic, title: "Practice under pressure", body: "Run a mock interview scoped to the exact role, with real-time feedback." },
  { n: "04", icon: Award, title: "Get a human's eye on it", body: "Optionally send the AI draft to a certified reviewer before you submit." },
];

const FEATURES = [
  { icon: FileText, tag: "Core", title: "AI CV & Cover Letter Drafting", body: "Paste in a job description and the AI re-weights your existing experience toward what that posting is scoring for, while checking every version against common ATS parsers." },
  { icon: MessageSquare, tag: "Flagship", title: "AI Mock Interview Simulator", body: "A conversational interview built around the role and industry you're targeting — with feedback after every answer and a scored report at the end." },
  { icon: Award, tag: "Paid add-on", title: "Expert Human Review", body: "A certified reviewer reads your AI-drafted CV the way a hiring manager would, then sends back inline comments and a revised version." },
];

const TESTIMONIALS = [
  { name: "Amara O.", role: "Trade Marketing Manager", quote: "The mock interview caught a gap in how I was framing my numbers — fixed it before the real thing.", stars: 5 },
  { name: "Daniel K.", role: "Business Development Lead", quote: "Rewrote my CV around the job post in a few minutes. The ATS score actually moved.", stars: 5 },
  { name: "Priya S.", role: "Regional Sales Executive", quote: "Expert review turned around in a day and the comments were specific, not generic.", stars: 4 },
];

function PrimingMeter() {
  const SEGMENTS = 20;
  const [charge, setCharge] = useState(0);
  const [fired, setFired] = useState(false);

  useEffect(() => {
    const reduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setCharge(100); setFired(true); return; }
    let raf: number, start: number | null = null;
    const CHARGE_MS = 2200, HOLD_MS = 1400, RESET_MS = 500;
    function tick(ts: number) {
      if (start === null) start = ts;
      const elapsed = ts - start;
      if (elapsed <= CHARGE_MS) { setCharge(Math.min(100, (elapsed / CHARGE_MS) * 100)); setFired(false); }
      else if (elapsed <= CHARGE_MS + HOLD_MS) { setCharge(100); setFired(true); }
      else if (elapsed <= CHARGE_MS + HOLD_MS + RESET_MS) { setCharge(0); setFired(false); }
      else { start = null; }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const filled = Math.round((charge / 100) * SEGMENTS);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span style={{ fontFamily: F_MONO, fontSize: 11, color: C.graphite, letterSpacing: 1 }}>PRIMING CANDIDATE</span>
        <span style={{ fontFamily: F_MONO, fontSize: 11, color: fired ? C.ignite : C.graphite, fontWeight: 700 }}>
          {fired ? "READY" : `${Math.round(charge)}%`}
        </span>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: SEGMENTS }).map((_, i) => (
          <div key={i} style={{ height: 22, flex: 1, background: i < filled ? (fired ? C.ignite : C.ink) : C.steelLine, transition: "background 120ms linear" }} />
        ))}
      </div>
    </div>
  );
}

function CVMockup() {
  return (
    <div className="relative w-full bg-white border p-6 sm:p-8" style={{ borderColor: C.steelLine, ...chamfer(20) }}>
      <div className="absolute top-0 right-0 px-3 py-1 text-xs font-bold" style={{ background: C.ink, color: C.paper, fontFamily: F_MONO, transform: "translateY(-50%)" }}>
        ATS 96/100
      </div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <div style={{ fontFamily: F_DISPLAY, fontWeight: 700, fontSize: 20, color: C.ink }}>Adaeze Okafor</div>
          <div style={{ fontFamily: F_BODY, fontSize: 13, color: C.graphite }}>Senior Trade Marketing Manager</div>
        </div>
        <div style={{ width: 44, height: 44, background: C.steel, ...chamfer(8) }} />
      </div>
      <div className="space-y-2 mb-6">
        {[92, 78, 85, 60].map((w, i) => <div key={i} style={{ height: 7, width: `${w}%`, background: C.steel }} />)}
      </div>
      <div className="pt-4 border-t" style={{ borderColor: C.steelLine, fontFamily: F_MONO, fontSize: 11, color: C.graphiteLight }}>
        AI-DRAFTED · TAILORED TO: "REGIONAL SALES MANAGER — FMCG"
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden" style={{ background: C.paper }}>
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <Eyebrow>AI-powered career prep</Eyebrow>
            <h1 className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] mb-6" style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink }}>
              Get primed for<br /><span style={{ color: C.ignite }}>your next role.</span>
            </h1>
            <p className="text-lg mb-8 max-w-md" style={{ fontFamily: F_BODY, color: C.graphite }}>
              JobPrimed drafts your CV and cover letter, drills you with role-specific mock interviews, and — when you want it — puts a certified human on your file before you hit submit.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <PrimaryButton href="/signup">Build my CV</PrimaryButton>
              <SecondaryButton href="/how-it-works">See how it works</SecondaryButton>
            </div>
            <div className="max-w-sm"><PrimingMeter /></div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 -z-10 hidden md:block" style={{ background: C.igniteTint, ...chamfer(28) }} />
            <CVMockup />
          </div>
        </div>
        <div className="w-full h-6" style={{ background: C.ink, clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }} />
      </section>

      <section style={{ background: C.ink }}>
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {TRUST_STATS.map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.paper, fontSize: 28 }}>{s.value}</div>
              <div style={{ fontFamily: F_BODY, color: "#A6ABB4", fontSize: 13 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div className="max-w-6xl mx-auto px-6 pb-6">
          <p style={{ fontFamily: F_MONO, fontSize: 11, color: "#6B7180" }}>* Illustrative placeholder metrics — to be replaced with verified figures before launch.</p>
        </div>
      </section>

      <section className="py-24" style={{ background: C.paper }}>
        <div className="max-w-6xl mx-auto px-6">
          <Eyebrow>The sequence</Eyebrow>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-16">
            <h2 className="text-3xl md:text-4xl max-w-xl" style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink }}>
              Four steps. No wasted motion.
            </h2>
            <Link href="/how-it-works" className="flex items-center gap-1" style={{ fontFamily: F_DISPLAY, fontWeight: 600, color: C.ignite, fontSize: 14 }}>
              Full walkthrough <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid md:grid-cols-4 gap-px" style={{ background: C.steelLine }}>
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.n} className="p-6" style={{ background: C.paper }}>
                  <div style={{ fontFamily: F_MONO, color: C.igniteDark, fontSize: 13, fontWeight: 700 }}>{step.n}</div>
                  <div className="w-11 h-11 flex items-center justify-center my-4" style={{ background: C.igniteTint, ...chamfer(8) }}>
                    <Icon size={20} color={C.ignite} />
                  </div>
                  <h3 className="mb-2" style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink, fontSize: 17 }}>{step.title}</h3>
                  <p style={{ fontFamily: F_BODY, color: C.graphite, fontSize: 14 }}>{step.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: C.steel }}>
        <div className="max-w-6xl mx-auto px-6">
          <Eyebrow>What's inside</Eyebrow>
          <h2 className="text-3xl md:text-4xl mb-16 max-w-xl" style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink }}>
            Built past the resume.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="p-6 bg-white" style={chamfer(20)}>
                  <div className="w-12 h-12 flex items-center justify-center mb-4" style={{ background: C.ink, ...chamfer(10) }}>
                    <Icon size={22} color={C.paper} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ fontFamily: F_MONO, color: C.igniteDark }}>{f.tag}</span>
                  <h3 className="mt-2 mb-3 text-lg" style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink }}>{f.title}</h3>
                  <p style={{ fontFamily: F_BODY, color: C.graphite, fontSize: 14 }}>{f.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: C.paper }}>
        <div className="max-w-6xl mx-auto px-6">
          <Eyebrow>Sample voices</Eyebrow>
          <h2 className="text-3xl md:text-4xl mb-2" style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink }}>
            What primed candidates say.
          </h2>
          <p className="mb-10" style={{ fontFamily: F_MONO, fontSize: 11, color: C.graphiteLight }}>
            SAMPLE / PLACEHOLDER CONTENT — TO BE REPLACED WITH REAL USER TESTIMONIALS BEFORE LAUNCH
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="p-6 border" style={{ borderColor: C.steelLine, ...chamfer(16) }}>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill={i < t.stars ? C.gold : "none"} color={i < t.stars ? C.gold : C.steelLine} />
                  ))}
                </div>
                <p className="mb-6" style={{ fontFamily: F_BODY, color: C.ink, fontSize: 14 }}>"{t.quote}"</p>
                <div style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink, fontSize: 14 }}>{t.name}</div>
                <div style={{ fontFamily: F_BODY, color: C.graphite, fontSize: 12 }}>{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
