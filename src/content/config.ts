import { defineCollection, z } from 'astro:content';

export const collections = {
  notices: defineCollection({
    schema: z.object({
      title: z.string(),
      author: z.string().optional(),
      date: z.coerce.date().optional(),
      popup: z.boolean().optional(),
      popup_until: z.coerce.date().optional(),
    }),
  }),

  board: defineCollection({
    schema: z.object({
      title: z.string(),
      author: z.string().optional(),
      category: z.string().optional(),
      date: z.coerce.date().optional(),
    }),
  }),
};
