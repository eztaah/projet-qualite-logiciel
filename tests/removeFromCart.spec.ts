import { test } from '../fixtures';  // Import the fixture that includes homePage

test.describe('Amazon Cart Tests', () => {
  test('Remove a product from the cart', async ({ homePage }) => {
    // Step 1: Go to Amazon homepage
    await homePage.page.goto('https://www.amazon.fr');

    // Step 2: Refuse cookies
    await homePage.rejectCookies();

    // Step 3: Search for "laptop"
    await homePage.searchForProduct('éponge');

    // Step 4: Add the first product to the cart
    await homePage.addFirstProductToCart();

    // Step 5: Wait for 2 seconds before proceeding
    await homePage.page.waitForTimeout(2000);  // Wait for 2 seconds

    // Step 6: Go to the cart
    await homePage.goToCart();

    await homePage.page.waitForTimeout(2000);  // Wait for 2 seconds

    // Step 7: Remove the product from the cart
    await homePage.removeProductFromCart();

    // Step 8: Wait for 2 seconds before verifying the cart
    await homePage.page.waitForTimeout(2000);  // Wait for 2 seconds

    // Step 9: Verify the cart is empty (checking if cart count is "0")
    const cartCount = await homePage.page.locator('#nav-cart-count').textContent();
    await test.expect(cartCount).toBe('0');  // Expect zero items in the cart
  });
});
