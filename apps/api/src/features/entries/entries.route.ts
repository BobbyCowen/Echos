import type { FastifyInstance } from 'fastify';
import type { ZodIssue } from 'zod';

import { createEntrySchema } from './entry.schema.js';
import { createEntry, listEntries } from './entry.service.js';

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
};
