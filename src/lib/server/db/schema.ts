import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from "drizzle-orm";
import { createId } from '@paralleldrive/cuid2';

export const task = sqliteTable('task', {
	id: text('id').$defaultFn(() => createId()).primaryKey(),
	title: text('title').notNull(),
	description: text('description').notNull(),
	dueDate: integer('due_date', { mode: 'timestamp' }).notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(CURRENT_TIMESTAMP)`),
	completedAt: integer('completed_at', { mode: 'timestamp' }),
	status: text('status', { enum: ['pending', 'in-progress', 'completed'] }).notNull()
});
