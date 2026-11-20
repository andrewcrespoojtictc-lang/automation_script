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

  // sidebar navigation
  readonly nav_transaction: Locator;
  readonly signatory_Nav: Locator;
  readonly userNav: Locator;

  // ADA transaction
  readonly adaTransaction: Locator;
  readonly bankAdviceModal: Locator;
  readonly adaBank: Locator;
  readonly adaFund: Locator;
  readonly adaBankNo: Locator;
  readonly adaCheck: Locator;
  readonly adaOBR: Locator;
  readonly adaPayee: Locator;
  readonly adaParticulars: Locator;
  readonly adaTax1: Locator;
  readonly adaAmount: Locator;
  readonly adaVoucherNo: Locator;
  readonly adaCheckDate: Locator;
  readonly adaSave: Locator;

  // signatory
  readonly signatory_add: Locator;
  readonly signatory_name: Locator;
  readonly signatory_designation: Locator;
  readonly signatory_save: Locator;

  // user
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

    // sidebar navigation
    this.nav_transaction = page.getByRole('link', { name: ' Bank Advice' });
    this.signatory_Nav = page.getByRole('link', { name: ' Signatory' });
    this.userNav = page.getByRole('link', { name: ' User' });

    // ada transaction (the modal is assigned first, the fields use it)
    this.adaTransaction = page.getByRole('button', { name: ' New Transaction' });
    this.bankAdviceModal = page.locator('#bankAdviceModal');
    this.adaBank = this.bankAdviceModal.locator('#input1'); // option
    this.adaFund = this.bankAdviceModal.locator('#input2'); // option
    this.adaBankNo = this.bankAdviceModal.locator('#input3'); // option
    this.adaCheck = this.bankAdviceModal.locator('#input4'); // fill
    this.adaOBR = this.bankAdviceModal.locator('#input5'); // fill
    this.adaPayee = this.bankAdviceModal.locator('#input6'); // fill
    this.adaParticulars = this.bankAdviceModal.locator('#input7'); // fill
    this.adaTax1 = this.bankAdviceModal.getByRole('textbox', { name: '1%', exact: true }); // fill
    this.adaAmount = this.bankAdviceModal.locator('#input8'); // fill
    this.adaVoucherNo = this.bankAdviceModal.locator('#input14'); // fill
    this.adaCheckDate = this.bankAdviceModal.locator('#input15'); // fill
    this.adaSave = this.bankAdviceModal.getByRole('button', { name: ' Save' });

    // signatory
    this.signatory_add = page.getByRole('button', { name: ' Add Signatory' });
    this.signatory_name = page.locator('#input1');
    this.signatory_designation = page.locator('#input2');
    this.signatory_save = page.getByRole('button', { name: ' Save' });

    // user
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

  // home page
  async goto() {
    await this.page.goto('/BANKADVICE/index.php');
  }

  // login
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  // ---------- Bank Advice Transaction ----------

  async openNewTransaction() {
    await this.adaTransaction.click();
  }

  async fillBankAdvice(d: {
    bank: string; fund: string; bankNo: string; check: string; obr: string;
    payee: string; particulars: string; tax1: string; amount: string;
    voucherNo: string; checkDate: string;
  }) {
    await this.adaBank.selectOption(d.bank);
    await this.adaFund.selectOption(d.fund);
    await this.adaBankNo.selectOption(d.bankNo); // after the bank
    await this.adaCheck.fill(d.check);
    await this.adaOBR.fill(d.obr);
    await this.adaPayee.selectOption(d.payee); 
    await this.adaParticulars.fill(d.particulars);
    await this.adaTax1.fill(d.tax1);
    await this.adaAmount.fill(d.amount);
    await this.adaVoucherNo.fill(d.voucherNo);
    await this.adaCheckDate.fill(d.checkDate);
  }

  async saveBankAdvice() {
    await this.adaSave.click();
  }

  async adaNav() {
    await this.nav_transaction.click();
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