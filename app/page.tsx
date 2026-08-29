import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Sparkles, Mic, Award, FileText } from "lucide-react";
import { getSessionUser } from "@/lib/auth";
import { C, F_DISPLAY, F_BODY, F_MONO, chamfer } from "@/lib/theme";
import { PageHeader } from "@/components/ui";

const TEMPLATES = [
  { name: "Ledger", category: "Professional", accent: C.ink, layout: "two-col" },
  { name: "Signal", category: "Simple", accent: C.ignite, layout: "one-col" },
  { name: "Foundry", category: "Creative", accent: C.charge, layout: "two-col" },
  { name: "Baseline", category: "Simple", accent: C.graphite, layout: "one-col" },
];

const QUICK_ACTIONS = [
  { icon: FileText, title: "Start a CV", body: "Pick a template and let the AI draft your first version.", href: "/templates", cta: "Browse templates" },
  { icon: Mic, title: "Practice an interview", body: "Run a role-specific mock interview with real-time feedback.", href: "/mock-interview", cta: "Start practicing" },
  { icon: Award, title: "Get an expert review", body: "Send your draft to a certified reviewer before you submit it.", href: "/expert-review", cta: "Order a review" },
  { icon: Sparkles, title: "See all plans", body: "Compare Free, Premium, and Expert Review add-ons.", href: "/pricing", cta: "View pricing" },
];

function TemplateCard({ t }: { t: (typeof TEMPLATES)[number] }) {
  return (
    <Link
      href={`/editor?template=${encodeURIComponent(t.name)}`}
      className="block p-4 bg-white border transition-transform duration-150 hover:-translate-y-0.5"
      style={{ borderColor: C.steelLine, ...chamfer(14) }}
    >
      <div className="mb-3 p-3" style={{ background: C.steel, ...chamfer(8) }}>
        {t.layout === "two-col" ? (
          <div className="grid grid-cols-3 gap-1.5">
            <div className="col-span-1 space-y-1.5">
              <div style={{ height: 18, background: t.accent, ...chamfer(3) }} />
              {[70, 50].map((w, i) => <div key={i} style={{ height: 4, width: `${w}%`, background: C.steelLine }} />)}
            </div>
            <div className="col-span-2 space-y-1.5">
              {[100, 90, 95, 40].map((w, i) => <div key={i} style={{ height: 4, width: `${w}%`, background: C.steelLine }} />)}
            </div>
          </div>
        ) : (
          <div className="space-y-1.5">
            <div style={{ height: 14, width: "50%", background: t.accent, ...chamfer(3) }} />
            {[100, 90, 80, 95].map((w, i) => <div key={i} style={{ height: 4, width: `${w}%`, background: C.steelLine }} />)}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <span style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink, fontSize: 13 }}>{t.name}</span>
        <ArrowRight size={14} color={C.ignite} />
      </div>
    </Link>
  );
}

function ActionCard({ action }: { action: (typeof QUICK_ACTIONS)[number] }) {
  const Icon = action.icon;
  return (
    <div className="p-6 bg-white border flex flex-col" style={{ borderColor: C.steelLine, ...chamfer(18) }}>
      <div className="w-11 h-11 flex items-center justify-center mb-4" style={{ background: C.igniteTint, ...chamfer(8) }}>
        <Icon size={20} color={C.ignite} />
      </div>
      <h3 className="mb-2" style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink, fontSize: 16 }}>{action.title}</h3>
      <p className="mb-4 flex-1" style={{ fontFamily: F_BODY, color: C.graphite, fontSize: 13 }}>{action.body}</p>
      <Link href={action.href} className="flex items-center gap-1" style={{ fontFamily: F_DISPLAY, fontWeight: 600, color: C.ignite, fontSize: 13 }}>
        {action.cta} <ArrowRight size={14} />
      </Link>
    </div>
  );
}

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <PageHeader eyebrow="Dashboard" title={`Welcome, ${user!.name || user!.email}.`} sub="Everything JobPrimed offers, right where you land — pick up wherever you want." />

      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {QUICK_ACTIONS.map((a) => <ActionCard key={a.title} action={a} />)}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink, fontSize: 20 }}>Jump into a template</h2>
          <Link href="/templates" className="flex items-center gap-1" style={{ fontFamily: F_DISPLAY, fontWeight: 600, color: C.ignite, fontSize: 13 }}>
            See all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {TEMPLATES.map((t) => <TemplateCard key={t.name} t={t} />)}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="p-6" style={{ background: C.steel, ...chamfer(18) }}>
          <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.graphiteLight }} className="mb-2">
            SIGNED IN AS {user!.email}
          </div>
          <p style={{ fontFamily: F_BODY, fontSize: 13, color: C.graphite }}>
            Your account and password are stored in a real database, and this page is gated by a real
            session cookie. Saved CVs, cover letters, and interview history aren't built yet — the
            actions above link to live previews of each feature while that part gets built out.
          </p>
        </div>
      </div>
    </div>
  );
}
