import { test, expect } from '@playwright/test';

test('meta is correct', async ({ page }) => {
  await page.goto('/whiskey-web-and-whatnot-podcast/');

  await expect(page).toHaveTitle(
    'Whiskey, Web, & Whatnot: A Software Engineering Podcast | Ship Shape'
  );

  const canonicalLink = page.locator('link[rel="canonical"]');
  await expect(canonicalLink).toHaveAttribute(
    'href',
    'https://shipshape.io/whiskey-web-and-whatnot-podcast/'
  );

  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute(
    'content',
    'Join Ship Shape CEO Robbie Wagner and COO Chuck Carpenter for this software engineering podcast for developers who love whiskey, web development, and whatnot.'
  );
});
