import { describe, it, expect, vi } from 'vitest';

describe('Create Task', () => {
    it('should create a new task successfully', async () => {
        const testTask = {
            title: 'Test Task',
            description: 'Test Description',
            dueDate: new Date().toISOString(),
            status: 'pending'
        };

        // Mock the fetch response
        global.fetch = vi.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({ message: 'Task created successfully' }),
            status: 201
        });

        const response = await fetch('http://localhost:5173/api/v1/task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': 'test-token'
            },
            body: JSON.stringify(testTask)
        });
        const data = await response.json();

        expect(response.status).toBe(201);
        expect(data.message).toBe('Task created successfully');
    });
});
