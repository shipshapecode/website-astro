import { test, expect } from '@playwright/test';

test('meta is correct', async ({ page }) => {
  await page.goto('/services/ember-consulting/');

  await expect(page).toHaveTitle(
    'Ember.js Enterprise App Development | Ship Shape'
  );
});
