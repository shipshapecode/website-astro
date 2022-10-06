import { test, expect } from '@playwright/test';

test('meta is correct', async ({ page }) => {
  await page.goto('/services/next-consulting/');

  await expect(page).toHaveTitle(
    'Next.js Software Consultants & Developers | Ship Shape'
  );
});
