import { test, expect } from '@playwright/test';

test('meta is correct', async ({ page }) => {
  await page.goto('/services/serverless-consulting/');

  await expect(page).toHaveTitle(
    'Serverless Framework Solutions | Ship Shape'
  );

  const canonicalLink = page.locator('link[rel="canonical"]');
  await expect(canonicalLink).toHaveAttribute(
    'href',
    'https://shipshape.io/services/serverless-consulting/'
  );

  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute(
    'content',
    "Turn to Ship Shape's serverless framework experts to better understand what is serverless, and save time and resources on your next app build."
  );
});
