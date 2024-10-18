import { test } from '../fixtures';

test.describe('Amazon Login Tests', () => {
  test('Successful Login with valid credentials', async ({ loginPage }) => {
    await loginPage.page.goto('https://www.amazon.fr/ap/signin');
    await loginPage.login('user7@gmail.com', 'gsdfadsfasdf');
    // Add assertions to verify login success
    await test.expect(loginPage.page).toHaveURL('https://www.amazon.fr');
  });
});
