# Ledger Serif — CV Template Component

A single, opinionated CV/resume template built as a reusable, data-driven
React component (`<CVTemplate />`) for the JobPrimed Next.js app.

## Design rationale

This template is deliberately **not** styled like the rest of JobPrimed's
marketing UI. A CV is a trust document a hiring manager judges in seconds —
it needed its own restrained, editorial identity:

- **Color**: Paper Stone `#F7F6F2` background, Ink Navy `#14181F` text,
  Graphite `#4B525A` secondary text, Field Green `#2F4F3E` as the one
  accent (bullets, dividers, section labels), Brass `#9C7A3C` used exactly
  once (the masthead rule), Hairline `#D9D5CB` for all internal dividers.
- **Type**: Fraunces (serif) for the name and section labels — signals
  "an accomplished person," not a SaaS product. IBM Plex Sans for body
  text — built for dense, legible content at small sizes.
- **Layout**: a full-width serif masthead breaks into an asymmetric
  two-column body (narrow contact/skills/education spine, wide
  chronological experience column) — no filled sidebar block, no card
  shadows. Real resumes get printed; ink-hungry backgrounds are a tell
  that a design was made for a screen, not paper.
- **Dividers**: every section — sidebar and main column alike — is
  separated by the same 1px Hairline rule, applied via a single CSS
  sibling selector (`.section + .section`) so sections that don't render
  (missing data) never leave an orphaned divider behind.

## Files in this folder

| File | Purpose |
|---|---|
| `CVTemplate.tsx` | The component itself |
| `CVTemplate.module.css` | All styling, including responsive + print rules |
| `types.ts` | The `CVData` TypeScript contract |
| `sampleData.ts` | A full example `CVData` object, used in demos/tests |
| `index.ts` | Barrel export |

## Usage

```tsx
import { CVTemplate, sampleCVData } from "@/components/templates/ledger-serif";

export default function MyPage() {
  return <CVTemplate data={sampleCVData} />;
}
```

Every field on `CVData` except `name` and `title` is optional. Any section
with no data (e.g. an empty `education` array, or no `summary`) simply
doesn't render — no empty headings, no stray dividers.

```tsx
<CVTemplate
  data={{
    name: "Jane Doe",
    title: "Product Manager",
    location: "Nairobi, Kenya",
    contact: { email: "jane@example.com", phone: "+254 700 000000" },
    summary: "Ships product decisions the data can defend.",
    skills: ["Roadmapping", "SQL", "Stakeholder Management"],
    experience: [
      {
        role: "Senior PM",
        company: "Acme Inc",
        startDate: "2022",
        endDate: "Present",
        bullets: ["Shipped X, moving metric Y by Z%."],
      },
    ],
  }}
/>
```

## Fonts

This component expects **Fraunces** and **IBM Plex Sans** to already be
loaded on the page — it does not load its own fonts, to avoid duplicate
font requests if used more than once on a page. In this project, both are
already added to the global Google Fonts `<link>` in `app/layout.tsx`
alongside the app's other fonts.

If you drop this component into a different project, add these font
families yourself (via a `<link>` tag or `next/font/google`) before using
the component — otherwise it will fall back to your browser's default
serif/sans-serif.

## Printing / PDF export

The stylesheet includes a `@media print` block and an `@page { margin:
14mm; }` rule. To let a user download this as a PDF, call
`window.print()` from a button on the host page — most browsers offer
"Save as PDF" as a print destination. See
`app/editor/ledger-serif/page.tsx` for a working example, including
hiding the rest of the site's navigation while printing (via the global
`body > header, body > footer { display: none }` print rule in
`app/globals.css` — scoped to `body >` specifically so it doesn't
accidentally hide this component's own internal `<header>`/`<footer>`
elements).

## Accessibility

- Real heading hierarchy: `<h1>` (name) → `<h2>` (each section) → `<h3>`
  (each job within Experience).
- Each `<section>` is linked to its own heading via `aria-labelledby`,
  rather than a duplicate `aria-label` string.
- The optional `photoUrl` prop renders with an auto-generated
  `alt="Photo of {name}"` — pass a more specific `alt` upstream if a
  particular employer has photo requirements you need to describe.

## Known limitation / next step

This component is **not yet wired into JobPrimed's other, generic
section-builder editor** (`app/editor/page.tsx`), which stores CV content
as loose per-section strings rather than this component's structured
`CVData` shape (typed arrays of experience/education entries). Instead,
it has its own dedicated route — `app/editor/ledger-serif/page.tsx` — with
a form built specifically around `CVData`'s structure (add/remove job
entries, add/remove education entries, etc.).

Unifying the two editors into one data model is a real, separate piece of
work — worth doing eventually so every template shares one editing
experience, but out of scope for this component's initial build.
