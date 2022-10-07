import { test, expect } from '@playwright/test';

test('meta is correct', async ({ page }) => {
  await page.goto('/work/acquia/');

  await expect(page).toHaveTitle(
    "Acquia Ember.js Enterprise App Development | Ship Shape"
  );

  const canonicalLink = page.locator('link[rel="canonical"]');
  await expect(canonicalLink).toHaveAttribute(
    'href',
    'https://shipshape.io/work/acquia/'
  );

  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute(
    'content',
    "See how Ship Shape's enterprise app development team helped Acquia improve the user experience on its Ember.js app and raise renewal rates to nearly 100%."
  );
});
