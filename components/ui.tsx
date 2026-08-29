"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import { C, F_DISPLAY, F_MONO, chamfer } from "@/lib/theme";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 mb-4" style={{ background: C.igniteTint, ...chamfer(8) }}>
      <span style={{ width: 6, height: 6, background: C.ignite, display: "inline-block" }} />
      <span className="text-xs tracking-widest uppercase" style={{ fontFamily: F_MONO, color: C.igniteDark, fontWeight: 700 }}>
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
  const cls = `group relative inline-flex items-center gap-2 px-6 py-3.5 font-semibold transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 ${className}`;
  const combinedStyle = { background: C.ink, color: C.paper, fontFamily: F_DISPLAY, ...chamfer(12), ...style };
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
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
  type?: "button" | "submit";
}) {
  const cls = `inline-flex items-center gap-2 px-6 py-3.5 font-semibold border transition-colors duration-150 ${className}`;
  const style = { borderColor: C.ink, color: C.ink, fontFamily: F_DISPLAY, ...chamfer(12) };
  if (href) {
    return (
      <a href={href} className={cls} style={style}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} style={style}>
      {children}
    </button>
  );
}

export function PageHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-16 pb-12">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="text-4xl md:text-5xl mb-4 max-w-2xl" style={{ fontFamily: F_DISPLAY, fontWeight: 700, color: C.ink }}>
        {title}
      </h1>
      {sub && (
        <p className="max-w-xl" style={{ fontFamily: "'Inter', sans-serif", color: C.graphite, fontSize: 16 }}>
          {sub}
        </p>
      )}
    </div>
  );
}
