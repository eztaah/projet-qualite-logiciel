import { test as base } from '@playwright/test';
import { LoginPage } from './page-objects/LoginPage';
import { HomePage } from './page-objects/HomePage';  // Import the HomePage class

const test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  homePage: async ({ page }, use) => {  // Add the homePage fixture
    const homePage = new HomePage(page);
    await use(homePage);
  },
});

export { test };
