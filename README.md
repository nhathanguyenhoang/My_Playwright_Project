# Playwright Automation Testing Project

## Overview
Automated test suite for OrangeHRM web application using Playwright with Page Object Model (POM) architecture.

## Tech Stack
- **Playwright** (JavaScript)
- **Page Object Model (POM)** - Best practice for test automation
- **Node.js** - Runtime environment
- **GitHub Actions** - CI/CD pipeline

## Project Structure

```
playwright_beginer/
├── pages/                    # Page Object Model classes
│   └── LoginPage.js         # Login page POM
├── tests/                   # Test specifications
│   ├── Login_withPOM.spec.js       # Login tests with POM
│   ├── my_script.spec.js           # First tests
│   └── orangeHRM_logic_Basic.spec.js # Basic logic tests for Login Function
├── playwright-report/       # HTML test reports
├── test-results/           # Test results artifacts
├── playwright.config.js    # Playwright configuration
├── package.json           # Project dependencies
├── jsconfig.json         # JavaScript configuration
└── README.md            # Project documentation
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup
```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Test Cases

### Login Tests (Login_withPOM.spec.js)
- ✅ Valid login with correct credentials
- ✅ Invalid login with wrong password
- ✅ Blank credentials validation
- ✅ Invalid username handling
- ✅ Special characters in credentials

## Running Tests

### Run all tests
```bash
npm test
```

### Run specific test file
```bash
npx playwright test tests/Login_withPOM.spec.js
```

### Run tests in debug mode
```bash
npx playwright test --debug
```

### View test report
```bash
npx playwright show-report
```

## Page Object Model (POM)

### LoginPage.js
Encapsulates all login page elements and actions:

```javascript
- goto()                    // Navigate to login page
- performLogin(user, pass)  // Perform login action
- username                  // Username input locator
- password                  // Password input locator
- loginButton              // Login button locator
```

## Configuration

### Browser Support
- Chromium (default)
- Firefox (commented)
- WebKit (commented)

### Reporter
- HTML reporter for detailed test results

## Best Practices Used

✅ **Page Object Model** - Maintains elements and methods in separate classes  
✅ **Reusable Methods** - Reduces code duplication  
✅ **Clear Test Names** - Descriptive test case names  
✅ **Proper Waits** - Implicit waits via Playwright's smart locators  

## Git Workflow

### Commit changes
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

### View commits
```bash
git log --oneline
```

## Troubleshooting

### Issue: "Decorators are not valid here"
**Solution:** Ensure `jsconfig.json` has proper configuration with `experimentalDecorators: true`

### Issue: Cannot find module
**Solution:** Check relative paths in require statements
```javascript
// Correct
const { LoginPage } = require('../pages/LoginPage');
```

### Issue: Tests timeout
**Solution:** Increase timeout in `playwright.config.js`:
```javascript
timeout: 30 * 1000, // 30 seconds
```

## Dependencies

```json
{
  "@playwright/test": "^1.58.2",
  "@types/node": "^25.3.3"
}
```

## Future Enhancements

- [ ] Add more test cases
- [ ] Implement parallel execution
- [ ] Add performance metrics
- [ ] Setup GitHub Actions CI/CD
- [ ] Add screenshots for failed tests
- [ ] Database validation tests

## Author
Ha Nguyen Hoang Nhat

