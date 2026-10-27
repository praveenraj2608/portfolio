import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    year: z.string(),
    role: z.string(),
    summary: z.string(),
    what: z.array(z.string()),
    why: z.string(),
    stack: z.record(z.string(), z.array(z.string())),
    problems: z.array(z.object({ problem: z.string(), fix: z.string() })),
    metrics: z
      .array(z.object({ label: z.string(), value: z.number(), decimals: z.number().default(0), suffix: z.string().default('') }))
      .optional(),
    limitations: z.array(z.string()).optional(),
    repo: z.url().optional(),
    demo: z.url().optional(),
    status: z.enum(['shipped', 'in-progress']),
    // Problems drafted from README facts; Praveen should review them.
    draftProblems: z.boolean().default(false),
  }),
});

const certifications = defineCollection({
  loader: file('./src/content/certifications.json'),
  schema: z.object({
    name: z.string(),
    issuer: z.string(),
    date: z.string().optional(),
    // File name inside src/assets/certificates/, e.g. "aws.jpg"
    image: z.string().optional(),
    credentialUrl: z.url().optional(),
  }),
});

export const collections = { projects, certifications };
