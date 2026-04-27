# 🎭 Playwright Automation Testing

Automated test suite for **OrangeHRM** web application using **Playwright** with **Page Object Model (POM)** pattern.

---

## ✨ Features

- ✅ **Page Object Model (POM)** - Separates UI elements from test logic
- ✅ **Data-driven Testing** - Reusable test cases with multiple data sets
- ✅ **Comprehensive Test Cases** - Login validation with edge cases
- ✅ **HTML Report** - Detailed test results and metrics
- ✅ **Screenshots & Videos** - Visual evidence of test failures

---

## 📦 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Playwright | ^1.58.2 | End-to-end test automation |
| Node.js | v14+ | Runtime environment |
| JavaScript | ES6+ | Programming language |

---

## 📁 Project Structure

```
playwright_beginer/
├── pages/
│   └── LoginPage.js                  # Page Object for login page
├── tests/
│   ├── Login_withPOM.spec.js         # POM pattern tests
│   ├── Login_dataDriven.spec.js      # Data-driven tests
│   ├── my_script.spec.js             # Basic test examples
│   └── orangeHRM_logic_Basic.spec.js # Login logic tests
├── playwright-report/                # HTML test reports
├── playwright.config.js              # Playwright configuration
├── jsconfig.json                     # JavaScript configuration
├── package.json                      # Dependencies
└── README.md                         # This file
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js v14 or higher
- npm or yarn

### Installation

```bash
# Clone repository
git clone <repository-url>
cd playwright_beginer

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

---

## ▶️ Running Tests

### Run all tests
```bash
npm test
```

### Run specific test file
```bash
npx playwright test tests/Login_withPOM.spec.js
npx playwright test tests/Login_dataDriven.spec.js
```

### Run with browser visible
```bash
npx playwright test --headed
```

### Run in debug mode
```bash
npx playwright test --debug
```

### Run specific test by name
```bash
npx playwright test -g "Login with POM"
```

### View test report
```bash
npx playwright show-report
```

---

## 🧪 Test Cases

### Login_withPOM.spec.js
Tests using Page Object Model pattern:

| Test Case | Input | Expected Result |
|-----------|-------|-----------------|
| Valid Login | Admin / admin123 | Redirects to dashboard |
| Invalid Password | Admin / wrongpass | Shows "Invalid credentials" error |
| Blank Credentials | (empty) / (empty) | Shows 2 "Required" messages |
| Invalid Username | WrongUser / admin123 | Shows "Invalid credentials" error |
| Special Characters | !@#$%^&*() / !@#$%^&*() | Shows "Invalid credentials" error |

### Login_dataDriven.spec.js
Data-driven testing with reusable logic:

```javascript
const loginTestData = [
  { name: 'valid login', user: 'Admin', pass: 'admin123', expected: 'success' },
  { name: 'invalid password', user: 'Admin', pass: 'wrong', expected: 'error' },
  { name: 'blank credentials', user: '', pass: '', expected: 'required' },
  { name: 'invalid username', user: 'WrongUser', pass: 'admin123', expected: 'error' },
];
```

**Benefits:**
- Easy to add/modify test data without changing code
- Reusable test logic for multiple scenarios
- Simplified test maintenance

---

## 🏗️ Page Object Model

### LoginPage.js

Encapsulates all login page elements and actions:

```javascript
class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator('input[placeholder="Username"]');
    this.password = page.locator('input[placeholder="Password"]');
    this.loginButton = page.locator('button[type="submit"]');
  }

  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  async performLogin(user, pass) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginButton.click();
  }
}
```

**Methods & Properties:**
| Item | Type | Description |
|------|------|-------------|
| `goto()` | Method | Navigate to login page |
| `performLogin(user, pass)` | Method | Perform login action |
| `username` | Locator | Username input field |
| `password` | Locator | Password input field |
| `loginButton` | Locator | Login button |

---

## ✅ Best Practices

### 1. Page Object Model
- Separates UI elements from test logic
- Easy to maintain when UI changes
- Reusable across multiple tests

### 2. Data-Driven Testing
- Test data separated from test logic
- Easy to add new test scenarios
- Reduces code duplication

### 3. Clear Test Names
```javascript
// ✅ GOOD
test('Login with POM - invalid password');

// ❌ BAD
test('login test 2');
```

### 4. Reusable Methods
```javascript
// ✅ GOOD - Can be reused
async performLogin(user, pass) {
  await this.username.fill(user);
  await this.password.fill(pass);
  await this.loginButton.click();
}

// ❌ BAD - Hard-coded
await page.locator('input[placeholder="Username"]').fill('Admin');
```

### 5. Setup & Teardown
```javascript
test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goto();
});
```

---

## 🔧 Configuration

### playwright.config.js
```javascript
testDir: './tests'              // Test folder
fullyParallel: true            // Run tests in parallel
reporter: 'html'               // HTML report output
timeout: 30 * 1000             // Test timeout (30s)
trace: 'on-first-retry'        // Trace failed tests
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

## 🐛 Troubleshooting

### Error: "Decorators are not valid here"
**Solution:** Ensure `jsconfig.json` has proper configuration with `experimentalDecorators: true`

### Error: "Cannot find module"
**Solution:** Check import paths are correct
```javascript
// ✅ CORRECT
const { LoginPage } = require('../pages/LoginPage');

// ❌ WRONG
const { LoginPage } = require('./pages/LoginPage');
```

### Error: "Tests timeout"
**Solution:** Increase timeout in `playwright.config.js`
```javascript
timeout: 60 * 1000, // 60 seconds
```

### Error: "Browser not installed"
**Solution:** Install Playwright browsers
```bash
npx playwright install
```

---

## 📊 View Test Reports

After running tests, view detailed reports:

```bash
npx playwright show-report
```

**Report includes:**
- ✅ Number of passed tests
- ❌ Number of failed tests
- ⏱️ Test execution time
- 📸 Screenshots of failures
- 🎬 Video recordings

---

## 🚀 Git Workflow

### Stage and commit changes
```bash
git add .
git commit -m "Add login test cases with POM"
git push origin main
```

### View commit history
```bash
git log --oneline
```

---

## 📦 Dependencies

```json
{
  "@playwright/test": "^1.58.2",
  "@types/node": "^25.3.3"
}
```

---

## 📝 Test Environment

- **Test URL:** https://opensource-demo.orangehrmlive.com
- **Test Username:** Admin
- **Test Password:** admin123
- **Default Browser:** Chromium

---

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Page Object Model Pattern](https://www.saucedlabs.com/blog/page-object-model)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)

---

## 📄 License

ISC

---

**Last Updated:** April 27, 2026

**Happy Testing! 🚀**
