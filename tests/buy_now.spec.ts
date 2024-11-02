import { test } from '../fixtures';

test.describe('Product Search and Purchase Test', () => {
  test('Should search for a product and attempt to purchase', async ({ homePage }) => {
    // Step 1: Go to Amazon homepage
    await homePage.page.goto('https://www.amazon.fr');

    // Step 2: Check if it is Alexa page
    const isAlexaPage = await homePage.isAlexaPage();
    if (isAlexaPage) {
      console.log("La page Alexa est apparue, veuillez relancer le test.");
      return;
    }

    // Step 3: Reject cookies
    await homePage.rejectCookies();

    // Step 4: Search for a product
    const productName = "laptop"; // Example product
    await homePage.searchForProduct(productName);

    // Step 5: Click on the first product in the search results
    await homePage.selectFirstProduct();

    // Step 6: Click on "Buy Now" button to proceed to purchase
    await homePage.clickBuyNow();

    // Step 7: Verify that the user is redirected to the login page
    await test.expect(homePage.page.url()).toContain('/ap/signin'); // Check if URL contains the login path
  });
});
