import type { EntryTag, Tag } from '../types';

export const mapTagRow = (row: Record<string, unknown>): Tag => ({
  id: String(row.id),
  name: String(row.name),
  createdAt: String(row.created_at),
});

export const mapEntryTagRow = (row: Record<string, unknown>): EntryTag => ({
  entryId: String(row.entry_id),
  tagId: String(row.tag_id),
});
