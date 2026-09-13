"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sparkles, Menu, X, User, LogOut } from "lucide-react";
import { C, F_DISPLAY, F_BODY, rounded } from "@/lib/theme";
import { PrimaryButton } from "./ui";

const NAV_PAGES = [
  { href: "/templates", label: "Templates" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/mock-interview", label: "Mock Interview" },
  { href: "/expert-review", label: "Expert Review" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
];

type SessionUser = { id: number; email: string; name: string | null; plan: "free" | "premium" };

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<SessionUser | null | undefined>(undefined);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => setUser(data.user))
      .catch(() => setUser(null));
  }, [pathname]);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
    router.refresh();
  };

  return (
    <header
      className="sticky top-0 z-50"
      style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${C.surfaceLine}` }}
    >
      <div className="max-w-6xl mx-auto px-6 h-18 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center" style={{ background: C.primary, ...rounded(10) }}>
            <Sparkles size={16} color={C.paper} />
          </div>
          <span style={{ fontFamily: F_DISPLAY, fontWeight: 800, color: C.ink, fontSize: 19 }}>JobPrimed</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_PAGES.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              style={{
                fontFamily: F_BODY,
                color: pathname === p.href ? C.ink : C.graphite,
                fontWeight: pathname === p.href ? 700 : 500,
                fontSize: 14.5,
              }}
            >
              {p.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-4">
          {user === undefined ? null : user ? (
            <>
              <span className="flex items-center gap-1.5" style={{ fontFamily: F_BODY, color: C.ink, fontSize: 14 }}>
                <User size={15} /> {user.name || user.email}
              </span>
              <button onClick={logout} className="flex items-center gap-1" style={{ fontFamily: F_BODY, color: C.graphite, fontSize: 14 }}>
                <LogOut size={13} /> Log out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" style={{ fontFamily: F_BODY, color: C.graphite, fontSize: 14.5, fontWeight: 500 }}>
                Log in
              </Link>
              <PrimaryButton href="/signup" style={{ padding: "10px 22px", fontSize: 14 }}>
                Sign up free
              </PrimaryButton>
            </>
          )}
        </div>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden px-6 py-4 flex flex-col gap-4" style={{ borderTop: `1px solid ${C.surfaceLine}`, background: C.paper }}>
          {NAV_PAGES.map((p) => (
            <Link key={p.href} href={p.href} onClick={() => setOpen(false)} style={{ fontFamily: F_BODY, color: pathname === p.href ? C.ink : C.graphite, fontSize: 15, fontWeight: pathname === p.href ? 700 : 500 }}>
              {p.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-2">
            {user ? (
              <button onClick={() => { logout(); setOpen(false); }} style={{ fontFamily: F_BODY, color: C.graphite, fontSize: 14 }}>
                Log out
              </button>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} style={{ fontFamily: F_BODY, color: C.graphite, fontSize: 14 }}>
                  Log in
                </Link>
                <PrimaryButton href="/signup">Sign up free</PrimaryButton>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
