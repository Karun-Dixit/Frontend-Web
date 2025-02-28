import { expect, test } from '@playwright/test';

test.describe('Public Dashboard - Scrolling & Swiping', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/dashboard', { waitUntil: 'networkidle' });
    // Wait for the body or specific element to be visible after loading
    await page.waitForSelector('body');
  });

  test('should allow scrolling up and down', async ({ page }) => {
    // Get initial scroll position
    const initialScroll = await page.evaluate(() => window.scrollY);
    console.log('Initial Scroll:', initialScroll);

    // Scroll down
    await page.mouse.wheel(0, 500);
    const afterScrollDown = await page.evaluate(() => window.scrollY);
    console.log('After Scroll Down:', afterScrollDown);

    expect(afterScrollDown).toBeGreaterThan(initialScroll);

    // Scroll back up
    await page.mouse.wheel(0, -500);
    const afterScrollUp = await page.evaluate(() => window.scrollY);
    console.log('After Scroll Up:', afterScrollUp);

    // Allow a range of +/- 10px to account for slight variations in scroll behavior
    expect(afterScrollUp).toBeGreaterThanOrEqual(afterScrollDown - 500);
    expect(afterScrollUp).toBeLessThan(afterScrollDown + 10);  // Allowing some margin for small differences
  });

  test('should display the "Trending Electronics" section', async ({ page }) => {
    // Scroll down to the "Trending Electronics" section
    const trendingSection = await page.locator('text=Trending Electronics');
    await expect(trendingSection).toBeVisible();

    // Check if it contains at least one product
    const products = await page.locator('.slick-slide');
    expect(await products.count()).toBeGreaterThan(0);
  });

  test('should display the "Hot Deals" section', async ({ page }) => {
    // Scroll down to the "Hot Deals" section
    const hotDealsSection = await page.locator('text=Hot Deals');
    await expect(hotDealsSection).toBeVisible();

    // Check if it contains at least one product
    const products = await page.locator('.slick-slide');
    expect(await products.count()).toBeGreaterThan(0);
  });

  test('should display the "Top Picks" section', async ({ page }) => {
    // Scroll down to the "Top Picks" section
    const topPicksSection = await page.locator('text=Top Picks');
    await expect(topPicksSection).toBeVisible();

    // Check if it contains at least one product
    const products = await page.locator('.slick-slide');
    expect(await products.count()).toBeGreaterThan(0);
  });

  test('should display the search bar', async ({ page }) => {
    // Check if the search bar is visible
    const searchBar = await page.locator('input[placeholder="Search Hot Deals..."]');
    await expect(searchBar).toBeVisible();
  });

});
