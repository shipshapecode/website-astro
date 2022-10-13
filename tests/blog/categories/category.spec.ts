import { test, expect } from '@playwright/test';

test('meta is correct', async ({ page }) => {
  await page.goto('/blog/categories/ember-js/');

  await expect(page).toHaveTitle('ember.js - Blog Category | Ship Shape');

  const canonicalLink = page.locator('link[rel="canonical"]');
  await expect(canonicalLink).toHaveAttribute(
    'href',
    'https://shipshape.io/blog/categories/ember-js/'
  );

  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute(
    'content',
    'See the 21 blog posts Ship Shape has written about ember.js.'
  );
});
