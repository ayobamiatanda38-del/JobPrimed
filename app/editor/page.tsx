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
  Trophy,
  BadgeCheck,
  Users,
  Heart,
  Download,
  FileDown,
  AlertCircle,
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
  strengths: Star,
  achievements: Award,
  awards: Trophy,
  certificates: BadgeCheck,
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
    <div className="p-4 bg-white border" style={{ borderColor: def.tier === "Premium" ? C.gold : C.steelLine, borderWidth: def.tier === "Premium" ? 1.5 : 1, ...chamfer(14) }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 flex items-center justify-center" style={{ background: tint(accent, "22"), ...chamfer(6) }}>
            <Icon size={14} color={accent} />
          </div>
          <span style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink, fontSize: 14 }}>{def.label}</span>
          {def.tier === "Premium" && (
            <span className="flex items-center gap-1 px-1.5 py-0.5" style={{ background: C.gold, color: C.ink, fontFamily: F_MONO, fontSize: 9, fontWeight: 700 }}>
              <Star size={9} fill={C.ink} /> PREMIUM
            </span>
          )}
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
  watermark,
}: {
  accent: string;
  name: string;
  role: string;
  order: SectionId[];
  content: Record<SectionId, string>;
  watermark: boolean;
}) {
  return (
    <div className="relative bg-white border overflow-hidden" style={{ borderColor: C.steelLine, ...chamfer(18) }}>
      {watermark && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          style={{ overflow: "hidden" }}
        >
          <span
            style={{
              fontFamily: F_DISPLAY,
              fontWeight: 700,
              fontSize: 52,
              color: "rgba(11,13,14,0.08)",
              transform: "rotate(-28deg)",
              whiteSpace: "nowrap",
            }}
          >
            PREVIEW — UPGRADE TO DOWNLOAD
          </span>
        </div>
      )}
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
                className="inline-flex items-center gap-1.5 px-2 py-0.5 mb-1.5"
                style={{ background: tint(accent, "1f"), color: accent, fontFamily: F_MONO, fontSize: 10, fontWeight: 700 }}
              >
                {def.label.toUpperCase()}
                {def.tier === "Premium" && <Star size={9} fill={accent} />}
              </div>
              {id === "skills" || id === "strengths" ? (
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

function DownloadPanel({
  isPremiumUser,
  premiumSectionsUsed,
  name,
  role,
  accent,
  order,
  content,
}: {
  isPremiumUser: boolean;
  premiumSectionsUsed: string[];
  name: string;
  role: string;
  accent: string;
  order: SectionId[];
  content: Record<SectionId, string>;
}) {
  const [busy, setBusy] = useState<"text" | "pdf" | null>(null);

  const downloadText = () => {
    setBusy("text");
    const lines: string[] = [`${name || "Your Name"}`, `${role || "Your Role"}`, ""];
    order.forEach((id) => {
      const def = getSectionDef(id);
      if (def.tier === "Premium") return; // free export excludes Premium sections
      const value = content[id];
      if (!value) return;
      lines.push(def.label.toUpperCase());
      lines.push(value);
      lines.push("");
    });
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(name || "resume").replace(/\s+/g, "_")}_CV.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setBusy(null);
  };

  const downloadPdf = async () => {
    setBusy("pdf");
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const marginX = 50;
      const contentWidth = pageWidth - marginX * 2;
      const bottomLimit = pageHeight - 56;
      let y = 0;

      const [r, g, b] = hexToRgb(accent);
      const mix = (factor: number): [number, number, number] => [
        Math.round(r + (255 - r) * factor),
        Math.round(g + (255 - g) * factor),
        Math.round(b + (255 - b) * factor),
      ];
      const [lr, lg, lb] = mix(0.85); // light chip fill
      const [pr, pg, pb] = mix(0.9); // section-pill fill
      const [dr, dg, db] = mix(0.75); // divider line

      const ensureSpace = (needed: number) => {
        if (y + needed > bottomLimit) {
          doc.addPage();
          y = 56;
        }
      };

      // --- Header band ---
      const headerHeight = 108;
      doc.setFillColor(r, g, b);
      doc.rect(0, 0, pageWidth, headerHeight, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.text(name || "Your Name", marginX, 54);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(13);
      doc.text(role || "Your Role", marginX, 76);
      // thin accent-tinted rule under the header for a designed edge
      doc.setDrawColor(255, 255, 255);
      doc.setLineWidth(0.75);
      doc.line(marginX, 90, pageWidth - marginX, 90);

      y = headerHeight + 32;

      order.forEach((id) => {
        const def = getSectionDef(id);
        const value = content[id];
        if (!value) return;

        // --- Section label pill ---
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        const label = def.label.toUpperCase();
        const labelWidth = doc.getTextWidth(label) + 20;
        ensureSpace(28);
        doc.setFillColor(pr, pg, pb);
        doc.roundedRect(marginX, y - 12, labelWidth, 18, 4, 4, "F");
        doc.setTextColor(r, g, b);
        doc.text(label, marginX + 10, y);
        y += 22;

        if (id === "skills" || id === "strengths") {
          // --- Chip row, wrapping across lines ---
          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
          let x = marginX;
          const chipHeight = 20;
          const chipGap = 8;
          const items = value.split(",").map((s) => s.trim()).filter(Boolean);
          ensureSpace(chipHeight + 10);
          items.forEach((item) => {
            const w = doc.getTextWidth(item) + 18;
            if (x + w > marginX + contentWidth) {
              x = marginX;
              y += chipHeight + chipGap;
              ensureSpace(chipHeight + 10);
            }
            doc.setFillColor(lr, lg, lb);
            doc.roundedRect(x, y - 14, w, chipHeight, 5, 5, "F");
            doc.setTextColor(30, 30, 30);
            doc.text(item, x + 9, y - 1);
            x += w + chipGap;
          });
          y += chipHeight + 10;
        } else {
          // --- Paragraph / bullet block, line by line so bullets stay separate ---
          doc.setFont("helvetica", "normal");
          doc.setFontSize(10.5);
          doc.setTextColor(25, 25, 25);
          const rawLines = value.split("\n");
          rawLines.forEach((rawLine) => {
            const wrapped = doc.splitTextToSize(rawLine, contentWidth);
            ensureSpace(wrapped.length * 14 + 4);
            doc.text(wrapped, marginX, y);
            y += wrapped.length * 14 + 4;
          });
          y += 6;
        }

        // --- Divider before next section ---
        ensureSpace(20);
        doc.setDrawColor(dr, dg, db);
        doc.setLineWidth(0.5);
        doc.line(marginX, y, marginX + contentWidth, y);
        y += 20;
      });

      // Footer branding on the last page
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(160, 160, 160);
      doc.text("Made with JobPrimed", marginX, pageHeight - 24);

      doc.save(`${(name || "resume").replace(/\s+/g, "_")}_CV.pdf`);
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="p-6 bg-white border" style={{ borderColor: C.steelLine, ...chamfer(18) }}>
      <div className="flex items-center gap-2 mb-1">
        <Download size={16} color={C.ink} />
        <h3 style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink, fontSize: 16 }}>Download</h3>
      </div>

      {premiumSectionsUsed.length > 0 && (
        <div className="p-3 my-3 flex items-start gap-2" style={{ background: isPremiumUser ? "#F0FDF4" : "#FFFBEB", ...chamfer(8) }}>
          <AlertCircle size={15} color={isPremiumUser ? "#166534" : "#92400E"} className="shrink-0 mt-0.5" />
          <p style={{ fontFamily: F_BODY, fontSize: 12, color: isPremiumUser ? "#166534" : "#92400E" }}>
            This CV uses {premiumSectionsUsed.length} Premium {premiumSectionsUsed.length === 1 ? "section" : "sections"}:{" "}
            <strong>{premiumSectionsUsed.join(", ")}</strong>.
            {!isPremiumUser && " Upgrade to include them in your PDF."}
          </p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-3 mt-3">
        <button
          onClick={downloadText}
          disabled={busy === "text"}
          className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold border"
          style={{ borderColor: C.ink, color: C.ink, fontFamily: F_DISPLAY, ...chamfer(10) }}
        >
          <FileDown size={16} /> {busy === "text" ? "Preparing…" : "Export Text Only"}
        </button>

        {isPremiumUser ? (
          <button
            onClick={downloadPdf}
            disabled={busy === "pdf"}
            className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold"
            style={{ background: C.ink, color: C.paper, fontFamily: F_DISPLAY, ...chamfer(10) }}
          >
            <Download size={16} /> {busy === "pdf" ? "Generating…" : "Download as PDF"}
          </button>
        ) : (
          <Link
            href="/checkout?plan=Premium"
            className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold"
            style={{ background: C.gold, color: C.ink, fontFamily: F_DISPLAY, ...chamfer(10) }}
          >
            <Lock size={14} /> Unlock colorful PDF
          </Link>
        )}
      </div>
      <p className="mt-3" style={{ fontFamily: F_MONO, fontSize: 10, color: C.graphiteLight }}>
        Text export includes only Free sections. The PDF is a real generated file — colors and layout follow your chosen template's accent.
      </p>
    </div>
  );
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return [11, 13, 14];
  return [
    parseInt(clean.slice(0, 2), 16),
    parseInt(clean.slice(2, 4), 16),
    parseInt(clean.slice(4, 6), 16),
  ];
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
    strengths: "",
    achievements: "",
    awards: "",
    certificates: "",
    references: "",
    hobbies: "",
  }));

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => setUser(d.user));
  }, []);

  const isPremiumUser = user?.plan === "premium";
  const templateLocked = template.tier === "Premium" && !isPremiumUser;

  const availableToAdd = useMemo(
    () => SECTION_DEFS.filter((s) => !included.includes(s.id)),
    [included]
  );

  const premiumSectionsUsed = useMemo(
    () =>
      included
        .map((id) => getSectionDef(id))
        .filter((def) => def.tier === "Premium" && content[def.id])
        .map((def) => def.label),
    [included, content]
  );

  const setSectionContent = (id: SectionId, value: string) => {
    setContent((c) => ({ ...c, [id]: value }));
  };

  const addSection = (id: SectionId) => setIncluded((cur) => [...cur, id]);
  const removeSection = (id: SectionId) => setIncluded((cur) => cur.filter((s) => s !== id));

  if (user === undefined) return null;

  if (templateLocked) {
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
        sub="Add or remove sections, type your own content, or use a suggestion — the preview updates live. Skills, Strengths, Achievements, Awards, and Certificates are Premium sections."
      />

      {premiumSectionsUsed.length > 0 && !isPremiumUser && (
        <div className="max-w-6xl mx-auto px-6 mb-2">
          <div className="p-3 flex items-center gap-2 flex-wrap justify-between" style={{ background: "#FFFBEB", ...chamfer(10) }}>
            <span style={{ fontFamily: F_BODY, fontSize: 13, color: "#92400E" }}>
              This resume uses {premiumSectionsUsed.length} Premium {premiumSectionsUsed.length === 1 ? "feature" : "features"}: <strong>{premiumSectionsUsed.join(", ")}</strong>
            </span>
            <Link href="/checkout?plan=Premium" style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.igniteDark, fontSize: 13 }}>Upgrade →</Link>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 pb-8 pt-4">
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
          {included.map((id) => {
            const def = getSectionDef(id);
            return (
              <span
                key={id}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold"
                style={{ background: def.tier === "Premium" ? C.gold : template.accent, color: def.tier === "Premium" ? C.ink : C.paper, fontFamily: F_DISPLAY, ...chamfer(6) }}
              >
                {def.tier === "Premium" && <Star size={11} fill={C.ink} />}
                {def.label}
                <button onClick={() => removeSection(id)} aria-label={`Remove ${def.label}`}>
                  <X size={12} />
                </button>
              </span>
            );
          })}
          {availableToAdd.map((s) => (
            <button
              key={s.id}
              onClick={() => addSection(s.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border"
              style={{ borderColor: s.tier === "Premium" ? C.gold : C.steelLine, color: C.graphite, fontFamily: F_DISPLAY, ...chamfer(6) }}
            >
              <Plus size={12} /> {s.label}
              {s.tier === "Premium" && (
                <span className="flex items-center gap-0.5 px-1 py-0.5" style={{ background: C.gold, color: C.ink, fontFamily: F_MONO, fontSize: 8, fontWeight: 700 }}>
                  <Star size={8} fill={C.ink} /> PREMIUM
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-8 grid md:grid-cols-2 gap-8 items-start">
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
          <LivePreview
            accent={template.accent}
            name={name}
            role={role}
            order={included}
            content={content}
            watermark={premiumSectionsUsed.length > 0 && !isPremiumUser}
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-24">
        <DownloadPanel
          isPremiumUser={isPremiumUser}
          premiumSectionsUsed={premiumSectionsUsed}
          name={name}
          role={role}
          accent={template.accent}
          order={included}
          content={content}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-24 flex gap-4">
        <Link href="/templates" className="inline-flex items-center gap-2 px-6 py-3.5 font-semibold border" style={{ borderColor: C.ink, color: C.ink, fontFamily: F_DISPLAY, ...chamfer(12) }}>
          Back to templates
        </Link>
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
