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

      <FieldShell label="Media" hint="Photos and links will be attached here.">
        <View style={styles.placeholderBox}>
          <Text style={styles.placeholderTitle}>Media placeholder</Text>
          <Text style={styles.placeholderText}>Photo picker and link attachment will be plugged in later.</Text>
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
});

export default NewEntryFormShell;
