import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Footer from "@/components/common/Footer";

/*
 * Next injects its own <meta name="robots" content="noindex"> on anything
 * returning 404. Without this export the root layout's robots and googlebot
 * tags are inherited on top of it, so the page said noindex and index, follow
 * at the same time. This overrides both to agree with Next.
 *
 * follow stays true on purpose. A crawler that lands here should be able to
 * take the recovery links back into the site rather than stop at the 404.
 */
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
};

/**
 * Rendered with a real 404 status, and kept out of every index: search engines
 * that stumble in here should drop the URL rather than store a soft 404.
 *
 * The shell line is the honest version of "page not found" for this site, and
 * it hands you the two paths back rather than dead-ending.
 */
const NotFound = () => (
  <>
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-start justify-center gap-6 px-6 pt-24 pb-14">
      <p aria-hidden className="text-base break-all text-muted-foreground">
        <span className="text-foreground">$</span> cat this-page
      </p>
      <h1 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
        No such file or directory
      </h1>
      <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
        The link is wrong or the page has moved. Press{" "}
        <kbd className="rounded-md border border-border px-1.5 py-0.5 text-base text-foreground">
          ?
        </kbd>{" "}
        for a list of shortcuts, or start from one of these.
      </p>
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <Link href="/" className="w-full sm:w-auto">
          <Button variant="solid" className="w-full sm:w-auto">
            Home
          </Button>
        </Link>
        <Link href="/projects" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto">Projects</Button>
        </Link>
        <Link href="/hire" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto">Hire me</Button>
        </Link>
      </div>
    </main>
    <Footer />
  </>
);

export default NotFound;
