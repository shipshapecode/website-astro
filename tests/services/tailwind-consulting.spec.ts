import { test, expect } from '@playwright/test';

test('meta is correct', async ({ page }) => {
  await page.goto('/services/tailwind-consulting/');

  await expect(page).toHaveTitle(
    'Tailwind CSS & Tailwind UI Experts | Ship Shape'
  );

  const canonicalLink = page.locator('link[rel="canonical"]');
  await expect(canonicalLink).toHaveAttribute(
    'href',
    'https://shipshape.io/services/tailwind-consulting/'
  );

  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute(
    'content',
    "Tailwind CSS makes it easy to build a site without using any custom CSS. Learn how Ship Shape's team of Tailwind UI experts can help tailor your app quickly."
  );
});
