import { test, expect } from '@playwright/test';

test('meta is correct', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Top-Tier, Full-Stack Software Consultants | Ship Shape');

  const canonicalLink = page.locator('link[rel="canonical"]');
  await expect(canonicalLink).toHaveAttribute('href', 'https://shipshape.io/');

  const ogSiteName = page.locator('meta[property="og:site_name"]');
  await expect(ogSiteName).toHaveAttribute(
    'content',
    'Ship Shape'
  );
});
