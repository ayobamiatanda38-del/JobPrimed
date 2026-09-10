"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Lock, Plus, Printer, Trash2 } from "lucide-react";
import { C, F_DISPLAY, F_BODY, F_MONO, chamfer } from "@/lib/theme";
import { PageHeader, PrimaryButton } from "@/components/ui";
import { CVTemplate, sampleCVData } from "@/components/templates/ledger-serif";
import type { CVEducationEntry, CVCertificationEntry } from "@/components/templates/ledger-serif";

type SessionUser = { id: number; email: string; name: string | null; plan: "free" | "premium" };

/** Form-side shape for one job: bullets are edited as one textarea, then
 *  split into CVTemplate's string[] only when building the live preview. */
type ExperienceForm = {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  bulletsText: string;
};

const inputStyle: React.CSSProperties = {
  borderColor: C.steelLine,
  fontFamily: F_BODY,
  ...chamfer(6),
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label style={{ fontFamily: F_MONO, fontSize: 10, color: C.graphiteLight }}>{children}</label>
  );
}

function RemoveButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex items-center gap-1 text-xs"
      style={{ color: C.igniteDark, fontFamily: F_DISPLAY, fontWeight: 600 }}
    >
      <Trash2 size={12} /> Remove
    </button>
  );
}

