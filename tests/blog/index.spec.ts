import { test, expect } from '@playwright/test';

test('meta is correct', async ({ page }) => {
  await page.goto('/blog/');

  await expect(page).toHaveTitle(
    "Blog | Ship Shape"
  );

  const canonicalLink = page.locator('link[rel="canonical"]');
  await expect(canonicalLink).toHaveAttribute(
    'href',
    'https://shipshape.io/blog/'
  );

  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute(
    'content',
    'Read our blog to stay ahead of trends in Ember.js, JavaScript, and everything in between.'
  );
});
