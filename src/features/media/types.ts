export type MediaType = 'photo' | 'external_link';

export type Media = {
  id: string;
  entryId: string;
  type: MediaType;
  fileUri: string | null;
  url: string | null;
  mimeType: string | null;
  title: string | null;
  description: string | null;
  createdAt: string;
};
