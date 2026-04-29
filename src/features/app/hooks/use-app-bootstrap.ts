import { useEffect, useState } from 'react';

import { initializeEntriesDb } from '@/src/features/entries/services/init-db';

type BootstrapState = {
  isReady: boolean;
  error: Error | null;
};

const BOOTSTRAP_TIMEOUT_MS = 8000;

const withTimeout = async <T,>(promise: Promise<T>, timeoutMs: number) => {
  return await Promise.race<T>([
    promise,
    new Promise<T>((_, reject) => {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        reject(new Error(`App bootstrap timed out after ${timeoutMs}ms`));
      }, timeoutMs);
    }),
  ]);
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
        console.log('[bootstrap] starting database initialization');
        await withTimeout(initializeEntriesDb(), BOOTSTRAP_TIMEOUT_MS);
        console.log('[bootstrap] database initialization complete');

        if (isMounted) {
          setState({ isReady: true, error: null });
        }
      } catch (error) {
        console.error('[bootstrap] database initialization failed', error);

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
