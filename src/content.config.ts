import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    thumbnail: z.string(),
    date: z.string(),
    disciplines: z.array(z.string()),
    processes: z.array(z.string()),
    tools: z.array(z.string()).optional().default([]),
    featured: z.boolean().optional().default(false),
    splat: z.string().optional(),
  }),
});

export const collections = { projects };