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

const entryTitleSchema = z.string().trim().min(1).max(200).nullable();
const entryContentSchema = z.string().trim().min(1);
const entryDisplayDateLabelSchema = z.string().trim().min(1).max(200).nullable();
const entryDateSchema = z.coerce.date().nullable();

export const createEntrySchema = z.object({
  title: optionalNullableString(200),
  content: entryContentSchema,
  timePrecision: entryTimePrecisionSchema,
  startDate: optionalNullableDate,
  endDate: optionalNullableDate,
  displayDateLabel: optionalNullableString(200),
  sortDate: z.coerce.date(),
});

export const updateEntrySchema = z
  .object({
    title: entryTitleSchema.optional(),
    content: entryContentSchema.optional(),
    timePrecision: entryTimePrecisionSchema.optional(),
    startDate: entryDateSchema.optional(),
    endDate: entryDateSchema.optional(),
    displayDateLabel: entryDisplayDateLabelSchema.optional(),
    sortDate: z.coerce.date().optional(),
  })
  .strict()
  .refine((input) => Object.keys(input).length > 0, {
    message: 'At least one editable field must be provided',
  });

export type CreateEntryInput = z.infer<typeof createEntrySchema>;
export type UpdateEntryInput = z.infer<typeof updateEntrySchema>;
