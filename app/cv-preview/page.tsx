import { CVTemplate, sampleCVData } from "@/components/templates/ledger-serif";

/**
 * Demo/QA page for the Ledger Serif CV template component. Not linked
 * from any nav — visit directly to eyeball the component or point a
 * print dialog at it independent of the real builder flow below.
 */
export default function CVPreviewPage() {
  return (
    <div style={{ padding: "40px 16px", background: "#E9E7E1", minHeight: "100vh" }}>
      <CVTemplate data={sampleCVData} />
    </div>
  );
}
