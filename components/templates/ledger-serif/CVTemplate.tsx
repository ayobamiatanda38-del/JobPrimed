import React from "react";
import styles from "./CVTemplate.module.css";
import type { CVData } from "./types";

/** Turns a heading label into a stable, unique-enough DOM id for aria-labelledby. */
function slugify(label: string): string {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/**
 * Splits `summary` on `highlight` (if present) and wraps the matched
 * portion in <em>, which the stylesheet renders in the accent serif
 * italic. Falls back to plain text if `highlight` isn't an exact
 * substring — this must never throw on mismatched input.
 */
function renderSummary(summary: string, highlight?: string): React.ReactNode {
  if (!highlight) return summary;
  const index = summary.indexOf(highlight);
  if (index === -1) return summary;
  const before = summary.slice(0, index);
  const after = summary.slice(index + highlight.length);
  return (
    <>
      {before}
      <em>{highlight}</em>
      {after}
    </>
  );
}

export interface CVTemplateProps {
  data: CVData;
  /** Optional extra class name, e.g. for print-trigger wrappers in a host page. */
  className?: string;
}

/**
 * A single, opinionated CV/resume template ("Ledger Serif"): an editorial,
 * print-first design distinct from JobPrimed's own marketing UI — see the
 * component README for the design rationale.
 *
 * Fully data-driven: every section is optional and renders only when its
 * data is present, so this same component serves a CV with one line filled
 * in and a CV with fifteen years of history without ever showing an empty
 * section or an orphaned divider.
 */
export function CVTemplate({ data, className }: CVTemplateProps) {
  const {
    name,
    title,
    location,
    contact,
    photoUrl,
    summary,
    summaryHighlight,
    skills = [],
    education = [],
    certifications = [],
    experience = [],
    footerNote = "References available on request.",
    lastUpdated,
  } = data;

  const contactItems = contact
    ? [contact.email, contact.phone, contact.address, contact.postalCode, contact.linkedin].filter(
        (v): v is string => Boolean(v)
      )
    : [];

  const hasContact = contactItems.length > 0;
  const hasSkills = skills.length > 0;
  const hasEducation = education.length > 0;
  const hasCertifications = certifications.length > 0;
  const hasSummary = Boolean(summary);
  const hasExperience = experience.length > 0;

  const ids = {
    contact: "cv-section-contact",
    skills: "cv-section-skills",
    education: "cv-section-education",
    certifications: "cv-section-certifications",
    summary: "cv-section-summary",
    experience: "cv-section-experience",
  };

  return (
    <article
      className={[styles.wrapper, className].filter(Boolean).join(" ")}
      aria-labelledby="cv-name-heading"
    >
      <header className={styles.masthead}>
        {photoUrl && (
          // Alt text is generated from the person's name — see README for
          // guidance if you need a more descriptive alt (e.g. attire/setting
          // requirements from a specific employer).
          <img src={photoUrl} alt={`Photo of ${name}`} className={styles.photo} />
        )}
        <div>
          <h1 id="cv-name-heading">{name}</h1>
          <div className={styles.roleLine}>
            <span>{title}</span>
            {location && (
              <>
                <span className={styles.dot} aria-hidden="true" />
                <span>{location}</span>
              </>
            )}
          </div>
        </div>
      </header>

      <div className={styles.grid}>
        <aside className={styles.spine}>
          {hasContact && (
            <section className={styles.section} aria-labelledby={ids.contact}>
              <h2 className={styles.label} id={ids.contact}>
                Contact
              </h2>
              <ul className={styles.list}>
                {contactItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {hasSkills && (
            <section className={styles.section} aria-labelledby={ids.skills}>
              <h2 className={styles.label} id={ids.skills}>
                Skills
              </h2>
              <ul className={styles.list}>
                {skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </section>
          )}

          {hasEducation && (
            <section className={styles.section} aria-labelledby={ids.education}>
              <h2 className={styles.label} id={ids.education}>
                Education
              </h2>
              <ul className={styles.list}>
                {education.map((entry) => {
                  const sub = [entry.institution, entry.year].filter(Boolean).join(", ");
                  return (
                    <li key={`${entry.credential}-${entry.institution}`}>
                      <span className={styles.itemTitle}>{entry.credential}</span>
                      {sub && <span className={styles.itemSub}>{sub}</span>}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {hasCertifications && (
            <section className={styles.section} aria-labelledby={ids.certifications}>
              <h2 className={styles.label} id={ids.certifications}>
                Certifications
              </h2>
              <ul className={styles.list}>
                {certifications.map((cert) => (
                  <li key={cert.name}>
                    {cert.name}
                    {cert.issuer ? ` — ${cert.issuer}` : ""}
                    {cert.year ? `, ${cert.year}` : ""}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>

        <div className={styles.mainCol}>
          {hasSummary && (
            <section className={styles.section} aria-labelledby={ids.summary}>
              <h2 className={styles.label} id={ids.summary}>
                Summary
              </h2>
              <p className={styles.summary}>{renderSummary(summary!, summaryHighlight)}</p>
            </section>
          )}

          {hasExperience && (
            <section className={styles.section} aria-labelledby={ids.experience}>
              <h2 className={styles.label} id={ids.experience}>
                Experience
              </h2>
              {experience.map((job) => (
                <article className={styles.expEntry} key={`${job.role}-${job.company}-${job.startDate}`}>
                  <div className={styles.expHeader}>
                    <h3 className={styles.expHeading}>
                      <span className={styles.expRole}>{job.role}</span> ·{" "}
                      <span className={styles.expCompany}>{job.company}</span>
                    </h3>
                    <span className={styles.expDates}>
                      {job.startDate} — {job.endDate}
                    </span>
                  </div>
                  <ul className={styles.bulletList}>
                    {job.bullets.map((bullet, i) => (
                      // Bullets are prose, not stable IDs — index key is
                      // acceptable since this list is never reordered.
                      // eslint-disable-next-line react/no-array-index-key
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </section>
          )}
        </div>
      </div>

      <footer className={styles.footer}>
        <span>{footerNote}</span>
        {lastUpdated && <span>Updated {lastUpdated}</span>}
      </footer>
    </article>
  );
}

export default CVTemplate;
