import { Link, router, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import EntryFormShell, { type EntryFormValues } from '@/src/features/entries/components/entry-form-shell';
import { getEntry, updateEntry } from '@/src/features/entries/services/entry-api';
import type { Entry } from '@/src/features/entries/types';

const readParam = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
};

const EditEntryScreen = () => {
  const params = useLocalSearchParams();
  const entryId = readParam(params.id);

  const [entry, setEntry] = useState<Entry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadEntry = useCallback(async () => {
    if (!entryId) {
      setEntry(null);
      setErrorMessage('This memory could not be found.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const loadedEntry = await getEntry(entryId);
      setEntry(loadedEntry);
    } catch (error) {
      setEntry(null);
      setErrorMessage(error instanceof Error ? error.message : 'Unable to load this memory.');
    } finally {
      setIsLoading(false);
    }
  }, [entryId]);

  useEffect(() => {
    void loadEntry();
  }, [loadEntry]);

  const handleSubmit = async (values: EntryFormValues) => {
    if (!entryId) {
      throw new Error('Missing entry id');
    }

    const updatedEntry = await updateEntry(entryId, values);
    router.replace(`/entry/${updatedEntry.id}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Edit memory</Text>
          <Text style={styles.title}>Update this entry</Text>
          <Text style={styles.description}>Adjust the main text and the first simple time information.</Text>
        </View>

        {isLoading ? <Text style={styles.statusText}>Loading this memory...</Text> : null}

        {!isLoading && errorMessage ? (
          <View style={styles.feedbackBox}>
            <Text style={styles.errorText}>{errorMessage}</Text>
            <Text style={styles.feedbackText}>Go back to the timeline or try loading it again.</Text>
            <View style={styles.feedbackActions}>
              <Pressable accessibilityRole="button" onPress={loadEntry} style={styles.retryButton}>
                <Text style={styles.retryButtonText}>Retry</Text>
              </Pressable>
              <Link href="/" style={styles.backLink}>
                Back to timeline
              </Link>
            </View>
          </View>
        ) : null}

        {!isLoading && !errorMessage && entry ? (
          <>
            <EntryFormShell
              errorMessage="The entry could not be updated. Please try again."
              initialEntry={entry}
              onSubmit={handleSubmit}
              submitLabel="Save changes"
              submittingLabel="Saving changes..."
              successMessage="Entry updated."
            />

            <Link href={`/entry/${entry.id}`} style={styles.backLink}>
              Back to detail
            </Link>
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flexGrow: 1,
    padding: 24,
    gap: 24,
  },
  header: {
    gap: 10,
  },
  eyebrow: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  title: {
    color: '#0f172a',
    fontSize: 30,
    fontWeight: '700',
  },
  description: {
    color: '#475569',
    fontSize: 16,
    lineHeight: 24,
  },
  statusText: {
    color: '#64748b',
    fontSize: 15,
  },
  feedbackBox: {
    backgroundColor: '#fef2f2',
    borderRadius: 16,
    gap: 12,
    padding: 16,
  },
  feedbackText: {
    color: '#7f1d1d',
    fontSize: 14,
  },
  feedbackActions: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  errorText: {
    color: '#b91c1c',
    fontSize: 14,
    fontWeight: '600',
  },
  retryButton: {
    borderRadius: 999,
    backgroundColor: '#b91c1c',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  backLink: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default EditEntryScreen;
