import type { Media } from '../types';

export const mapMediaRow = (row: Record<string, unknown>): Media => ({
  id: String(row.id),
  entryId: String(row.entry_id),
  type: row.type as Media['type'],
  fileUri: row.file_uri ? String(row.file_uri) : null,
  url: row.url ? String(row.url) : null,
  mimeType: row.mime_type ? String(row.mime_type) : null,
  title: row.title ? String(row.title) : null,
  description: row.description ? String(row.description) : null,
  createdAt: String(row.created_at),
});
