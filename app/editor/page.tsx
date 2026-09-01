"use client";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Lock,
  Star,
  Sparkles,
  X,
  Plus,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  Award,
  Users,
  Heart,
} from "lucide-react";
import { C, F_DISPLAY, F_BODY, F_MONO, chamfer } from "@/lib/theme";
import { PageHeader, PrimaryButton } from "@/components/ui";
import { findTemplate } from "@/lib/templates";
import { SECTION_DEFS, getSectionDef, type SectionId } from "@/lib/cvSections";

type SessionUser = { id: number; email: string; name: string | null; plan: "free" | "premium" };

const SECTION_ICONS: Record<SectionId, React.ComponentType<{ size?: number; color?: string }>> = {
  summary: FileText,
  experience: Briefcase,
  education: GraduationCap,
  skills: Wrench,
  achievements: Award,
  references: Users,
  hobbies: Heart,
};

function tint(hex: string, alpha: string) {
  return hex.length === 7 ? `${hex}${alpha}` : hex;
}

function SectionEditorCard({
  id,
  accent,
  value,
  onChange,
  onRemove,
}: {
  id: SectionId;
  accent: string;
  value: string;
  onChange: (v: string) => void;
  onRemove: () => void;
}) {
  const def = getSectionDef(id);
  const Icon = SECTION_ICONS[id];
  const [suggestionIndex, setSuggestionIndex] = useState(0);

  const useSuggestion = () => {
    const next = def.suggestions[suggestionIndex % def.suggestions.length];
    onChange(next);
    setSuggestionIndex((i) => i + 1);
  };

  return (
    <div className="p-4 bg-white border" style={{ borderColor: C.steelLine, ...chamfer(14) }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 flex items-center justify-center" style={{ background: tint(accent, "22"), ...chamfer(6) }}>
            <Icon size={14} color={accent} />
          </div>
          <span style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink, fontSize: 14 }}>{def.label}</span>
        </div>
        <button onClick={onRemove} aria-label={`Remove ${def.label}`} style={{ color: C.graphiteLight }}>
          <X size={16} />
        </button>
      </div>
      <p className="mb-2" style={{ fontFamily: F_BODY, color: C.graphiteLight, fontSize: 11 }}>{def.helper}</p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={def.placeholder}
        rows={id === "experience" ? 5 : 3}
        className="w-full px-3 py-2 border text-sm mb-3"
        style={{ borderColor: C.steelLine, fontFamily: F_BODY, ...chamfer(8) }}
      />
      <button
        onClick={useSuggestion}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold"
        style={{ background: tint(accent, "18"), color: accent, fontFamily: F_DISPLAY, ...chamfer(6) }}
      >
        <Sparkles size={13} /> Use AI suggestion
      </button>
      <p className="mt-1.5" style={{ fontFamily: F_MONO, fontSize: 9.5, color: C.graphiteLight }}>
        Scripted example for preview — not a live AI call yet.
      </p>
    </div>
  );
}

