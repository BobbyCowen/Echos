import { z } from 'zod';

export const entryTimePrecisionSchema = z.enum(['exact', 'approximate', 'range']);

const optionalNullableString = (maxLength: number) =>
  z
    .string()
    .trim()
    .min(1)
    .max(maxLength)
    .nullable()
    .optional()
    .transform((value) => value ?? null);

const optionalNullableDate = z.coerce
  .date()
  .nullable()
  .optional()
  .transform((value) => value ?? null);

export const createEntrySchema = z.object({
  title: optionalNullableString(200),
  content: z.string().trim().min(1),
  timePrecision: entryTimePrecisionSchema,
  startDate: optionalNullableDate,
  endDate: optionalNullableDate,
  displayDateLabel: optionalNullableString(200),
  sortDate: z.coerce.date(),
});

export type CreateEntryInput = z.infer<typeof createEntrySchema>;
