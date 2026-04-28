export const schema = {
  databaseName: 'echos.db',
  tables: {
    appMeta: 'app_meta',
    entries: 'entries',
    media: 'media',
    tags: 'tags',
    entryTags: 'entry_tags',
  },
} as const;
