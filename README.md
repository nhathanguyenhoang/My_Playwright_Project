# 🎭 Playwright Automation Testing
A personal automation testing project built with **Playwright** using the **OrangeHRM demo website**.

This project is used to practice and demonstrate:
- ✅ UI automation testing
- ✅ Page Object Model (POM)
- ✅ Data-driven testing
- ✅ ISTQB-style test naming
- ✅ HTML reporting
- ✅ GitHub Actions CI integration
- ✅ Failure diagnostics with screenshot, video, and trace


---
## 🎯 Project Objective

The main goal of this project is to automate the **OrangeHRM login feature** and improve the test framework step by step.

This project reflects the learning journey from:

1. Basic script version  
2. Reusable function version  
3. Page Object Model (POM) version  
4. Data-driven test version  

The repository keeps both:
- **stable final test files** for execution
- **learning/practice files** to show progress

---
## 📦 Tech Stack
```
| Technology | Version | Purpose |
|-----------|---------|---------|
| Playwright | ^1.58.2 | End-to-end test automation |
| Node.js | v14+ | Runtime environment |
| JavaScript | ES6+ | Programming language |
```
---
## 📁 Project Structure
```bash
playwright_beginer/
├── .github/
│   └── workflows/
│       └── playwright.yml              # GitHub Actions workflow
├── pages/
│   └── LoginPage.js                    # Page Object for login page
├── tests/
│   ├── Login_withPOM.spec.js           # Stable POM-based login tests
│   └── Login_dataDriven.spec.js        # Final scalable data-driven login tests
├── practice/
│   ├── login-basic-learning.js         # Earlier reusable-function learning version
│   └── my-script-learning.js           # Basic script experiments
├── playwright.config.js                # Playwright configuration
├── jsconfig.json                       # JavaScript configuration
├── package.json                        # Dependencies
├── package-lock.json                   # Lock file
└── README.md                           # Project documentation
```
---
## ✅ Stable Test Coverage

The final stable login scenarios include:

- 🔐 Valid login with correct username and password
- ❌ Invalid login with wrong password
- ❌ Invalid login with wrong username
- ⚠️ Required validation for blank username and password

---

## 🧪 Learning / Practice Files

The `practice/` folder contains earlier learning versions, such as:

- basic locator practice
- reusable function approach
- early script experiments

These files are kept to show the learning progression, but they are **not intended to be part of the final stable CI suite**.

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

## 🧾 Main Test Scenarios
```bash
Login_withPOM.spec.js
```
Tests implemented using the Page Object Model approach:

Valid login
Invalid password
Blank credentials
Invalid username
Login_dataDriven.spec.js

---

## Data-driven testing with reusable test logic and structured test data.

Example:
```bash
const loginTestData = [
  {
    id: 'TC_LOGIN_001',
    type: 'POSITIVE',
    name: 'Verify login succeeds with valid credentials',
    user: 'Admin',
    pass: 'admin123',
    expected: 'success',
  },
  {
    id: 'TC_LOGIN_002',
    type: 'NEGATIVE',
    name: 'Verify error message is displayed when password is invalid',
    user: 'Admin',
    pass: 'wrong',
    expected: 'error',
  },
];
```
Benefits:

easy to add or update test scenarios
reusable test logic
simplified maintenance
clearer test reports
---

## 🐛 Troubleshooting
Error: Cannot find module

Check import paths carefully.

// ✅ Correct
const { LoginPage } = require('../pages/LoginPage');
Error: Tests timeout

Possible causes:

unstable public demo environment
running too many tests in parallel
outdated practice files still included in the main suite
Error: Browser not installed
```
npx playwright install
```
---

## 📊 Test Reports

After running tests, you can open the HTML report:
```
npx playwright show-report
```
The report includes:

✅ passed tests
❌ failed tests
⏱️ execution time
📸 screenshots on failure
🎥 videos on failure
🧵 trace on retry
🔄 CI/CD

This project uses GitHub Actions to:

install dependencies
install Playwright browsers
run automated tests
upload the HTML report artifact

This simulates a basic automated UI test execution pipeline.

---

## 📚 Key Learning Outcomes

Through this project, I practiced:

writing Playwright UI tests
improving test reusability
converting basic scripts into POM structure
applying data-driven testing
designing structured test names
preparing a project for CI execution
---

## 🔮 Future Improvement

## Planned next steps:

add more OrangeHRM features beyond login
create more page objects
improve assertions and stability
expand CI pipeline usage
move larger test data sets into separate files

## 📝 Notes

This project is built mainly for learning and portfolio purposes.

The focus is not only on making tests pass, but also on improving:

structure
readability
maintainability
automation mindset

## 👩‍💻 Author

Nguyen Hoang Nhat Ha

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
