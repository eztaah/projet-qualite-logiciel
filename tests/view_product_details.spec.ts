import { test } from '../fixtures';

test.describe('Amazon Product Details Tests', () => {
  test('View product details after searching for a laptop', async ({ homePage }) => {
    // Step 1: Go to Amazon homepage
    await homePage.page.goto('https://www.amazon.fr');

    // Step 2: Refuse cookies
    await homePage.rejectCookies();

    // Step 3: Search for "liquide vaisselle"
    await homePage.searchForProduct('liquide vaisselle');

    // Step 4: Click on the first product to view its details
    await homePage.viewFirstProductDetails();

    // Step 5: Verify that the product title and price are visible
    const productTitle = await homePage.getProductTitle();
    const productPrice = await homePage.getProductPrice();

    // Ensure that the product title and price are not null or empty
    await test.expect(productTitle).not.toBeNull();
    await test.expect(productTitle?.trim().length).toBeGreaterThan(0);

    await test.expect(productPrice).not.toBeNull();
    await test.expect(productPrice?.trim().length).toBeGreaterThan(0);
  });
});
