import { Page, Locator } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly deleteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.deleteButton = page.locator('input[value="Supprimer"]');
  }

  async removeProductFromCart() {
    await this.deleteButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.deleteButton.click();
  }
}
