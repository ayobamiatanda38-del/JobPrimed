/**
 * Data contract for <CVTemplate />.
 *
 * Every array field is optional and independently renders-or-skips: pass
 * an empty array (or omit it) and that whole section — heading, spacing —
 * disappears cleanly.
 */

export interface CVContactInfo {
  email?: string;
  phone?: string;
  address?: string;
  postalCode?: string;
  linkedin?: string;
}

export interface CVExperienceEntry {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
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

  /** Optional portrait. If omitted, a colored initials avatar is shown instead. */
  photoUrl?: string;

  summary?: string;
  summaryHighlight?: string;

  skills?: string[];
  education?: CVEducationEntry[];
  certifications?: CVCertificationEntry[];
  experience?: CVExperienceEntry[];

  footerNote?: string;
  lastUpdated?: string;
}
