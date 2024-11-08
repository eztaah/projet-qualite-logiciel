import { test } from '../fixtures';

test.describe('Amazon Product Details Tests', () => {
  test('View product details after searching for a laptop', async ({ homePage }) => {
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

    // Step 5: Click on the first product to view its details
    await homePage.viewFirstProductDetails();

    // Step 6: Verify that the product title and price are visible
    const productTitle = await homePage.getProductTitle();
    const productPrice = await homePage.getProductPrice();

    // Ensure that the product title and price are not null or empty
    await test.expect(productTitle).not.toBeNull();
    await test.expect(productTitle?.trim().length).toBeGreaterThan(0);

    await test.expect(productPrice).not.toBeNull();
    await test.expect(productPrice?.trim().length).toBeGreaterThan(0);
  });
});
