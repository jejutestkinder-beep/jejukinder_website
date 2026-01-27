import { defineCollection, z } from 'astro:content';

const seoSchema = z.object({
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  keywords: z.string().optional(),
}).optional();

const imageSchema = z.object({
  url: z.string().optional(),
  alt: z.string().optional(),
}).optional();

export const collections = {
  notices: defineCollection({
    schema: z.object({
      title: z.string(),
      author: z.string(),
      date: z.coerce.date(),
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
      date: z.coerce.date().optional(),
      image: z.string().optional(),
      seo_description: z.string().optional(),
      keywords: z.string().optional(),
    }),
  }),

  testimonial: defineCollection({
    schema: z.object({
      title: z.string(),
      author: z.string(),
      date: z.coerce.date().optional(),
      image: z.string().optional(),
      seo_description: z.string().optional(),
      keywords: z.string().optional(),
    }),
  }),
};
