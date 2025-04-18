import { expect, test } from '@playwright/test';

test('Login text is visible', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('h1').first()).toHaveText('Login');
});


test('Login input fields are visible', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByPlaceholder('Username')).toBeVisible();
	await expect(page.locator('button').first()).toHaveText('Login');
});

