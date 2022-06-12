import * as trpc from '@trpc/server';
import { resolve } from 'path';
import { z } from 'zod';
import superjson from 'superjson';

import { prisma } from '../../db/client';
import { questionRouter } from './questions';

export const appRouter = trpc
  .router()
  .transformer(superjson)
  .merge('questions.', questionRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
