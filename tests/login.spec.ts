import { test } from '../fixtures';

test.describe('Amazon Login Tests', () => {
  test('Successful Login with valid credentials', async ({ loginPage }) => {
    // Step 1: Go to the Amazon login page
    await loginPage.page.goto('https://www.amazon.com/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com%2Flog%2Fs%3Fk%3Dlog%2Bin%26ref_%3Dnav_custrec_signin&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=usflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0');
    
    // Step 2: Enter credentials (email and password)
    await loginPage.login('user@gmail.com', 'mypassword');

    // Step 3: Verify that the CAPTCHA page is displayed by checking the URL
    await test.expect(loginPage.page).toHaveURL(/.*amazon.com\/ap\/cvf\/request.*/);
  });
});