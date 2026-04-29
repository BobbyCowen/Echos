import { StyleSheet, Text, TextInput, View } from 'react-native';

import FieldShell from '@/src/components/ui/field-shell';

const NewEntryFormShell = () => {
  return (
    <View style={styles.container}>
      <FieldShell label="Title" hint="Optional. Give this memory a quick name.">
        <TextInput placeholder="A quiet Sunday afternoon" style={styles.input} />
      </FieldShell>

      <FieldShell label="Memory" hint="Write what happened, what mattered, or what you want to remember.">
        <TextInput
          multiline
          placeholder="Write your memory here..."
          style={[styles.input, styles.textarea]}
          textAlignVertical="top"
        />
      </FieldShell>

      <FieldShell label="Time" hint="This will later support exact dates, approximate dates, or time ranges.">
        <View style={styles.placeholderBox}>
          <Text style={styles.placeholderTitle}>Time selection placeholder</Text>
          <Text style={styles.placeholderText}>Date precision controls will be added in the next implementation steps.</Text>
        </View>
      </FieldShell>

      <FieldShell label="Tags" hint="Useful to group memories by theme, people, or moments.">
        <View style={styles.placeholderBox}>
          <Text style={styles.placeholderTitle}>Tags placeholder</Text>
          <Text style={styles.placeholderText}>Tag input and suggestions will be connected later.</Text>
        </View>
      </FieldShell>

      <FieldShell label="Media" hint="An entry can contain multiple photos and links, not just a single attachment.">
        <View style={styles.mediaSection}>
          <View style={styles.placeholderBox}>
            <Text style={styles.placeholderTitle}>Media list placeholder</Text>
            <Text style={styles.placeholderText}>Attached media items will appear here as a list.</Text>
          </View>

          <View style={styles.actionsRow}>
            <View style={styles.actionChip}>
              <Text style={styles.actionChipText}>+ Add photo</Text>
            </View>
            <View style={styles.actionChip}>
              <Text style={styles.actionChipText}>+ Add link</Text>
            </View>
          </View>

          <Text style={styles.helperText}>
            The final implementation will support multiple media items per entry.
          </Text>
        </View>
      </FieldShell>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    backgroundColor: '#ffffff',
    color: '#0f172a',
  },
  textarea: {
    minHeight: 160,
  },
  mediaSection: {
    gap: 12,
  },
  placeholderBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#cbd5e1',
    borderRadius: 16,
    padding: 16,
    gap: 6,
    backgroundColor: '#f8fafc',
  },
  placeholderTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  placeholderText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#475569',
  },
  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  actionChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#e2e8f0',
  },
  actionChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  helperText: {
    fontSize: 13,
    color: '#64748b',
  },
});

export default NewEntryFormShell;
