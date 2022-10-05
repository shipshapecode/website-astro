import { test, expect } from '@playwright/test';

test('meta is correct', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Top-Tier, Full-Stack Software Consultants');
});
