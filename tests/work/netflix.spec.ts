import { test, expect } from '@playwright/test';

test('meta is correct', async ({ page }) => {
  await page.goto('/work/netflix/');

  await expect(page).toHaveTitle(
    "Netflix Ember.js Finance Dashboard | Ship Shape"
  );

  const canonicalLink = page.locator('link[rel="canonical"]');
  await expect(canonicalLink).toHaveAttribute(
    'href',
    'https://shipshape.io/work/netflix/'
  );

  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute(
    'content',
    "Netflix Finance had outdated, disjointed Ember.js apps. See how Ship Shape's enterprise app development experts increased efficiency & data granularity."
  );
});
