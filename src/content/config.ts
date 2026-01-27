import { defineCollection, z } from 'astro:content';

export const collections = {
  notices: defineCollection({
    schema: z.object({
      title: z.string(),
      author: z.string(),
      date: z.preprocess((val) => {
        if (!val || val === '') return new Date();
        if (val instanceof Date) return val;
        return new Date(val as string);
      }, z.date()).optional(),
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
      date: z.preprocess((val) => {
        if (!val || val === '') return new Date();
        if (val instanceof Date) return val;
        return new Date(val as string);
      }, z.date()).optional(),
      image: z.string().optional(),
      seo_description: z.string().optional(),
      keywords: z.string().optional(),
    }),
  }),

  testimonial: defineCollection({
    schema: z.object({
      title: z.string(),
      author: z.string(),
      date: z.preprocess((val) => {
        if (!val || val === '') return new Date();
        if (val instanceof Date) return val;
        return new Date(val as string);
      }, z.date()).optional(),
      image: z.string().optional(),
      seo_description: z.string().optional(),
      keywords: z.string().optional(),
    }),
  }),
};
