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
  // Attendre que le champ email soit visible
  await this.emailInput.waitFor({ state: 'visible', timeout: 10000 }); // Ajoutez un timeout si besoin
  await this.emailInput.fill(email);
  
  // Cliquez sur le bouton continue
  await this.continueButton.click();

  // Attendre que le champ password soit visible avant de remplir
  await this.passwordInput.waitFor({ state: 'visible', timeout: 10000 });
  await this.passwordInput.fill(password);
  
  // Cliquez sur le bouton de connexion
  await this.signInButton.click();
}

}
