import type { CVData } from "./types";

/**
 * The exact content used to design and visually verify this template.
 * Useful as a live preview fixture, a starting point in Storybook/demo
 * pages, or a quick sanity check after editing the component.
 */
export const sampleCVData: CVData = {
  name: "Ngozi Chukwu",
  title: "Senior Finance Manager",
  location: "Lagos, Nigeria",
  contact: {
    email: "ngozi.chukwu@email.com",
    phone: "+234 802 345 6789",
    linkedin: "linkedin.com/in/ngozichukwu",
  },
  summary:
    "Finance leader with nine years turning fragmented reporting into decisions the board can act on the same day. Rebuilt the FY25 forecasting model, cutting variance from 14% to 4%, and has closed three consecutive audit cycles with zero material findings.",
  summaryHighlight: "three consecutive audit cycles with zero material findings.",
  skills: [
    "Financial Modeling",
    "IFRS Reporting",
    "Variance Analysis",
    "Power BI & SAP",
    "Board Reporting",
    "Working Capital Mgmt",
  ],
  education: [
    { credential: "B.Sc. Accounting", institution: "University of Lagos", year: "2014" },
    { credential: "ICAN", institution: "Chartered", year: "2017" },
  ],
  certifications: [
    { name: "ACCA Diploma in IFRS", year: "2020" },
    { name: "Advanced Financial Modeling", issuer: "CFI", year: "2021" },
  ],
  experience: [
    {
      role: "Senior Finance Manager",
      company: "Meridian Consumer Goods Plc",
      startDate: "Mar 2022",
      endDate: "Present",
      bullets: [
        "Rebuilt the FY25 rolling forecast model, cutting forecast variance from 14% to 4% within two quarters.",
        "Led a month-end close redesign that reduced close time from 12 to 6 working days.",
        "Managed a ₦3.2B annual opex budget across 6 business units.",
        "Presented monthly financials directly to the Group CFO and board audit committee.",
      ],
    },
    {
      role: "Finance Manager",
      company: "Alden & Pratt Foods",
      startDate: "Jul 2018",
      endDate: "Feb 2022",
      bullets: [
        "Built the company's first working-capital dashboard, freeing up ₦180M in trapped cash.",
        "Supervised a team of 4 analysts through 3 consecutive clean external audits.",
        "Introduced variance-to-budget reviews that cut discretionary spend overruns by 22%.",
      ],
    },
  ],
  lastUpdated: "September 2026",
};
