import { createLlmsFullTxt } from "@/lib/llms";

export const dynamic = "force-static";
export const revalidate = 86_400;

export function GET() {
  return new Response(createLlmsFullTxt(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control":
        "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
