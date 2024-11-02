import { test } from '../fixtures';

test.describe('Amazon Cart Tests', () => {
  test('Add a product to the cart', async ({ homePage }) => {
    // Step 1: Go to Amazon homepage
    await homePage.page.goto('https://www.amazon.fr');

    // Step 2: Check if it is Alexa page
    const isAlexaPage = await homePage.isAlexaPage();
    if (isAlexaPage) {
      console.log("La page Alexa est apparue, veuillez relancer le test.");
      return;
    }

    // Step 3: Refuse cookies
    await homePage.rejectCookies();

    // Step 4: Search for a product
    await homePage.searchForProduct('éponge');

    // Step 5: Add the first product to the cart
    await homePage.addFirstProductToCart();

    // Step 6: Verify the product is in the cart (using the cart count icon as an example)
    const cartCount = await homePage.page.locator('#nav-cart-count').textContent();
    await test.expect(cartCount).toBe('1');  // Expect one item in the cart
  });
});
