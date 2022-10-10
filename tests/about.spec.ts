import { test, expect } from '@playwright/test';

test('meta is correct', async ({ page }) => {
  await page.goto('/about/');

  await expect(page).toHaveTitle(
    'About Our Software Development Agency | Ship Shape'
  );

  const canonicalLink = page.locator('link[rel="canonical"]');
  await expect(canonicalLink).toHaveAttribute(
    'href',
    'https://shipshape.io/about/'
  );

  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute(
    'content',
    'Meet Ship Shape, a full-stack software development agency with senior-level engineers who specialize in JavaScript frameworks, serverless architecture, & more.'
  );
});
