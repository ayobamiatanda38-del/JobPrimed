/**
 * Data contract for <CVTemplate />.
 *
 * Every array field is optional and independently renders-or-skips: pass
 * an empty array (or omit it) and that whole section — heading, divider,
 * spacing — disappears cleanly. This is what lets the same component
 * serve a fresh CV with almost nothing filled in, and a dense 15-year
 * career history, without ever showing an empty section.
 */

export interface CVContactInfo {
  email?: string;
  phone?: string;
  /** Free-text street/city address. */
  address?: string;
  postalCode?: string;
  linkedin?: string;
}

export interface CVExperienceEntry {
  role: string;
  company: string;
  /** Free-text so callers can pass "2022" or "Mar 2022" etc. */
  startDate: string;
  /** Use "Present" for a current role. */
  endDate: string;
  /** Each string renders as one bullet. */
  bullets: string[];
}

export interface CVEducationEntry {
  credential: string;
  institution: string;
  year: string;
}

export interface CVCertificationEntry {
  name: string;
  issuer?: string;
  year?: string;
}

export interface CVData {
  name: string;
  title: string;
  location?: string;
  contact?: CVContactInfo;

  /**
   * Optional portrait. Off by default — the template's design is
   * deliberately photo-free — but supported for callers who need it.
   * Alt text is derived automatically from `name`; see README.
   */
  photoUrl?: string;

  summary?: string;
  /**
   * An optional clause from the summary to render emphasized (the
   * italic, accent-colored treatment). Pass the exact substring of
   * `summary` you want pulled out and styled — if it isn't found as a
   * substring, the summary just renders as plain prose.
   */
  summaryHighlight?: string;

  skills?: string[];
  education?: CVEducationEntry[];
  certifications?: CVCertificationEntry[];
  experience?: CVExperienceEntry[];

  /** Defaults to "References available on request." if omitted. */
  footerNote?: string;
  /** Defaults to no date shown if omitted. */
  lastUpdated?: string;
}
