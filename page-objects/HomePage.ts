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
    this.firstProduct = page.locator('.s-search-results .s-result-item:has(img[data-image-latency="s-product-image"])').first();
    this.addToCartButton = page.locator('#add-to-cart-button');
    this.rejectCookiesButton = page.locator('#sp-cc-rejectall-link');
    this.cartButton = page.locator('#nav-cart');
    this.categoryFilter = page.locator('span.a-size-base.a-color-base').filter({ hasText: 'Ordinateurs portables' });
    this.productTitle = page.locator('span#productTitle');
    this.productPrice = page.locator('.a-price .a-offscreen').first();
    this.allMenuButton = page.locator('#nav-hamburger-menu');
    this.franceOption = page.locator('a.hmenu-item[href="/customer-preferences/country/?ref_=nav_em_locale_0_1_1_43"]').first();
    this.countrySelectorButton = page.locator('span.a-button-text.a-declarative');
    this.usOptionInDropdown = page.locator('a[data-value*="https://www.amazon.com/?ref_=icp_country_from_fr"]');
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
    await this.franceOption.waitFor({ state: 'visible', timeout: 30000 });
    await this.franceOption.click();
  }

  async openCountrySelector() {
    await this.countrySelectorButton.click();
  }

  async selectCountryUSA() {
    await this.usOptionInDropdown.waitFor({ state: 'visible', timeout: 30000 });
    await this.usOptionInDropdown.click();
    await this.page.waitForLoadState('load');
  }

  async clickAccessWebsiteButton() {
    const accessButton = this.page.locator('input.a-button-input[type="submit"]');
    await accessButton.waitFor({ state: 'visible', timeout: 15000 });
    await accessButton.click();
  }

  async selectFirstProduct() {
    await this.firstProduct.click();
  }

  async clickBuyNow() {
    const buyNowButton = this.page.locator('input#buy-now-button');
    await buyNowButton.waitFor({ state: 'visible', timeout: 20000 });
    await buyNowButton.click();
  }

  async getCartQuantity() {
    const quantitySelector = this.page.locator('input[name="quantityBox"]');
    return await quantitySelector.inputValue();
  }

  async getTotalCartQuantity() {
    const quantities = await this.page.locator('.sc-list-item-quantity-input').allTextContents();
    const totalQuantity = quantities.reduce((sum, qty) => sum + parseInt(qty, 10), 0);
    return totalQuantity;
  }

  async isAlexaPage(): Promise<boolean> {
    const alexaImage = this.page.locator('img[src="https://m.media-amazon.com/images/I/61vGSkT3vfL._SX3000_.jpg"]');
    return await alexaImage.isVisible({ timeout: 15000 });
  }

  async isCaptchaPage(): Promise<boolean> {
    const captchaImage = this.page.locator('img[src*="captcha"]');
    return await captchaImage.isVisible({ timeout: 15000 });
  }

  async handleCaptchaIfPresent() {
    const captchaImage = this.page.locator('img[src*="captcha"]');
    if (await captchaImage.isVisible({ timeout: 15000 })) {
      console.warn("CAPTCHA detected. Pausing test for manual intervention.");
      await this.page.pause(); // Pause the test to allow manual CAPTCHA solving

      // Optionally, wait until the CAPTCHA disappears before continuing
      await captchaImage.waitFor({ state: 'hidden', timeout: 300000 }); // Up to 5 minutes max wait
      console.log("CAPTCHA solved, resuming test.");
    }
  }
}
