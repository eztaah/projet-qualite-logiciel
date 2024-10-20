import { test as base } from '@playwright/test';
import { LoginPage } from './page-objects/LoginPage';
import { HomePage } from './page-objects/HomePage';
import { CartPage } from './page-objects/CartPage';

const test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
});

export { test };
