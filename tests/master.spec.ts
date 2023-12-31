import { test, expect } from '@playwright/test';
/* eslint-disable testing-library/prefer-screen-queries */
test('Testing Edit Functionality', async ({ page }) => {
  await page.goto('http://ec2-3-82-108-46.compute-1.amazonaws.com:3000/');
  await page.getByTestId("edit_0").click();
  await page.getByLabel("E-Mail").fill("test@gmail.com");
  await page.getByTestId("reservation-save-close").click();
  expect(await page.getByTestId('reservation_row_email_1').textContent()).toBe("test@gmail.com")
});