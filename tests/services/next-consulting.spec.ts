import { test, expect } from '@playwright/test';

test('meta is correct', async ({ page }) => {
  await page.goto('/services/next-consulting/');

  await expect(page).toHaveTitle(
    'Next.js Software Consultants & Developers | Ship Shape'
  );

  const canonicalLink = page.locator('link[rel="canonical"]');
  await expect(canonicalLink).toHaveAttribute(
    'href',
    'https://shipshape.io/services/next-consulting/'
  );

  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute(
    'content',
    'Wondering, "What is Next js?" or optimizing your Next application? See how Ship Shape\'s Next.js specialists can help build a universal app without the hassle.'
  );
});
