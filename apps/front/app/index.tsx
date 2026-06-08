import { Link, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import TimelineEmptyState from '@/src/features/entries/components/timeline-empty-state';
import { listEntries } from '@/src/features/entries/services/entry-api';
import type { Entry } from '@/src/features/entries/types';

const formatEntryDate = (entry: Entry) => {
  if (entry.displayDateLabel) {
    return entry.displayDateLabel;
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(entry.sortDate));
};

const HomeScreen = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadEntries = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const loadedEntries = await listEntries();
      setEntries(loadedEntries);
    } catch {
      setErrorMessage('Unable to load your timeline. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadEntries();
    }, [loadEntries]),
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Echos</Text>
          <Text style={styles.title}>Your timeline</Text>
          <Text style={styles.description}>
            This is where your memories will appear over time, ordered and ready to revisit.
          </Text>
        </View>

        {isLoading ? <Text style={styles.statusText}>Loading your timeline...</Text> : null}

        {!isLoading && errorMessage ? (
          <View style={styles.feedbackBox}>
            <Text style={styles.errorText}>{errorMessage}</Text>
            <Pressable accessibilityRole="button" onPress={loadEntries} style={styles.retryButton}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </Pressable>
          </View>
        ) : null}

        {!isLoading && !errorMessage && entries.length === 0 ? <TimelineEmptyState /> : null}

        {!isLoading && !errorMessage && entries.length > 0 ? (
          <View style={styles.timelineList}>
            {entries.map((entry) => (
              <Link
                asChild
                href={{
                  pathname: '/entry/[id]',
                  params: {
                    id: entry.id,
                  },
                }}
                key={entry.id}
              >
                <Pressable style={styles.entryCard}>
                  <Text style={styles.entryDate}>{formatEntryDate(entry)}</Text>
                  {entry.title ? <Text style={styles.entryTitle}>{entry.title}</Text> : null}
                  <Text style={styles.entryContent}>{entry.content}</Text>
                  <Text style={styles.entryAction}>Open memory</Text>
                </Pressable>
              </Link>
            ))}
          </View>
        ) : null}

        <View style={styles.footerAction}>
          <Link href="/entry/new" style={styles.secondaryLink}>
            Create a new entry
          </Link>
        </View>
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
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#64748b',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0f172a',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#475569',
  },
  statusText: {
    color: '#64748b',
    fontSize: 15,
  },
  feedbackBox: {
    borderRadius: 16,
    gap: 12,
    backgroundColor: '#fef2f2',
    padding: 16,
  },
  errorText: {
    color: '#b91c1c',
    fontSize: 14,
    fontWeight: '600',
  },
  retryButton: {
    alignSelf: 'flex-start',
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
  timelineList: {
    gap: 14,
  },
  entryCard: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 18,
    gap: 8,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  entryDate: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  entryTitle: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '700',
  },
  entryContent: {
    color: '#334155',
    fontSize: 15,
    lineHeight: 22,
  },
  entryAction: {
    color: '#2563eb',
    fontSize: 13,
    fontWeight: '700',
  },
  footerAction: {
    marginTop: 'auto',
  },
  secondaryLink: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