function LivePreview({
  accent,
  name,
  role,
  order,
  content,
}: {
  accent: string;
  name: string;
  role: string;
  order: SectionId[];
  content: Record<SectionId, string>;
}) {
  return (
    <div className="bg-white border overflow-hidden" style={{ borderColor: C.steelLine, ...chamfer(18) }}>
      <div className="px-5 py-4" style={{ background: accent }}>
        <div style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.paper, fontSize: 18 }}>{name || "Your Name"}</div>
        <div style={{ fontFamily: F_BODY, color: "rgba(255,255,255,0.85)", fontSize: 12 }}>{role || "Your Role"}</div>
      </div>
      <div className="p-5">
        {order.map((id) => {
          const def = getSectionDef(id);
          const value = content[id];
          if (!value) return null;
          return (
            <div key={id} className="mb-4">
              <div
                className="inline-block px-2 py-0.5 mb-1.5"
                style={{ background: tint(accent, "1f"), color: accent, fontFamily: F_MONO, fontSize: 10, fontWeight: 700 }}
              >
                {def.label.toUpperCase()}
              </div>
              {id === "skills" ? (
                <div className="flex flex-wrap gap-1.5">
                  {value.split(",").map((s) => s.trim()).filter(Boolean).map((s) => (
                    <span key={s} className="px-2 py-0.5" style={{ background: tint(accent, "12"), color: C.ink, fontFamily: F_BODY, fontSize: 11 }}>
                      {s}
                    </span>
                  ))}
                </div>
              ) : (
                <div style={{ fontFamily: F_BODY, color: C.ink, fontSize: 12.5, lineHeight: 1.5, whiteSpace: "pre-line" }}>
                  {value}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EditorContent() {
  const params = useSearchParams();
  const templateName = params.get("template") || "Signal";
  const template = findTemplate(templateName);
  const [user, setUser] = useState<SessionUser | null | undefined>(undefined);

  const [name, setName] = useState(template.person.name);
  const [role, setRole] = useState(template.person.role);
  const [included, setIncluded] = useState<SectionId[]>(
    SECTION_DEFS.filter((s) => s.defaultIncluded).map((s) => s.id)
  );
  const [content, setContent] = useState<Record<SectionId, string>>(() => ({
    summary: template.summary,
    experience: template.highlights.join("\n"),
    education: template.education,
    skills: template.skills.join(", "),
    achievements: "",
    references: "",
    hobbies: "",
  }));

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => setUser(d.user));
  }, []);

  const isPremiumUser = user?.plan === "premium";
  const locked = template.tier === "Premium" && !isPremiumUser;

  const availableToAdd = useMemo(
    () => SECTION_DEFS.filter((s) => !included.includes(s.id)),
    [included]
  );

  const setSectionContent = (id: SectionId, value: string) => {
    setContent((c) => ({ ...c, [id]: value }));
  };

  const addSection = (id: SectionId) => setIncluded((cur) => [...cur, id]);
  const removeSection = (id: SectionId) => setIncluded((cur) => cur.filter((s) => s !== id));

  if (user === undefined) return null;

  if (locked) {
    return (
      <div>
        <PageHeader eyebrow="Editor" title={`"${template.name}" is a Premium template.`} sub="Upgrade to unlock this template and every other Premium design." />
        <div className="max-w-lg mx-auto px-6 pb-24">
          <div className="p-8 text-center bg-white border" style={{ borderColor: C.gold, borderWidth: 1.5, ...chamfer(20) }}>
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center" style={{ background: C.gold, ...chamfer(12) }}>
              <Lock size={22} color={C.ink} />
            </div>
            <h3 className="mb-2" style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink, fontSize: 18 }}>
              {template.name} · {template.profession}
            </h3>
            <p className="mb-6" style={{ fontFamily: F_BODY, color: C.graphite, fontSize: 13 }}>{template.summary}</p>
            <PrimaryButton href="/checkout?plan=Premium" className="w-full justify-center" style={{ background: C.gold, color: C.ink }}>
              Unlock with Premium
            </PrimaryButton>
            <Link href="/templates" className="block mt-4 text-sm" style={{ color: C.graphite }}>Back to templates</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow="Editor preview"
        title={`Editing with "${template.name}"`}
        sub="Add or remove sections, type your own content, or use a suggestion to get started — the preview on the right updates live. Nothing here is saved yet."
      />

      <div className="max-w-6xl mx-auto px-6 pb-8">
        <div className="p-4 bg-white border" style={{ borderColor: C.steelLine, ...chamfer(14) }}>
          <div className="grid sm:grid-cols-2 gap-3 mb-2">
            <div>
              <label style={{ fontFamily: F_MONO, fontSize: 10, color: C.graphiteLight }}>NAME</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-1 px-3 py-2 border text-sm" style={{ borderColor: C.steelLine, fontFamily: F_BODY, ...chamfer(6) }} />
            </div>
            <div>
              <label style={{ fontFamily: F_MONO, fontSize: 10, color: C.graphiteLight }}>ROLE / TITLE</label>
              <input value={role} onChange={(e) => setRole(e.target.value)} className="w-full mt-1 px-3 py-2 border text-sm" style={{ borderColor: C.steelLine, fontFamily: F_BODY, ...chamfer(6) }} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-6">
        <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.graphiteLight }} className="mb-2">
          SECTIONS — ADD OR REMOVE WHAT YOU NEED
        </div>
        <div className="flex flex-wrap gap-2">
          {included.map((id) => (
            <span
              key={id}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold"
              style={{ background: template.accent, color: C.paper, fontFamily: F_DISPLAY, ...chamfer(6) }}
            >
              {getSectionDef(id).label}
              <button onClick={() => removeSection(id)} aria-label={`Remove ${getSectionDef(id).label}`}>
                <X size={12} />
              </button>
            </span>
          ))}
          {availableToAdd.map((s) => (
            <button
              key={s.id}
              onClick={() => addSection(s.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border"
              style={{ borderColor: C.steelLine, color: C.graphite, fontFamily: F_DISPLAY, ...chamfer(6) }}
            >
              <Plus size={12} /> {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-24 grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          {included.map((id) => (
            <SectionEditorCard
              key={id}
              id={id}
              accent={template.accent}
              value={content[id]}
              onChange={(v) => setSectionContent(id, v)}
              onRemove={() => removeSection(id)}
            />
          ))}
          {included.length === 0 && (
            <p style={{ fontFamily: F_BODY, color: C.graphiteLight, fontSize: 13 }}>
              No sections added yet — click one above to start building.
            </p>
          )}
        </div>

        <div className="sticky top-20">
          <div className="flex items-center gap-2 mb-3">
            <span style={{ fontFamily: F_MONO, fontSize: 11, color: C.graphiteLight }}>LIVE PREVIEW</span>
            {template.tier === "Premium" && <Star size={12} color={C.gold} fill={C.gold} />}
          </div>
          <LivePreview accent={template.accent} name={name} role={role} order={included} content={content} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-24 flex gap-4">
        <Link href="/templates" className="inline-flex items-center gap-2 px-6 py-3.5 font-semibold border" style={{ borderColor: C.ink, color: C.ink, fontFamily: F_DISPLAY, ...chamfer(12) }}>
          Back to templates
        </Link>
        <PrimaryButton href="/pricing">Continue to export</PrimaryButton>
      </div>
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense fallback={null}>
      <EditorContent />
    </Suspense>
  );
}
