import type { Entry } from '../types';

export const mapEntryRow = (row: Record<string, unknown>): Entry => ({
  id: String(row.id),
  title: row.title ? String(row.title) : null,
  content: String(row.content),
  timePrecision: row.time_precision as Entry['timePrecision'],
  startDate: row.start_date ? String(row.start_date) : null,
  endDate: row.end_date ? String(row.end_date) : null,
  displayDateLabel: row.display_date_label ? String(row.display_date_label) : null,
  sortDate: String(row.sort_date),
  createdAt: String(row.created_at),
  updatedAt: String(row.updated_at),
});
