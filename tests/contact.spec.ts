import { test, expect } from '@playwright/test';

test('meta is correct', async ({ page }) => {
  await page.goto('/contact/');

  await expect(page).toHaveTitle(
    'Contact Our Software Consultants | Ship Shape'
  );

  const canonicalLink = page.locator('link[rel="canonical"]');
  await expect(canonicalLink).toHaveAttribute(
    'href',
    'https://shipshape.io/contact/'
  );

  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute(
    'content',
    "Want to improve your products and people? Contact Ship Shape's software consultants to chat about custom app development, optimization, and training."
  );
});

test.describe('contact form validations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact/');
  });

  test('name', async ({ page }) => {
    const nameError = page.locator('.error-message');

    await expect(nameError).toBeHidden();

    const nameInput = page.locator('.contact-form input[id="name"]');
    await nameInput.focus();
    await nameInput.evaluate((e) => e.blur());

    await expect(nameError).toBeVisible();
    await expect(nameError).toContainText('fill out this field', {
      ignoreCase: true
    });

    await nameInput.fill('Boba Fett');
    await nameInput.evaluate((e) => e.blur());

    await expect(nameError).toBeHidden();
  });

  test('email', async ({ page, browser }) => {
    const emailError = page.locator('.error-message');

    await expect(emailError).toBeHidden();

    const emailInput = page.locator('.contact-form input[id="email"]');
    await emailInput.focus();
    await emailInput.evaluate((e) => e.blur());

    await expect(emailError).toBeVisible();
    await expect(emailError).toContainText('fill out this field', {
      ignoreCase: true
    });

    await emailInput.fill('Boba');
    await emailInput.evaluate((e) => e.blur());

    const browserType = browser.browserType().name();

    if (browserType === 'chromium') {
      await expect(emailError).toContainText(
        "Please include an '@' in the email address. 'Boba' is missing an '@'."
      );
    } else if (browserType === 'firefox') {
      await expect(emailError).toContainText('Please enter an email address.');
    } else if (browserType === 'webkit') {
      await expect(emailError).toContainText('Enter an email address');
    }

    await emailInput.fill('boba@fett.com');

    await expect(emailError).toBeHidden();
  });

  test('submit failure', async ({ page }) => {
    await page.route('/', (route) => route.abort('failed'));

    const emailInput = page.locator('.contact-form input[id="email"]');
    const nameInput = page.locator('.contact-form input[id="name"]');
    const textInput = page.locator('.contact-form textarea');

    await emailInput.fill('boba@fett.com');
    await nameInput.fill('Boba');
    await textInput.fill('I have come for Han Solo.');

    const submitBtn = page.locator('.contact-form input[type="submit"]');
    await submitBtn.click();
    const failureToast = await page.getByText(
      'Something went wrong :(. Please refresh and try again.'
    );
    await expect(failureToast).toBeVisible();
  });

  test('submit successfully', async ({ page }) => {
    await page.route('/', (route) =>
      route.fulfill({
        status: 200,
        body: 'accept'
      })
    );

    const emailInput = page.locator('.contact-form input[id="email"]');
    const nameInput = page.locator('.contact-form input[id="name"]');
    const textInput = page.locator('.contact-form textarea');

    await emailInput.fill('boba@fett.com');
    await nameInput.fill('Boba');
    await textInput.fill('I have come for Han Solo.');

    const submitBtn = page.locator('.contact-form input[type="submit"]');
    await submitBtn.click();
    const successToast = await page.getByText(
      "Thanks for contacting us! We'll be in touch shortly."
    );
    await expect(successToast).toBeVisible();
  });
});
