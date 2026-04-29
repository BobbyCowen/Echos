import { useEffect, useState } from 'react';

import { initializeEntriesDb } from '@/src/features/entries/services/init-db';

type BootstrapState = {
  isReady: boolean;
  error: Error | null;
};

export const useAppBootstrap = (): BootstrapState => {
  const [state, setState] = useState<BootstrapState>({
    isReady: false,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const bootstrap = async () => {
      try {
        await initializeEntriesDb();

        if (isMounted) {
          setState({ isReady: true, error: null });
        }
      } catch (error) {
        if (isMounted) {
          setState({
            isReady: false,
            error: error instanceof Error ? error : new Error('Unknown bootstrap error'),
          });
        }
      }
    };

    bootstrap();

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
};
