import { z } from 'zod';

export const mediaSchema = z.object({
  type: z.enum(['photo', 'external_link']),
  fileUri: z.string().nullable(),
  url: z.string().url().nullable(),
  mimeType: z.string().nullable(),
  title: z.string().trim().nullable(),
  description: z.string().trim().nullable(),
});
