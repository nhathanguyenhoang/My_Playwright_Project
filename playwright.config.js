import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: process.env.CI
    ? [
        ['github'],
        ['list', { printSteps: true }],
        ['html', { open: 'never' }],
      ]
    : [
        ['list', { printSteps: true }],
        ['html', { open: 'never' }],
      ],

  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    headless: true,
    // screenshot: 'only-on-failure',
    // video: 'retain-on-failure',
    screenshot: 'on',
    video: 'on',
    trace: 'on-first-retry',
  },
});