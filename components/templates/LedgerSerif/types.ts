/**
 * Type definitions for <CVTemplateLedgerSerif />.
 *
 * All CV content is passed in as data — nothing about a specific person
 * is hardcoded in the component itself. See sampleData.ts for a worked
 * example, and README.md for the full field-by-field guide.
 */

export interface CVContact {
  email?: string;
  phone?: string;
  /** Street + city, e.g. "14 Bourdillon Rd, Lagos". */
  address?: string;
  postalCode?: string;
  linkedin?: string;
}

export interface CVExperienceEntry {
  role: string;
  company: string;
  /** Free-form, e.g. "Mar 2022" — kept as a string since date precision varies (some CVs only have a year). */
  startDate: string;
  /** Use "Present" for a current role. */
  endDate: string;
  /** Rendered as a bulleted list, in the order given. */
  bullets: string[];
}

export interface CVEducationEntry {
  /** e.g. "B.Sc. Accounting" or "ICAN" */
  title: string;
  /** e.g. "University of Lagos, 2014" or "Chartered 2017" */
  detail: string;
}

export interface CVCertification {
  name: string;
  /** Optional issuer/year, rendered inline after the name. */
  detail?: string;
}

export interface LedgerSerifTheme {
  /**
   * Primary accent — section-label color and every hairline divider.
   * Defaults to "Field Green" (#2F4F3E) from the original design brief.
   */
  accent?: string;
  /**
   * Secondary accent — used exactly once, for the rule beneath the
   * masthead. Defaults to "Brass" (#9C7A3C). Deliberately not used
   * anywhere else; see README for why.
   */
  accentSecondary?: string;
}

export interface CVData {
  name: string;
  role: string;
  location?: string;
  contact?: CVContact;
  summary?: string;
  experience?: CVExperienceEntry[];
  education?: CVEducationEntry[];
  /** Rendered as flowing prose (comma-joined), not chips/tags — by design. */
  skills?: string[];
  certifications?: CVCertification[];
  /** Footer-right text, e.g. "Updated September 2026". Omit to hide. */
  updatedLabel?: string;
  /** Footer-left text. Defaults to "References available on request." */
  referencesLabel?: string;
}

export interface CVTemplateLedgerSerifProps {
  data: CVData;
  theme?: LedgerSerifTheme;
  /**
   * Renders a diagonal watermark over the document — e.g. to gate
   * content behind a paywall the way the rest of JobPrimed does for
   * Premium sections. Purely presentational; enforcing the actual
   * paywall is the caller's responsibility.
   */
  watermark?: boolean;
  watermarkText?: string;
  /** Applied to the outer <article> — use this to control width/margin from the parent page rather than editing the component. */
  className?: string;
}
