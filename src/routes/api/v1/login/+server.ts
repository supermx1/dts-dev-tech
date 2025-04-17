import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';


// Login endpoint
export const POST: RequestHandler = async ({ request }) => {
    const { username } = await request.json();

    if (!username) {
        return json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Generate a random token
    return json({ message: 'Login successful', token: btoa(username) }, { status: 200 });
}