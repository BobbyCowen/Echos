export type EntryTimePrecision = 'exact' | 'approximate' | 'range';

export type EntryRecord = {
  id: string;
  title: string | null;
  content: string;
  timePrecision: EntryTimePrecision;
  startDate: Date | null;
  endDate: Date | null;
  displayDateLabel: string | null;
  sortDate: Date;
  createdAt: Date;
  updatedAt: Date;
};
