import { test, expect } from '@playwright/test';

test('meta is correct', async ({ page }) => {
  await page.goto('/work/jebbit/');

  await expect(page).toHaveTitle(
    "Jebbit Ember.js Enterprise App Development | Ship Shape"
  );

  const canonicalLink = page.locator('link[rel="canonical"]');
  await expect(canonicalLink).toHaveAttribute(
    'href',
    'https://shipshape.io/work/jebbit/'
  );

  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute(
    'content',
    "See how Ship Shape's enterprise app development team helped Jebbit make their Ember.js app faster, easier to use, and future-ready."
  );
});
