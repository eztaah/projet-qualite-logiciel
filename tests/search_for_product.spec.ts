import { test } from '../fixtures';

test.describe('Amazon Search Tests', () => {
  test('Search for a product and verify results are displayed', async ({ homePage }) => {
    // Step 1: Go to Amazon homepage
    await homePage.page.goto('https://www.amazon.fr');

    // Step 2: Refuse cookies
    await homePage.rejectCookies();

    // Step 3: Search for "liquide vaisselle"
    await homePage.searchForProduct('liquide vaisselle');
    await homePage.page.waitForTimeout(2000);

    // Step 4: Verify that a list of products is displayed
    const productList = homePage.page.locator('.s-search-results .s-result-item');
    const productCount = await productList.count();
    
    // Checks that there is at least one product in the list
    await test.expect(productCount).toBeGreaterThan(0);
  });
});
