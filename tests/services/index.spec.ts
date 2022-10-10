import { test, expect } from '@playwright/test';

test('meta is correct', async ({ page }) => {
  await page.goto('/services/');

  await expect(page).toHaveTitle(
    'Ember.js, Next.js & Nuxt.js Software Consultant | Ship Shape'
  );

  const canonicalLink = page.locator('link[rel="canonical"]');
  await expect(canonicalLink).toHaveAttribute(
    'href',
    'https://shipshape.io/services/'
  );

  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute(
    'content',
    'Ship Shape’s software consultants are top-tier engineers who tackle tough tech challenges in Ember.js, Next.js, Nuxt.js, Tailwind CSS, cloud-native, & more.'
  );
});
