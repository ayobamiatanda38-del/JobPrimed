import React from "react";
import Link from "next/link";
import { Zap, Mail } from "lucide-react";
import { C, F_DISPLAY, F_BODY, F_MONO, chamfer } from "@/lib/theme";
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
    <footer style={{ background: C.ink }}>
      <div className="max-w-6xl mx-auto px-6 py-20 text-center border-b" style={{ borderColor: "#262B36" }}>
        <h2 className="text-3xl md:text-5xl mb-6" style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.paper }}>
          Stop applying cold.
          <br />
          Start applying <span style={{ color: C.ignite }}>primed.</span>
        </h2>
        <div className="flex justify-center">
          <PrimaryButton href="/pricing" style={{ background: C.ignite }}>
            Get started free
          </PrimaryButton>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-10 grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Zap size={18} color={C.ignite} />
            <span style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.paper }}>JobPrimed</span>
          </div>
          <p style={{ fontFamily: F_BODY, color: "#8B92A0", fontSize: 13 }}>
            AI-drafted CVs, real interview reps, and a human backstop when it matters.
          </p>
        </div>
        <div>
          <div style={{ fontFamily: F_MONO, fontSize: 11, color: "#8B92A0" }} className="mb-3">
            PRODUCT
          </div>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="block mb-2" style={{ fontFamily: F_BODY, color: "#D5D8DD", fontSize: 13 }}>
              {l.label}
            </Link>
          ))}
        </div>
        <div>
          <div style={{ fontFamily: F_MONO, fontSize: 11, color: "#8B92A0" }} className="mb-3">
            LEGAL
          </div>
          {["Privacy policy", "Terms of service", "Refund policy"].map((l) => (
            <a key={l} href="#" className="block mb-2" style={{ fontFamily: F_BODY, color: "#D5D8DD", fontSize: 13 }}>
              {l}
            </a>
          ))}
        </div>
        <div>
          <div style={{ fontFamily: F_MONO, fontSize: 11, color: "#8B92A0" }} className="mb-3">
            CONNECT
          </div>
          <div className="flex gap-3">
            <div className="w-9 h-9 flex items-center justify-center border" style={{ borderColor: "#262B36", ...chamfer(6) }}>
              <Mail size={15} color="#D5D8DD" />
            </div>
            {["LI", "X", "IG"].map((label) => (
              <div
                key={label}
                className="w-9 h-9 flex items-center justify-center border text-xs font-bold"
                style={{ borderColor: "#262B36", color: "#D5D8DD", fontFamily: F_MONO, ...chamfer(6) }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 pb-8">
        <p style={{ fontFamily: F_MONO, fontSize: 11, color: "#565C68" }}>
          © 2026 JobPrimed. Testimonials and stats on this page are illustrative placeholders.
        </p>
      </div>
    </footer>
  );
}
