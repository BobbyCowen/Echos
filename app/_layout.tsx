import { Stack } from 'expo-router';

import AppBootstrapScreen from '@/src/features/app/components/app-bootstrap-screen';
import { useAppBootstrap } from '@/src/features/app/hooks/use-app-bootstrap';

const RootLayout = () => {
  const { isReady, error } = useAppBootstrap();

  if (!isReady) {
    return <AppBootstrapScreen error={error?.message} />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Echos' }} />
      <Stack.Screen name="entry/new" options={{ title: 'New entry' }} />
    </Stack>
  );
};

export default RootLayout;
