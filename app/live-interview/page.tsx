"use client";
import React, { useEffect, useRef, useState } from "react";
import { Mic, MicOff, PhoneOff, Star, Lock, Sparkles } from "lucide-react";
import { C, F_DISPLAY, F_BODY, rounded } from "@/lib/theme";
import { PageHeader, PrimaryButton, Card } from "@/components/ui";

type SessionUser = { id: number; email: string; name: string | null; plan: "free" | "premium" };

const SCRIPT: { speaker: "avatar" | "you"; text: string }[] = [
  { speaker: "avatar", text: "Hi — I'll be your interviewer today. Let's start: walk me through a deal you had to rescue." },
  { speaker: "you", text: "(listening for your answer…)" },
  { speaker: "avatar", text: "Good. What made you confident the client would come back to the table?" },
  { speaker: "you", text: "(listening for your answer…)" },
  { speaker: "avatar", text: "Understood — let's move to a harder one. Tell me about a target you missed." },
];

function AvatarTile({ speaking, listening }: { speaking: boolean; listening: boolean }) {
  return (
    <div className="relative aspect-video w-full flex items-center justify-center overflow-hidden" style={{ background: C.ink, ...rounded(24) }}>
      <div className="relative">
        <div className="rounded-full" style={{ width: 96, height: 96, background: C.primaryTint, boxShadow: speaking ? `0 0 0 8px rgba(108,92,231,0.25)` : "none", transition: "box-shadow 200ms" }} />
        <div className="absolute inset-0 rounded-full flex items-center justify-center" style={{ color: C.primary, fontFamily: F_DISPLAY, fontWeight: 800, fontSize: 28 }}>AI</div>
      </div>
      <div className="absolute bottom-3 left-3 px-3 py-1 text-xs font-semibold flex items-center gap-1.5" style={{ background: "rgba(0,0,0,0.5)", color: C.paper, fontFamily: F_BODY, ...rounded(999) }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: speaking ? C.coral : listening ? C.success : C.graphiteLight, display: "inline-block" }} />
        {speaking ? "Speaking" : listening ? "Listening" : "Idle"}
      </div>
      <div className="absolute top-3 right-3 px-3 py-1 text-xs font-bold" style={{ background: C.gold, color: C.paper, fontFamily: F_BODY, ...rounded(999) }}>
        PREVIEW — NOT LIVE
      </div>
    </div>
  );
}

function LiveSession() {
  const [step, setStep] = useState(-1);
  const [muted, setMuted] = useState(false);
  const [ended, setEnded] = useState(false);
  const timerRef = useRef<number | null>(null);

  const start = () => {
    setEnded(false);
    setStep(0);
  };

  useEffect(() => {
    if (step < 0 || step >= SCRIPT.length || ended) return;
    timerRef.current = window.setTimeout(() => setStep((s) => s + 1), 2200);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [step, ended]);

  const current = step >= 0 && step < SCRIPT.length ? SCRIPT[step] : null;
  const speaking = current?.speaker === "avatar";
  const listening = current?.speaker === "you";

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <AvatarTile speaking={!!speaking && !ended} listening={!!listening && !ended} />
        <div className="flex items-center justify-center gap-3 mt-4">
          <button onClick={() => setMuted((m) => !m)} className="w-11 h-11 flex items-center justify-center" style={{ background: muted ? C.coralTint : C.surface, ...rounded(999) }} aria-label="Toggle mic">
            {muted ? <MicOff size={18} color={C.coral} /> : <Mic size={18} color={C.ink} />}
          </button>
          {step < 0 || ended ? (
            <PrimaryButton onClick={start} style={{ background: C.gold }}>
              {ended ? "Restart preview" : "Start session (preview)"}
            </PrimaryButton>
          ) : (
            <button onClick={() => setEnded(true)} className="w-11 h-11 flex items-center justify-center" style={{ background: C.coral, ...rounded(999) }} aria-label="End session">
              <PhoneOff size={18} color={C.paper} />
            </button>
          )}
        </div>
        <p className="text-center mt-3" style={{ fontFamily: F_BODY, fontSize: 11, color: C.graphiteLight }}>
          Scripted preview — no real microphone, speech recognition, or avatar rendering is connected yet.
        </p>
      </div>
      <Card className="p-4" style={{ maxHeight: 340, overflowY: "auto" }}>
        <div style={{ fontFamily: F_BODY, fontSize: 11, color: C.graphiteLight, fontWeight: 600 }} className="mb-3">LIVE TRANSCRIPT</div>
        {step < 0 && <p style={{ fontFamily: F_BODY, fontSize: 13, color: C.graphiteLight }}>Start the session to see captions appear here.</p>}
        {SCRIPT.slice(0, step + 1).map((line, i) => (
          <div key={i} className="mb-3">
            <div style={{ fontFamily: F_BODY, fontSize: 10, color: line.speaker === "avatar" ? C.primaryDark : C.coral, fontWeight: 700 }} className="mb-0.5">
              {line.speaker === "avatar" ? "AI INTERVIEWER" : "YOU"}
            </div>
            <p style={{ fontFamily: F_BODY, fontSize: 13, color: C.ink }}>{line.text}</p>
          </div>
        ))}
      </Card>
    </div>
  );
}

