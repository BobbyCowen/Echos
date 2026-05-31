import type { Entry, EntryTimePrecision } from '../types';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:3001';

type CreateEntryPayload = {
  title: string | null;
  content: string;
  timePrecision: EntryTimePrecision;
  startDate: string | null;
  endDate: string | null;
  displayDateLabel: string | null;
  sortDate: string;
};

type CreateEntryResponse = {
  entry: Entry;
};

export const createEntry = async (payload: CreateEntryPayload): Promise<Entry> => {
  const response = await fetch(`${API_BASE_URL}/entries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Unable to create entry');
  }

  const data = (await response.json()) as CreateEntryResponse;

  return data.entry;
};
