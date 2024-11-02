import { test } from '../fixtures';

test.describe('Change Country Test', () => {
  test('Should change the country on Amazon', async ({ homePage, context }) => {
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

    // Step 4: Open "Toutes" menu
    await homePage.openAllMenu();

    // Step 5: Select the menu to change country
    await homePage.selectFranceOption();

    // Step 6: Open the country selector
    await homePage.openCountrySelector();

    // Step 7: Select USA option and wait for navigation
    await homePage.selectCountryUSA();

    // Step 8: Capture the new tab or page after clicking "Accéder au site web" button
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        homePage.clickAccessWebsiteButton()
      ]);
  
    // Step 9: Check that the new page has fully loaded
    await newPage.waitForLoadState('domcontentloaded'); // ou 'load' si nécessaire
  
    // Step 10: Verify that the new page URL is Amazon USA
    await test.expect(newPage.url()).toContain('https://www.amazon.com'); // Vérifie l'URL du nouvel onglet
  });
});
