import { test } from '@playwright/test';

test('save gmail login', async ({ page, context }) => {
  test.setTimeout(0); // no timeout while you log in manually

  await page.goto('https://mail.google.com');
  await page.pause(); // log in manually, then click "Resume" in the Playwright Inspector

  await context.storageState({ path: 'auth.json' });
});