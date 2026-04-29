import { Link } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import TimelineEmptyState from '@/src/features/entries/components/timeline-empty-state';

const HomeScreen = () => {
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

        <TimelineEmptyState />

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
