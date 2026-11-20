import { Page, Locator } from '@playwright/test';

// Page Object: holds the locators and actions for the app in one place.
// If the page changes, you only fix it here, not in every test.
export class LoginPage {
  // login
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly logoutLink: Locator;

  // app module
  readonly nav_ada: Locator;

  // signatory
  readonly signatory_Nav: Locator;
  readonly signatory_add: Locator;
  readonly signatory_name: Locator;
  readonly signatory_designation: Locator;
  readonly signatory_save: Locator;

  // user
  readonly userNav: Locator;
  readonly userAddButton: Locator;
  readonly userModal: Locator;
  readonly userFirstName: Locator;
  readonly userLastName: Locator;
  readonly userRole: Locator;
  readonly userUsername: Locator;
  readonly userPassword: Locator;
  readonly userConfirmPassword: Locator;
  readonly userSave: Locator;

  constructor(private readonly page: Page) {
    // login
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
    this.logoutLink = page.getByRole('menu').getByRole('link', { name: 'Logout' });

    // app module
    this.nav_ada = page.getByRole('link', { name: ' Bank Advice' });

    // signatory
    this.signatory_Nav = page.getByRole('link', { name: ' Signatory' });
    this.signatory_add = page.getByRole('button', { name: ' Add Signatory' });
    this.signatory_name = page.locator('#input1');
    this.signatory_designation = page.locator('#input2');
    this.signatory_save = page.getByRole('button', { name: ' Save' });

    // user
    this.userNav = page.getByRole('link', { name: ' User' });
    this.userAddButton = page.getByRole('button', { name: ' Add User' });
    this.userModal = page.locator('#addUserModal');
    this.userFirstName = this.userModal.locator('input[name="first_name"]');
    this.userLastName = this.userModal.locator('input[name="last_name"]');
    this.userRole = this.userModal.locator('select');
    this.userUsername = this.userModal.locator('input[name="username"]');
    this.userPassword = page.locator('#addUserPassword');
    this.userConfirmPassword = page.locator('#addUserConfirmPassword');
    this.userSave = this.userModal.getByRole('button', { name: 'Save' });
  }

  // Opens the login page (relative path, uses baseURL from playwright.config.ts)
  async goto() {
    await this.page.goto('/BANKADVICE/index.php');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  // ---------- Signatory ----------

  async click_ada() {
    await this.nav_ada.click();
  }

  async goToSignatory() {
    await this.signatory_Nav.click();
  }

  async signatory_modal() {
    await this.signatory_add.click();
  }

  async add_designation(name: string, designation: string) {
    await this.signatory_name.fill(name);
    await this.signatory_designation.fill(designation);
    await this.signatory_save.click();
  }

  // ---------- User ----------

  async goToUsers() {
    await this.userNav.click();
  }

  async openAddUser() {
    await this.userAddButton.click();
  }

  async fillUserInfo(firstName: string, lastName: string) {
    await this.userFirstName.fill(firstName);
    await this.userLastName.fill(lastName);
  }

  // selectOption focuses the dropdown itself, so no .click() is needed
  async selectRole(role: string) {
    await this.userRole.selectOption(role);
  }

  async fillUserAccount(username: string, password: string, confirmPassword: string) {
    await this.userUsername.fill(username);
    await this.userPassword.fill(password);
    await this.userConfirmPassword.fill(confirmPassword);
  }

  async saveUser() {
    await this.userSave.click();
  }

  // Finds a user in the list by username (assert on it in the test)
  userInList(username: string): Locator {
    return this.page.getByText(username);
  }

  // Clicks the Logout link in the menu
  async logout() {
    await this.logoutLink.click();
  }
}