import type { QueryResult, QueryResultRow } from "@neondatabase/serverless";
import {
  VercelClient,
  createClient,
  createPool,
  type VercelPool,
} from "@vercel/postgres";

export type Primitive = string | number | boolean | undefined | null;
export { types } from "@neondatabase/serverless";

let pool: VercelPool | undefined;
let client: VercelClient | undefined;

const initiateClient = async () => {
  const client = createClient({
    connectionString: process.env.POSTGRES_URL_LOCAL,
  });
  // Set the WebSocket proxy to work with the local instance
  client.neonConfig.wsProxy = (host) => `${host}:5432/v1`;
  // Disable all authentication and encryption
  client.neonConfig.useSecureWebSocket = false;
  client.neonConfig.pipelineTLS = false;
  client.neonConfig.pipelineConnect = false;
  await client.connect();
  return client;
};

export const sql = new Proxy(() => {}, {
  async get(_, prop) {
    if (process.env.VERCEL_ENV === "production") {
      if (!pool) {
        pool = createPool();
      }

      const val = Reflect.get(pool, prop);
      if (typeof val === "function") {
        return val.bind(pool);
      }
      return val;
    } else {
      if (!client) {
        client = await initiateClient();
      }

      const val = Reflect.get(client, prop);
      if (typeof val === "function") {
        return val.bind(client);
      }
      return val;
    }
  },
  async apply(_, __, argumentsList) {
    if (process.env.VERCEL_ENV === "production") {
      if (!pool) {
        pool = createPool();
      } // @ts-ignore
      return pool.sql(...argumentsList);
    } else {
      if (!client) {
        client = await initiateClient();
      } // @ts-ignore
      return client.sql(...argumentsList);
    }
  },
}) as unknown as VercelPool &
  (<O extends QueryResultRow>(
    strings: TemplateStringsArray,
    ...values: Primitive[]
  ) => Promise<QueryResult<O>>);

export const db = sql;
