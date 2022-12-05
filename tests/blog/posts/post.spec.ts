import { test, expect } from '@playwright/test';

test('post info is correct', async ({ page }) => {
  await page.goto('/blog/an-emberjs-developers-guide-to-nuxtjs/');

  const postTitle = page.locator('[itemprop="headline"]');
  await expect(postTitle).toHaveText(
    "An Ember.js Developer's Guide to Nuxt.js"
  );

  const authorName = page.locator('[itemprop="author"] [itemprop="name"]');
  await expect(authorName).toHaveText('Robbie Wagner');

  const publishedDate = page.locator(
    'time[itemprop="datePublished dateModified"]'
  );
  await expect(publishedDate).toHaveText('03.26.2019');
});

test('meta is correct', async ({ page }) => {
  await page.goto('/blog/an-emberjs-developers-guide-to-nuxtjs/');

  await expect(page).toHaveTitle(
    "An Ember.js Developer's Guide to Nuxt.js | Ship Shape"
  );

  const canonicalLink = page.locator('link[rel="canonical"]');
  await expect(canonicalLink).toHaveAttribute(
    'href',
    'https://shipshape.io/blog/an-emberjs-developers-guide-to-nuxtjs/'
  );

  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute(
    'content',
    'I am a huge Ember.js fan, but recently wanted to experiment with some other\n' +
      'frameworks, and decided to try Nuxt.js. I was very\n' +
      'pleasantly surprised, that Nuxt had many nice "magic" things, just like Ember\n' +
      'had, and felt very familiar to Ember development...'
  );

  const keywords = page.locator('meta[name="twitter:data2"]');
  await expect(keywords).toHaveAttribute(
    'content',
    'ember.js, nuxt.js, vue.js'
  );
});
