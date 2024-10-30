import { test } from '../fixtures';

test.describe('Shopping Cart Quantity Verification Test for Multiple Products', () => {
  test('Should verify quantities for two different products in the cart', async ({ homePage }) => {
    // Step 1: Go to Amazon homepage
    await homePage.page.goto('https://www.amazon.fr');

    // Step 2: Refuse cookies
    await homePage.rejectCookies();

    // Step 3: Search for a product
    await homePage.searchForProduct('éponge');

    // Step 4: Add the first product to the cart
    await homePage.addFirstProductToCart();

    // Step 5: Search for another product
    await homePage.searchForProduct('liquide vaiselle');

    // Step 6: Add the first product to the cart
    await homePage.addFirstProductToCart();

    // Step 7: Verify the total quantity of products in the cart is 2
    const cartCount = await homePage.page.locator('#nav-cart-count').textContent();
    await test.expect(cartCount).toBe('2');  // Expect one item in the cart
  });
});
