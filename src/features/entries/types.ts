export type EntryTimePrecision = 'exact' | 'approximate' | 'range';

export type Entry = {
  id: string;
  title: string | null;
  content: string;
  timePrecision: EntryTimePrecision;
  startDate: string | null;
  endDate: string | null;
  displayDateLabel: string | null;
  sortDate: string;
  createdAt: string;
  updatedAt: string;
};
