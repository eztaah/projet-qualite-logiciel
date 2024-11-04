import { test } from '../fixtures';

test.describe('Amazon Search Tests', () => {
  test('Search for a product and verify results are displayed', async ({ homePage }) => {
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
    await homePage.page.waitForTimeout(2000);

    // Step 5: Verify that a list of products is displayed
    const productList = homePage.page.locator('.s-search-results .s-result-item');
    const productCount = await productList.count();
    
    // Checks that there is at least one product in the list
    await test.expect(productCount).toBeGreaterThan(0);
  });
});
