const { test, expect } = require('@playwright/test');

test('Start page - ngx-admin Demo Application', async ({ page }) => {
    await page.goto('https://rori4.github.io/selenium-practice/');
    await expect(page).toHaveTitle('ngx-admin Demo Application');
});

test('Simple Registration - Registration Positive', async ({ page }) => {
    await page.goto('https://rori4.github.io/selenium-practice/#/pages/practice/simple-registration');
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('qwerty@gamil.com');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('Qwerty123');
    await page.getByRole('button', { name: 'Register' }).click();
    await page.locator('nb-toast').click();
});

test('Simple Registration - Error tips', async ({ page }) => {
    await page.goto('https://rori4.github.io/selenium-practice/#/pages/practice/simple-registration');
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('Qwerty');
    await page.getByPlaceholder('Password').click();
    await page.getByText('Please provide a valid email!').click();
    await page.getByText('Password is required!').click();
});

test('Menu - go to sections', async ({ page }) => {
    await page.goto('https://rori4.github.io/selenium-practice/#/pages/practice/simple-registration');
    await page.getByRole('link', { name: '02.Radio Button Form' }).click();
    await page.getByRole('link', { name: '01.Simple Registration' }).click();
    await page.getByRole('link', { name: '03.CheckBox Form' }).click();
    await page.getByRole('link', { name: '04.Dropdown Menu Form' }).click();
    await page.getByRole('link', { name: '05.DatePicker Form' }).click();
    await page.getByRole('link', { name: '06.File Upload Form' }).click();
    await page.getByRole('link', { name: '07.IFrame Form' }).click();
    await page.getByRole('link', { name: ' Tables Practice ' }).click();
    await page.getByRole('link', { name: '01.Smart Table' }).click();
});

test('Radio Button Form - Option One - Positive', async ({ page }) => {
    await page.goto('https://rori4.github.io/selenium-practice/#/pages/practice/radio-button-form');
    await page.getByPlaceholder('title').click();
    await page.getByPlaceholder('title').fill('Тестовый заголовок 12345');
    await page.getByPlaceholder('description').click();
    await page.getByPlaceholder('description').fill('Тестовое описание !"№%:,');
    await page.getByText('Option one is this and that—be sure to include why it\'s great').click();
    await page.getByRole('button', { name: 'Register' }).click();
    await page.locator('nb-toast').click();
});

test('CheckBox Form - Reservation - Positive Options', async ({ page }) => {
    await page.goto('https://rori4.github.io/selenium-practice/#/pages/practice/checkbox-form');
    await page.getByPlaceholder('name').click();
    await page.getByPlaceholder('name').fill('TestForm');
    await page.getByPlaceholder('comment').click();
    await page.getByPlaceholder('comment').fill('!@#$%6`');
    await page.getByText('Two-Bedroom Apartment').click();
    await page.getByText('Breakfast').click();
    await page.locator('label').filter({ hasText: 'Dinner' }).click();
    await page.getByRole('button', { name: 'Send Reservation Request' }).click();
    await page.locator('nb-toast').click();
    await page.locator('label').filter({ hasText: 'One-Bedroom Apartment' }).click();
    await page.locator('label').filter({ hasText: 'Presidential Suite' }).locator('span').first().click();
    await page.locator('label').filter({ hasText: 'Breakfast' }).locator('span').first().click();
    await page.locator('label').filter({ hasText: 'Lunch' }).locator('span').first().click();
    await page.getByRole('button', { name: 'Send Reservation Request' }).click();
    await page.locator('nb-toast').click();
});


test('Date Picker Form - Error tip', async ({ page }) => {
    await page.goto('https://rori4.github.io/selenium-practice/#/pages/practice/datepicker-form');
    await page.getByPlaceholder('Min Max Picker').click();
    await page.getByPlaceholder('Min Max Picker').fill('§1');
    await page.locator('.row > div:nth-child(3)').click();
    await page.getByText('Please choose at least one option!').click();
});