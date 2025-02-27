import { expect, test } from '@playwright/test';

test.describe('Login Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle' }); // Replace with the actual login URL
  });

  test('should display validation errors for empty fields', async ({ page }) => {
    await page.waitForSelector('button[type="submit"]', { timeout: 5000 });
    await page.click('button[type="submit"]');

    // Check if required fields have the 'required' attribute
    await expect(page.locator('input[name="email"]')).toHaveAttribute('required', '');
    await expect(page.locator('input[name="password"]')).toHaveAttribute('required', '');
  });

  test('should successfully fill out the form and submit', async ({ page }) => {
    await page.fill('input[name="email"]', 'johndoe@example.com');
    await page.fill('input[name="password"]', 'SecurePass123');

    await page.waitForSelector('button[type="submit"]', { timeout: 5000 });
    await page.click('button[type="submit"]');

    await page.waitForTimeout(1000);
    // Verify that the user is redirected to the dashboard after login
    await expect(page).not.toHaveURL('http://localhost:5173/login'); // Replace with your login URL
    await expect(page).toHaveURL('http://localhost:5173/dashboard'); // Replace with your dashboard URL
  });

  test('should show an error message for invalid email', async ({ page }) => {
    await page.fill('input[name="email"]', 'invalid-email');
    await page.fill('input[name="password"]', 'SecurePass123');

    await page.waitForSelector('button[type="submit"]', { timeout: 5000 });
    await page.click('button[type="submit"]');

    // Verify that the email input field contains the invalid email value
    await expect(page.locator('input[name="email"]')).toHaveValue('invalid-email');
  });

  test('should fail to submit when password is empty', async ({ page }) => {
    await page.fill('input[name="email"]', 'johndoe@example.com');

    await page.waitForSelector('button[type="submit"]', { timeout: 5000 });
    await page.click('button[type="submit"]');

    // Verify that the password field is still empty
    await expect(page.locator('input[name="password"]')).toHaveValue('');

    // Check if the password field has the 'required' attribute
    await expect(page.locator('input[name="password"]')).toHaveAttribute('required', '');
  });
});
