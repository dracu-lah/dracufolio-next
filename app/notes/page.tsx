import Link from "next/link";
import { notFound } from "next/navigation";
import BackLink from "@/components/common/BackLink";
import Footer from "@/components/common/Footer";
import JsonLd from "@/components/common/JsonLd";
import CtaBlock from "@/components/cta/CtaBlock";
import Reveal from "@/components/common/Reveal";
import { ArrowUpRight } from "@/components/common/icons";
import { formatPostDate } from "@/lib/blog";
import { pageGraph } from "@/lib/schema";
import { AUTHOR, SITE_URL, pageMetadata } from "@/lib/seo";
import { hasNotes, notesByNewest } from "@/data/notes";
import { LINKEDIN_URL } from "@/data/contact";

const description =
  "Short notes and build logs by Nevil Krishna K, a full stack developer in Thrissur, Kerala, collected from LinkedIn so they live somewhere he owns.";

export const metadata = pageMetadata({
  title: "Notes",
  description,
  path: "/notes",
  noindex: !hasNotes,
});

/**
 * One page for every short note, rather than one thin page each. A LinkedIn
 * post is a few sentences; a site full of two hundred word pages competes with
 * the real posts and drags the domain down. Each note credits the original.
 */
const NotesPage = () => {
  if (!hasNotes) notFound();

  return (
    <>
      <JsonLd
        data={pageGraph(
          {
            path: "/notes",
            name: `Notes | ${AUTHOR}`,
            description,
            type: "CollectionPage",
            breadcrumb: [
              { name: "Home", path: "/" },
              { name: "Notes", path: "/notes" },
            ],
          },
          [
            {
              "@type": "ItemList",
              "@id": `${SITE_URL}/notes#list`,
              numberOfItems: notesByNewest.length,
              itemListElement: notesByNewest.map((note, i) => ({
                "@type": "ListItem",
                position: i + 1,
                item: {
                  "@type": "SocialMediaPosting",
                  datePublished: note.date,
                  articleBody: note.body,
                  author: { "@id": `${SITE_URL}/#person` },
                  ...(note.source ? { sameAs: note.source } : {}),
                },
              })),
            },
          ],
        )}
      />
      <main className="mx-auto max-w-3xl px-6 pt-24 md:pt-28">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col items-start gap-5">
            <BackLink />
            <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Notes
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Short build logs and things I worked out, first posted on{" "}
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4"
              >
                LinkedIn
              </a>{" "}
              and kept here so they live somewhere I own. The longer write-ups
              are on the{" "}
              <Link
                href="/blog"
                className="text-foreground underline underline-offset-4"
              >
                blog
              </Link>
              .
            </p>
          </div>

          <ol className="divide-y divide-border border-t border-b border-border">
            {notesByNewest.map((note, i) => (
              <li key={`${note.date}-${i}`}>
                <Reveal delay={Math.min(i, 4) * 0.05}>
                  <article className="flex flex-col gap-3 py-7">
                    <time
                      dateTime={note.date}
                      className="font-mono text-sm text-muted-foreground"
                    >
                      {formatPostDate(note.date)}
                    </time>
                    {note.body.split("\n\n").map((para, p) => (
                      <p
                        key={p}
                        className="leading-relaxed text-muted-foreground md:text-lg"
                      >
                        {para}
                      </p>
                    ))}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
                      {note.tags.length > 0 && (
                        <p className="font-mono text-sm text-muted-foreground">
                          {note.tags.join("  ")}
                        </p>
                      )}
                      {note.source && (
                        <a
                          href={note.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-sm text-muted-foreground transition-colors duration-300 hover:text-accent"
                        >
                          original
                          <ArrowUpRight className="size-4" />
                        </a>
                      )}
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </main>
      <CtaBlock />
      <Footer />
    </>
  );
};

export default NotesPage;
