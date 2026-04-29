# Echos data model v1

## Tables
- `entries`
- `media`
- `tags`
- `entry_tags`

## Notes
- `entries` is the core journal entity.
- `media` belongs to an entry.
- `tags` are unique by name.
- `entry_tags` implements the many-to-many relation between entries and tags.
- Foreign keys use `ON DELETE CASCADE` to avoid orphan rows.
- `sort_date` is indexed to support the future timeline view.
