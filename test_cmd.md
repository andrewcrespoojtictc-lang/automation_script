run test:  
1. npx playwright test compose.email.spec.ts --ui --project=chromium

1. npx playwright codegen https://mail.google.com/mail/u/0/#inbox

1. npx playwright open --save-storage=auth.json https://mail.google.com

powershell:
1. & "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --user-data-dir="C:\chrome-debug"
2. npx playwright open --save-storage=auth.json https://mail.google.com
3. codegen: npx playwright test tests/record.spec.ts --debug