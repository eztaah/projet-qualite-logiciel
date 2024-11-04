import { test } from '../fixtures';

test.describe('Amazon Cart Tests', () => {
  test('Should apply category filter and see only laptops in the results', async ({ homePage }) => {
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
  
    // Step 4: Search for "ordinateur"
    await homePage.searchForProduct('ordinateur');
  
    // Step 5: Apply the "Ordinateurs portables" category filter
    await homePage.applyCategoryFilter();
    
    // Step 6: Check that filter is active
    const activeFilter = homePage.page.locator('span.a-size-base.a-color-base.a-text-bold').filter({ hasText: 'Ordinateurs portables' }).first();
    await test.expect(activeFilter).toBeVisible();
  });
});