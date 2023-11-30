import { t } from '../config/trpc.js';
import { userRouter } from './users.js';

const appRouter = t.router({
  users: userRouter,
});

export { appRouter };
