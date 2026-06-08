import type { FastifyInstance } from 'fastify';
import type { ZodIssue } from 'zod';

import { createEntrySchema, updateEntrySchema } from './entry.schema.js';
import { createEntry, getEntryById, listEntries, updateEntry } from './entry.service.js';

const formatValidationIssues = (issues: ZodIssue[]) =>
  issues.map((issue) => ({
    path: issue.path.join('.'),
    message: issue.message,
  }));

export const registerEntriesRoutes = async (app: FastifyInstance) => {
  app.get('/entries', async () => {
    const entries = await listEntries();

    return { entries };
  });

  app.get<{ Params: { id: string } }>('/entries/:id', async (request, reply) => {
    const entry = await getEntryById(request.params.id);

    if (!entry) {
      return reply.status(404).send({
        error: 'ENTRY_NOT_FOUND',
        message: 'Entry not found',
      });
    }

    return { entry };
  });

  app.post('/entries', async (request, reply) => {
    const parsedBody = createEntrySchema.safeParse(request.body);

    if (!parsedBody.success) {
      return reply.status(400).send({
        error: 'VALIDATION_ERROR',
        message: 'Invalid entry payload',
        issues: formatValidationIssues(parsedBody.error.issues),
      });
    }

    const entry = await createEntry(parsedBody.data);

    return reply.status(201).send({ entry });
  });

  app.patch<{ Params: { id: string } }>('/entries/:id', async (request, reply) => {
    const parsedBody = updateEntrySchema.safeParse(request.body);

    if (!parsedBody.success) {
      return reply.status(400).send({
        error: 'VALIDATION_ERROR',
        message: 'Invalid entry update payload',
        issues: formatValidationIssues(parsedBody.error.issues),
      });
    }

    const entry = await updateEntry(request.params.id, parsedBody.data);

    if (!entry) {
      return reply.status(404).send({
        error: 'ENTRY_NOT_FOUND',
        message: 'Entry not found',
      });
    }

    return { entry };
  });
};
