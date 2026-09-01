export type SectionId =
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "achievements"
  | "references"
  | "hobbies";

export type SectionDef = {
  id: SectionId;
  label: string;
  defaultIncluded: boolean;
  placeholder: string;
  helper: string;
  // Canned example content the "AI suggestion" button cycles through.
  // These are scripted examples for preview — not a live AI call.
  suggestions: string[];
};

export const SECTION_DEFS: SectionDef[] = [
  {
    id: "summary",
    label: "Professional Summary",
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
    label: "Skill Set",
    defaultIncluded: true,
    placeholder: "Comma-separated: e.g. Salesforce, Negotiation, Team Leadership.",
    helper: "Match the wording used in the job posting where honest.",
    suggestions: [
      "Project Management, Stakeholder Communication, Data Analysis, Process Improvement",
      "Client Relationship Management, Negotiation, CRM Tools, Team Leadership",
      "Strategic Planning, Budgeting, Cross-functional Collaboration, Reporting",
    ],
  },
  {
    id: "achievements",
    label: "Achievements & Awards",
    defaultIncluded: false,
    placeholder: "Notable recognitions, awards, or milestones.",
    helper: "Optional, but strong if you have 1–2 real standouts.",
    suggestions: [
      "Employee of the Year, 2024 — recognized for leading the regional rollout",
      "Top 5% performer company-wide, two years running",
      "Recipient, Industry Rising Star Award, 2023",
    ],
  },
  {
    id: "references",
    label: "References",
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
