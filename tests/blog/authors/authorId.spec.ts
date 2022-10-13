import { test, expect } from '@playwright/test';

test('meta is correct', async ({ page }) => {
  await page.goto('/blog/authors/wcanavan/');

  await expect(page).toHaveTitle('Posts by Welch Canavan - Blog | Ship Shape');

  const canonicalLink = page.locator('link[rel="canonical"]');
  await expect(canonicalLink).toHaveAttribute(
    'href',
    'https://shipshape.io/blog/authors/wcanavan/'
  );

  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute(
    'content',
    'See the 1 blog posts Welch Canavan has written for Ship Shape.'
  );
});
