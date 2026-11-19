  import { test, expect } from '@playwright/test';
  import { LoginPage } from '../pages/LoginPage';

  // Credentials come from environment variables if set,
  // otherwise fall back to the default test account.
  const USERNAME = process.env.APP_USER ?? 'drafter';
  const PASSWORD = process.env.APP_PASS ?? 'drafter123';

  const signatory_name = 'Andrew';
  const signatory_designation = 'CAC'; 

  
  test.describe('Authentication', () => {
    let loginPage: LoginPage;

    // Runs before every test in this group:
    // create the page object and open the login page
    
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
        await expect(page).toHaveURL(/index\.php/); // back at the login page
      });
    });
    
    
    test.describe('Invalid credentials', () => {
      // Each entry becomes its own test. To add a case, add one line here.
      const cases = [
        { name: 'invalid password', username: USERNAME, password: 'wrng_pswrd' },
        { name: 'invalid username', username: 'wrng_usrnm', password: PASSWORD },
      ];

      for (const { name, username, password } of cases) {
        test(name, async ({ page }) => {
          await loginPage.login(username, password);

          await expect(page).not.toHaveURL(/home\.php/);
          await expect(page).toHaveURL(/index\.php/);

        });
      }
    });

     });
    

    // Signatory
    test.describe('Nav to Signatory', () => {
      let loginPage: LoginPage;
      
    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      await loginPage.goto();
    });

    test('Add Signatory', async ({ page }) => {
      await test.step('Log in', async () => {
        await loginPage.login(USERNAME, PASSWORD);
        await expect(page).toHaveURL(/home\.php/); 
        await loginPage.click_ada();

        await loginPage.goToSignatory();
        await expect(page).toHaveURL('/BANKADVICE/apps/cac/signatory.php');
        
        await loginPage.signatory_modal();

        await loginPage.add_designation(signatory_name, signatory_designation);

      });
  });

});
 