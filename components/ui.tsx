"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import { C, F_DISPLAY, F_BODY, rounded, softShadow } from "@/lib/theme";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-1.5 mb-4"
      style={{ background: C.primaryTint, ...rounded(999) }}
    >
      <span style={{ width: 6, height: 6, background: C.primary, borderRadius: 999, display: "inline-block" }} />
      <span className="text-xs font-semibold" style={{ fontFamily: F_BODY, color: C.primaryDark }}>
        {children}
      </span>
    </div>
  );
}

export function PrimaryButton({
  children,
  onClick,
  style = {},
  className = "",
  type = "button",
  href,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
  type?: "button" | "submit";
  href?: string;
}) {
  const content = (
    <>
      {children}
      <ArrowRight size={18} className="transition-transform duration-150 group-hover:translate-x-1" />
    </>
  );
  const cls = `group relative inline-flex items-center gap-2 px-7 py-3.5 font-semibold transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0 ${className}`;
  const combinedStyle: React.CSSProperties = {
    background: C.primary,
    color: C.paper,
    fontFamily: F_DISPLAY,
    boxShadow: softShadow,
    ...rounded(999),
    ...style,
  };
  if (href) {
    return (
      <a href={href} className={cls} style={combinedStyle}>
        {content}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} style={combinedStyle}>
      {content}
    </button>
  );
}

export function SecondaryButton({
  children,
  onClick,
  className = "",
  href,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
}) {
  const cls = `inline-flex items-center gap-2 px-7 py-3.5 font-semibold border-2 transition-colors duration-150 ${className}`;
  const style: React.CSSProperties = { borderColor: C.ink, color: C.ink, fontFamily: F_DISPLAY, background: C.paper, ...rounded(999) };
  if (href) {
    return (
      <a href={href} className={cls} style={style}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cls} style={style}>
      {children}
    </button>
  );
}

export function PageHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-16 pb-12 text-center">
      <div className="flex justify-center">
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <h1 className="text-4xl md:text-5xl mb-4 max-w-2xl mx-auto" style={{ fontFamily: F_DISPLAY, fontWeight: 800, color: C.ink, letterSpacing: "-0.02em" }}>
        {title}
      </h1>
      {sub && (
        <p className="max-w-xl mx-auto" style={{ fontFamily: F_BODY, color: C.graphite, fontSize: 17, lineHeight: 1.6 }}>
          {sub}
        </p>
      )}
    </div>
  );
}

export function Card({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={className}
      style={{ background: C.paper, border: `1px solid ${C.surfaceLine}`, boxShadow: softShadow, ...rounded(20), ...style }}
    >
      {children}
    </div>
  );
}
