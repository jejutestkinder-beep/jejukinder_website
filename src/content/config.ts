import { defineCollection, z } from 'astro:content';

// Helper function to parse date, handling {{now}} template string
const parseDate = (val: unknown): Date | undefined => {
  if (!val) return undefined;
  if (val instanceof Date) return val;
  if (typeof val === 'string') {
    // Handle Decap CMS {{now}} template string
    if (val === '{{now}}' || val.includes('{{now}}')) {
      return new Date();
    }
    // Try to parse as date
    const parsed = new Date(val);
    if (!isNaN(parsed.getTime())) {
      return parsed;
    }
  }
  return undefined;
};

export const collections = {
  notices: defineCollection({
    schema: z.object({
      title: z.string(),
      author: z.string(),
      date: z.preprocess(parseDate, z.date().optional()),
      image: z.string().optional(),
      seo_description: z.string().optional(),
      keywords: z.string().optional(),
      popup: z.boolean().optional(),
    }),
  }),

  board: defineCollection({
    schema: z.object({
      title: z.string(),
      author: z.string(),
      category: z.enum(['행사 안내', '학교 소식', '기타']),
      date: z.preprocess(parseDate, z.date().optional()),
      image: z.string().optional(),
      seo_description: z.string().optional(),
      keywords: z.string().optional(),
    }),
  }),

  testimonial: defineCollection({
    schema: z.object({
      title: z.string(),
      author: z.string(),
      date: z.preprocess(parseDate, z.date().optional()),
      image: z.string().optional(),
      seo_description: z.string().optional(),
      keywords: z.string().optional(),
    }),
  }),
};
