import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly firstProduct: Locator;
  readonly addToCartButton: Locator;
  readonly rejectCookiesButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('#twotabsearchtextbox');
    this.searchButton = page.locator('#nav-search-submit-button');
    this.firstProduct = page.locator('.s-search-results .s-result-item').first();
    this.addToCartButton = page.locator('#add-to-cart-button');
    this.rejectCookiesButton = page.locator('#sp-cc-rejectall-link');  // Use the button's ID
  }

  async rejectCookies() {
    // Check if the cookies button is visible and reject cookies if possible
    if (await this.rejectCookiesButton.isVisible({ timeout: 5000 })) {
      await this.rejectCookiesButton.click();  // Click the "Refuser" button
    }
  }

  async searchForProduct(productName: string) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async addFirstProductToCart() {
    await this.firstProduct.click();  // Click on the first product
    await this.page.waitForLoadState('load');  // Ensure the page has fully loaded
    await this.addToCartButton.waitFor({ state: 'visible', timeout: 10000 });  // Wait for 'Add to Cart' button
    await this.addToCartButton.click();  // Add to cart
  }
}
