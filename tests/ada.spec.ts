  import { test, expect } from '@playwright/test';
  import { LoginPage } from '../pages/LoginPage';
import { log } from 'console';

  // Credentials come from environment variables if set,
  // otherwise fall back to the default test account.
  const USERNAME = process.env.APP_USER ?? 'admin';
  const PASSWORD = process.env.APP_PASS ?? 'admin123';


  const name = 'Andrew';
  const designation = 'CAC'; 

  const user_usrname = 'reviewer3';
  const user_pswrd = 'reviewer123';
  const user_confirm_pswrd = 'reviewer123';

  
/*  
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

        await loginPage.add_designation(name, designation);

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
      await loginPage.login(USERNAME, PASSWORD);
      await expect(page).toHaveURL(/home\.php/); 
      await loginPage.click_ada();
      await loginPage.navSignatory();
      await expect(page).toHaveURL(/users\.php/);
      await loginPage.user_modal();
      await loginPage.user_input(name, designation, user_usrname, user_pswrd, user_confirm_pswrd);
      await loginPage.save_user();
      });
  });


  
  

// });
 