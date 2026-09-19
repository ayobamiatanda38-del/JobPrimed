"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { C, F_BODY, rounded } from "@/lib/theme";
import { PrimaryButton, PageHeader, Card } from "@/components/ui";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
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
      <PageHeader eyebrow="Account" title="Create your account." sub="Free to start — no card required." />
      <div className="max-w-sm mx-auto px-6 pb-24">
        <Card className="p-7">
          <form onSubmit={submit}>
            {error && (
              <div className="p-3 mb-4" style={{ background: C.coralTint, ...rounded(10) }}>
                <p style={{ fontFamily: F_BODY, fontSize: 13, color: C.coral }}>{error}</p>
              </div>
            )}
            <label style={{ fontFamily: F_BODY, fontSize: 12, fontWeight: 600, color: C.graphiteLight }}>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 mb-4 px-4 py-2.5 border text-sm"
              style={{ borderColor: C.surfaceLine, fontFamily: F_BODY, ...rounded(10) }}
            />
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
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 mb-2 px-4 py-2.5 border text-sm"
              style={{ borderColor: C.surfaceLine, fontFamily: F_BODY, ...rounded(10) }}
            />
            <p className="mb-6" style={{ fontFamily: F_BODY, fontSize: 11.5, color: C.graphiteLight }}>
              At least 8 characters.
            </p>
            <PrimaryButton type="submit" className="w-full justify-center">
              {loading ? "Creating account…" : "Sign up"}
            </PrimaryButton>
          </form>
        </Card>
        <p className="mt-4 text-center" style={{ fontFamily: F_BODY, fontSize: 13.5, color: C.graphite }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: C.primary, fontWeight: 600 }}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
