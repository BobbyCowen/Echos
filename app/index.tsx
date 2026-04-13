import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Echos</Text>
      <Text style={styles.text}>Your timeline will live here.</Text>
      <Link href="/entry/new" style={styles.link}>
        Create a new entry
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  text: {
    fontSize: 16,
    color: '#444',
  },
  link: {
    marginTop: 8,
    color: '#2563eb',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
