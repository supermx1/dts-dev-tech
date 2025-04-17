import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { task } from '$lib/server/db/schema';
import type { RequestHandler } from './$types';
import { eq } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

// Get all tasks
export const GET: RequestHandler = async ({ request }) => {
	const AUTH_TOKEN = request.headers.get('x-auth-token');
	if (!AUTH_TOKEN) {
		return json({ message: 'Unauthorized' }, { status: 401 });
	}

	const tasks = await db.query.task.findMany();
	return json(tasks);
};

// Create a new task
export const POST: RequestHandler = async ({ request }) => {
    const AUTH_TOKEN = request.headers.get('x-auth-token');
	if (!AUTH_TOKEN) {
		return json({ message: 'Unauthorized' }, { status: 401 });
	}

	const { title, description, dueDate, status } = await request.json();


    if (!title || !description || !dueDate || !status) {
        return json({ message: 'Missing required fields' }, { status: 400 });
    }

    try {
        const newTask = await db.insert(task).values({
            id: createId(),
            title,
            description,
            dueDate: new Date(dueDate).toISOString(),
            status
        });
        return json({ message: 'Task created successfully' }, { status: 201 });
    } catch (error) {
        if (error instanceof Error && error.message.includes('SQLITE_CONSTRAINT_UNIQUE')) {
            return json({ message: 'Duplicate task' }, { status: 400 });
        }
        return json({ message: 'Internal server error' }, { status: 500 });
    }
};

// Update a task
export const PATCH: RequestHandler = async ({ request }) => {
    const AUTH_TOKEN = request.headers.get('x-auth-token');
	if (!AUTH_TOKEN) {
		return json({ message: 'Unauthorized' }, { status: 401 });
	}

    const { id, title, description, dueDate, status } = await request.json();

    if (!id || !title || !description || !dueDate || !status) {
        return json({ message: 'Missing required fields' }, { status: 400 });
    }

    try {
        const updatedTask = await db.update(task).set({ 
            title, 
            description, 
            dueDate: new Date(dueDate).toISOString(), 
            status,
            completedAt: status === 'completed' ? new Date().toISOString() : null
         }).where(eq(task.id, id));
        return json(updatedTask);
    } catch (error) {
        console.log(error);
        return json({ message: 'Internal server error' }, { status: 500 });
    }
}

// Delete a task
export const DELETE: RequestHandler = async ({ request }) => {
    const AUTH_TOKEN = request.headers.get('x-auth-token');
	if (!AUTH_TOKEN) {
		return json({ message: 'Unauthorized' }, { status: 401 });
	}

    const { id } = await request.json();

    if (!id) {
        return json({ message: 'Missing required fields' }, { status: 400 });
    }

    try {
        const deletedTask = await db.delete(task).where(eq(task.id, id));
        return json({ message: 'Task deleted successfully' }, { status: 200 });
    } catch (error) {
        return json({ message: 'Internal server error' }, { status: 500 });
    }
}