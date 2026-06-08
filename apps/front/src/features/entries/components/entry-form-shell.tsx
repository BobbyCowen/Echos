import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import FieldShell from '@/src/components/ui/field-shell';
import { ENTRY_TIME_PRECISIONS } from '@/src/constants/time';
import type { Entry, EntryTimePrecision } from '@/src/features/entries/types';

type EntryFormValues = {
  title: string | null;
  content: string;
  timePrecision: EntryTimePrecision;
  displayDateLabel: string | null;
};

type EntryFormShellProps = {
  initialEntry?: Entry | null;
  submitLabel: string;
  submittingLabel: string;
  successMessage: string;
  errorMessage: string;
  resetOnSuccess?: boolean;
  onSubmit: (values: EntryFormValues) => Promise<void>;
};

const formatTimePrecisionLabel = (precision: EntryTimePrecision) => {
  switch (precision) {
    case 'approximate':
      return 'Approximate';
    case 'range':
      return 'Range';
    case 'exact':
    default:
      return 'Exact';
  }
};

const EntryFormShell = ({
  initialEntry,
  submitLabel,
  submittingLabel,
  successMessage: successMessageText,
  errorMessage: errorMessageText,
  resetOnSuccess = false,
  onSubmit,
}: EntryFormShellProps) => {
  const [title, setTitle] = useState(initialEntry?.title ?? '');
  const [content, setContent] = useState(initialEntry?.content ?? '');
  const [timePrecision, setTimePrecision] = useState<EntryTimePrecision>(initialEntry?.timePrecision ?? 'exact');
  const [displayDateLabel, setDisplayDateLabel] = useState(initialEntry?.displayDateLabel ?? '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setTitle(initialEntry?.title ?? '');
    setContent(initialEntry?.content ?? '');
    setTimePrecision(initialEntry?.timePrecision ?? 'exact');
    setDisplayDateLabel(initialEntry?.displayDateLabel ?? '');
    setSuccessMessage(null);
    setErrorMessage(null);
  }, [initialEntry]);

  const trimmedContent = content.trim();
  const canSubmit = trimmedContent.length > 0 && !isSubmitting;

  const handleSubmit = async () => {
    if (!canSubmit) {
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      await onSubmit({
        title: title.trim() || null,
        content: trimmedContent,
        timePrecision,
        displayDateLabel: displayDateLabel.trim() || null,
      });

      if (resetOnSuccess) {
        setTitle('');
        setContent('');
        setTimePrecision('exact');
        setDisplayDateLabel('');
      }

      setSuccessMessage(successMessageText);
    } catch {
      setErrorMessage(errorMessageText);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <FieldShell label="Title" hint="Optional. Give this memory a quick name.">
        <TextInput
          onChangeText={setTitle}
          placeholder="A quiet Sunday afternoon"
          style={styles.input}
          value={title}
        />
      </FieldShell>

      <FieldShell label="Memory" hint="Write what happened, what mattered, or what you want to remember.">
        <TextInput
          multiline
          onChangeText={setContent}
          placeholder="Write your memory here..."
          style={[styles.input, styles.textarea]}
          textAlignVertical="top"
          value={content}
        />
      </FieldShell>

      <FieldShell label="Time" hint="Start with a simple precision and optional display label.">
        <View style={styles.timeSection}>
          <View style={styles.actionsRow}>
            {ENTRY_TIME_PRECISIONS.map((precision) => {
              const isSelected = precision === timePrecision;

              return (
                <Pressable
                  accessibilityRole="button"
                  key={precision}
                  onPress={() => setTimePrecision(precision)}
                  style={[styles.precisionChip, isSelected && styles.precisionChipSelected]}
                >
                  <Text style={[styles.precisionChipText, isSelected && styles.precisionChipTextSelected]}>
                    {formatTimePrecisionLabel(precision)}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <TextInput
            onChangeText={setDisplayDateLabel}
            placeholder="Spring 2024, last weekend, June 8..."
            style={styles.input}
            value={displayDateLabel}
          />
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

          <Text style={styles.helperText}>The final implementation will support multiple media items per entry.</Text>
        </View>
      </FieldShell>

      {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <Pressable
        accessibilityRole="button"
        disabled={!canSubmit}
        onPress={handleSubmit}
        style={[styles.submitButton, !canSubmit && styles.submitButtonDisabled]}
      >
        <Text style={styles.submitButtonText}>{isSubmitting ? submittingLabel : submitLabel}</Text>
      </Pressable>
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
  timeSection: {
    gap: 12,
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
  precisionChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#e2e8f0',
  },
  precisionChipSelected: {
    backgroundColor: '#2563eb',
  },
  precisionChipText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  precisionChipTextSelected: {
    color: '#ffffff',
  },
  helperText: {
    fontSize: 13,
    color: '#64748b',
  },
  successText: {
    color: '#15803d',
    fontSize: 14,
    fontWeight: '600',
  },
  errorText: {
    color: '#b91c1c',
    fontSize: 14,
    fontWeight: '600',
  },
  submitButton: {
    alignItems: 'center',
    borderRadius: 999,
    backgroundColor: '#2563eb',
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  submitButtonDisabled: {
    backgroundColor: '#94a3b8',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default EntryFormShell;
export type { EntryFormValues };
