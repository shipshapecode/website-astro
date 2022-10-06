import { test, expect } from '@playwright/test';

test('meta is correct', async ({ page }) => {
  await page.goto('/services/nuxt-consulting/');

  await expect(page).toHaveTitle(
    'Nuxt.js Software Consultants & Developers | Ship Shape'
  );
});
