# 🎭 Playwright Automation Testing

An automated test suite for **OrangeHRM** web application using **Playwright** with **Page Object Model (POM)** architecture.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Test Cases](#test-cases)
- [Page Object Model](#page-object-model)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## 📖 Overview

This project is an automated test suite for the **Login** functionality of the OrangeHRM application.

**Objectives:**
- Verify login functionality works correctly
- Test both valid and invalid scenarios
- Implement Page Object Model for better maintainability and scalability

---

## ✨ Features

- ✅ **Page Object Model (POM)** - Separates UI elements from test logic for better maintainability
- ✅ **Data-driven Testing** - Test multiple scenarios with different data sets without code changes
- ✅ **HTML Report** - Detailed test reports with results, metrics, and visualizations
- ✅ **Screenshot & Video on Failure** - Automatic capture of visual evidence for failed tests
- ✅ **Headless & Headed Mode** - Run tests in both headless and visual modes
- ✅ **Parallel Execution** - Run tests concurrently for faster test execution

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Playwright** | ^1.58.2 | End-to-end test framework |
| **Node.js** | v14+ | JavaScript runtime |
| **JavaScript** | ES6+ | Programming language |

---

## 📁 Project Structure

```
playwright_beginer/
│
├── pages/
│   └── LoginPage.js                     # Page Object for login page
│
├── tests/
│   ├── Login_withPOM.spec.js            # POM pattern test cases
│   ├── Login_dataDriven.spec.js         # Data-driven test cases
│   ├── my_script.spec.js                # Basic test script
│   └── orangeHRM_logic_Basic.spec.js    # Basic login logic tests
│
├── playwright-report/                   # HTML reports (auto-generated)
├── test-results/                        # Test results artifacts
│
├── playwright.config.js                 # Playwright configuration
├── jsconfig.json                        # JavaScript configuration
├── package.json                         # Dependencies and scripts
└── README.md                            # Documentation
```

---

## 💻 Installation

### Prerequisites
- **Node.js** v14+ ([Download](https://nodejs.org))
- **npm** or **yarn** (included with Node.js)

### Setup Steps

```bash
# 1. Clone the repository (if from GitHub)
git clone <repository-url>
cd playwright_beginer

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install
```

**Verify Installation:**
```bash
npx playwright --version
```

---

## ▶️ Running Tests

### Run All Tests
```bash
npm test
```

### Run Specific Test File
```bash
# POM pattern tests
npx playwright test tests/Login_withPOM.spec.js

# Data-driven tests
npx playwright test tests/Login_dataDriven.spec.js
```

### Run Tests with Browser Visible
```bash
npx playwright test --headed
```

### Run in Debug Mode
```bash
npx playwright test --debug
```

### View HTML Report
```bash
npx playwright show-report
```

### Run Specific Test by Name
```bash
npx playwright test -g "Login with POM"
```

### Run Tests in Parallel
```bash
npx playwright test --workers=4
```

---

## 🧪 Test Cases

### Login_withPOM.spec.js
Using **Page Object Model Pattern**:

| Test Case | Input | Expected Result |
|-----------|-------|-----------------|
| ✅ Valid Login | Admin / admin123 | Redirect to dashboard |
| ❌ Invalid Password | Admin / wrongpass | Error message displayed |
| ⚠️ Blank Credentials | (empty) / (empty) | Required field messages |
| ❌ Invalid Username | WrongUser / admin123 | Error message displayed |
| 🔒 Special Characters | !@#$%^&*() / !@#$%^&*() | Error message displayed |

### Login_dataDriven.spec.js
Using **Data-Driven Testing Pattern** for test reusability:

```javascript
const loginTestData = [
  { name: 'valid login', user: 'Admin', pass: 'admin123', expected: 'success' },
  { name: 'invalid password', user: 'Admin', pass: 'wrong', expected: 'error' },
  { name: 'blank credentials', user: '', pass: '', expected: 'required' },
  { name: 'invalid username', user: 'WrongUser', pass: 'admin123', expected: 'error' },
];
```

**Benefits:**
- Reuse test logic for multiple data scenarios
- Easy to add/modify test data
- Reduced code duplication

---

## 🏗️ Page Object Model

### What is POM?
Encapsulates all page elements and actions in a separate class for better organization and reusability.

### LoginPage.js Structure

```javascript
class LoginPage {
  constructor(page) {
    // Define all page elements (locators)
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

module.exports = { LoginPage };
```

### Key Components

| Component | Type | Description |
|-----------|------|-------------|
| `goto()` | Method | Navigate to login page |
| `performLogin(user, pass)` | Method | Perform login action |
| `username` | Locator | Username input field |
| `password` | Locator | Password input field |
| `loginButton` | Locator | Login button |

---

## ✅ Best Practices

### 1. Page Object Model
```javascript
// ✅ GOOD - Centralized element definitions
class LoginPage {
  constructor(page) {
    this.username = page.locator('input[placeholder="Username"]');
  }
}

// ❌ BAD - Hard-coded selectors in tests
await page.locator('input[placeholder="Username"]').fill('Admin');
```

### 2. Reusable Methods
```javascript
// ✅ GOOD - Reusable method
async performLogin(user, pass) {
  await this.username.fill(user);
  await this.password.fill(pass);
  await this.loginButton.click();
}

// ❌ BAD - Repeated code in each test
test('Login 1', () => { /* 3 lines */ });
test('Login 2', () => { /* same 3 lines */ });
```

### 3. Descriptive Test Names
```javascript
// ✅ GOOD - Clear intention
test('Login with POM - invalid password');

// ❌ BAD - Vague description
test('login test 2');
```

### 4. Data-Driven Testing
```javascript
// ✅ GOOD - Separate data from logic
const testData = [
  { user: 'Admin', pass: 'admin123', expected: 'success' },
  { user: 'Admin', pass: 'wrong', expected: 'error' },
];
```

### 5. beforeEach Setup
```javascript
// ✅ GOOD - Common setup before each test
test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goto();
});
```

---

## 🔧 Configuration

### playwright.config.js
```javascript
- testDir: './tests'              // Test directory
- fullyParallel: true            // Parallel test execution
- reporter: 'html'               // HTML report format
- trace: 'on-first-retry'        // Trace on failed test
- timeout: 30 * 1000             // 30 second timeout
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

### Issue: "Decorators are not valid here"
**Solution:** Update `jsconfig.json`
```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

### Issue: "Cannot find module"
**Solution:** Check import paths
```javascript
// ✅ CORRECT
const { LoginPage } = require('../pages/LoginPage');

// ❌ INCORRECT
const { LoginPage } = require('./pages/LoginPage');
```

### Issue: "Tests timeout"
**Solution:** Increase timeout in `playwright.config.js`
```javascript
timeout: 60 * 1000, // 60 seconds
```

### Issue: "Browser not found"
**Solution:** Install Playwright browsers
```bash
npx playwright install
```

---

## 📊 Test Report

After running tests, view the detailed HTML report:

```bash
npx playwright show-report
```

**Report includes:**
- Test results (passed/failed)
- Execution time
- Screenshots of failures
- Video recordings
- Test duration metrics

---

## 🚀 Git Workflow

### Commit Changes
```bash
git add .
git commit -m "Add login test cases with POM"
git push origin main
```

### View Commit History
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

## 📝 Test Environment

- **Test URL:** https://opensource-demo.orangehrmlive.com
- **Test User:** Admin
- **Test Password:** admin123
- **Default Browser:** Chromium

---

## 🎓 References

- [Playwright Official Docs](https://playwright.dev)
- [Page Object Model Pattern](https://www.saucedlabs.com/blog/page-object-model)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)

---

## ✨ Contributing

Feel free to fork, modify, and improve this test suite.

---

## 📅 Last Updated
April 27, 2026

---

**Happy Testing! 🚀**
