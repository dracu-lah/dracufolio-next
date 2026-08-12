import Link from "next/link";
import { Button } from "@/components/ui/button";
import Footer from "@/components/common/Footer";

/**
 * Rendered with a real 404 status, and kept out of every index: search engines
 * that stumble in here should drop the URL rather than store a soft 404.
 */
const NotFound = () => (
  <>
    <meta name="robots" content="noindex, nofollow" />
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-start justify-center gap-6 px-6 pt-28 pb-16">
      <p className="font-mono text-base uppercase tracking-[0.22em] text-muted-foreground">
        404
      </p>
      <h1 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
        This page does not exist.
      </h1>
      <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
        The link is wrong or the page has moved.
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
      </div>
    </main>
    <Footer />
  </>
);

export default NotFound;
