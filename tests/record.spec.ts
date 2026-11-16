import { test, chromium } from '@playwright/test';

test('record', async () => {
  test.setTimeout(0);
  const browser = await chromium.connectOverCDP('http://localhost:9222');
  const context = browser.contexts()[0];
  const page = context.pages()[0] ?? (await context.newPage());

  await page.goto('https://mail.google.com');
  await page.pause();
});