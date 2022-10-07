import { test, expect } from '@playwright/test';

test('meta is correct', async ({ page }) => {
  await page.goto('/services/ember-consulting/');

  await expect(page).toHaveTitle(
    'Ember.js Enterprise App Development | Ship Shape'
  );

  const canonicalLink = page.locator('link[rel="canonical"]');
  await expect(canonicalLink).toHaveAttribute(
    'href',
    'https://shipshape.io/services/ember-consulting/'
  );

  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute(
    'content',
    "Learn how Ship Shape's top-tier enterprise app development experts can help your team build fast, reliable Ember.js applications."
  );
});
