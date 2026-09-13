import type { CSSProperties } from "react";

/**
 * Design system v2 — replaces the old dark/chamfered "ignition" identity.
 * Direction: white background, soft rounded shapes, a friendly modern
 * sans-serif — closer to the mainstream resume-builder aesthetic
 * (Kickresume et al.) per explicit direction, rather than JobPrimed's
 * earlier sharp-edged, high-contrast look.
 *
 * These are original values in the same general spirit as that category
 * of product — not extracted from or copied off any specific site.
 *
 * BACKWARD COMPATIBILITY: many pages across the site still haven't been
 * converted to the new system yet and import the OLD token names
 * (C.steel, C.ignite, C.charge, chamfer(), etc.) from this same module.
 * Rather than break every one of those pages at once, the old names are
 * kept here as aliases onto the new palette/shape — so the whole site
 * builds and renders with the new rounded/soft look immediately, even on
 * pages that haven't had their full color usage rewritten yet. As each
 * page gets converted, its imports can be updated to the new names
 * directly and the aliases below can eventually be deleted.
 */
export const C = {
  // --- current tokens ---
  paper: "#FFFFFF",
  surface: "#F7F8FB",
  surfaceLine: "#EAEAF2",
  ink: "#14142B",
  graphite: "#6E7191",
  graphiteLight: "#A0A3BD",
  primary: "#6C5CE7",
  primaryDark: "#5340D9",
  primaryTint: "#F0EEFD",
  coral: "#FF7452",
  coralTint: "#FFEEE8",
  success: "#2ECC71",
  gold: "#F5A623",

  // --- legacy aliases (old "ignition" system token names) ---
  steel: "#F7F8FB",
  steelLine: "#EAEAF2",
  ignite: "#FF7452",
  igniteDark: "#E85A38",
  igniteTint: "#FFEEE8",
  charge: "#6C5CE7",
  chargeTint: "#F0EEFD",
};

export const F_DISPLAY = "'Plus Jakarta Sans', sans-serif";
export const F_BODY = "'Inter', sans-serif";
export const F_MONO = "'Inter', sans-serif"; // no mono accent in this system — labels use body font, smaller + medium weight

/** Soft rounded corner, replacing the old chamfer() cut-corner shape. */
export function rounded(size = 16): CSSProperties {
  return { borderRadius: size };
}

/**
 * Legacy alias: old pages call chamfer(n) expecting a cut-corner shape.
 * Returns a rounded corner instead, so those pages compile AND pick up
 * the new soft/rounded look without needing an immediate rewrite.
 */
export function chamfer(size = 14): CSSProperties {
  return rounded(size);
}

/** Soft ambient shadow used instead of hard borders for card elevation. */
export const softShadow = "0 8px 24px rgba(20, 20, 43, 0.06)";
export const softShadowHover = "0 12px 32px rgba(20, 20, 43, 0.10)";
