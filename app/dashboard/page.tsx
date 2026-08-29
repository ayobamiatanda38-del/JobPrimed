import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { C, F_DISPLAY, F_BODY, F_MONO, chamfer } from "@/lib/theme";
import { PageHeader } from "@/components/ui";

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <PageHeader eyebrow="Dashboard" title={`Welcome, ${user!.name || user!.email}.`} sub="This page is protected on the server — it redirects to /login for anyone without a valid session." />
      <div className="max-w-4xl mx-auto px-6 pb-24">
        <div className="p-6 bg-white border" style={{ borderColor: C.steelLine, ...chamfer(18) }}>
          <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.graphiteLight }} className="mb-2">
            SIGNED IN AS
          </div>
          <p style={{ fontFamily: F_BODY, fontSize: 15, color: C.ink }}>{user!.email}</p>
        </div>
        <div className="mt-6 p-6" style={{ background: C.steel, ...chamfer(18) }}>
          <h3 className="mb-2" style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink, fontSize: 16 }}>
            What's real here
          </h3>
          <p style={{ fontFamily: F_BODY, fontSize: 14, color: C.graphite }}>
            Your account and password hash are stored in a real Postgres database, and this page is
            gated by a real signed session cookie checked on the server. Saved CVs, cover letters,
            and interview history aren't built yet — this dashboard is the anchor point for those
            once you add the corresponding tables and pages.
          </p>
        </div>
      </div>
    </div>
  );
}
