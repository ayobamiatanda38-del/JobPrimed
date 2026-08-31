import { C } from "./theme";

export type Template = {
  slug: string;
  name: string;
  profession: string;
  tier: "Free" | "Premium";
  accent: string;
  layout: "one-col" | "two-col";
  person: { name: string; role: string };
  summary: string;
  highlights: string[];
  // Premium-only extra row — metrics, tech stack, bar admissions, etc.
  extras?: string[];
};

export const TEMPLATES: Template[] = [
  {
    slug: "ledger",
    name: "Ledger",
    profession: "Sales & Business Development",
    tier: "Free",
    accent: C.ink,
    layout: "two-col",
    person: { name: "Tunde Bakare", role: "Regional Sales Manager" },
    summary: "7+ years driving B2B revenue across FMCG and energy channels.",
    highlights: ["Grew territory revenue 34% YoY", "Managed a 12-person distributor network"],
  },
  {
    slug: "ledger-executive",
    name: "Ledger Executive",
    profession: "Sales & Business Development",
    tier: "Premium",
    accent: C.ink,
    layout: "two-col",
    person: { name: "Tunde Bakare", role: "Regional Sales Manager" },
    summary: "7+ years driving B2B revenue across FMCG and energy channels.",
    highlights: ["Grew territory revenue 34% YoY", "Managed a 12-person distributor network"],
    extras: ["$2.4M closed FY25", "Top 3 nationally", "Key accounts: 18"],
  },
  {
    slug: "signal",
    name: "Signal",
    profession: "Marketing & Brand",
    tier: "Free",
    accent: C.ignite,
    layout: "one-col",
    person: { name: "Chiamaka Eze", role: "Brand Marketing Lead" },
    summary: "Builds campaigns that move category share, not just impressions.",
    highlights: ["Launched 3 national campaigns", "Grew social engagement 2.1x"],
  },
  {
    slug: "foundry",
    name: "Foundry",
    profession: "Software Engineering",
    tier: "Premium",
    accent: C.charge,
    layout: "two-col",
    person: { name: "David Okon", role: "Senior Backend Engineer" },
    summary: "Ships reliable distributed systems at scale, on call by choice.",
    highlights: ["Cut API latency 40%", "Led migration to microservices"],
    extras: ["Go", "Kubernetes", "PostgreSQL", "AWS"],
  },
  {
    slug: "capital",
    name: "Capital",
    profession: "Finance & Accounting",
    tier: "Free",
    accent: C.graphite,
    layout: "one-col",
    person: { name: "Ifeoma Nwosu", role: "Senior Financial Analyst" },
    summary: "Turns raw numbers into decisions the board actually acts on.",
    highlights: ["Built the FY26 forecasting model", "Reduced close time by 5 days"],
  },
  {
    slug: "vital",
    name: "Vital",
    profession: "Healthcare & Clinical",
    tier: "Free",
    accent: "#0E9F6E",
    layout: "one-col",
    person: { name: "Dr. Amaka Chukwu", role: "Clinical Operations Manager" },
    summary: "Runs patient-facing operations without dropping quality of care.",
    highlights: ["Oversaw a 40-bed unit", "Cut patient wait time 22%"],
  },
  {
    slug: "aperture",
    name: "Aperture",
    profession: "Creative & Design",
    tier: "Premium",
    accent: C.gold,
    layout: "one-col",
    person: { name: "Zainab Bello", role: "Senior Product Designer" },
    summary: "Designs interfaces people don't have to think about.",
    highlights: ["Led redesign of core app flow", "Design-system owner, 40+ components"],
    extras: ["Portfolio: 6 case studies", "Figma", "Award: Design Week 2025"],
  },
  {
    slug: "statute",
    name: "Statute",
    profession: "Legal & Compliance",
    tier: "Premium",
    accent: "#3B2F63",
    layout: "two-col",
    person: { name: "Emeka Umeh", role: "Corporate Counsel" },
    summary: "Keeps contracts airtight and deals moving on schedule.",
    highlights: ["Closed 60+ commercial contracts/yr", "Built the compliance review playbook"],
    extras: ["Bar: Nigeria, 2016", "M&A", "Data Privacy"],
  },
  {
    slug: "lecture",
    name: "Lecture",
    profession: "Education & Academia",
    tier: "Free",
    accent: "#B45309",
    layout: "one-col",
    person: { name: "Grace Adeyemi", role: "Curriculum Development Lead" },
    summary: "Designs learning outcomes that actually change scores.",
    highlights: ["Rolled out to 24 schools", "Raised pass rates by 15%"],
  },
  {
    slug: "baseline",
    name: "Baseline",
    profession: "Hospitality & Operations",
    tier: "Free",
    accent: "#0F766E",
    layout: "one-col",
    person: { name: "Musa Abdullahi", role: "Operations Manager" },
    summary: "Keeps multi-site operations running under real pressure.",
    highlights: ["Managed 5-location rollout", "Cut vendor costs 18%"],
  },
];

export const PROFESSIONS = ["All", ...Array.from(new Set(TEMPLATES.map((t) => t.profession)))];

export function findTemplate(name: string): Template {
  return TEMPLATES.find((t) => t.name === name) ?? TEMPLATES[0];
}
