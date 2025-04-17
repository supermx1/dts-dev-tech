import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { task } from '$lib/server/db/schema';
import type { RequestHandler } from './$types';
import { eq } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

export const GET: RequestHandler = async ({ request }) => {
	// const AUTH_TOKEN = request.headers.get('x-auth-token');
	// if (!AUTH_TOKEN) {
	// 	return json({ error: 'Unauthorized' }, { status: 401 });
	// }

	const tasks = await db.query.task.findMany();
	return json(tasks);
};

export const POST: RequestHandler = async ({ request }) => {
    // const AUTH_TOKEN = request.headers.get('x-auth-token');
	// if (!AUTH_TOKEN) {
	// 	return json({ error: 'Unauthorized' }, { status: 401 });
	// }

	const { title, description, dueDate, status } = await request.json();
	const newTask = await db.insert(task).values({
		title,
		description,
		dueDate: new Date(dueDate).getTime(),
		status
	});
	return json(newTask);
};
