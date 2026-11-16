import { expect, test } from "@playwright/test";

test("page displays its heading", async ({ page }) => {
  await page.setContent("<h1>Automation starter</h1>");

  await expect(page.getByRole("heading", { name: "Automation starter" })).toBeVisible();
});
