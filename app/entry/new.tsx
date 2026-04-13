import { StyleSheet, Text, View } from 'react-native';

const NewEntryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>New entry</Text>
      <Text style={styles.text}>This screen will host the entry creation flow.</Text>
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
    fontSize: 24,
    fontWeight: '700',
  },
  text: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
  },
});

export default NewEntryScreen;
