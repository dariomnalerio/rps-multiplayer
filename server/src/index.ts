import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routes/index.js';
import { createContext } from './config/context.js';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import { WebSocketServer } from 'ws';
import { env } from './config/index.js';

const app = express();
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

const server = app.listen(env.PORT);

applyWSSHandler({
  wss: new WebSocketServer({ server }),
  router: appRouter,
  createContext,
});

export type AppRouter = typeof appRouter;
