import React from "react";
import Link from "next/link";
import { Sparkles, Mail } from "lucide-react";
import { C, F_DISPLAY, F_BODY, rounded } from "@/lib/theme";
import { PrimaryButton } from "./ui";

const LINKS = [
  { href: "/templates", label: "Templates" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/mock-interview", label: "Mock Interview" },
  { href: "/expert-review", label: "Expert Review" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
];

export default function Footer() {
  return (
    <footer style={{ background: C.surface, borderTop: `1px solid ${C.surfaceLine}` }}>
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl mb-6" style={{ fontFamily: F_DISPLAY, fontWeight: 800, color: C.ink, letterSpacing: "-0.02em" }}>
          Build a resume. Land a job.
        </h2>
        <div className="flex justify-center">
          <PrimaryButton href="/pricing">Get started free</PrimaryButton>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-10 grid sm:grid-cols-2 md:grid-cols-4 gap-8 border-t" style={{ borderColor: C.surfaceLine }}>
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 flex items-center justify-center" style={{ background: C.primary, ...rounded(8) }}>
              <Sparkles size={14} color={C.paper} />
            </div>
            <span style={{ fontFamily: F_DISPLAY, fontWeight: 800, color: C.ink }}>JobPrimed</span>
          </div>
          <p style={{ fontFamily: F_BODY, color: C.graphite, fontSize: 13 }}>
            AI-drafted CVs, real interview reps, and a human backstop when it matters.
          </p>
        </div>
        <div>
          <div style={{ fontFamily: F_DISPLAY, fontWeight: 700, fontSize: 12, color: C.ink }} className="mb-3">Product</div>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="block mb-2" style={{ fontFamily: F_BODY, color: C.graphite, fontSize: 13.5 }}>
              {l.label}
            </Link>
          ))}
        </div>
        <div>
          <div style={{ fontFamily: F_DISPLAY, fontWeight: 700, fontSize: 12, color: C.ink }} className="mb-3">Legal</div>
          {["Privacy policy", "Terms of service", "Refund policy"].map((l) => (
            <a key={l} href="#" className="block mb-2" style={{ fontFamily: F_BODY, color: C.graphite, fontSize: 13.5 }}>{l}</a>
          ))}
        </div>
        <div>
          <div style={{ fontFamily: F_DISPLAY, fontWeight: 700, fontSize: 12, color: C.ink }} className="mb-3">Connect</div>
          <div className="w-9 h-9 flex items-center justify-center" style={{ background: C.paper, border: `1px solid ${C.surfaceLine}`, ...rounded(999) }}>
            <Mail size={15} color={C.graphite} />
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 pb-8">
        <p style={{ fontFamily: F_BODY, fontSize: 12, color: C.graphiteLight }}>
          © 2026 JobPrimed. Testimonials and stats on this page are illustrative placeholders.
        </p>
      </div>
    </footer>
  );
}
