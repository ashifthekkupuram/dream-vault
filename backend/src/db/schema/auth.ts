import { boolean, pgTable, timestamp, text, index } from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

const timestamps = {
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
};

export const userTable = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  image: text('image'),
  emailVerified: boolean('emailVerified').default(false).notNull(),
  ...timestamps,
});

export const sessionTable = pgTable(
  'session',
  {
    id: text('id').primaryKey(),
    userId: text('userId')
      .notNull()
      .references(() => userTable.id, { onDelete: 'cascade' }),
    token: text('token').notNull().unique(),
    expiresAt: timestamp('expiresAt').notNull(),
    ipAddress: text('ipAddress'),
    userAgent: text('userAgent'),
    ...timestamps,
  },
  (table) => [index('session_user_id_idx').on(table.userId)],
);

export const accountTable = pgTable(
  'account',
  {
    id: text('id').primaryKey(),
    userId: text('userId')
      .notNull()
      .references(() => userTable.id, { onDelete: 'cascade' }),
    accountId: text('accountId').notNull(),
    providerId: text('providerId').notNull(),
    accessToken: text('accessToken'),
    refreshToken: text('refreshToken'),
    accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
    refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
    scope: text('scope'),
    idToken: text('idToken'),
    password: text('password'),
    ...timestamps,
  },
  (table) => [index('account_user_id_idx').on(table.userId)],
);

export const verificationTable = pgTable(
  'verification',
  {
    id: text('id').primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expiresAt').notNull(),
    ...timestamps,
  },
  (table) => [index('verification_identifier_idx').on(table.identifier)],
);

// One to Many, A User can have many Accounts and Sessions
export const userRelations = relations(userTable, ({ many }) => ({
  accounts: many(accountTable),
  sessions: many(sessionTable),
}));

// Many to One, Lot of Sessions can only have one User
export const sessionRelations = relations(sessionTable, ({ one }) => ({
  user: one(userTable, {
    fields: [sessionTable.userId],
    references: [userTable.id],
  }),
}));

// Many to One, Lot of Accounts can only have one User
export const accountRelations = relations(accountTable, ({ one }) => ({
  user: one(userTable, {
    fields: [accountTable.userId],
    references: [userTable.id],
  }),
}));

export type UserType = typeof userTable.$inferSelect;
export type NewUserType = typeof userTable.$inferInsert;

export type SessionType = typeof sessionTable.$inferSelect;
export type NewSessionType = typeof sessionTable.$inferInsert;

export type AccountType = typeof accountTable.$inferSelect;
export type NewAccountType = typeof accountTable.$inferInsert;

export type VerificationType = typeof verificationTable.$inferSelect;
export type NewVerificationType = typeof verificationTable.$inferInsert;
