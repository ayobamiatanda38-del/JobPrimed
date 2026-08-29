"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { C, F_DISPLAY, F_BODY, F_MONO, chamfer } from "@/lib/theme";
import { PrimaryButton, PageHeader } from "@/components/ui";

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
      <PageHeader eyebrow="Account" title="Log in." sub="Real authentication — your password is hashed and never stored in plain text." />
      <div className="max-w-sm mx-auto px-6 pb-24">
        <form onSubmit={submit} className="p-6 bg-white border" style={{ borderColor: C.steelLine, ...chamfer(18) }}>
          {error && (
            <div className="p-3 mb-4" style={{ background: C.igniteTint, ...chamfer(8) }}>
              <p style={{ fontFamily: F_BODY, fontSize: 13, color: C.igniteDark }}>{error}</p>
            </div>
          )}
          <label style={{ fontFamily: F_MONO, fontSize: 11, color: C.graphiteLight }}>EMAIL</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 mb-4 px-3 py-2.5 border text-sm"
            style={{ borderColor: C.steelLine, fontFamily: F_BODY, ...chamfer(8) }}
          />
          <label style={{ fontFamily: F_MONO, fontSize: 11, color: C.graphiteLight }}>PASSWORD</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 mb-6 px-3 py-2.5 border text-sm"
            style={{ borderColor: C.steelLine, fontFamily: F_BODY, ...chamfer(8) }}
          />
          <PrimaryButton type="submit" className="w-full justify-center">
            {loading ? "Logging in…" : "Log in"}
          </PrimaryButton>
        </form>
        <p className="mt-4 text-center" style={{ fontFamily: F_BODY, fontSize: 13, color: C.graphite }}>
          No account yet?{" "}
          <Link href="/signup" style={{ color: C.ignite, fontWeight: 600 }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
