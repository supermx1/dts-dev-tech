import { createAvatar } from '@dicebear/core';
import { initials } from '@dicebear/collection';

export function generateSVGAvatar(name: string) {
	return createAvatar(initials, {
		seed: name,
		radius: 50,
		backgroundColor: ['#000000']
	}).toDataUri();
}

export function formatDateExt(dt: string) {
	const date = new Date(dt);
	return date.toLocaleDateString('en-NG', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: false
	});
}

export function timeOfDayGreeting() {
	const hour = new Date().getHours();
	if (hour >= 0 && hour < 12) {
		return 'Good morning';
	} else if (hour >= 12 && hour < 16) {
		return 'Good afternoon';
	} else {
		return 'Good evening';
	}
}
