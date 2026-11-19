import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const USERNAME = process.env.APP_USER ?? 'drafter';
const PASSWORD = process.env.APP_PASS ?? 'drafter123';

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
        await expect(page).toHaveURL(/index\.php/);
        // Add an assertion for your app's error message, e.g.:
        // await expect(page.getByText('Invalid credentials')).toBeVisible();
      });
    }
  });
});