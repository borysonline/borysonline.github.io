import { defineCollection, z } from 'astro:content';

const appSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.enum(['productivity', 'utility', 'game', 'education', 'other']).default('other'),
  icon: z.string().optional(),
  version: z.string().optional(),
  releaseDate: z.date(),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
  github: z.string().url().optional(),
  website: z.string().url().optional(),
  downloadUrl: z.string().url().optional(),
  platforms: z.array(z.enum(['web', 'ios', 'android', 'windows', 'mac'])).default(['web']),
  downloads: z.number().optional(),
});

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.date(),
  categories: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  author: z.string().default('Borys'),
  draft: z.boolean().default(false),
});

const termsSchema = z.object({
  appId: z.string(),
  lastUpdated: z.date(),
  version: z.string().optional(),
});

const privacySchema = z.object({
  appId: z.string(),
  lastUpdated: z.date(),
  version: z.string().optional(),
  dataCollection: z.array(z.string()).optional(),
  thirdParties: z.array(z.string()).optional(),
});

export const collections = {
  'apps': defineCollection({ schema: appSchema }),
  'blog': defineCollection({ schema: blogSchema }),
  'app-terms': defineCollection({ schema: termsSchema }),
  'app-privacy': defineCollection({ schema: privacySchema }),
};
