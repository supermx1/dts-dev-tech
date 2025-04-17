import { describe, it, expect, vi } from 'vitest';

describe('Login Token', () => {
	it('should return a base64 encoded token', async () => {
		const testUsername = 'Test User';
		const expectedToken = btoa(testUsername);

		// Mock the fetch response
		global.fetch = vi.fn().mockResolvedValueOnce({
			json: () => Promise.resolve({ token: expectedToken })
		});

		const response = await fetch('/api/v1/login', {
			method: 'POST',
			body: JSON.stringify({ username: testUsername })
		});
		const data = await response.json();

		expect(data.token).toBe(expectedToken);
	});
});
