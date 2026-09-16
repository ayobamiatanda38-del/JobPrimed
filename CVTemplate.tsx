import React from "react";
import styles from "./CVTemplate.module.css";
import type { CVData } from "./types";

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");
}

function renderSummary(summary: string, highlight?: string): React.ReactNode {
  if (!highlight) return summary;
  const index = summary.indexOf(highlight);
  if (index === -1) return summary;
  return (
    <>
      {summary.slice(0, index)}
      <em>{highlight}</em>
      {summary.slice(index + highlight.length)}
    </>
  );
}

export interface CVTemplateProps {
  data: CVData;
  className?: string;
}

/**
 * "Ledger Serif" CV template — despite the historical name (kept for
 * backward compatibility with existing template-selection code), this is
 * now a colored-sidebar, rounded, modern-sans layout matching JobPrimed's
 * current site-wide design system rather than the earlier editorial serif
 * design. Fully data-driven: every section renders only when its data is
 * present.
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
    <article className={[styles.wrapper, className].filter(Boolean).join(" ")} aria-labelledby="cv-name-heading">
      <aside className={styles.sidebar}>
        <div className={styles.avatar}>
          {photoUrl ? <img src={photoUrl} alt={`Photo of ${name}`} /> : initials(name)}
        </div>
        <h1 id="cv-name-heading" className={styles.sidebarName}>
          {name}
        </h1>
        <p className={styles.sidebarRole}>
          {title}
          {location ? ` · ${location}` : ""}
        </p>

        {hasContact && (
          <section className={styles.sideSection} aria-labelledby={ids.contact}>
            <h2 className={styles.sideLabel} id={ids.contact}>
              Contact
            </h2>
            <ul className={styles.sideList}>
              {contactItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {hasSkills && (
          <section className={styles.sideSection} aria-labelledby={ids.skills}>
            <h2 className={styles.sideLabel} id={ids.skills}>
              Skills
            </h2>
            <div>
              {skills.map((skill) => (
                <span key={skill} className={styles.skillPill}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {hasEducation && (
          <section className={styles.sideSection} aria-labelledby={ids.education}>
            <h2 className={styles.sideLabel} id={ids.education}>
              Education
            </h2>
            <ul className={styles.sideList}>
              {education.map((entry) => (
                <li key={`${entry.credential}-${entry.institution}`}>
                  <span className={styles.sideItemTitle}>{entry.credential}</span>
                  <span className={styles.sideItemSub}>
                    {entry.institution}, {entry.year}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {hasCertifications && (
          <section className={styles.sideSection} aria-labelledby={ids.certifications}>
            <h2 className={styles.sideLabel} id={ids.certifications}>
              Certifications
            </h2>
            <ul className={styles.sideList}>
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

      <div className={styles.main}>
        {hasSummary && (
          <section className={styles.section} aria-labelledby={ids.summary}>
            <h2 className={styles.sectionLabel} id={ids.summary}>
              Summary
            </h2>
            <p className={styles.summaryText}>{renderSummary(summary!, summaryHighlight)}</p>
          </section>
        )}

        {hasExperience && (
          <section className={styles.section} aria-labelledby={ids.experience}>
            <h2 className={styles.sectionLabel} id={ids.experience}>
              Experience
            </h2>
            {experience.map((job) => (
              <article className={styles.expEntry} key={`${job.role}-${job.company}-${job.startDate}`}>
                <div className={styles.expHeaderRow}>
                  <h3 className={styles.expRoleCompany} style={{ margin: 0 }}>
                    {job.role} · <span className={styles.expCompany}>{job.company}</span>
                  </h3>
                  <span className={styles.expDates}>
                    {job.startDate} — {job.endDate}
                  </span>
                </div>
                <ul className={styles.bulletList}>
                  {job.bullets.map((bullet, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </section>
        )}

        <div className={styles.footer}>
          <span>{footerNote}</span>
          {lastUpdated && <span>Updated {lastUpdated}</span>}
        </div>
      </div>
    </article>
  );
}

export default CVTemplate;
