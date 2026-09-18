import { llmsFull } from "@/lib/llms";

export const dynamic = "force-static";
export const revalidate = 86400;

export const GET = async () =>
  new Response(await llmsFull(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
