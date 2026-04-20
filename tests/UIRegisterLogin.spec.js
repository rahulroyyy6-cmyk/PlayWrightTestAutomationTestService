const {test, expect} = require('@playwright/test');

const email= "rahul.royyy6@gmail.com";
const password = "TestAutomation@12345"


test("Validate Register Client Website", async ({page})=>
    {
       await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
       await page.locator("[href*='register']").click();
       await page.locator("input#firstName").fill("Rahul");
       await page.locator("input#lastName").fill("Roy");
       await page.locator("input#userEmail").fill(email);
       await page.locator("input#userMobile").fill("7888065420");
       await page.locator("[formcontrolname='occupation']").selectOption("3: Engineer");
       await page.locator("input[value='Male']").click();
       await page.locator("input#userPassword").fill(password);
       await page.locator("input#confirmPassword").fill(password);
       await page.locator("[class='col-md-1'] input").click();
       await page.locator("#login").click();
    })


test("Validate Login Client Website", async ({page})=>
    {
       const products = page.locator('div[class*="card-body"] b');
       await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
       await page.locator("input#userEmail").fill(email);
       await page.locator("input#userPassword").fill(password);
       await page.locator("#login").click();
       await page.locator("[routerlink='/dashboard']");
    //    console.log((await products.nth(0).innerText()).toString());
    //    expect(await products.nth(0).textContent()).toContain("ADIDAS ORIGINAL");
       // await page.waitForLoadState('networkidle'); This works 
       // await page.waitForLoadState('load'); doesnt work in this case
       // await page.waitForLoadState('domcontentloaded');doesnt work in this case
        await products.first().waitFor(); // This is to wait for the first element which helps the allTextContents wait to be handled
    console.log(await products.allTextContents());

    })