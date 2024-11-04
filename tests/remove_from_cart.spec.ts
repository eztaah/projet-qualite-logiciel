import { test } from '../fixtures';

test.describe('Amazon Cart Tests', () => {
  test('Remove a product from the cart', async ({ homePage, cartPage }) => {
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
    await homePage.searchForProduct('assiette');

    // Step 5: Add the first product to the cart
    await homePage.addFirstProductToCart();
    await homePage.page.waitForTimeout(2000);

    // Step 6: Go to the cart
    await homePage.goToCart();

    // Step 7: Remove the product from the cart
    await cartPage.removeProductFromCart();
    await homePage.page.waitForTimeout(3000);

    await homePage.page.reload();

    // Step 8: Verify the cart is empty (checking if cart count is "0")
    const cartCount = await homePage.page.locator('#nav-cart-count').textContent();
    await test.expect(cartCount).toBe('0');  // Expect zero items in the cart
  });
});
