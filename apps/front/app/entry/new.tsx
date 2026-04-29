import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import NewEntryFormShell from '@/src/features/entries/components/new-entry-form-shell';

const NewEntryScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>New entry</Text>
          <Text style={styles.title}>Capture a memory</Text>
          <Text style={styles.description}>
            Start with the basics. This screen is the foundation for the future entry creation flow.
          </Text>
        </View>

        <NewEntryFormShell />
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
    fontSize: 30,
    fontWeight: '700',
    color: '#0f172a',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#475569',
  },
});

export default NewEntryScreen;
