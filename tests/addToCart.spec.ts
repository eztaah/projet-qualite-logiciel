import { test } from '../fixtures';  // Import the fixture that includes homePage

test.describe('Amazon Cart Tests', () => {
  test('Add a product to the cart', async ({ homePage }) => {
    // Step 1: Go to Amazon homepage
    await homePage.page.goto('https://www.amazon.fr');

    // Step 2: Refuse cookies
    await homePage.rejectCookies();

    // Step 3: Search for "laptop"
    await homePage.searchForProduct('éponge');

    // Step 4: Add the first product to the cart
    await homePage.addFirstProductToCart();

    // Step 5: Wait for 2 seconds before checking the cart
    await homePage.page.waitForTimeout(2000);  // Wait for 2 seconds

    // Step 6: Verify the product is in the cart (using the cart count icon as an example)
    const cartCount = await homePage.page.locator('#nav-cart-count').textContent();
    await test.expect(cartCount).toBe('1');  // Expect one item in the cart
  });
});
