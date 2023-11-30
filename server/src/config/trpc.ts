import { TRPCError, inferAsyncReturnType, initTRPC } from '@trpc/server';
import { createContext } from './context.js';

export const t = initTRPC
  .context<inferAsyncReturnType<typeof createContext>>()
  .create();
