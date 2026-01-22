import {
  boolean,
  pgTable,
  text,
  timestamp,
  pgEnum,
  index,
} from 'drizzle-orm/pg-core';

import { userTable } from './auth';
import { relations } from 'drizzle-orm';

const timestamps = {
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
};

export const moodEnum = pgEnum('mood', [
  'Scary',
  'Anxious',
  'Sad',
  'Angry',
  'Confusing',
  'Peaceful',
  'Happy',
  'Exciting',
  'Calm',
  'Neutral',
  'Weird',
  'Empowering',
  'Loving',
  'Nostalgic',
  'Curious',
]);

export const dreamTable = pgTable(
  'dream',
  {
    id: text('id').primaryKey(),
    title: text('title').notNull(),
    content: text('content').notNull(),
    tags: text('tags').array().default([]),
    isLucid: boolean().notNull().default(false),
    dreamedOn: timestamp().notNull().defaultNow(),
    mood: moodEnum(),
    emotion: text('emotion').notNull(),
    userId: text('userId')
      .notNull()
      .references(() => userTable.id, { onDelete: 'set null' }),
    ...timestamps,
  },
  (table) => [index('dream_user_id_idx').on(table.userId)],
);

// A Dream can have only one user
export const dreamRelations = relations(dreamTable, ({ one }) => ({
  user: one(userTable, {
    fields: [dreamTable.userId],
    references: [userTable.id],
  }),
}));

export type DreamType = typeof dreamTable.$inferSelect;
export type NewDreamType = typeof dreamTable.$inferInsert;