export default function LiveInterviewPage() {
  const [user, setUser] = useState<SessionUser | null | undefined>(undefined);

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => setUser(d.user)).catch(() => setUser(null));
  }, []);

  if (user === undefined) return null;
  const isPremiumUser = user?.plan === "premium";

  return (
    <div>
      <PageHeader eyebrow="Premium · Live 1-on-1" title="A real interviewer, minus the scheduling." sub="An AI avatar asks questions out loud, listens to your spoken answer, and responds in real time." />
      <div className="max-w-5xl mx-auto px-6 pb-24">
        {!user ? (
          <Card className="p-8 text-center" style={{ border: `1.5px solid ${C.gold}` }}>
            <Lock size={28} color={C.gold} className="mx-auto mb-3" />
            <h3 className="mb-2" style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink, fontSize: 18 }}>Sign up to preview this feature</h3>
            <p className="mb-6" style={{ fontFamily: F_BODY, fontSize: 13, color: C.graphite }}>Live 1-on-1 interviews are a Premium feature — create a free account first.</p>
            <PrimaryButton href="/signup" className="justify-center">Create account</PrimaryButton>
          </Card>
        ) : !isPremiumUser ? (
          <Card className="p-8 text-center" style={{ border: `1.5px solid ${C.gold}` }}>
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center" style={{ background: C.gold, ...rounded(16) }}>
              <Star size={22} color={C.paper} fill={C.paper} />
            </div>
            <h3 className="mb-2" style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink, fontSize: 18 }}>This is a Premium feature</h3>
            <p className="mb-6" style={{ fontFamily: F_BODY, fontSize: 13, color: C.graphite }}>Upgrade to unlock live 1-on-1 AI avatar interviews, plus every Premium template.</p>
            <PrimaryButton href="/checkout?plan=Premium" className="justify-center" style={{ background: C.gold }}>Upgrade to Premium</PrimaryButton>
          </Card>
        ) : (
          <LiveSession />
        )}

        <div className="mt-10 p-6" style={{ background: C.surface, ...rounded(20) }}>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} color={C.graphite} />
            <h4 style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink, fontSize: 14 }}>What's real here vs. what's a preview</h4>
          </div>
          <p style={{ fontFamily: F_BODY, fontSize: 13, color: C.graphite }}>
            The Premium gate above is real — it checks your actual account's plan in the database. The
            session itself is a scripted preview: no microphone, speech recognition, avatar video, or live
            AI conversation is connected yet.
          </p>
        </div>
      </div>
    </div>
  );
}
