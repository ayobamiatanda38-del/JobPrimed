import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Sparkles, Mic, Award, FileText, Star } from "lucide-react";
import { getSessionUser } from "@/lib/auth";
import { C, F_DISPLAY, F_BODY, F_MONO, chamfer } from "@/lib/theme";
import { PageHeader } from "@/components/ui";
import TemplateCard from "@/components/TemplateCard";
import { TEMPLATES } from "@/lib/templates";

const QUICK_ACTIONS = [
  { icon: FileText, title: "Start a CV", body: "Pick a template and let the AI draft your first version.", href: "/templates", cta: "Browse templates" },
  { icon: Mic, title: "Practice an interview", body: "Run a role-specific mock interview with real-time feedback.", href: "/mock-interview", cta: "Start practicing" },
  { icon: Award, title: "Get an expert review", body: "Send your draft to a certified reviewer before you submit it.", href: "/expert-review", cta: "Order a review" },
  { icon: Sparkles, title: "See all plans", body: "Compare Free, Premium, and Expert Review add-ons.", href: "/pricing", cta: "View pricing" },
];

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
  const isPremiumUser = user!.plan === "premium";
  const featured = TEMPLATES.slice(0, 4);

  return (
    <div>
      <PageHeader eyebrow="Dashboard" title={`Welcome, ${user!.name || user!.email}.`} sub="Everything JobPrimed offers, right where you land — pick up wherever you want." />

      <div className="max-w-6xl mx-auto px-6 pb-8">
        <div
          className="p-4 flex items-center justify-between flex-wrap gap-3"
          style={{ background: isPremiumUser ? C.gold : C.steel, ...chamfer(12) }}
        >
          <span className="flex items-center gap-2" style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink, fontSize: 14 }}>
            {isPremiumUser && <Star size={16} fill={C.ink} />}
            {isPremiumUser ? "You're on Premium" : "You're on the Free plan"}
          </span>
          {!isPremiumUser && (
            <Link href="/checkout?plan=Premium" className="text-sm font-semibold" style={{ fontFamily: F_DISPLAY, color: C.igniteDark }}>
              Upgrade to Premium →
            </Link>
          )}
        </div>
      </div>

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
          {featured.map((t) => <TemplateCard key={t.slug} t={t} isPremiumUser={isPremiumUser} />)}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="p-6" style={{ background: C.steel, ...chamfer(18) }}>
          <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.graphiteLight }} className="mb-2">
            SIGNED IN AS {user!.email}
          </div>
          <p style={{ fontFamily: F_BODY, fontSize: 13, color: C.graphite }}>
            Your account, password, and plan are stored in a real database, and this page is gated by a
            real session cookie. Saved CVs, cover letters, and interview history aren't built yet — the
            actions above link to live previews of each feature while that part gets built out.
          </p>
        </div>
      </div>
    </div>
  );
}
