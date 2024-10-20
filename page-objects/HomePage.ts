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

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('#twotabsearchtextbox');
    this.searchButton = page.locator('#nav-search-submit-button');
    this.firstProduct = page.locator('.s-search-results .s-result-item').first();
    this.addToCartButton = page.locator('#add-to-cart-button');
    this.rejectCookiesButton = page.locator('#sp-cc-rejectall-link');
    this.cartButton = page.locator('#nav-cart');
    this.categoryFilter = page.locator('span.a-size-base.a-color-base').filter({ hasText: 'Ordinateurs portables' });
  }

  async rejectCookies() {
    if (await this.rejectCookiesButton.isVisible({ timeout: 5000 })) {
      await this.rejectCookiesButton.click();
    }
  }

  async searchForProduct(productName: string) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async applyCategoryFilter() {
    // Sélectionner précisément l'élément qui a le texte exact "Ordinateurs portables"
    const categoryFilter = this.page.locator('span.a-size-base.a-color-base').filter({ hasText: 'Ordinateurs portables' }).first();
    
    await categoryFilter.click();
    // Attendre que la page se recharge après l'application du filtre
    await this.page.waitForLoadState('load');
  }

  // Nouvelle méthode pour vérifier si l'élément a la classe "a-text-bold"
  async isCategoryFilterBold() {
    const hasBoldClass = await this.categoryFilter.evaluate((el) => el.classList.contains('a-text-bold'));
    return hasBoldClass;
  }

  async addFirstProductToCart() {
    await this.firstProduct.click();
    await this.page.waitForLoadState('load');
    await this.addToCartButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.addToCartButton.click();
  }

  async goToCart() {
    await this.cartButton.click();
  }
}
