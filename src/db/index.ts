import { drizzle } from 'drizzle-orm/neon-http';
import { dbUrl } from '../lib/env';
import { relations } from './relations';
import type { DrizzleConfig } from 'drizzle-orm';

export const db = drizzle(
  dbUrl,
  { relations } as DrizzleConfig<typeof relations>
);
