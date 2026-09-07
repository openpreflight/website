import type { APIRoute } from "astro";
import { ogPages, renderOgPng, type OgPage } from "../../lib/og";

export function getStaticPaths() {
  return ogPages().map((page) => ({
    params: { slug: page.slug },
    props: page,
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgPng(props as OgPage);
  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
