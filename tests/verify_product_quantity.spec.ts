import { test } from '../fixtures';

test.describe('Shopping Cart Quantity Verification Test for Multiple Products', () => {
  test('Should verify quantities for two different products in the cart', async ({ homePage }) => {
    // Step 1: Go to Amazon homepage
    await homePage.page.goto('https://www.amazon.fr');

    // Step 2: Reject cookies
    await homePage.rejectCookies();

    // Step 3: Search for the first product
    const firstProductName = "laptop"; // Example first product
    await homePage.searchForProduct(firstProductName);

    // Step 4: Click on the first product in the search results
    await homePage.selectFirstProduct();

    // Step 5: Add the first product to the cart
    await homePage.addToCart();

    // Step 6: Search for a second product
    const secondProductName = "mouse"; // Example second product
    await homePage.searchForProduct(secondProductName);

    // Step 7: Click on the first product in the search results
    await homePage.selectFirstProduct();

    // Step 8: Add the second product to the cart
    await homePage.addToCart();

    // Step 9: Go to the cart page
    await homePage.goToCart();

    // Step 10: Verify the total quantity of products in the cart is 2
    const totalQuantity = await homePage.getTotalCartQuantity();
    await test.expect(totalQuantity).toBe(2); // Check if the cart contains a total quantity of 2
  });
});

