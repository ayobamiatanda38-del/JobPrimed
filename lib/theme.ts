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
 */
export const C = {
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
};

export const F_DISPLAY = "'Plus Jakarta Sans', sans-serif";
export const F_BODY = "'Inter', sans-serif";
export const F_MONO = "'Inter', sans-serif"; // no mono accent in this system — labels use body font, smaller + medium weight

/** Soft rounded corner, replacing the old chamfer() cut-corner shape. */
export function rounded(size = 16): CSSProperties {
  return { borderRadius: size };
}

/** Soft ambient shadow used instead of hard borders for card elevation. */
export const softShadow = "0 8px 24px rgba(20, 20, 43, 0.06)";
export const softShadowHover = "0 12px 32px rgba(20, 20, 43, 0.10)";
