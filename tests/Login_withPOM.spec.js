const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

let loginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
});

test ( 'Login with POM', async ({ page }) => {
    await loginPage.performLogin('Admin', 'admin123');
    await expect(page).toHaveURL(/.*dashboard/);
});

test ( 'Login with POM - invalid password', async ({ page }) => {
    await loginPage.performLogin('Admin', 'wrongpassword');
    await expect(loginPage.errorMessage).toHaveText('Invalid credentials');
});

test ( 'Login with POM - blank credentials', async ({ page }) => {
    // For this case, only click login button without entering credentials
    await loginPage.loginButton.click();
    await expect(loginPage.requiredMessages).toHaveCount(2);
});

test ( 'Login with POM - invalid username', async ({ page }) => {
    await loginPage.performLogin('WrongUser', 'admin123');
    await expect(loginPage.errorMessage).toHaveText('Invalid credentials');
});

test ( 'Login with POM - special characters', async ({ page }) => {
    await loginPage.performLogin('!@#$%^&*()', '!@#$%^&*()');
    await expect(loginPage.errorMessage).toHaveText('Invalid credentials');
});                 
