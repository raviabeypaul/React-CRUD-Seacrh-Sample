import { test, expect } from '@playwright/test';

test('Testing Edit Functionality', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByTestId("edit_0").click();
  await page.getByLabel("E-Mail").fill("test@gmail.com");
  await page.getByTestId("reservation-save-close").click();
  expect(await page.getByTestId('reservation_row_email_1').textContent()).toBe("test@gmail.com")
});