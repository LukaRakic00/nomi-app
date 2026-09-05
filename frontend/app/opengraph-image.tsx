import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

// OG slika se generiše u runtime-u, pa u repozitorijumu nema binarnih assetа.
export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 24,
        background: "#0a0a0a",
        color: "#fafafa",
        padding: "80px",
      }}
    >
      <div style={{ fontSize: 68, fontWeight: 700, letterSpacing: "-0.03em" }}>
        {siteConfig.name}
      </div>
      <div style={{ fontSize: 32, color: "#a1a1aa", lineHeight: 1.4 }}>
        {siteConfig.description}
      </div>
    </div>,
    size,
  );
}
