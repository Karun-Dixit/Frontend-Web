import { expect, test } from '@playwright/test';

test.describe('Admin Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/admin/dashboard', { waitUntil: 'networkidle' });
  });

  test('should check if "Users" text is available', async ({ page }) => {
    // Target the heading element with text "Users"
    const totalUsersText = page.locator('h3:text("Users")'); // Locator for the "Users" heading
    await expect(totalUsersText).toBeVisible(); // Ensure the heading is visible
  });

  test('should check if "Products" text is available', async ({ page }) => {
    // Target the heading element with text "Products"
    const totalProductsText = page.locator('h3:text("Products")'); // Locator for the "Products" heading
    await expect(totalProductsText).toBeVisible(); // Ensure the heading is visible
  });
});
