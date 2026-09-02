export type SectionId =
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "strengths"
  | "achievements"
  | "awards"
  | "certificates"
  | "references"
  | "hobbies";

export type SectionDef = {
  id: SectionId;
  label: string;
  tier: "Free" | "Premium";
  defaultIncluded: boolean;
  placeholder: string;
  helper: string;
  // Canned example content the "AI suggestion" button cycles through.
  // These are scripted examples for preview — not a live AI call.
  suggestions: string[];
};

// Mirrors a common resume-builder pattern: core narrative sections are
// free, while the "value-add" sections that make a CV stand out (Skills,
// Strengths, Achievements, Awards, Certificates) are Premium. Anyone can
// add and fill a Premium section — the gating happens at download time,
// not at add time.
export const SECTION_DEFS: SectionDef[] = [
  {
    id: "summary",
    label: "Profile / Summary",
    tier: "Free",
    defaultIncluded: true,
    placeholder: "A 2–3 sentence pitch of who you are professionally.",
    helper: "The first thing a recruiter reads — keep it tight.",
    suggestions: [
      "Results-driven professional with 7+ years turning ambiguous problems into measurable outcomes across fast-moving teams.",
      "Detail-oriented operator who has scaled processes from zero to repeatable, cutting costs without cutting quality.",
      "Cross-functional leader known for translating strategy into shipped work, on time and under budget.",
    ],
  },
  {
    id: "experience",
    label: "Work Experience",
    tier: "Free",
    defaultIncluded: true,
    placeholder: "Role, company, dates — then 2–3 bullet achievements per role.",
    helper: "Lead with the outcome, not the task.",
    suggestions: [
      "Senior Associate, Acme Corp (2022–Present)\n— Grew key account revenue 28% in the first year\n— Built the onboarding playbook now used team-wide",
      "Team Lead, Northwind Ltd (2020–2022)\n— Cut delivery cycle time from 6 weeks to 9 days\n— Mentored 4 junior hires, 3 of whom were promoted within a year",
      "Analyst, Bridgeview Group (2018–2020)\n— Automated a manual reporting process, saving 10 hours/week\n— Presented findings directly to the executive team quarterly",
    ],
  },
  {
    id: "education",
    label: "Education",
    tier: "Free",
    defaultIncluded: true,
    placeholder: "Degree, institution, graduation year.",
    helper: "Most recent or highest qualification first.",
    suggestions: [
      "B.Sc. in your field — University name, graduation year",
      "M.Sc. in your field — University name, graduation year (Distinction)",
      "HND / B.A. in your field — Institution name, graduation year",
    ],
  },
  {
    id: "skills",
    label: "Skills",
    tier: "Premium",
    defaultIncluded: false,
    placeholder: "Comma-separated: e.g. Salesforce, Negotiation, Team Leadership.",
    helper: "Match the wording used in the job posting where honest.",
    suggestions: [
      "Project Management, Stakeholder Communication, Data Analysis, Process Improvement",
      "Client Relationship Management, Negotiation, CRM Tools, Team Leadership",
      "Strategic Planning, Budgeting, Cross-functional Collaboration, Reporting",
    ],
  },
  {
    id: "strengths",
    label: "Strengths",
    tier: "Premium",
    defaultIncluded: false,
    placeholder: "Comma-separated core strengths, e.g. Adaptability, Ownership, Clarity under pressure.",
    helper: "Softer than skills — how you work, not just what you know.",
    suggestions: [
      "Ownership, Clear Communication, Adaptability, Calm Under Pressure",
      "Strategic Thinking, Mentorship, Attention to Detail, Follow-through",
      "Resilience, Curiosity, Collaboration, Decisiveness",
    ],
  },
  {
    id: "achievements",
    label: "Achievements",
    tier: "Premium",
    defaultIncluded: false,
    placeholder: "Notable, measurable wins — not part of the day-to-day job description.",
    helper: "Numbers beat adjectives here.",
    suggestions: [
      "Grew regional revenue 34% year-over-year, the largest gain on the team.",
      "Reduced customer churn from 12% to 6% within two quarters.",
      "Delivered a 40-person cross-functional rollout two weeks ahead of schedule.",
    ],
  },
  {
    id: "awards",
    label: "Awards",
    tier: "Premium",
    defaultIncluded: false,
    placeholder: "Formal recognitions — internal or external.",
    helper: "Include the year and awarding body if you can.",
    suggestions: [
      "Employee of the Year, 2024 — Acme Corp",
      "Top 5% Performer Company-wide, 2023 and 2024",
      "Industry Rising Star Award, 2023",
    ],
  },
  {
    id: "certificates",
    label: "Certificates",
    tier: "Premium",
    defaultIncluded: false,
    placeholder: "Certifications relevant to the role, with issuing body and year.",
    helper: "Only include ones still valid or clearly dated.",
    suggestions: [
      "Certified Salesforce Administrator — Salesforce, 2024",
      "PMP (Project Management Professional) — PMI, 2023",
      "Google Analytics Certified — Google, 2024",
    ],
  },
  {
    id: "references",
    label: "References",
    tier: "Free",
    defaultIncluded: false,
    placeholder: "Available upon request, or list name / role / contact.",
    helper: "Many recruiters skip this — include only if asked for.",
    suggestions: [
      "Available upon request.",
      "Jane Doe, Former Manager, Acme Corp — jane.doe@example.com",
      "References available on request from previous employers.",
    ],
  },
  {
    id: "hobbies",
    label: "Hobbies & Interests",
    tier: "Free",
    defaultIncluded: false,
    placeholder: "Personal interests that round out your profile.",
    helper: "Optional — useful for culture-fit conversations.",
    suggestions: [
      "Long-distance running, amateur photography, community volunteering",
      "Chess, mentoring early-career professionals, reading on behavioral economics",
      "Football coaching (youth league), woodworking, travel",
    ],
  },
];

export function getSectionDef(id: SectionId): SectionDef {
  return SECTION_DEFS.find((s) => s.id === id)!;
}
