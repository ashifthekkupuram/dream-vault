import 'dotenv/config';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '../db';
import { userTable, sessionTable, verificationTable, accountTable } from '../db/schema';

if (!process.env.FRONTEND_URL) {
  throw new Error('FRONTEND_URL required in the .env');
}

if (!process.env.BETTER_AUTH_SECRET || !process.env.BETTER_AUTH_URL) {
  throw new Error(
    'BETTER_AUTH_SECRET and BETTER_AUTH_URL required in the .env',
  );
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: userTable,
      account: accountTable,
      session: sessionTable,
      verification: verificationTable
    }
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [process.env.FRONTEND_URL],
});
