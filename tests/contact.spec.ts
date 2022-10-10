import { test, expect } from '@playwright/test';

test('meta is correct', async ({ page }) => {
  await page.goto('/contact/');

  await expect(page).toHaveTitle(
    'Contact Our Software Consultants | Ship Shape'
  );

  const canonicalLink = page.locator('link[rel="canonical"]');
  await expect(canonicalLink).toHaveAttribute('href', 'https://shipshape.io/contact/');

  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute(
    'content',
    "Want to improve your products and people? Contact Ship Shape's software consultants to chat about custom app development, optimization, and training."
  );
});

