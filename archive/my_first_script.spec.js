const { test, expect } = require('@playwright/test');

test('playwright docs page', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Docs' }).click();
  await expect(page).toHaveURL(/.*docs/);
});

test('the-internet login success', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.locator('#username').fill('tomsmith');
  await page.locator('#password').fill('SuperSecretPassword!');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
});

test('demoqa text box submit', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box');
  await page.locator('#userName').fill('Nhat Ha');
  await page.locator('#userEmail').fill('nhatha@example.com');
  await page.locator('#currentAddress').fill('Ho Chi Minh City');
  await page.locator('#permanentAddress').fill('Viet Nam');
  await page.locator('#submit').click();
  await expect(page.locator('#output')).toContainText('Nhat Ha');
});