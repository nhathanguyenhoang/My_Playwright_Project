# 🎭 Playwright Automation Testing

Dự án tự động kiểm thử ứng dụng **OrangeHRM** sử dụng **Playwright** với kiến trúc **Page Object Model (POM)**.

---

## 📋 Mục lục

- [Tổng quan](#tổng-quan)
- [Features](#features)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Cấu trúc project](#cấu-trúc-project)
- [Cài đặt](#cài-đặt)
- [Chạy tests](#chạy-tests)
- [Các test case](#các-test-case)
- [Page Object Model](#page-object-model)
- [Các best practices](#các-best-practices)
- [Troubleshooting](#troubleshooting)

---

## 📖 Tổng quan

Project này là một bộ test tự động cho chức năng **đăng nhập (Login)** của ứng dụng OrangeHRM.

**Mục tiêu:**
- Xác minh chức năng đăng nhập hoạt động đúng
- Kiểm thử các trường hợp hợp lệ và không hợp lệ
- Sử dụng Page Object Model để dễ bảo trì và mở rộng

---

## ✨ Features

- ✅ **Page Object Model (POM)** - Separates UI elements from test logic for better maintainability
- ✅ **Data-driven Testing** - Test multiple scenarios with different data sets
- ✅ **GitHub Actions CI** - Automated test execution on code push (optional)
- ✅ **HTML Report** - Detailed test reports with test results and metrics
- ✅ **Screenshot & Video on Failure** - Captures visual evidence of test failures for debugging

---

## 🛠️ Công nghệ sử dụng

| Công nghệ | Phiên bản | Mục đích |
|-----------|----------|---------|
| **Playwright** | ^1.58.2 | Framework test tự động |
| **Node.js** | v14+ | Runtime environment |
| **JavaScript** | ES6+ | Ngôn ngữ lập trình |
| **Page Object Model** | - | Design pattern cho test |

---

## 📁 Cấu trúc project

```
playwright_beginer/
│
├── pages/
│   └── LoginPage.js                          # Page Object cho trang login
│
├── tests/
│   ├── Login_withPOM.spec.js                 # Các test case sử dụng POM pattern
│   ├── Login_dataDriven.spec.js              # Test case sử dụng data-driven
│   ├── my_script.spec.js                     # Script test đầu tiên
│   └── orangeHRM_logic_Basic.spec.js         # Test logic cơ bản
│
├── playwright-report/                        # HTML test reports (tự động tạo)
├── test-results/                             # Test results artifacts
│
├── playwright.config.js                      # Cấu hình Playwright
├── jsconfig.json                             # Cấu hình JavaScript
├── package.json                              # Dependency & scripts
├── README.md                                 # Tài liệu này
```

---

## 💻 Cài đặt

### Yêu cầu
- **Node.js** v14 trở lên ([Download](https://nodejs.org))
- **npm** hoặc **yarn** (tự động cài với Node.js)

### Các bước cài đặt

```bash
# 1. Clone project (nếu từ GitHub)
git clone <repository-url>
cd playwright_beginer

# 2. Cài đặt dependencies
npm install

# 3. Cài đặt Playwright browsers
npx playwright install
```

**Xác nhận cài đặt:**
```bash
npx playwright --version
```

---

## ▶️ Chạy tests

### 1. Chạy tất cả tests
```bash
npm test
```

### 2. Chạy file test cụ thể
```bash
# Test với POM pattern
npx playwright test tests/Login_withPOM.spec.js

# Test Data-Driven
npx playwright test tests/Login_dataDriven.spec.js
```

### 3. Chạy tests ở chế độ Headed (hiển thị browser)
```bash
npx playwright test tests/Login_withPOM.spec.js --headed
```

### 4. Chạy tests ở chế độ Debug
```bash
npx playwright test --debug
```

### 5. Xem test report
```bash
npx playwright show-report
```

### 6. Chạy 1 test case cụ thể
```bash
npx playwright test -g "Login with POM"
```

**Legend:**
- `-g` = grep pattern (tìm test theo tên)
- `--headed` = hiển thị browser (mặc định là headless)
- `--debug` = chế độ debug từng bước

---

## 🧪 Các test case

### Login_withPOM.spec.js

Sử dụng **Page Object Model Pattern**:

| Test Case | Input | Expected Result |
|-----------|-------|-----------------|
| ✅ Valid Login | Admin / admin123 | Redirect to dashboard |
| ❌ Invalid Password | Admin / wrongpass | Error: "Invalid credentials" |
| ⚠️ Blank Credentials | (empty) / (empty) | 2 Required messages |
| ❌ Invalid Username | WrongUser / admin123 | Error: "Invalid credentials" |
| 🔒 Special Characters | !@#$%^&*() / !@#$%^&*() | Error: "Invalid credentials" |

### Login_dataDriven.spec.js

Sử dụng **Data-Driven Testing Pattern**:

```javascript
const loginTestData = [
  { name: 'valid login', user: 'Admin', pass: 'admin123', expected: 'success' },
  { name: 'invalid password', user: 'Admin', pass: 'wrong', expected: 'error' },
  { name: 'blank credentials', user: '', pass: '', expected: 'required' },
  { name: 'invalid username', user: 'WrongUser', pass: 'admin123', expected: 'error' },
];
```

**Lợi ích Data-Driven:**
- ✅ Dễ thêm/sửa test data mà không cần sửa code
- ✅ Tái sử dụng logic test cho nhiều data set
- ✅ Dễ quản lý test case

---

## 🏗️ Page Object Model

### LoginPage.js

**Vai trò:** Đóng gói tất cả phần tử UI và hành động của trang login



**Các thành phần:**

| Thành phần | Loại | Mô tả |
|-----------|------|-------|
| `goto()` | Method | Navigate tới trang login |
| `performLogin(user, pass)` | Method | Nhập credentials & click login |
| `username` | Locator | Input field username |
| `password` | Locator | Input field password |
| `loginButton` | Locator | Button login |

---

## ✅ Các best practices

### 1. **Page Object Model (POM)**
- Tách biệt UI elements từ test logic
- Dễ maintain khi UI thay đổi
- Tái sử dụng code

### 2. **Data-Driven Testing**
- Test data tách biệt khỏi logic
- Dễ thêm/sửa test case mới
- Giảm code duplication

### 3. **Clear Test Names**
```javascript
// ✅ GOOD
test('Login with POM - invalid password');

// ❌ BAD
test('login test 2');
```

### 4. **Reusable Methods**
```javascript
// ✅ GOOD - Có thể tái sử dụng
async performLogin(user, pass) {
  await this.username.fill(user);
  await this.password.fill(pass);
  await this.loginButton.click();
}

// ❌ BAD - Hard-coded
await page.locator('input[placeholder="Username"]').fill('Admin');
```

### 5. **beforeEach Setup**
```javascript
test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goto();
});
```

---

## 🔧 Cấu hình

### playwright.config.js

```javascript
- testDir: './tests'              # Folder chứa tests
- fullyParallel: true            # Chạy tests song song
- reporter: 'html'               # HTML report
- trace: 'on-first-retry'        # Trace failed tests
```

### jsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "allowJs": true,
    "experimentalDecorators": true
  }
}
```

---

## ❓ Troubleshooting

### ⚠️ Lỗi: "Decorators are not valid here"

**Nguyên nhân:** Cấu hình JavaScript/TypeScript không đúng

**Giải pháp:**
```json
// jsconfig.json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

### ⚠️ Lỗi: "Cannot find module"

**Nguyên nhân:** Đường dẫn import sai

**Giải pháp:**
```javascript
// ✅ ĐÚNG
const { LoginPage } = require('../pages/LoginPage');

// ❌ SAI
const { LoginPage } = require('./pages/LoginPage');
```

### ⚠️ Lỗi: "Tests timeout"

**Giải pháp:** Tăng timeout trong `playwright.config.js`
```javascript
timeout: 30 * 1000, // 30 giây
```

### ⚠️ Lỗi: "Browser not installed"

**Giải pháp:**
```bash
npx playwright install
```

---

## 📊 Xem test report

Sau khi chạy tests, xem chi tiết report:

```bash
npx playwright show-report
```

Report sẽ hiển thị:
- ✅ Số test passed
- ❌ Số test failed
- ⏱️ Thời gian chạy
- 📸 Screenshots của failed tests
- 🎬 Video recordings

---

## 🚀 Git Workflow

### Commit changes
```bash
git add .
git commit -m "Add login test cases with POM"
git push origin main
```

### View history
```bash
git log --oneline
```

---

## 📦 Dependencies

```json
{
  "@playwright/test": "^1.58.2",    // Test framework
  "@types/node": "^25.3.3"          // TypeScript types
}
```

---

## 📝 Ghi chú

- **URL Test:** https://opensource-demo.orangehrm.com
- **Test User:** Admin
- **Test Password:** admin123
- **Browser mặc định:** Chromium (có thể bật Firefox/WebKit)

---

## 🎓 Tài liệu tham khảo

- [Playwright Docs](https://playwright.dev)
- [Page Object Model Pattern](https://www.saucedlabs.com/blog/page-object-model)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)

---

## ✨ Cảm ơn!

Project này được tạo để học tập và thực hành automation testing với Playwright.

**Last Updated:** 27 tháng 4, 2026

---

**Happy Testing! 🚀**

