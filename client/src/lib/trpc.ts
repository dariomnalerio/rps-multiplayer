import {
  createTRPCProxyClient,
  createWSClient,
  splitLink,
  httpBatchLink,
  wsLink,
} from '@trpc/client';
import type { AppRouter } from '@server/index.js';
import { env } from '../config/index.js';

const wsClient = createWSClient({ url: env.VITE_WS_SERVER_URL });
const httpClient = httpBatchLink({ url: env.VITE_HTTP_SERVER_URL });

const client = createTRPCProxyClient<AppRouter>({
  links: [
    splitLink({
      condition: (op) => {
        return op.type === 'subscription';
      },
      true: wsLink({
        client: wsClient,
      }),
      false: httpClient,
    }),
  ],
});

