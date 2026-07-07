import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Each lesson is an MDX file under src/content/lessons/<module>/<lesson>.mdx
const lessons = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/lessons' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // which module this lesson belongs to (matches a key in src/data/modules.ts)
    module: z.string(),
    // ordering within the module
    order: z.number(),
    // rough time to complete, shown to the learner
    minutes: z.number().default(10),
    // set false while a lesson is still being written
    published: z.boolean().default(true),
  }),
});

export const collections = { lessons };
