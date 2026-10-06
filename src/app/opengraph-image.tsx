import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "VERGELES — Furniture for modern living";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), "src/app/og-photo.jpg"));
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#F5F3EF" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 540,
            padding: "56px 56px 52px",
            color: "#171717",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                width: 18,
                height: 24,
                border: "1.5px solid #171717",
                borderBottom: "1.5px solid #171717",
                borderTopLeftRadius: 9,
                borderTopRightRadius: 9,
              }}
            />
            <div style={{ fontSize: 22, letterSpacing: 7 }}>VERGELES</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 60, lineHeight: 1.02, letterSpacing: -2.4 }}>
              Furniture for modern living.
            </div>
            <div style={{ marginTop: 28, fontSize: 18, color: "#77736C", letterSpacing: 2 }}>
              MOSCOW · RU + EU DELIVERY · SINCE 2019
            </div>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={660} height={630} alt="" style={{ objectFit: "cover" }} />
      </div>
    ),
    size,
  );
}
