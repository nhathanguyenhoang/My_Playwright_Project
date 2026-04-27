const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

// Data Driven Test - Separates test data in one place
// Benefits: Easy to manage, modify data without changing test logic
// Each object contains:
// - name: Test case name
// - user: Username to enter
// - pass: Password to enter  
// - expected: Expected result (success/error/required)
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
  {
    id: 'TC_LOGIN_003',
    type: 'NEGATIVE',
    name: 'Verify required messages are displayed when username and password are blank',
    user: '',
    pass: '',
    expected: 'required',
  },
  {
    id: 'TC_LOGIN_004',
    type: 'NEGATIVE',
    name: 'Verify error message is displayed when username is invalid',
    user: 'WrongUser',
    pass: 'admin123',
    expected: 'error',
  },
  {
    id: 'TC_LOGIN_005',
    type: 'NEGATIVE',
    name: 'Verify error message is displayed when username and password are invalid',
    user: '!@#$%^&*()',
    pass: '!@#$%^&*()',
    expected: 'error',
  },
];

test.describe('Login Data Driven', () => {
  let loginPage;

  // STEP 0: Execute before each test case
  // Create LoginPage instance and navigate to login page
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  for (const data of loginTestData) {           
    test(`[${data.type}] ${data.id} - ${data.name}`, async ({ page }) => {
      // STEP 1: Check if test case is "blank credentials"
      // If yes - only click login button without entering any data
      // If no - call performLogin method with user and password from test data
      if (data.expected === 'required') {
        await loginPage.loginButton.click();
      } else {
        await loginPage.performLogin(data.user, data.pass);
      }

      // STEP 2: Define assertions for each test scenario
      const assertions = {
        // If login successful - verify URL contains "dashboard"
        success: async () => {
          await expect(page).toHaveURL(/dashboard/);
        },
        // If login failed - verify "Invalid credentials" error message appears
        error: async () => {
          await expect(loginPage.errorMessage).toHaveText('Invalid credentials');
        },
        // If blank credentials - verify 2 "Required" messages appear
        required: async () => {
          await expect(loginPage.requiredMessages).toHaveCount(2);
        },
      };

      // STEP 3: Execute corresponding assertion based on expected result from test data
      await assertions[data.expected]();
    });
  }
});