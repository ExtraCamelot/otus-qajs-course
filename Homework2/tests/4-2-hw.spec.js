import { test, expect } from '@playwright/test';
import {faker} from '@faker-js/faker';


test.only('Подсказки незаполненных полей при Авторизации', async ({ page }) => {
    let mail = faker.internet.exampleEmail();
    let password = faker.internet.password({ length: 20 });
    await page.goto('https://react-recoil-realworld.vercel.app/');
    await page.getByRole('link', { name: 'Sign in' }).click();
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Password').click();
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    await expect(page.getByText('email can\'t be blank')).toContainText('email can\'t be blank');
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill(mail);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByText('password can\'be blank')).toContainText('password can\'be blank');

    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill(password);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByText('email can\'t be blank').click();
});