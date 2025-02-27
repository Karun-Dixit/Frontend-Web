import { expect, test } from '@playwright/test';

test.describe('Add Product Form', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the 'Add Product' page
    await page.goto('http://localhost:5173/admin/products/add-products', { waitUntil: 'networkidle' });
  });

  // Test if the "Add Product" form title is visible
  test('should display the Add Product form', async ({ page }) => {
    const title = page.locator('h2.text-2xl.font-semibold.text-gray-700.mb-4');
    await expect(title).toBeVisible();

    // Check if form fields are visible
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('textarea[name="description"]')).toBeVisible();
    await expect(page.locator('input[name="price"]')).toBeVisible();
    await expect(page.locator('input[name="quantity"]')).toBeVisible();
    await expect(page.locator('select[name="status"]')).toBeVisible();
    await expect(page.locator('input[type="file"]')).toBeVisible();
  });

  // Test if "Description" label is visible
  test('should check for "Description" text in the form', async ({ page }) => {
    const descriptionText = page.locator('label:has-text("Description")');
    await expect(descriptionText).toBeVisible();
  });

  // Test for "Select Status" option in the form
  test('should check for "Select Status" text in the form', async ({ page }) => {
    const selectStatusDropdown = page.locator('select[name="status"]');
    await selectStatusDropdown.click();
  
    const selectStatusOption = page.locator('option:has-text("Select Status")');
    await expect(selectStatusOption).toHaveCount(1);
  });

  // Test to check for "Price" and "Quantity" fields
  test('should check for "Price" and "Quantity" fields in the form', async ({ page }) => {
    const priceField = page.locator('input[name="price"]');
    await expect(priceField).toBeVisible();
  
    const quantityField = page.locator('input[name="quantity"]');
    await expect(quantityField).toBeVisible();
  
    await expect(priceField).not.toBeDisabled();
    await expect(quantityField).not.toBeDisabled();
  });

  // Test to check if the "Product Image" label is visible
  test('should check for "Product Image" text in the form', async ({ page }) => {
    const productImageText = page.locator('label:has-text("Product Image")');
    await expect(productImageText).toBeVisible();
  });

  // Test to check if the "Add Product" button is visible
  test('should display the "Add Product" button', async ({ page }) => {
    const addProductButton = page.locator('button:has-text("Add Product")');
    await expect(addProductButton).toBeVisible();
  });

  // Test to ensure that price and quantity fields do not accept non-numeric input
  test('should not allow words in price and quantity fields', async ({ page }) => {
    await page.fill('input[name="price"]', '100');
    await page.fill('input[name="quantity"]', '10');
    await expect(page.locator('input[name="price"]')).toHaveValue('100');
    await expect(page.locator('input[name="quantity"]')).toHaveValue('10');

    await page.evaluate(() => {
      document.querySelector('input[name="price"]').value = 'invalid';
      document.querySelector('input[name="quantity"]').value = 'invalid';
    });

    await expect(page.locator('input[name="price"]')).toHaveValue('');
    await expect(page.locator('input[name="quantity"]')).toHaveValue('');

    await page.fill('input[name="price"]', '100');
    await page.fill('input[name="quantity"]', '10');

    await expect(page.locator('input[name="price"]')).toHaveValue('100');
    await expect(page.locator('input[name="quantity"]')).toHaveValue('10');
  });

  // Test to ensure login happens before accessing the "Add Product" page
  test('should login and access Add Product page', async ({ page }) => {
    // Simulate admin login if required before accessing the 'Add Product' page
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'adminpassword');
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle' });

    // Check if the Add Product page loads correctly
    await expect(page.locator('h2.text-2xl.font-semibold.text-gray-700.mb-4')).toBeVisible();
  });

  // Optional: Clean up session by clearing cookies and local storage
  test.afterEach(async ({ page }) => {
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });
});
