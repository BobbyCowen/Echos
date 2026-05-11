import { z } from 'zod';

export const entryTimePrecisionSchema = z.enum(['exact', 'approximate', 'range']);

export const createEntrySchema = z.object({
  title: z.string().trim().min(1).max(200).nullable(),
  content: z.string().trim().min(1),
  timePrecision: entryTimePrecisionSchema,
  startDate: z.coerce.date().nullable(),
  endDate: z.coerce.date().nullable(),
  displayDateLabel: z.string().trim().min(1).max(200).nullable(),
  sortDate: z.coerce.date(),
});

export type CreateEntryInput = z.infer<typeof createEntrySchema>;
