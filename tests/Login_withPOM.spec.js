const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test ( 'Login with POM', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin('Admin', 'admin123');
    await expect(page).toHaveURL(/.*dashboard/);
});

test ( 'Login with POM - invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin('Admin', 'wrongpassword');
    await expect(page.locator('.oxd-alert-content-text')).toContainText('Invalid credentials');
});

test ( 'Login with POM - blank credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    // Riêng trường hợp này, ta chỉ cần click mà không điền gì
    await loginPage.loginButton.click();
    const requiredMessages = page.getByText('Required');
    await expect(requiredMessages).toHaveCount(2);
});

test ( 'Login with POM - invalid username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin('WrongUser', 'admin123');
    await expect(page.getByText('Invalid credentials')).toBeVisible();
});

test ( 'Login with POM - special characters', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin('!@#$%^&*()', '!@#$%^&*()');
    await expect(page.getByText('Invalid credentials')).toBeVisible();
});                 
        