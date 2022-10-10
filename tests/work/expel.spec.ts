import { test, expect } from '@playwright/test';

test('meta is correct', async ({ page }) => {
  await page.goto('/work/expel/');

  await expect(page).toHaveTitle(
    'Expel Ember.js Enterprise App Development | Ship Shape'
  );

  const canonicalLink = page.locator('link[rel="canonical"]');
  await expect(canonicalLink).toHaveAttribute(
    'href',
    'https://shipshape.io/work/expel/'
  );

  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute(
    'content',
    "See how Ship Shape's enterprise app development team helped Expel create a new, fast Ember.js app that centralizes NIST score tracking."
  );
});
