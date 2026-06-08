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

type UpdateEntryPayload = Partial<
  Pick<Entry, 'title' | 'content' | 'timePrecision' | 'startDate' | 'endDate' | 'displayDateLabel' | 'sortDate'>
>;

type EntryResponse = {
  entry: Entry;
};

type GetEntryResponse = EntryResponse;

type CreateEntryResponse = EntryResponse;

type UpdateEntryResponse = EntryResponse;

type ListEntriesResponse = {
  entries: Entry[];
};

export const listEntries = async (): Promise<Entry[]> => {
  const response = await fetch(`${API_BASE_URL}/entries`);

  if (!response.ok) {
    throw new Error('Unable to load entries');
  }

  const data = (await response.json()) as ListEntriesResponse;

  return data.entries;
};

export const getEntry = async (id: string): Promise<Entry> => {
  const response = await fetch(`${API_BASE_URL}/entries/${id}`);

  if (response.status === 404) {
    throw new Error('Entry not found');
  }

  if (!response.ok) {
    throw new Error('Unable to load entry');
  }

  const data = (await response.json()) as GetEntryResponse;

  return data.entry;
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

export const updateEntry = async (id: string, payload: UpdateEntryPayload): Promise<Entry> => {
  const response = await fetch(`${API_BASE_URL}/entries/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (response.status === 404) {
    throw new Error('Entry not found');
  }

  if (!response.ok) {
    throw new Error('Unable to update entry');
  }

  const data = (await response.json()) as UpdateEntryResponse;

  return data.entry;
};
