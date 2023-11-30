import { observable } from '@trpc/server/observable';
import { t } from '../config/trpc.js';
import { z } from 'zod';
import stream from 'stream';
const { EventEmitter } = stream;

const userProcedure = t.procedure.input(
  z.object({
    userId: z.string(),
  })
);

const eventEmitter = new EventEmitter();

const userRouter = t.router({
  // Get user by ID
  get: userProcedure.query(({ input }) => {
    return { id: input.userId, name: 'asdasd' };
  }),
  update: userProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation((req) => {
      console.log(
        `Updating user ${req.input.userId} to have the name ${req.input.name}`
      );

      eventEmitter.emit('update', req.input.userId);
      return { id: req.input.userId, name: req.input.name };
    }),
  onUpdate: t.procedure.subscription(() => {
    return observable<string>((emit) => {
      // type, e.g <string> is what it returns

      eventEmitter.on('update', emit.next);

      // cleanup
      return () => {
        eventEmitter.off('update', emit.next);
      };
    });
  }),
});

export { userRouter };
