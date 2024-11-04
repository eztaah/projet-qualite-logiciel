import { test } from '../fixtures';

test.describe('Shopping Cart Quantity Verification Test for Multiple Products', () => {
  test('Should verify quantities for two different products in the cart', async ({ homePage }) => {
    // Step 1: Go to Amazon homepage
    await homePage.page.goto('https://www.amazon.fr');

    // Step 2: Check if it is Alexa page or Captcha page
    if (await homePage.isAlexaPage()) {
      console.error("Erreur : la page Alexa est apparue, veuillez relancer le test.");
      throw new Error("Page Alexa détectée - Test interrompu");
    }
    if (await homePage.isCaptchaPage()) {
      console.error("Erreur : un CAPTCHA est apparu, veuillez relancer le test.");
      throw new Error("CAPTCHA détecté - Test interrompu");
    }

    // Step 3: Refuse cookies
    await homePage.rejectCookies();

    // Step 4: Search for a product
    await homePage.searchForProduct('éponge');

    // Step 5: Add the first product to the cart
    await homePage.addFirstProductToCart();

    // Step 6: Search for another product
    await homePage.searchForProduct('liquide vaiselle');

    // Step 7: Add the first product to the cart
    await homePage.addFirstProductToCart();

    // Step 8: Verify the total quantity of products in the cart is 2
    const cartCount = await homePage.page.locator('#nav-cart-count').textContent();
    await test.expect(cartCount).toBe('2');  // Expect one item in the cart
  });
});
