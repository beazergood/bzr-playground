import { defineCollection, z } from '@analogjs/content';

export const collections = {
  posts: defineCollection({
    schema: z.object({
      title: z.string(),
      date: z.date(),
      description: z.string(),
      tags: z.array(z.string()),
      interactive: z.boolean().optional(),
      theme: z.string().optional(),
    }),
  }),
};