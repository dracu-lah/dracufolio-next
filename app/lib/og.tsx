import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const BG = "#0a0a0a";
const FG = "#fafafa";
const MUTED = "#8a8a8a";
const PHOSPHOR = "#7dd3a0";

/**
 * One card for every route: eyebrow, title, blurb, and the same footer, so
 * shared links read as one site instead of six different ones.
 */
export const ogImage = ({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) =>
  new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          color: FG,
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 44,
              height: 12,
              background: PHOSPHOR,
              borderRadius: 3,
            }}
          />
          <div
            style={{
              fontSize: 26,
              letterSpacing: 10,
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 86, fontWeight: 700, lineHeight: 1.05 }}>
            {title}
          </div>
          {description && (
            <div
              style={{
                fontSize: 34,
                lineHeight: 1.4,
                color: MUTED,
                maxWidth: 940,
              }}
            >
              {description}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          <div>Nevil Krishna K</div>
          <div>nevil.dev</div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
