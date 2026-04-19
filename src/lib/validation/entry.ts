import { z } from 'zod';

export const entrySchema = z.object({
  title: z.string().trim().nullable(),
  content: z.string().trim().min(1),
  timePrecision: z.enum(['exact', 'approximate', 'range']),
  startDate: z.string().nullable(),
  endDate: z.string().nullable(),
  displayDateLabel: z.string().trim().nullable(),
  sortDate: z.string(),
});
