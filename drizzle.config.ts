import { defineConfig } from 'drizzle-kit';
import { dbUrl } from './src/lib/env';

console.log("dbUrl", dbUrl);
export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: dbUrl,
  },
});
