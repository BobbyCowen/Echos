import { Link, useLocalSearchParams } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

const readParam = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
};

const formatDate = (displayDateLabel: string | undefined, sortDate: string | undefined) => {
  if (displayDateLabel) {
    return displayDateLabel;
  }

  if (!sortDate) {
    return 'Undated memory';
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(sortDate));
};

const EntryDetailScreen = () => {
  const params = useLocalSearchParams();

  const title = readParam(params.title);
  const content = readParam(params.content);
  const displayDateLabel = readParam(params.displayDateLabel);
  const sortDate = readParam(params.sortDate);
  const timePrecision = readParam(params.timePrecision);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Memory detail</Text>
          <Text style={styles.date}>{formatDate(displayDateLabel, sortDate)}</Text>
          <Text style={styles.title}>{title || 'Untitled memory'}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Memory</Text>
          <Text style={styles.bodyText}>{content || 'No content available for this entry yet.'}</Text>
        </View>

        <View style={styles.metaGrid}>
          <View style={styles.metaCard}>
            <Text style={styles.metaLabel}>Time precision</Text>
            <Text style={styles.metaValue}>{timePrecision ?? 'Not set'}</Text>
          </View>
          <View style={styles.metaCard}>
            <Text style={styles.metaLabel}>Media</Text>
            <Text style={styles.metaValue}>Ready for attachments</Text>
          </View>
          <View style={styles.metaCard}>
            <Text style={styles.metaLabel}>Tags</Text>
            <Text style={styles.metaValue}>Ready for themes</Text>
          </View>
        </View>

        <Link href="/" style={styles.backLink}>
          Back to timeline
        </Link>
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
