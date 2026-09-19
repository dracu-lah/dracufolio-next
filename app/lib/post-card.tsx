import { ImageResponse } from "next/og";
import { palette } from "./palette";

/**
 * The generated card image for a post that has no screenshot of its own.
 *
 * Not every post is about something you can photograph. A CLI or a refactor
 * has no interface, and a borrowed screenshot is worse than none. The index is
 * a list of rows now, so a post with no picture left a hole in the row where
 * every neighbour has one. This fills that hole with the one thing the post
 * definitely has: its title, set on the site's own surface.
 *
 * It is the same machinery as the OG cards in `lib/og.tsx`, and it is square
 * on purpose. The row thumbnail has no fixed aspect: it is 16:9 on a phone,
 * close to square on a tablet, and on a desktop it stretches to whatever the
 * text beside it needs. A square is the narrowest of those, so `object-cover`
 * only ever crops this card top and bottom, never into the words. Everything
 * sits in the middle band that survives the deepest of those crops.
 */
export const POST_CARD_SIZE = { width: 1000, height: 1000 };

/*
 * DM Sans, fetched once per process. next/font hands the browser a woff2 and
 * satori cannot read that format, so the card asks Google Fonts for the ttf
 * build the same way the Next docs do. A card with no network falls back to
 * the built-in sans rather than failing the build.
 */
let displayFace: ArrayBuffer | null | undefined;

const dmSansBold = async () => {
  if (displayFace !== undefined) return displayFace;
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=DM+Sans:wght@700",
    ).then((response) => response.text());
    const url = css.match(/src:\s*url\((https:[^)]+\.ttf)\)/)?.[1];
    displayFace = url
      ? await fetch(url).then((response) => response.arrayBuffer())
      : null;
  } catch {
    displayFace = null;
  }
  return displayFace;
};

/*
 * Three steps, so a long title still fits three lines. Sized to land under the
 * heading beside it once the card is scaled into the row: the thumbnail is a
 * picture of the post, not a second copy of the headline shouting over it.
 */
const titleSize = (title: string) => {
  if (title.length > 54) return 48;
  if (title.length > 34) return 58;
  return 66;
};

export const postCardImage = async ({ title }: { title: string }) => {
  const color = palette(
    "secondary",
    "foreground",
    "muted-foreground",
    "accent",
  );
  const face = await dmSansBold();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 30,
        background: color.secondary,
        color: color.foreground,
        padding: "0 80px",
        fontFamily: '"DM Sans", sans-serif',
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 52,
            height: 13,
            background: color.accent,
            borderRadius: 4,
          }}
        />
        <div
          style={{
            fontSize: 30,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: color["muted-foreground"],
          }}
        >
          Blog
        </div>
      </div>

      <div
        style={{
          fontSize: titleSize(title),
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: -1.5,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: 30,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: color["muted-foreground"],
        }}
      >
        nevil.dev
      </div>
    </div>,
    {
      ...POST_CARD_SIZE,
      ...(face
        ? {
            fonts: [
              {
                name: "DM Sans",
                data: face,
                weight: 700 as const,
                style: "normal" as const,
              },
            ],
          }
        : {}),
    },
  );
};
