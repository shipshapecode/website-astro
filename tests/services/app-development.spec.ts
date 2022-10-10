import { test, expect } from '@playwright/test';

test('meta is correct', async ({ page }) => {
  await page.goto('/services/app-development/');

  await expect(page).toHaveTitle(
    "App Development Agency | Ship Shape"
  );

  const canonicalLink = page.locator('link[rel="canonical"]');
  await expect(canonicalLink).toHaveAttribute(
    'href',
    'https://shipshape.io/services/app-development/'
  );

  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute(
    'content',
    "Ship Shape develops progressive web apps from start to finish. Hire us for code that won't sink."
  );
});