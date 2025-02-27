import { expect, test } from '@playwright/test';

test.describe('Public Navbar Links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/PublicNavbar', { waitUntil: 'networkidle' });
  });

  test('should be able to click on Home link', async ({ page }) => {
    await page.waitForSelector('a:has-text("Home")'); // Ensure the Home link is loaded
    const homeLink = page.locator('a:has-text("Home")');
    await expect(homeLink).toBeVisible(); // Check if it's visible
    await homeLink.click(); // Click the link
  });

  test('should be able to click on About link', async ({ page }) => {
    await page.waitForSelector('a:has-text("About")'); // Ensure the About  link is loaded
    const aboutUsLink = page.locator('a:has-text("About")');
    await expect(aboutUsLink).toBeVisible(); // Check if it's visible
    await aboutUsLink.click(); // Click the link
  });

  test('should be able to click on Contact link', async ({ page }) => {
    await page.waitForSelector('a:has-text("Contact")'); // Ensure the Contact link is loaded
    const contactLink = page.locator('a:has-text("Contact")');
    await expect(contactLink).toBeVisible(); // Check if it's visible
    await contactLink.click(); // Click the link
  });
});
