"use client";
import React, { useRef, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { C, F_DISPLAY, F_BODY, F_MONO, chamfer } from "@/lib/theme";
import { PageHeader, PrimaryButton, SecondaryButton } from "@/components/ui";

const AI_FOLLOWUPS = [
  "Good — what was the measurable outcome once that landed?",
  "Solid. Who else did you have to bring along internally to make that happen?",
  "Noted. If you had to do it again, what's the one thing you'd change?",
  "That's a clear example — how did you know it was actually working before the result came in?",
];

const INITIAL_MESSAGES = [
  { from: "ai", text: `"Tell me about a time you had to recover a stalled deal. What did you actually change?"` },
  { from: "user", text: "I re-scoped the proposal around the client's Q3 budget cycle instead of ours, and looped in their finance lead early..." },
];

function ChatBubble({ from, children }: { from: string; children: React.ReactNode }) {
  const isAI = from === "ai";
  return (
    <div className={`flex ${isAI ? "justify-start" : "justify-end"} mb-3`}>
      <div className="max-w-[80%] px-4 py-3 text-sm" style={{ background: isAI ? C.steel : C.ink, color: isAI ? C.ink : C.paper, fontFamily: F_BODY, ...chamfer(10) }}>
        {children}
      </div>
    </div>
  );
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span style={{ fontFamily: F_BODY, fontSize: 13, color: C.ink }}>{label}</span>
        <span style={{ fontFamily: F_MONO, fontSize: 12, color: C.graphite }}>{value}/100</span>
      </div>
      <div style={{ height: 8, background: C.steelLine }}>
        <div style={{ height: 8, width: `${value}%`, background: C.ignite }} />
      </div>
    </div>
  );
}

export default function MockInterviewPage() {
  const [type, setType] = useState("Behavioral");
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [retries, setRetries] = useState(0);
  const followupRef = useRef(0);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { from: "user", text: trimmed }]);
    setInput("");
    const reply = AI_FOLLOWUPS[followupRef.current % AI_FOLLOWUPS.length];
    followupRef.current += 1;
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { from: "ai", text: reply }]);
    }, 500);
  };

  const retryQuestion = () => {
    setMessages(INITIAL_MESSAGES);
    setInput("");
    followupRef.current = 0;
    setRetries((r) => r + 1);
  };

  return (
    <div>
      <PageHeader eyebrow="Flagship feature" title="An interview that argues back." sub="Pick a job title and interview type — the AI asks real follow-ups, not a static question bank." />
      <div className="max-w-6xl mx-auto px-6 pb-16 grid md:grid-cols-2 gap-10">
        <div>
          <div className="flex gap-2 mb-4">
            {["Behavioral", "Technical", "Screening"].map((t) => (
              <button key={t} onClick={() => setType(t)} className="px-3 py-2 text-xs font-semibold"
                style={{ fontFamily: F_DISPLAY, background: type === t ? C.ink : C.steel, color: type === t ? C.paper : C.graphite, ...chamfer(6) }}>
                {t}
              </button>
            ))}
          </div>
          <div className="p-5 bg-white border" style={{ borderColor: C.steelLine, ...chamfer(18) }}>
            <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.graphiteLight }} className="mb-3">
              {type.toUpperCase()} · REGIONAL SALES MANAGER {retries > 0 ? `· RESET ${retries}×` : ""}
            </div>
            <div style={{ maxHeight: 260, overflowY: "auto" }}>
              {messages.map((m, i) => <ChatBubble key={i} from={m.from}>{m.text}</ChatBubble>)}
            </div>
            <div className="mt-4 pt-4 border-t flex items-center gap-2" style={{ borderColor: C.steelLine }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
                placeholder="Type your answer…"
                className="flex-1 px-3 py-2 text-sm outline-none"
                style={{ background: C.steel, color: C.ink, fontFamily: F_BODY, ...chamfer(6) }}
              />
              <button onClick={sendMessage} className="w-9 h-9 flex items-center justify-center shrink-0" style={{ background: C.ignite, ...chamfer(6) }} aria-label="Send answer">
                <ArrowRight size={16} color={C.paper} />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <p style={{ fontFamily: F_MONO, fontSize: 11, color: C.graphiteLight }}>Scripted mock replies for preview — not a live AI call.</p>
            <button onClick={retryQuestion} style={{ fontFamily: F_DISPLAY, fontWeight: 600, color: C.ignite, fontSize: 12 }}>Reset question</button>
          </div>
        </div>
        <div>
          <div className="p-6 bg-white border" style={{ borderColor: C.steelLine, ...chamfer(18) }}>
            <h3 className="mb-1" style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink, fontSize: 18 }}>End-of-session report</h3>
            <p className="mb-6" style={{ fontFamily: F_BODY, color: C.graphite, fontSize: 13 }}>Scored on clarity, relevance, structure (STAR method), and confidence signals.</p>
            <ScoreBar label="Clarity" value={82} />
            <ScoreBar label="Relevance" value={91} />
            <ScoreBar label="Structure (STAR)" value={68} />
            <ScoreBar label="Confidence signals" value={75} />
            <div className="mt-6 p-4" style={{ background: C.igniteTint, ...chamfer(10) }}>
              <div style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.igniteDark, fontSize: 13 }} className="mb-1">Improvement area</div>
              <p style={{ fontFamily: F_BODY, color: C.ink, fontSize: 13 }}>Close each answer with a concrete number — you have the outcome, just say it plainly.</p>
            </div>
            <div className="flex gap-3 mt-6">
              <SecondaryButton onClick={retryQuestion}>Retry this question</SecondaryButton>
              <PrimaryButton href="/pricing">Restart full session</PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
