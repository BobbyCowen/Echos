import type { Entry } from '@prisma/client';

import type { EntryRecord } from './entry.types.js';

export const toEntryRecord = (entry: Entry): EntryRecord => ({
  id: entry.id,
  title: entry.title,
  content: entry.content,
  timePrecision: entry.timePrecision as EntryRecord['timePrecision'],
  startDate: entry.startDate,
  endDate: entry.endDate,
  displayDateLabel: entry.displayDateLabel,
  sortDate: entry.sortDate,
  createdAt: entry.createdAt,
  updatedAt: entry.updatedAt,
});
