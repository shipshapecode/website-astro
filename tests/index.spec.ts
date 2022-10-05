import { test, expect } from '@playwright/test';

test('meta is correct', async ({ page }) => {
  await page.goto('/');
  await page
    .locator('title', {
      hasText: 'Top-Tier, Full-Stack Software Consultants'
    })
    .waitFor();

  expect(page).toHaveTitle('Top-Tier, Full-Stack Software Consultants');
});
