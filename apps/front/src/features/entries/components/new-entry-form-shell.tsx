import EntryFormShell, { type EntryFormValues } from '@/src/features/entries/components/entry-form-shell';
import { createEntry } from '@/src/features/entries/services/entry-api';

const NewEntryFormShell = () => {
  const handleSubmit = async (values: EntryFormValues) => {
    const now = new Date().toISOString();

    await createEntry({
      ...values,
      startDate: null,
      endDate: null,
      sortDate: now,
    });
  };

  return (
    <EntryFormShell
      errorMessage="The entry could not be saved. Please try again."
      onSubmit={handleSubmit}
      resetOnSuccess
      submitLabel="Save entry"
      submittingLabel="Saving..."
      successMessage="Entry saved through the API."
    />
  );
};

export default NewEntryFormShell;
