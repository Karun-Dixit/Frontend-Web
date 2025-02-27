import { expect, test } from '@playwright/test';

test.describe('Public Dashboard - Scrolling & Swiping', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/dashboard', { waitUntil: 'networkidle' });
    // Wait for a specific element to be visible or add a timeout
    await page.waitForSelector('body'); // You can change this to a more specific selector if needed
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
  
});
