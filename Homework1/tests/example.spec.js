// @ts-check
const { test, expect } = require('@playwright/test');
import { UserBuilder } from '../src/shared/helpers/user.helper.js';

test.only('get started link', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.locator('input[name="username"]').fill('Franklin')
  let newUser = UserBuilder().setEmail().setFullName().setPassword();
  console.log(newUser.email);
  console.log(newUser.fullName);
  console.log(newUser.password);
});

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});