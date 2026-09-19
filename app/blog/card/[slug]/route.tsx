import { postCardImage } from "@/lib/post-card";
import { postBySlug, publishedPosts } from "@/data/posts";

/**
 * The title card for a post, one PNG per slug, written at build time. The blog
 * index falls back to it when a post has no screenshot of its own.
 *
 * Every published post gets one, not just the ones missing an image, so the
 * card is there the moment a post drops its picture and so nothing has to
 * render in the browser.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

export const generateStaticParams = async () =>
  publishedPosts.map((post) => ({ slug: post.slug }));

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) => {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return new Response("Not found", { status: 404 });

  return postCardImage({ title: post.title });
};
