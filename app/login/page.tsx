"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { C, F_BODY, rounded } from "@/lib/theme";
import { PrimaryButton, PageHeader, Card } from "@/components/ui";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div>
      <PageHeader eyebrow="Account" title="Log in." sub="Your password is hashed and never stored in plain text." />
      <div className="max-w-sm mx-auto px-6 pb-24">
        <Card className="p-7">
          <form onSubmit={submit}>
            {error && (
              <div className="p-3 mb-4" style={{ background: C.coralTint, ...rounded(10) }}>
                <p style={{ fontFamily: F_BODY, fontSize: 13, color: C.coral }}>{error}</p>
              </div>
            )}
            <label style={{ fontFamily: F_BODY, fontSize: 12, fontWeight: 600, color: C.graphiteLight }}>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 mb-4 px-4 py-2.5 border text-sm"
              style={{ borderColor: C.surfaceLine, fontFamily: F_BODY, ...rounded(10) }}
            />
            <label style={{ fontFamily: F_BODY, fontSize: 12, fontWeight: 600, color: C.graphiteLight }}>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 mb-6 px-4 py-2.5 border text-sm"
              style={{ borderColor: C.surfaceLine, fontFamily: F_BODY, ...rounded(10) }}
            />
            <PrimaryButton type="submit" className="w-full justify-center">
              {loading ? "Logging in…" : "Log in"}
            </PrimaryButton>
          </form>
        </Card>
        <p className="mt-4 text-center" style={{ fontFamily: F_BODY, fontSize: 13.5, color: C.graphite }}>
          No account yet?{" "}
          <Link href="/signup" style={{ color: C.primary, fontWeight: 600 }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
