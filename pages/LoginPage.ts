import { Page, Locator } from '@playwright/test';

// Page Object: holds everything about the login page in one place.
// If the page changes, you only fix it here, not in every test.
export class LoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly logoutLink: Locator;

  // app module
  readonly nav_ada: Locator;

  //signatory
  readonly signatory_Nav: Locator;
  readonly signatory_add: Locator;
  readonly signatory_name: Locator;
  readonly signatory_designation: Locator;
  readonly signatory_save: Locator;

  // user
  readonly user_Nav: Locator;
  readonly user_add: Locator;
  readonly user_fname: Locator;
  // readonly user_mname: Locator;
  readonly user_lname: Locator;
  readonly role_reviewer: Locator;
  readonly user_usrname: Locator;
  readonly user_pswrd: Locator;
  readonly user_comfirm_pswrd: Locator;
  readonly user_save: Locator; 

  
  constructor(private readonly page: Page) {
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
    this.logoutLink = page.getByRole('menu').getByRole('link', { name: 'Logout' });

    // app module 
    this.nav_ada = page.getByRole('link', { name: ' Bank Advice' });

    // NAVIGATION

    // signatory
    this.signatory_Nav = page.getByRole('link', { name: ' Signatory' });
    this.signatory_add = page.getByRole('button', { name: ' Add Signatory' })
    this.signatory_name = page.locator('#input1');
    this.signatory_designation = page.locator('#input2');
    this.signatory_save = page.getByRole('button', { name: ' Save' });

    // user
    this.user_Nav = page.getByRole('link', { name: ' User' });
    this.user_add = page.getByRole('button', { name: ' Add User' });
    this.user_fname = page.locator('#addUserModal input[name="first_name"]');
    //page.locator('#addUserModal input[name="middle_name"]');
    this.user_lname = page.locator('#addUserModal input[name="last_name"]');
    //page.getByRole('combobox').selectOption('Drafter');
    //page.getByRole('combobox');
    this.role_reviewer = page.getByRole('combobox');
    this.user_usrname = page.locator('#addUserModal input[name="username"]');
    this.user_pswrd = page.locator('#addUserPassword');
    this.user_comfirm_pswrd = page.locator('#addUserConfirmPassword');
    this.user_save = page.getByRole('button', { name: 'Save' });
  }

  // Opens the login page (relative path, uses baseURL from playwright.config.ts)
  async goto() {
    await this.page.goto('/BANKADVICE/index.php');
  }
  // Fills in the credentials and clicks Sign in.
  // fill() focuses the field itself, so no .click() is needed first.
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  // Signatory  
  
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

  // user 
  async user_input(firstname: string, lastname: string, username: string, password: string, confirmpassword: string) {
    await this.user_fname.fill(firstname);
    await this.user_lname.fill(lastname);
    await this.user_usrname.fill(username);
    await this.user_pswrd.fill(password);
    await this.user_comfirm_pswrd.fill(confirmpassword);
  }

  async navSignatory() {
    await this.user_Nav.click();
  }

  async user_modal() {
    await this.user_add.click();
  }

  async select_role() {
    await this.role_reviewer.selectOption('Reviewer');
  }

  async save_user() {
    await this.user_save.click();
  }

  // Clicks the Logout link in the menu
  async logout() {
    await this.logoutLink.click();
  }

}

  