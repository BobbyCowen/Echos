export const schema = {
  databaseName: 'echos.db',
  tables: {
    appMeta: 'app_meta',
    entries: 'entries',
    media: 'media',
    tags: 'tags',
    entryTags: 'entry_tags',
  },
  indexes: {
    entriesSortDate: 'idx_entries_sort_date',
    mediaEntryId: 'idx_media_entry_id',
    tagsName: 'idx_tags_name',
    entryTagsEntryId: 'idx_entry_tags_entry_id',
    entryTagsTagId: 'idx_entry_tags_tag_id',
  },
} as const;
