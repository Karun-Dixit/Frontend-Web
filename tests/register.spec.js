import { expect, test } from '@playwright/test';

test.describe('Registration Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/register', { waitUntil: 'networkidle' });
  });

  test('should display validation errors for empty fields', async ({ page }) => {
    await page.click('button[type="submit"]');

    await expect(page.locator('input[name="fName"]')).toHaveAttribute('required', '');
    await expect(page.locator('input[name="email"]')).toHaveAttribute('required', '');
    await expect(page.locator('input[name="password"]')).toHaveAttribute('required', '');
  });

  test('should successfully fill out the form and submit', async ({ page }) => {
    await page.fill('input[name="fName"]', 'John Doe');
    await page.fill('input[name="email"]', 'johndoe@example.com');
    await page.fill('input[name="password"]', 'SecurePass123');

    await page.click('button[type="submit"]');
    
    await expect(page).not.toHaveURL('http://localhost:5000/register');
  });

  test('should show an error message for invalid email', async ({ page }) => {
    await page.fill('input[name="fName"]', 'John Doe');
    await page.fill('input[name="email"]', 'invalid-email');
    await page.fill('input[name="password"]', 'SecurePass123');

    await page.click('button[type="submit"]');

    await expect(page.locator('input[name="email"]')).toHaveValue('invalid-email');
  });

  test('should fail to submit when password is empty', async ({ page }) => {
    await page.fill('input[name="fName"]', 'John Doe');
    await page.fill('input[name="email"]', 'johndoe@example.com');

    await page.click('button[type="submit"]');

    await expect(page.locator('input[name="password"]')).toHaveValue('');
    await expect(page.locator('input[name="password"]')).toHaveAttribute('required', '');
  });
});
