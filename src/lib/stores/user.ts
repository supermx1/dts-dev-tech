import { writable } from 'svelte/store';

export const user = writable<string | null>(localStorage.getItem('username') || null);
