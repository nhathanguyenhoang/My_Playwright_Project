const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

// Data Driven Test - Tách dữ liệu test ra một chỗ
// Lợi ích: Dễ quản lý, thay đổi dữ liệu mà không cần sửa code test
// Mỗi object chứa:
// - name: Tên của test case
// - user: Username để nhập
// - pass: Password để nhập  
// - expected: Kết quả mong đợi (success/error/required)
const loginTestData = [
  { name: 'valid login', user: 'Admin', pass: 'admin123', expected: 'success' },
  { name: 'invalid password', user: 'Admin', pass: 'wrong', expected: 'error' },
  { name: 'blank credentials', user: '', pass: '', expected: 'required' },
  { name: 'invalid username', user: 'WrongUser', pass: 'admin123', expected: 'error' },
];

test.describe('Login Data Driven', () => {
  let loginPage;

  // STEP 0: Chạy trước mỗi test case
  // Tạo instance LoginPage và navigate đến trang login
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  for (const data of loginTestData) {           
    test(`Login test - ${data.name}`, async ({ page }) => {
      // STEP 1: Kiểm tra nếu test case là "blank credentials"
      // Nếu có - chỉ click login button mà không điền gì
      // Nếu không - gọi method performLogin với user và password từ test data
      if (data.expected === 'required') {
        await loginPage.loginButton.click();
      } else {
        await loginPage.performLogin(data.user, data.pass);
      }

      // STEP 2: Định nghĩa các assertions dùng cho từng trường hợp test
      const assertions = {
        // Nếu login thành công - kiểm tra URL có chứa "dashboard"
        success: async () => {
          await expect(page).toHaveURL(/dashboard/);
        },
        // Nếu login thất bại - kiểm tra message lỗi "Invalid credentials" xuất hiện
        error: async () => {
          await expect(loginPage.errorMessage).toHaveText('Invalid credentials');
        },
        // Nếu để trống - kiểm tra 2 thông báo "Required" xuất hiện
        required: async () => {
          await expect(loginPage.requiredMessages).toHaveCount(2);
        },
      };

      // STEP 3: Gọi assertion tương ứng dựa vào expected result từ test data
      await assertions[data.expected]();
    });
  }
});