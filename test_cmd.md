run test:  
npx playwright test compose.email.spec.ts --ui --project=chromium

npx playwright codegen https://mail.google.com/mail/u/0/#inbox

npx playwright open --save-storage=auth.json https://mail.google.com



& "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --user-data-dir="C:\chrome-debug"

npx playwright test tests/record.spec.ts --debug