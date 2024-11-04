import { test } from '../fixtures';

test.describe('Amazon Cart Tests', () => {
  test('Add a product to the cart', async ({ homePage }) => {
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

    // Step 6: Verify the product is in the cart (using the cart count icon as an example)
    const cartCount = await homePage.page.locator('#nav-cart-count').textContent();
    await test.expect(cartCount).toBe('1');  // Expect one item in the cart
  });
});
