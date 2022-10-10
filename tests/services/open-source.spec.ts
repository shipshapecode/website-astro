import { test, expect } from '@playwright/test';

test('meta is correct', async ({ page }) => {
  await page.goto('/services/open-source/');

  await expect(page).toHaveTitle('Open Source Software | Ship Shape');

  const canonicalLink = page.locator('link[rel="canonical"]');
  await expect(canonicalLink).toHaveAttribute(
    'href',
    'https://shipshape.io/services/open-source/'
  );

  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute(
    'content',
    'We build and support countless open source projects. Discover why Ship Shape loves open source development.'
  );
});
