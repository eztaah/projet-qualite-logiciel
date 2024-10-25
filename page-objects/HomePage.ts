import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly firstProduct: Locator;
  readonly addToCartButton: Locator;
  readonly rejectCookiesButton: Locator;
  readonly cartButton: Locator;
  readonly categoryFilter: Locator;
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly allMenuButton: Locator;
  readonly franceOption: Locator;
  readonly countrySelectorButton: Locator;
  readonly usOptionInDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('#twotabsearchtextbox');
    this.searchButton = page.locator('#nav-search-submit-button');
    this.firstProduct = page.locator('.s-search-results .s-result-item').first();
    this.addToCartButton = page.locator('#add-to-cart-button');
    this.rejectCookiesButton = page.locator('#sp-cc-rejectall-link');
    this.cartButton = page.locator('#nav-cart');
    this.categoryFilter = page.locator('span.a-size-base.a-color-base').filter({ hasText: 'Ordinateurs portables' });
    this.productTitle = page.locator('span#productTitle');
    this.productPrice = page.locator('.a-price .a-offscreen').first();
    this.allMenuButton = page.locator('#nav-hamburger-menu'); // Bouton "TOUTES" ou "All"
    this.franceOption = page.locator('a', { hasText: 'France' }); // Option "France" dans le menu
    this.countrySelectorButton = page.locator('span.a-button-text.a-declarative'); // Bouton de sélection de pays
    this.usOptionInDropdown = page.locator('a[data-value*="https://www.amazon.com/?ref_=icp_country_from_fr"]'); // Option pour les États-Unis
  }

  async rejectCookies() {
    if (await this.rejectCookiesButton.isVisible({ timeout: 60000 })) {
      await this.rejectCookiesButton.click();
    }
  }

  async searchForProduct(productName: string) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async applyCategoryFilter() {
    const categoryFilter = this.page.locator('span.a-size-base.a-color-base').filter({ hasText: 'Ordinateurs portables' }).first();
    await categoryFilter.click();
    await this.page.waitForLoadState('load');
  }

  async isCategoryFilterBold() {
    const hasBoldClass = await this.categoryFilter.evaluate((el) => el.classList.contains('a-text-bold'));
    return hasBoldClass;
  }

  async addFirstProductToCart() {
    await this.firstProduct.click();
    await this.page.waitForLoadState('load');
    await this.addToCartButton.waitFor({ state: 'visible', timeout: 60000 });
    await this.addToCartButton.click();
  }

  async viewFirstProductDetails() {
    await this.firstProduct.click();
    await this.page.waitForLoadState('load');
  }

  async getProductTitle() {
    await this.productTitle.waitFor({ state: 'visible', timeout: 60000 });
    return this.productTitle.textContent();
  }

  async getProductPrice() {
    await this.productPrice.waitFor({ state: 'visible', timeout: 60000 });
    return this.productPrice.textContent();
  }

  async goToCart() {
    await this.cartButton.click();
  }

  async openAllMenu() {
    await this.allMenuButton.click();
  }

  async selectFranceOption() {
    await this.franceOption.waitFor({ state: 'visible', timeout: 5000 });
    await this.franceOption.click();
  }

  async openCountrySelector() {
    await this.countrySelectorButton.click();
  }

  async selectCountryUSA() {
    await this.usOptionInDropdown.waitFor({ state: 'visible', timeout: 5000 });
    await this.usOptionInDropdown.click();
    await this.page.waitForLoadState('load');
  }

  async clickAccessWebsiteButton() {
    const accessButton = this.page.locator('input.a-button-input[type="submit"]');
    await accessButton.waitFor({ state: 'visible', timeout: 5000 });
    await accessButton.click();
  }
}
