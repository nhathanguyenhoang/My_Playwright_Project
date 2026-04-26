const { test, expect } = require ('@playwright/test');
const BASE_URL = 'https://opensource-demo.orangehrmlive.com';

test.describe('Authentication Login', () => {
    
let loginPage;

    test.beforeEach(async ({ page }) => {
        await page.goto(BASE_URL + '/web/index.php/auth/login');
        
        // Khởi tạo các phần tử
       loginPage = {
            userInput: page.locator('input[placeholder="Username"]'),
            passInput: page.locator('input[placeholder="Password"]'),
            loginButton: page.locator('[type="submit"]')
        };
    });

    // Hàm hành động dùng chung giúp tái sử dụng code
    async function performLogin(user, pass) {
        await loginPage.userInput.fill(user);
        await loginPage.passInput.fill(pass);
        await loginPage.loginButton.click();
    }

    test('TC001 - Login successfully with valid credentials', async ({ page }) => {
       // Gọi hàm thay vì viết lại 3 dòng fill/click
        await performLogin('Admin', 'admin123');
        await expect(page).toHaveURL(/.*dashboard/);

    });
    
    test('TC002 - Show error when password is invalid', async ({ page }) => {
        await performLogin('Admin', 'wrongpassword');
        await expect(page.locator('.oxd-alert-content-text')).toContainText('Invalid credentials');
    
    });
    
    test('TC003 - Show required messages when username and password are blank', async ({ page }) => {
     // Riêng trường hợp này, ta chỉ cần click mà không điền gì
        await loginPage.loginButton.click();
        const requiredMessages = page.getByText('Required');
        await expect(requiredMessages).toHaveCount(2);
    });

    test('TC004 - Show error when username is invalid', async ({ page }) => {
        await performLogin('WrongUser', 'admin123');
        await expect(page.getByText('Invalid credentials')).toBeVisible();
});

    test('TC005 - Show error when username and password contain special characters', async ({ page }) => {
        await performLogin('!@#$%^&*()', '!@#$%^&*()');
        await expect(page.getByText('Invalid credentials')).toBeVisible();
});

});