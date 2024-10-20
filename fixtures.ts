import { test as base } from '@playwright/test';
import { LoginPage } from './page-objects/LoginPage';

const test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});

export { test };
