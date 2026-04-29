import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Echos' }} />
      <Stack.Screen name="entry/new" options={{ title: 'New entry' }} />
    </Stack>
  );
};

export default RootLayout;
