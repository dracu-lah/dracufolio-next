import { EMAIL, LOCALITY, REGION, X_HANDLE } from "@/data/contact";
import { AUTHOR, SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * humanstxt.org, the old-web convention for crediting the people behind a site
 * rather than the machines. Nobody is forced to find it, which is why it is
 * worth having: the people who go looking for it are the people worth meeting.
 */
export const GET = async () =>
  new Response(
    `/* TEAM */
  Developer, designer, writer: ${AUTHOR}
  Site: ${SITE_URL}
  Contact: ${EMAIL}
  X: ${X_HANDLE}
  Location: ${LOCALITY}, ${REGION}, India

/* THANKS */
  The FOSS United and TinkerHub crowd in Kerala.
  Everyone who filed an issue on TMPlayer.

/* SITE */
  Language: English, Malayalam
  Standards: HTML5, CSS, ECMAScript
  Components: Next.js, React, Tailwind CSS, Motion, Phosphor Icons
  Typefaces: Bricolage Grotesque, Geist Sans, Google Sans Code, Anek Malayalam
  Software: Neovim, Fedora, Sway, Git
  Source: ${SITE_URL}/source

/* NOTE */
  Press ? on any page.
`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=86400",
      },
    },
  );
