import { test, expect } from '@playwright/test';

test('meta is correct', async ({ page }) => {
  await page.goto('/services/nuxt-consulting/');

  await expect(page).toHaveTitle(
    'Nuxt.js Software Consultants & Developers | Ship Shape'
  );

  const canonicalLink = page.locator('link[rel="canonical"]');
  await expect(canonicalLink).toHaveAttribute(
    'href',
    'https://shipshape.io/services/nuxt-consulting/'
  );

  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute(
    'content',
    "Working to improve or create a Nuxt app? Ship Shape's first-class engineers build fast, lightweight Nuxt.js applications while training your team too."
  );
});
