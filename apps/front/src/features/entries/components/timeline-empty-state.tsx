import { Link } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import EmptyState from '@/src/components/ui/empty-state';

const TimelineEmptyState = () => {
  return (
    <EmptyState
      eyebrow="Timeline"
      title="No memories yet"
      description="Start your first entry to build the first echo of your timeline. Photos, text, and links will show up here later."
      action={
        <Link href="/entry/new" style={styles.link}>
          <Text style={styles.linkText}>Create your first entry</Text>
        </Link>
      }
    />
  );
};

const styles = StyleSheet.create({
  link: {
    alignSelf: 'flex-start',
    backgroundColor: '#2563eb',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  linkText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default TimelineEmptyState;
