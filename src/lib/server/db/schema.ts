import { sqliteTable, text, integer, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { sql } from "drizzle-orm";

// Database schema for the task table
export const task = sqliteTable('task', {
	id: text('id').primaryKey(),
	title: text('title').notNull(),
	description: text('description').notNull(),
	dueDate: text('due_date').notNull(),
	createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
	completedAt: text('completed_at'),
	status: text('status', { enum: ['pending', 'in-progress', 'completed'] }).notNull()
}, (t) => ({
	// Created a unique index on the title, dueDate, description and status columns tp prevent duplicates
	task_unique: uniqueIndex('task_unique').on(t.title, t.dueDate, t.description, t.status) 
}));


