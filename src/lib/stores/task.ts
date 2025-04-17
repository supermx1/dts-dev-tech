import { writable } from 'svelte/store';

export type Task = {
	id: number;
	title: string;
	description: string;
	status: 'pending' | 'in-progress' | 'completed';
	dueDate: Date;
	createdAt: Date;
	completedAt?: Date;
};

export const taskStore = writable<Task | null>(null);
