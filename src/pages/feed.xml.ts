import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const blog = await getCollection("blog");
  const site = context.site ?? "https://borysonline.com";

  return rss({
    title: "Borys Online Blog",
    description: "Blog posts and updates about development and technology",
    site,
    items: blog
      .filter((post) => !post.data.draft)
      .sort(
        (a, b) =>
          new Date(b.data.pubDate).getTime() -
          new Date(a.data.pubDate).getTime(),
      )
      .map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/blog/${post.id}/`,
      })),
  });
}
