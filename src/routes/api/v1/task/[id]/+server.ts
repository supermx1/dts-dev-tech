import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { task } from '$lib/server/db/schema';
import type { RequestHandler } from './$types';
import { eq } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

// Get a task by id
export const GET: RequestHandler = async ({ request, params }) => {
	const AUTH_TOKEN = request.headers.get('x-auth-token');
	if (!AUTH_TOKEN) {
		return json({ message: 'Unauthorized' }, { status: 401 });
	}

	const res = await db.query.task.findFirst({
		where: eq(task.id, params.id)
	});

	if (!res) {
		return json({ message: 'Task not found' }, { status: 404 });
	}

	return json(res);
};
