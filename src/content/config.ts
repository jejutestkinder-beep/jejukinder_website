import { defineCollection, z } from 'astro:content';

export const collections = {
  notices: defineCollection({
    schema: z.object({
      title: z.string(),
      popup: z.boolean().optional(),
      popup_until: z.coerce.date().optional(), // 나중에 팝업 만료일 쓸 때
    }),
  }),

  board: defineCollection({
    schema: z.object({
      title: z.string(),
      category: z.string().optional(),
      date: z.coerce.date().optional(), // ✅ 핵심: datetime을 Date로 강제 변환
    }),
  }),
};
