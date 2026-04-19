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
    splatPly: z.string().optional(),
    splatAnnotations: z.array(z.object({
      position: z.tuple([z.number(), z.number(), z.number()]),
      label: z.string(),
    })).optional().default([]),
    splatCameraPosition: z.tuple([z.number(), z.number(), z.number()]).optional().default([0, 7, 10]),
    splatMinDistance: z.number().optional().default(0),
    splatMaxDistance: z.number().optional().default(25),
    splatModelY: z.number().optional().default(0),
    splatOrbitAngle: z.number().optional().default(0),
    showToc: z.boolean().optional().default(true),
  }),
});

export const collections = { projects };