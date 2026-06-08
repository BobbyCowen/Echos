import { prisma } from '../../lib/prisma.js';

import type { CreateEntryInput, UpdateEntryInput } from './entry.schema.js';
import { toEntryRecord } from './entry.mapper.js';

export const createEntry = async (input: CreateEntryInput) => {
  const entry = await prisma.entry.create({
    data: {
      title: input.title,
      content: input.content,
      timePrecision: input.timePrecision,
      startDate: input.startDate,
      endDate: input.endDate,
      displayDateLabel: input.displayDateLabel,
      sortDate: input.sortDate,
    },
  });

  return toEntryRecord(entry);
};

export const listEntries = async () => {
  const entries = await prisma.entry.findMany({
    orderBy: [{ sortDate: 'desc' }, { createdAt: 'desc' }],
  });

  return entries.map(toEntryRecord);
};

export const getEntryById = async (id: string) => {
  const entry = await prisma.entry.findUnique({
    where: { id },
  });

  return entry ? toEntryRecord(entry) : null;
};

export const updateEntry = async (id: string, input: UpdateEntryInput) => {
  const existingEntry = await prisma.entry.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!existingEntry) {
    return null;
  }

  const entry = await prisma.entry.update({
    where: { id },
    data: input,
  });

  return toEntryRecord(entry);
};
