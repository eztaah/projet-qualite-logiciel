import { test } from '../fixtures';

test.describe('Amazon Cart Tests', () => {
  test('Should apply category filter and see only laptops in the results', async ({ homePage }) => {
    // Step 1: Go to Amazon homepage
    await homePage.page.goto('https://www.amazon.fr');
  
    // Step 2: Refuse cookies
    await homePage.rejectCookies();
  
    // Step 3: Search for "ordinateur"
    await homePage.searchForProduct('ordinateur');
  
    // Step 4: Apply the "Ordinateurs portables" category filter
    await homePage.applyCategoryFilter();
    
    // Step 5: Check that filter is active
    const activeFilter = homePage.page.locator('span.a-size-base.a-color-base.a-text-bold').filter({ hasText: 'Ordinateurs portables' }).first();
    await test.expect(activeFilter).toBeVisible();
  });
});