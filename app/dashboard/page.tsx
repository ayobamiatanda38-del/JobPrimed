import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Sparkles, Mic, Award, FileText, Star } from "lucide-react";
import { getSessionUser } from "@/lib/auth";
import { C, F_DISPLAY, F_BODY, rounded } from "@/lib/theme";
import { PageHeader, Card } from "@/components/ui";
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
    <Card className="p-6 flex flex-col">
      <div className="w-11 h-11 flex items-center justify-center mb-4" style={{ background: C.primaryTint, ...rounded(14) }}>
        <Icon size={20} color={C.primary} />
      </div>
      <h3 className="mb-2" style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink, fontSize: 16 }}>{action.title}</h3>
      <p className="mb-4 flex-1" style={{ fontFamily: F_BODY, color: C.graphite, fontSize: 13.5 }}>{action.body}</p>
      <Link href={action.href} className="flex items-center gap-1" style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.primary, fontSize: 13.5 }}>
        {action.cta} <ArrowRight size={14} />
      </Link>
    </Card>
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
      <PageHeader eyebrow="Dashboard" title={`Welcome, ${user!.name || user!.email}.`} sub="Everything JobPrimed offers, right where you land." />

      <div className="max-w-6xl mx-auto px-6 pb-8">
        <div
          className="p-4 flex items-center justify-between flex-wrap gap-3"
          style={{ background: isPremiumUser ? "#FFFBEB" : C.surface, ...rounded(16) }}
        >
          <span className="flex items-center gap-2" style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink, fontSize: 14 }}>
            {isPremiumUser && <Star size={16} color={C.gold} fill={C.gold} />}
            {isPremiumUser ? "You're on Premium" : "You're on the Free plan"}
          </span>
          {!isPremiumUser && (
            <Link href="/checkout?plan=Premium" className="text-sm font-bold" style={{ fontFamily: F_DISPLAY, color: C.primary }}>
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
          <h2 style={{ fontFamily: F_DISPLAY, fontWeight: 800, color: C.ink, fontSize: 20 }}>Jump into a template</h2>
          <Link href="/templates" className="flex items-center gap-1" style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.primary, fontSize: 13.5 }}>
            See all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {featured.map((t) => <TemplateCard key={t.slug} t={t} isPremiumUser={isPremiumUser} />)}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="p-6" style={{ background: C.surface, ...rounded(20) }}>
          <div style={{ fontFamily: F_DISPLAY, fontSize: 11, color: C.graphiteLight, textTransform: "uppercase", letterSpacing: "0.04em" }} className="mb-2">
            Signed in as {user!.email}
          </div>
          <p style={{ fontFamily: F_BODY, fontSize: 13.5, color: C.graphite }}>
            Your account, password, and plan are stored in a real database, and this page is gated by a
            real session cookie.
          </p>
        </div>
      </div>
    </div>
  );
}
