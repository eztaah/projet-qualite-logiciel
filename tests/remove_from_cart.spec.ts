import { test } from '../fixtures';

test.describe('Amazon Cart Tests', () => {
  test('Remove a product from the cart', async ({ homePage, cartPage }) => {
    // Step 1: Go to Amazon homepage
    await homePage.page.goto('https://www.amazon.fr');

    // Step 2: Refuse cookies
    await homePage.rejectCookies();

    // Step 3: Search for "éponge"
    await homePage.searchForProduct('éponge');

    // Step 4: Add the first product to the cart
    await homePage.addFirstProductToCart();
    await homePage.page.waitForTimeout(2000);

    // Step 5: Go to the cart
    await homePage.goToCart();

    // Step 6: Remove the product from the cart
    await cartPage.removeProductFromCart();
    await homePage.page.waitForTimeout(3000);

    await homePage.page.reload();

    // Step 7: Verify the cart is empty (checking if cart count is "0")
    const cartCount = await homePage.page.locator('#nav-cart-count').textContent();
    await test.expect(cartCount).toBe('0');  // Expect zero items in the cart
  });
});
