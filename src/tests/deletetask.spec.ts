import { describe, it, expect, vi } from 'vitest';

describe('Delete Task', () => {
    it('should delete a task successfully', async () => {
        const testTask = {
            id: 'test-task-id'
        };

        // Mock the fetch response
        global.fetch = vi.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({ message: 'Task deleted successfully' }),
            status: 200
        });

        const response = await fetch('http://localhost:5173/api/v1/task', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': 'test-token'
            },
            body: JSON.stringify(testTask)
        });
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.message).toBe('Task deleted successfully');
    });
});
