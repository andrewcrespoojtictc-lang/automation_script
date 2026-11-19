import { Page, Locator } from '@playwright/test';

// Page Object: holds everything about the login page in one place.
// If the page changes, you only fix it here, not in every test.
export class LoginPage {
  // Locators for the elements we interact with
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly nav_ada: Locator;
  readonly logoutLink: Locator;

  //signatory
  readonly signatoryNav: Locator;
  readonly signatory_add: Locator;
  readonly signatory_name: Locator;
  readonly signatory_designation: Locator;
  readonly signatory_save: Locator;

  // The constructor receives Playwright's `page` and sets up the locators
  constructor(private readonly page: Page) {
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
    // Logout link lives inside the menu
    this.nav_ada = page.getByRole('link', { name: ' Bank Advice' });
    this.logoutLink = page.getByRole('menu').getByRole('link', { name: 'Logout' });
    
    // signatory
    this.signatoryNav = page.getByRole('link', { name: ' Signatory' });
    this.signatory_add = page.getByRole('button', { name: ' Add Signatory' })
    this.signatory_name = page.locator('#input1');
    this.signatory_designation = page.locator('#input2');
    this.signatory_save = page.getByRole('button', { name: ' Save' });
    
  }

  // Opens the login page (relative path, uses baseURL from playwright.config.ts)
  async goto() {
    await this.page.goto('/BANKADVICE/index.php');
  }

  async goToHome() {
    await this.page.goto('/BANKADVICE/home.php');
  }

  // Fills in the credentials and clicks Sign in.
  // fill() focuses the field itself, so no .click() is needed first.
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  // signatory
  
  async click_ada() {
    await this.nav_ada.click();
  }

  async goToSignatory() {
    await this.signatoryNav.click();
  }

  async signatory_modal() {
    await this.signatory_add.click();
  }



  async add_designation(name: string, designation: string) {
    await this.signatory_name.fill(name);
    await this.signatory_designation.fill(designation);
    await this.signatory_save.click();
  }

  // Clicks the Logout link in the menu
  async logout() {
    await this.logoutLink.click();
  }

}

  