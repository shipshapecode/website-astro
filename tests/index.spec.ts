import { test, expect } from '@playwright/test';

test('meta is correct', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Top-Tier, Full-Stack Software Consultants | Ship Shape');

  const canonicalLink = page.locator('link[rel="canonical"]');
  await expect(canonicalLink).toHaveAttribute('href', 'https://shipshape.io/');

  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute(
    'content',
    "Ship Shape's app development company offers a top-tier team of on-shore, full-stack software consultants who can't wait to build or improve your product."
  );

  const ogSiteName = page.locator('meta[property="og:site_name"]');
  await expect(ogSiteName).toHaveAttribute(
    'content',
    'Ship Shape'
  );
});
