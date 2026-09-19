import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { palette, token } from "./palette";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/*
 * Read from globals.css rather than written here. These four were hardcoded,
 * and they were still the pre-leaf-green palette: a mint `#7dd3a0` accent on a
 * colder `#0a0a0a`, months after the site stopped using either. An OG card is
 * the one image most people see before they see the site, so it is the worst
 * place for the palette to drift.
 */
const {
  background: BG,
  foreground: FG,
  accent: PHOSPHOR,
  border: EDGE,
} = palette("background", "foreground", "accent", "border");
const MUTED = token("muted-foreground");

/**
 * The portrait is read off disk and inlined as a data URI rather than fetched
 * over the network. These cards are generated at build time, when the site it
 * would be fetching from is not serving yet.
 */
let portraitCache: string | null = null;

const portraitDataUri = () => {
  if (portraitCache) return portraitCache;
  try {
    const file = readFileSync(
      join(process.cwd(), "public/nevil-krishna-k.jpg"),
    );
    portraitCache = `data:image/jpeg;base64,${file.toString("base64")}`;
  } catch {
    // A missing portrait must not fail the build; the card falls back to text.
    portraitCache = "";
  }
  return portraitCache;
};

/**
 * One card for every route: eyebrow, title, blurb, and the same footer, so
 * shared links read as one site instead of six different ones.
 *
 * The face is on it by default. When the product is a person, a card with a
 * name and no face is a worse card: the photo is what makes a share
 * recognisable in a feed, and it is the same portrait as the Person schema and
 * every profile, which is what ties the entity together.
 */
export const ogImage = ({
  eyebrow,
  title,
  description,
  portrait = true,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  portrait?: boolean;
}) => {
  const photo = portrait ? portraitDataUri() : "";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: BG,
        color: FG,
        padding: "64px 72px",
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
            fontSize: 24,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          {eyebrow}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 56,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: title.length > 26 ? 64 : 80,
              fontWeight: 700,
              lineHeight: 1.05,
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                fontSize: 30,
                lineHeight: 1.4,
                color: MUTED,
              }}
            >
              {description}
            </div>
          )}
        </div>

        {photo && (
          // next/image does not exist inside an ImageResponse: satori renders
          // a plain img and ignores alt, so both lint rules are moot here.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt=""
            src={photo}
            width={260}
            height={260}
            style={{
              width: 260,
              height: 260,
              borderRadius: 28,
              objectFit: "cover",
              border: `1px solid ${EDGE}`,
              flexShrink: 0,
            }}
          />
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
          letterSpacing: 5,
          textTransform: "uppercase",
          color: MUTED,
        }}
      >
        <div>Nevil Krishna K</div>
        <div>nevil.dev</div>
      </div>
    </div>,
    OG_SIZE,
  );
};
