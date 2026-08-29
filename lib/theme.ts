import type { CSSProperties } from "react";

export const C = {
  paper: "#FFFFFF",
  steel: "#F3F4F6",
  steelLine: "#E4E6EA",
  ink: "#0B0D0E",
  graphite: "#5B6270",
  graphiteLight: "#8A909B",
  ignite: "#FF3B1A",
  igniteDark: "#D62E10",
  igniteTint: "#FFEDE9",
  charge: "#0047FF",
  chargeTint: "#EAF0FF",
  gold: "#F5A623",
};

export const F_DISPLAY = "'Space Grotesk', sans-serif";
export const F_BODY = "'Inter', sans-serif";
export const F_MONO = "'JetBrains Mono', monospace";

export function chamfer(size = 14): CSSProperties {
  return {
    clipPath: `polygon(0 0, calc(100% - ${size}px) 0, 100% ${size}px, 100% 100%, 0 100%)`,
  };
}
