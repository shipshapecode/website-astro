import { test, expect } from '@playwright/test';

test('meta is correct', async ({ page }) => {
  await page.goto('/work/swach/');

  await expect(page).toHaveTitle(
    'Case Study - Swach | Ship Shape'
  );

  const canonicalLink = page.locator('link[rel="canonical"]');
  await expect(canonicalLink).toHaveAttribute(
    'href',
    'https://shipshape.io/work/swach/'
  );

  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute(
    'content',
    'Learn how we made Swach into a robust cross platform desktop app for MacOS, Windows, and Linux.'
  );
});
