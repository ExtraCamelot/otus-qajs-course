import { test, expect } from '@playwright/test';
import {faker} from '@faker-js/faker';
import { UserBuilder } from '../src/shared/helpers/user.helper';
let userBio;
test.beforeEach(async ({ page }, testInfo) => {
    await page.goto('https://react-recoil-realworld.vercel.app/');
    let newUser = new UserBuilder().setName().setEmail().setPassword().build();
    await page.getByRole('link', { name: 'Sign up' }).click();
    await page.getByPlaceholder('Username').fill(newUser.fullname);
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill(newUser.email);
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill(newUser.password);
    await page.getByRole('button', { name: 'Sign up' }).click();
    await expect(page.getByRole('link',{ name:'Global Feed'})).toBeVisible();
    await page.reload({waitUntil:'domcontentloaded'});
    // todo qamba-1234 Здесь номер тикета, где заведен
    await expect(page.getByRole('link',{ name: newUser.fullname})).toBeVisible();
});

test.describe('Профиль пользователя', () => {
    test('Авторизованный пользователь выходит из системы', async ({ page }) => {
        await page.getByRole('link', { name: ' Settings' }).click();
        await page.getByRole('button', { name: 'Or click here to logout.' }).click();
        await expect(page.getByRole('link', { name: 'Sign up' })).toContainText('Sign up');
    });
});

test.describe('Профиль пользователя', () => {
    test('Зарегистрированный пользователь может изменить информацию о себе', async ({ page }) => {
        userBio = faker.person.fullName();
        await page.getByRole('link', { name: 'Settings' }).click();
        await page.getByPlaceholder('Short bio about you').click();
        await page.getByPlaceholder('Short bio about you').fill(userBio);
        await page.getByRole('button', { name: 'Update Settings' }).click();
        await expect(page.getByPlaceholder('Short bio about you')).toContainText(userBio);
    });
});

test.describe('Статьи', () => {
    test('Написать статью авторизованным автором', async ({ page }) => {
        let articleName = faker.company.buzzPhrase();
        await page.goto('https://react-recoil-realworld.vercel.app/');
        await page.getByRole('link', { name: ' New Article' }).click();
        await page.getByPlaceholder('Article Title').click();
        await page.getByPlaceholder('Article Title').fill(articleName);
        await page.getByPlaceholder('What\'s this article about?').click();
        await page.getByPlaceholder('What\'s this article about?').fill(faker.company.catchPhrase());
        await page.getByPlaceholder('Write your article (in markdown)').click();
        await page.getByPlaceholder('Write your article (in markdown)').fill(faker.string.alphanumeric(100));
        await page.getByPlaceholder('Enter tags').click();
        await page.getByPlaceholder('Enter tags').fill(faker.company.catchPhraseNoun());
        await page.getByRole('button', { name: 'Publish Article' }).click();
        await expect(page.getByRole('heading', { name: articleName })).toContainText(articleName);
    });
});

test.describe.only('Профиль пользователя', () => {
    test('Изменение имени пользователя после регистрации', async ({ page }) => {
        let name = faker.person.firstName('female');
        await page.getByRole('link', { name: ' Settings' }).click();
        await page.getByPlaceholder('Your Name').click();
        await page.getByPlaceholder('Your Name').fill(name);
        await page.getByPlaceholder('Email').click();
        await page.getByPlaceholder('Email').fill(faker.internet.exampleEmail());
        await page.getByPlaceholder('New Password').click();
        await page.getByPlaceholder('New Password').fill(faker.internet.password({ length: 10 }));
        await page.getByRole('button', { name: 'Update Settings' }).click();
        await expect(page.getByRole('heading', { name: name })).toContainText(name);
    });
});