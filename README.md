# Playwright TypeScript Automation

## Get started

Install dependencies and the Chromium browser:

```sh
npm install
npx playwright install chromium
```

Run the starter test (it uses an in-memory page, so it does not depend on a website):

```sh
npm test
```

Useful commands:

- `npm run test:headed` runs tests with a visible browser.
- `npm run test:ui` opens Playwright's interactive test runner.
- `npm run test:debug` starts the Playwright debugger.
- `npm run test:report` opens the last HTML report.

Add your test files under `tests/`. Use `npx playwright codegen <url>` to record browser interactions and generate starter code.

## Compose an email draft

The sample in `tests/compose-email.spec.ts` uses Gmail, fills the recipient, subject, and body, and does **not** click Send. Edit its sample values or set `EMAIL_TO`, `EMAIL_SUBJECT`, and `EMAIL_BODY` in your environment.

To run it while signed in, create a local storage-state file:

```powershell
New-Item -ItemType Directory -Force .auth
npx playwright codegen --save-storage=.auth\user.json https://mail.google.com
```

Sign in in the opened browser, then close it to save the state. Run the draft test with:

```powershell
$env:PLAYWRIGHT_STORAGE_STATE = ".auth\user.json"
npx playwright test tests\compose-email.spec.ts --headed
```

The `.auth` folder is git-ignored because storage state contains login credentials. Treat it as sensitive and do not share or commit it.