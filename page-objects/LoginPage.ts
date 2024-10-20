import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly continueButton: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Now we initialize the locators inside the constructor
    this.emailInput = page.locator('#ap_email');
    this.continueButton = page.locator('#continue[type="submit"]');
    this.passwordInput = page.locator('#ap_password');
    this.signInButton = page.locator('#signInSubmit');
  }

  async login(email: string, password: string) {
    // Wait for the email field to be visible
    await this.emailInput.waitFor({ state: 'visible', timeout: 10000 }); // Add a timeout if needed
    await this.emailInput.fill(email);
    
    // Click the continue button
    await this.continueButton.click();

    // Wait for the password field to be visible before filling it
    await this.passwordInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.passwordInput.fill(password);
    
    // Click the sign-in button
    await this.signInButton.click();
  }
}
