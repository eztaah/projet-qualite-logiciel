import { test } from '../fixtures';

test.describe.skip('Amazon Login Tests', () => {
  test('Successful Login with valid credentials', async ({ loginPage }) => {
    await loginPage.page.goto('https://www.amazon.com/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com%2Flog%2Fs%3Fk%3Dlog%2Bin%26ref_%3Dnav_custrec_signin&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=usflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0');
    await loginPage.login('user7@gmail.com', 'gsdfadsfasdf');
    // Add assertions to verify login success
    await test.expect(loginPage.page).toHaveURL('https://www.amazon.fr');
  });
});