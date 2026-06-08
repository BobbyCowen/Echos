import { Link, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { getEntry } from '@/src/features/entries/services/entry-api';
import type { Entry } from '@/src/features/entries/types';

const readParam = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
};

const formatDate = (entry: Entry) => {
  if (entry.displayDateLabel) {
    return entry.displayDateLabel;
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(entry.sortDate));
};

const EntryDetailScreen = () => {
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

  useFocusEffect(
    useCallback(() => {
      void loadEntry();
    }, [loadEntry]),
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
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
            <View style={styles.header}>
              <Text style={styles.eyebrow}>Memory detail</Text>
              <Text style={styles.date}>{formatDate(entry)}</Text>
              <Text style={styles.title}>{entry.title || 'Untitled memory'}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.sectionLabel}>Memory</Text>
              <Text style={styles.bodyText}>{entry.content || 'No content available for this entry yet.'}</Text>
            </View>

            <View style={styles.metaGrid}>
              <View style={styles.metaCard}>
                <Text style={styles.metaLabel}>Time precision</Text>
                <Text style={styles.metaValue}>{entry.timePrecision}</Text>
              </View>
              <View style={styles.metaCard}>
                <Text style={styles.metaLabel}>Created</Text>
                <Text style={styles.metaValue}>{new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(entry.createdAt))}</Text>
              </View>
              <View style={styles.metaCard}>
                <Text style={styles.metaLabel}>Updated</Text>
                <Text style={styles.metaValue}>{new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(entry.updatedAt))}</Text>
              </View>
            </View>

            <Link href="/" style={styles.backLink}>
              Back to timeline
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
  date: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '700',
  },
  title: {
    color: '#0f172a',
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 38,
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
  card: {
    backgroundColor: '#f8fafc',
    borderColor: '#e2e8f0',
    borderRadius: 20,
    borderWidth: 1,
    gap: 10,
    padding: 18,
  },
  sectionLabel: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  bodyText: {
    color: '#334155',
    fontSize: 17,
    lineHeight: 26,
  },
  metaGrid: {
    gap: 12,
  },
  metaCard: {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    borderRadius: 16,
    borderWidth: 1,
    gap: 4,
    padding: 14,
  },
  metaLabel: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  metaValue: {
    color: '#0f172a',
    fontSize: 15,
    fontWeight: '600',
  },
  backLink: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default EntryDetailScreen;
