import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const appSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z
    .enum(["productivity", "utility", "game", "education", "other"])
    .default("other"),
  icon: z.string().optional(),
  version: z.string().optional(),
  releaseDate: z.coerce.date(),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
  github: z.url().optional(),
  website: z.url().optional(),
  downloadUrl: z.url().optional(),
  appStoreUrl: z.url().optional(),
  playStoreUrl: z.url().optional(),
  platforms: z
    .array(z.enum(["web", "ios", "android", "windows", "mac"]))
    .default(["web"]),
  downloads: z.number().optional(),
});

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  categories: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  author: z.string().default("Borys"),
  draft: z.boolean().default(false),
});

const termsSchema = z.object({
  appId: z.string(),
  lastUpdated: z.coerce.date(),
  version: z.string().optional(),
});

const privacySchema = z.object({
  appId: z.string(),
  lastUpdated: z.coerce.date(),
  version: z.string().optional(),
  dataCollection: z.array(z.string()).optional(),
  thirdParties: z.array(z.string()).optional(),
});

export const collections = {
  apps: defineCollection({
    loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/apps" }),
    schema: appSchema,
  }),
  blog: defineCollection({
    loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
    schema: blogSchema,
  }),
  "app-terms": defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "./src/content/app-terms",
    }),
    schema: termsSchema,
  }),
  "app-privacy": defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "./src/content/app-privacy",
    }),
    schema: privacySchema,
  }),
};
