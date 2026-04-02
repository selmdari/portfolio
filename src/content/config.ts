import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    thumbnail: z.string(),
    date: z.string(),
    disciplines: z.array(z.string()),
    processes: z.array(z.string()),
    tools: z.array(z.string()),
    featured: z.boolean().optional().default(false),
  }),
});

export const collections = { projects };
