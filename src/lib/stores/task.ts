import { writable } from 'svelte/store';


// Define the Task type
export type Task = {
	id: number;
	title: string;
	description: string;
	status: 'pending' | 'in-progress' | 'completed';
	dueDate: string;
	createdAt: string;
	completedAt?: string;
};

// Define the taskStore
export const taskStore = writable<Task | null>(null);

// Define the tasks store
export const tasks = writable<Task[]>([]);

// Define the getTasks function
export async function getTasks() {
		try {
			taskStore.set(null);
			const response = await fetch('/api/v1/task', {
				headers: {
					'Content-Type': 'application/json',
					'x-auth-token': localStorage.getItem('token') || ''
				}
			});
			const data = await response.json();
			// Sort the tasks by dueDate in descending order
			tasks.set(data.sort((a: any, b: any) => {
				const dateA = new Date(a.dueDate);
				const dateB = new Date(b.dueDate);
				return dateA.getTime() - dateB.getTime();
			}));
		} catch (error) {
			console.error(error);
		}
	}

