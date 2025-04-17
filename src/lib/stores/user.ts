import { writable } from 'svelte/store';

// Define the user store
export const user = writable<string | null>(localStorage.getItem('token') || null);
    