import { test, expect } from '@playwright/test';

test('meta is correct', async ({ page }) => {
  await page.goto('/services/app-tours/');

  await expect(page).toHaveTitle(
    "App Tours with Shepherd.js | Ship Shape"
  );

  const canonicalLink = page.locator('link[rel="canonical"]');
  await expect(canonicalLink).toHaveAttribute(
    'href',
    'https://shipshape.io/services/app-tours/'
  );

  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute(
    'content',
    'Ship Shape uses Shepherd.js to guide your users through a tour of your app. Learn why companies like Google trust our app touring services.'
  );
});