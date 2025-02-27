import { expect, test } from '@playwright/test';

test.describe('View Products', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page where the products are listed
    await page.goto('http://localhost:5173/admin/products/view-products');
  });

  test('should display loading message when fetching products', async ({ page }) => {
    // Check if loading message is displayed initially
    const loadingMessage = page.locator('text=Loading products...');
    await expect(loadingMessage).toBeVisible();
  });

  test('should display the "Products" text', async ({ page }) => {
    // Check if the "Products" text in the specific div is visible
    const productsText = page.locator('div.text-lg.font-semibold.text-gray-800.mb-3');
    await expect(productsText).toBeVisible();
  });
  
});
