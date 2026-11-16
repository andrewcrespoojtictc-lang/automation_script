import { test, chromium } from '@playwright/test';

test('compose and send email', async () => {
  // test.setTimeout(60000);

  const browser = await chromium.connectOverCDP('http://localhost:9222');
  const context = browser.contexts()[0];
  const page = context.pages()[0] ?? (await context.newPage());

  await page.goto('https://mail.google.com');

  await page.getByRole('button', { name: 'Compose' }).click();
  await page.getByRole('combobox', { name: 'To recipients' }).fill('batcrespo063@gmail.com');
  await page.getByRole('textbox', { name: 'Subject' }).fill('From Playwright Script');
  await page.getByRole('textbox', { name: 'Message Body' }).fill('Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad illum tempore hic? Molestias voluptas ipsum exercitationem delectus maxime numquam! Deserunt laudantium rerum eligendi tempore qui officiis ab quos tenetur odit? -Genereated by Playwright Script');
  await page.getByRole('button', { name: /^Send/ }).click();
});

