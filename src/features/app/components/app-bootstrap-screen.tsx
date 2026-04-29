import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

type AppBootstrapScreenProps = {
  error?: string;
};

const AppBootstrapScreen = ({ error }: AppBootstrapScreenProps) => {
  const hasError = Boolean(error);

  return (
    <View style={styles.container}>
      {hasError ? null : <ActivityIndicator size="large" color="#2563eb" />}
      <Text style={styles.title}>{hasError ? 'App startup failed' : 'Preparing Echos'}</Text>
      <Text style={styles.description}>
        {hasError
          ? error
          : 'The local database is being initialized before the app becomes available.'}
      </Text>
      {hasError ? (
        <View style={styles.helpBox}>
          <Text style={styles.helpTitle}>Debug hint</Text>
          <Text style={styles.helpText}>
            Check the Expo logs to see whether SQLite initialization or migrations are hanging.
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    textAlign: 'center',
  },
  description: {
    maxWidth: 320,
    fontSize: 15,
    lineHeight: 22,
    color: '#475569',
    textAlign: 'center',
  },
  helpBox: {
    maxWidth: 320,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 6,
  },
  helpTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  helpText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#475569',
  },
});

export default AppBootstrapScreen;
