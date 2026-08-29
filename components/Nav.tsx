"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Zap, Menu, X, User, LogOut } from "lucide-react";
import { C, F_DISPLAY, F_BODY } from "@/lib/theme";
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

type SessionUser = { id: number; email: string; name: string | null };

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
      className="sticky top-0 z-50 border-b"
      style={{ background: "rgba(255,255,255,0.94)", backdropFilter: "blur(8px)", borderColor: C.steelLine }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Zap size={20} color={C.ignite} />
          <span style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink, fontSize: 18 }}>JobPrimed</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_PAGES.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              style={{
                fontFamily: F_BODY,
                color: pathname === p.href ? C.ink : C.graphite,
                fontWeight: pathname === p.href ? 700 : 400,
                fontSize: 14,
              }}
            >
              {p.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-4">
          {user === undefined ? null : user ? (
            <>
              <span className="flex items-center gap-2" style={{ fontFamily: F_BODY, color: C.ink, fontSize: 14 }}>
                <User size={16} /> {user.name || user.email}
              </span>
              <button onClick={logout} className="flex items-center gap-1" style={{ fontFamily: F_BODY, color: C.graphite, fontSize: 14 }}>
                <LogOut size={14} /> Log out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" style={{ fontFamily: F_BODY, color: C.graphite, fontSize: 14 }}>
                Log in
              </Link>
              <PrimaryButton href="/signup" style={{ padding: "10px 20px", fontSize: 14 }}>
                Sign up
              </PrimaryButton>
            </>
          )}
        </div>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t px-6 py-4 flex flex-col gap-4" style={{ borderColor: C.steelLine, background: C.paper }}>
          {NAV_PAGES.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              onClick={() => setOpen(false)}
              style={{ fontFamily: F_BODY, color: pathname === p.href ? C.ink : C.graphite, fontSize: 15, fontWeight: pathname === p.href ? 700 : 400 }}
            >
              {p.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-2">
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                style={{ fontFamily: F_BODY, color: C.graphite, fontSize: 14 }}
              >
                Log out
              </button>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} style={{ fontFamily: F_BODY, color: C.graphite, fontSize: 14 }}>
                  Log in
                </Link>
                <Link href="/signup" onClick={() => setOpen(false)} style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ignite, fontSize: 14 }}>
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
