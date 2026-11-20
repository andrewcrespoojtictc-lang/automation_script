import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// Credentials come from environment variables if set,
// otherwise fall back to the default test account.
const USERNAME = process.env.APP_USER ?? 'admin';
const PASSWORD = process.env.APP_PASS ?? 'admin123';

// Test data for the new user
const FIRST_NAME = 'drew';
const LAST_NAME = 'CAC';
const NEW_USERNAME = 'drewdrafter';
const NEW_USER_PASSWORD = 'drafter123';

// Test data for the signatory
const SIGNATORY_NAME = 'drew';
const SIGNATORY_DESIGNATION = 'CAC';

/*
test.describe('Authentication', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('valid credentials', async ({ page }) => {
    await test.step('Log in', async () => {
      await loginPage.login(USERNAME, PASSWORD);
      await expect(page).toHaveURL(/home\.php/);
    });

    await test.step('Log out', async () => {
      await loginPage.logout();
      await expect(page).toHaveURL(/index\.php/);
    });
  });

  test.describe('Invalid credentials', () => {
    const cases = [
      { name: 'invalid password', username: USERNAME, password: 'wrng_pswrd' },
      { name: 'invalid username', username: 'wrng_usrnm', password: PASSWORD },
    ];

    for (const { name, username, password } of cases) {
      test(name, async ({ page }) => {
        await loginPage.login(username, password);
        await expect(page).not.toHaveURL(/home\.php/);
      });
    }
  });
});

test.describe('Nav to Signatory', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Add Signatory', async ({ page }) => {
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page).toHaveURL(/home\.php/);
    await loginPage.click_ada();

    await loginPage.goToSignatory();
    await expect(page).toHaveURL('/BANKADVICE/apps/cac/signatory.php');

    await loginPage.signatory_modal();
    await loginPage.add_designation(SIGNATORY_NAME, SIGNATORY_DESIGNATION);
  });
});
*/

// User
test.describe('User Navigation', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Add User', async ({ page }) => {
    await test.step('Log in and open the Users page', async () => {
      await loginPage.login(USERNAME, PASSWORD);
      await expect(page).toHaveURL(/home\.php/);

      await loginPage.click_ada();
      await loginPage.goToUsers();
      await expect(page).toHaveURL(/users\.php/);
    });
    
    await test.step('Fill in the Add User form', async () => {
      await loginPage.openAddUser();
      await loginPage.fillUserInfo(FIRST_NAME, LAST_NAME);
      await loginPage.selectRole('Drafter');
      await loginPage.fillUserAccount(NEW_USERNAME, NEW_USER_PASSWORD, NEW_USER_PASSWORD);
      await loginPage.saveUser();
    });

    await test.step('Verify the user was added', async () => {
      // Modal closes on success; if it stays open, the app rejected the form
      await expect(loginPage.userModal).toBeHidden();
      // The new user appears in the list
      await expect(loginPage.userInList(NEW_USERNAME)).toBeVisible();
    });
  });
});