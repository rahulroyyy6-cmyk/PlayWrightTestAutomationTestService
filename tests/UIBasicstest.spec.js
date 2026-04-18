const {test} = require('@playwright/test');

test('Playwright Test',async ({browser})=>
{
const context = await browser.newContext();
const page =await context.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

test.only('Playwright Test with page fixture',async ({page})=>
{
await page.goto("https://google.com");
});