export default function LedgerSerifEditorPage() {
  const [user, setUser] = useState<SessionUser | null | undefined>(undefined);

  const [name, setName] = useState(sampleCVData.name);
  const [title, setTitle] = useState(sampleCVData.title);
  const [location, setLocation] = useState(sampleCVData.location ?? "");
  const [email, setEmail] = useState(sampleCVData.contact?.email ?? "");
  const [phone, setPhone] = useState(sampleCVData.contact?.phone ?? "");
  const [address, setAddress] = useState(sampleCVData.contact?.address ?? "");
  const [postalCode, setPostalCode] = useState(sampleCVData.contact?.postalCode ?? "");
  const [linkedin, setLinkedin] = useState(sampleCVData.contact?.linkedin ?? "");
  const [summary, setSummary] = useState(sampleCVData.summary ?? "");
  const [skillsText, setSkillsText] = useState((sampleCVData.skills ?? []).join(", "));

  const [education, setEducation] = useState<CVEducationEntry[]>(sampleCVData.education ?? []);
  const [certifications, setCertifications] = useState<CVCertificationEntry[]>(sampleCVData.certifications ?? []);
  const [experience, setExperience] = useState<ExperienceForm[]>(
    (sampleCVData.experience ?? []).map((e) => ({
      role: e.role,
      company: e.company,
      startDate: e.startDate,
      endDate: e.endDate,
      bulletsText: e.bullets.join("\n"),
    }))
  );

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => setUser(d.user));
  }, []);

  const isPremiumUser = user?.plan === "premium";

  const updateEducation = (i: number, patch: Partial<CVEducationEntry>) =>
    setEducation((cur) => cur.map((e, idx) => (idx === i ? { ...e, ...patch } : e)));
  const updateCertification = (i: number, patch: Partial<CVCertificationEntry>) =>
    setCertifications((cur) => cur.map((c, idx) => (idx === i ? { ...c, ...patch } : c)));
  const updateExperience = (i: number, patch: Partial<ExperienceForm>) =>
    setExperience((cur) => cur.map((e, idx) => (idx === i ? { ...e, ...patch } : e)));

  const livePreviewData = {
    name,
    title,
    location,
    contact: { email, phone, address, postalCode, linkedin },
    summary,
    skills: skillsText.split(",").map((s) => s.trim()).filter(Boolean),
    education,
    certifications,
    experience: experience.map((e) => ({
      role: e.role,
      company: e.company,
      startDate: e.startDate,
      endDate: e.endDate,
      bullets: e.bulletsText.split("\n").map((b) => b.trim()).filter(Boolean),
    })),
    lastUpdated: sampleCVData.lastUpdated,
  };

  if (user === undefined) return null;

  if (!isPremiumUser) {
    return (
      <div>
        <PageHeader
          eyebrow="Editor"
          title={`"Ledger Serif" is a Premium template.`}
          sub="A verified Flutterwave payment unlocks this template and every other Premium design."
        />
        <div className="max-w-lg mx-auto px-6 pb-24">
          <div className="p-8 text-center bg-white border" style={{ borderColor: C.gold, borderWidth: 1.5, ...chamfer(20) }}>
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center" style={{ background: C.gold, ...chamfer(12) }}>
              <Lock size={22} color={C.ink} />
            </div>
            <h3 className="mb-2" style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink, fontSize: 18 }}>
              Ledger Serif · Editorial CV design
            </h3>
            <p className="mb-6" style={{ fontFamily: F_BODY, color: C.graphite, fontSize: 13 }}>
              A dedicated serif layout with real print-ready typography — built as JobPrimed's flagship template.
            </p>
            <PrimaryButton href="/checkout?plan=Premium" className="w-full justify-center" style={{ background: C.gold, color: C.ink }}>
              Pay to unlock
            </PrimaryButton>
            <Link href="/templates" className="block mt-4 text-sm" style={{ color: C.graphite }}>
              Back to templates
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow="Editor preview · Premium"
        title={`Editing with "Ledger Serif"`}
        sub="This template renders through the same CVTemplate component used on the live site — what you see here is exactly what prints."
      />

      <div className="max-w-6xl mx-auto px-6 pb-10 grid md:grid-cols-2 gap-8 items-start">
        {/* ---------------- FORM ---------------- */}
        <div className="space-y-5">
          <div className="p-4 bg-white border" style={{ borderColor: C.steelLine, ...chamfer(14) }}>
            <div style={{ fontFamily: F_MONO, fontSize: 10, color: C.graphiteLight }} className="mb-2">
              IDENTITY &amp; CONTACT
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <FieldLabel>NAME</FieldLabel>
                <input value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-1 px-3 py-2 border text-sm" style={inputStyle} />
              </div>
              <div>
                <FieldLabel>TITLE</FieldLabel>
                <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full mt-1 px-3 py-2 border text-sm" style={inputStyle} />
              </div>
              <div>
                <FieldLabel>LOCATION</FieldLabel>
                <input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full mt-1 px-3 py-2 border text-sm" style={inputStyle} />
              </div>
              <div>
                <FieldLabel>EMAIL</FieldLabel>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-1 px-3 py-2 border text-sm" style={inputStyle} />
              </div>
              <div>
                <FieldLabel>PHONE</FieldLabel>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full mt-1 px-3 py-2 border text-sm" style={inputStyle} />
              </div>
              <div>
                <FieldLabel>LINKEDIN</FieldLabel>
                <input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="w-full mt-1 px-3 py-2 border text-sm" style={inputStyle} />
              </div>
              <div>
                <FieldLabel>ADDRESS</FieldLabel>
                <input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full mt-1 px-3 py-2 border text-sm" style={inputStyle} />
              </div>
              <div>
                <FieldLabel>POSTAL CODE</FieldLabel>
                <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="w-full mt-1 px-3 py-2 border text-sm" style={inputStyle} />
              </div>
            </div>
          </div>

          <div className="p-4 bg-white border" style={{ borderColor: C.steelLine, ...chamfer(14) }}>
            <FieldLabel>SUMMARY</FieldLabel>
            <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={3} className="w-full mt-1 px-3 py-2 border text-sm" style={inputStyle} />
            <div className="mt-3">
              <FieldLabel>SKILLS (comma-separated)</FieldLabel>
              <input value={skillsText} onChange={(e) => setSkillsText(e.target.value)} className="w-full mt-1 px-3 py-2 border text-sm" style={inputStyle} />
            </div>
          </div>

          <div className="p-4 bg-white border" style={{ borderColor: C.steelLine, ...chamfer(14) }}>
            <div className="flex items-center justify-between mb-2">
              <span style={{ fontFamily: F_MONO, fontSize: 10, color: C.graphiteLight }}>EDUCATION</span>
              <button
                onClick={() => setEducation((cur) => [...cur, { credential: "", institution: "", year: "" }])}
                className="flex items-center gap-1 text-xs"
                style={{ color: "#2F4F3E", fontFamily: F_DISPLAY, fontWeight: 600 }}
              >
                <Plus size={12} /> Add
              </button>
            </div>
            {education.map((e, i) => (
              <div key={i} className="grid sm:grid-cols-3 gap-2 mb-2 pb-2 border-b" style={{ borderColor: C.steelLine }}>
                <input placeholder="Credential" value={e.credential} onChange={(ev) => updateEducation(i, { credential: ev.target.value })} className="px-2 py-1.5 border text-sm" style={inputStyle} />
                <input placeholder="Institution" value={e.institution} onChange={(ev) => updateEducation(i, { institution: ev.target.value })} className="px-2 py-1.5 border text-sm" style={inputStyle} />
                <div className="flex gap-2">
                  <input placeholder="Year" value={e.year} onChange={(ev) => updateEducation(i, { year: ev.target.value })} className="px-2 py-1.5 border text-sm flex-1" style={inputStyle} />
                  <RemoveButton label="Remove education entry" onClick={() => setEducation((cur) => cur.filter((_, idx) => idx !== i))} />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-white border" style={{ borderColor: C.steelLine, ...chamfer(14) }}>
            <div className="flex items-center justify-between mb-2">
              <span style={{ fontFamily: F_MONO, fontSize: 10, color: C.graphiteLight }}>CERTIFICATIONS</span>
              <button
                onClick={() => setCertifications((cur) => [...cur, { name: "", issuer: "", year: "" }])}
                className="flex items-center gap-1 text-xs"
                style={{ color: "#2F4F3E", fontFamily: F_DISPLAY, fontWeight: 600 }}
              >
                <Plus size={12} /> Add
              </button>
            </div>
            {certifications.map((c, i) => (
              <div key={i} className="grid sm:grid-cols-3 gap-2 mb-2 pb-2 border-b" style={{ borderColor: C.steelLine }}>
                <input placeholder="Name" value={c.name} onChange={(ev) => updateCertification(i, { name: ev.target.value })} className="px-2 py-1.5 border text-sm" style={inputStyle} />
                <input placeholder="Issuer" value={c.issuer ?? ""} onChange={(ev) => updateCertification(i, { issuer: ev.target.value })} className="px-2 py-1.5 border text-sm" style={inputStyle} />
                <div className="flex gap-2">
                  <input placeholder="Year" value={c.year ?? ""} onChange={(ev) => updateCertification(i, { year: ev.target.value })} className="px-2 py-1.5 border text-sm flex-1" style={inputStyle} />
                  <RemoveButton label="Remove certification" onClick={() => setCertifications((cur) => cur.filter((_, idx) => idx !== i))} />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-white border" style={{ borderColor: C.steelLine, ...chamfer(14) }}>
            <div className="flex items-center justify-between mb-2">
              <span style={{ fontFamily: F_MONO, fontSize: 10, color: C.graphiteLight }}>EXPERIENCE</span>
              <button
                onClick={() =>
                  setExperience((cur) => [...cur, { role: "", company: "", startDate: "", endDate: "", bulletsText: "" }])
                }
                className="flex items-center gap-1 text-xs"
                style={{ color: "#2F4F3E", fontFamily: F_DISPLAY, fontWeight: 600 }}
              >
                <Plus size={12} /> Add role
              </button>
            </div>
            {experience.map((job, i) => (
              <div key={i} className="mb-4 pb-4 border-b" style={{ borderColor: C.steelLine }}>
                <div className="grid sm:grid-cols-2 gap-2 mb-2">
                  <input placeholder="Role" value={job.role} onChange={(ev) => updateExperience(i, { role: ev.target.value })} className="px-2 py-1.5 border text-sm" style={inputStyle} />
                  <input placeholder="Company" value={job.company} onChange={(ev) => updateExperience(i, { company: ev.target.value })} className="px-2 py-1.5 border text-sm" style={inputStyle} />
                  <input placeholder="Start (e.g. Mar 2022)" value={job.startDate} onChange={(ev) => updateExperience(i, { startDate: ev.target.value })} className="px-2 py-1.5 border text-sm" style={inputStyle} />
                  <input placeholder="End (e.g. Present)" value={job.endDate} onChange={(ev) => updateExperience(i, { endDate: ev.target.value })} className="px-2 py-1.5 border text-sm" style={inputStyle} />
                </div>
                <FieldLabel>BULLETS (one per line)</FieldLabel>
                <textarea
                  value={job.bulletsText}
                  onChange={(ev) => updateExperience(i, { bulletsText: ev.target.value })}
                  rows={4}
                  className="w-full mt-1 px-3 py-2 border text-sm"
                  style={inputStyle}
                />
                <div className="mt-2">
                  <RemoveButton label="Remove this role" onClick={() => setExperience((cur) => cur.filter((_, idx) => idx !== i))} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------- LIVE PREVIEW ---------------- */}
        <div className="sticky top-20">
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontFamily: F_MONO, fontSize: 11, color: C.graphiteLight }}>LIVE PREVIEW</span>
            <PrimaryButton onClick={() => window.print()} style={{ padding: "8px 16px", fontSize: 13 }}>
              <Printer size={14} /> Save as PDF
            </PrimaryButton>
          </div>
          <div style={{ transform: "scale(0.82)", transformOrigin: "top left", width: "122%" }}>
            <CVTemplate data={livePreviewData} />
          </div>
          <p className="mt-3" style={{ fontFamily: F_MONO, fontSize: 10, color: C.graphiteLight }}>
            "Save as PDF" opens your browser's print dialog — choose "Save as PDF" as the destination. This
            prints the exact component shown here, at full size, with the site's own navigation hidden.
          </p>
        </div>
      </div>
    </div>
  );
}
