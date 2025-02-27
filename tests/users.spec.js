import { expect, test } from '@playwright/test';

test.describe('Users List', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page where the users list is rendered
    await page.goto('http://localhost:5173/admin/users', { waitUntil: 'networkidle' });
  });

  test('should display the Users list', async ({ page }) => {
    // Check if the "Users" title is visible
    const title = page.locator('div.text-lg.font-semibold.text-gray-800.mb-3');
    await expect(title).toBeVisible();

    // Check if the table with users data is visible
    const table = page.locator('table.min-w-full.bg-white.border.border-gray-200.text-sm');
    await expect(table).toBeVisible();
  });

  test('should display the correct user data', async ({ page }) => {
    // Check if the data for the first user is correctly displayed
    const userName = page.locator('td').first();
    await expect(userName).toHaveText(/^[A-Za-z\s]+$/); // Ensure it displays a valid name format

    const userEmail = page.locator('td').nth(1); // Check the second column (email)
    await expect(userEmail).toHaveText(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/); // Valid email format
  });

  test('should display the "Email" text in the table header', async ({ page }) => {
    // Check if the "Email" column header is visible
    const emailHeader = page.locator('th:has-text("Email")');
    await expect(emailHeader).toBeVisible();
  });

  test('should display the "Actions" text in the table header', async ({ page }) => {
    // Check if the "Actions" column header is visible
    const actionsHeader = page.locator('th:has-text("Actions")');
    await expect(actionsHeader).toBeVisible();
  });

  test('should display the "User Name" text in the table header', async ({ page }) => {
    // Check if the "User Name" column header is visible
    const userNameHeader = page.locator('th:has-text("User Name")');
    await expect(userNameHeader).toBeVisible();
  });

});
