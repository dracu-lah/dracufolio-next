import type { PropsWithChildren } from "react";
import Footer from "@/components/common/Footer";
import ScrollProgress from "@/components/motion/ScrollProgress";

/**
 * Shared chrome for every post. The reading-position hairline lives here
 * rather than in the root layout: it answers "how much is left", which is only
 * a real question on a long article.
 */
const PostLayout = ({ children }: PropsWithChildren) => (
  <>
    <ScrollProgress />
    <main className="mx-auto max-w-3xl px-6 pt-28 pb-16 md:pt-32 md:pb-20">
      {children}
    </main>
    <Footer />
  </>
);

export default PostLayout;
