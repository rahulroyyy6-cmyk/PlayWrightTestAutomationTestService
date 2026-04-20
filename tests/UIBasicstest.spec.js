const {test, expect} = require('@playwright/test');

test('Validate invalid username',async ({browser})=>
{

const context = await browser.newContext();
const page =await context.newPage();
const username = page.locator('input[name="username"]');
const products = page.locator('.card-body a');
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
await page.locator('input[name="username"]').fill("rahulshetty");
await page.locator('input[name="password"]').fill("Learning@830$3mK2");
await page.locator('input[name="terms"]').click();
await page.locator('input[name="signin"]').click();
console.log(await page.locator('[style*="block"]').textContent());
//expect(await page.locator('[style*="block"]').textContent()).toBe("Incorrect uusername/password.");
expect(await page.locator('[style*="block"]').textContent()).toContain("Incorrect");
//Enter valid value now 
//await username.fill("");
await username.clear();
await username.fill("rahulshettyacademy");
await page.locator('input[name="signin"]').click();
 console.log(await products.nth(1).textContent());
// console.log(await products.first().textContent());
const allProductsName = await products.allTextContents();
console.log(allProductsName);

});

test('Playwright Test with page fixture',async ({page})=>
{
await page.goto("https://google.com");
// console.log(await page.title());
await expect(page).toHaveTitle("Google");
});