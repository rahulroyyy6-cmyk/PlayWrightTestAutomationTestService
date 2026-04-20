const {test, expect}=require('@playwright/test');

test('Validate the UI dropdown alert and radio button', async({page})=>
    {
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        await page.locator('input[name="username"]').fill("rahulshetty");
        await page.locator('input[name="password"]').fill("Learning@830$3mK2");
        await page.locator("select.form-control").selectOption("consult");
        await page.locator("label.customradio").last().click();
        await page.locator("#okayBtn").click();
        await expect(page.locator("label.customradio").last()).toBeChecked();
        await page.locator("#terms").click();
        await expect(page.locator("#terms")).toBeChecked();
        await page.locator("#terms").uncheck();
        expect(await page.locator("#terms").isChecked()).toBeFalsy();
        const doclink= page.locator("[href*='techsmarthire']");
        await expect(doclink).toHaveAttribute("class","blinkingText");
        await doclink.click();
          //await page.pause();

    });

test.only('Validate clild window',async({browser})=>{
        const context=await browser.newContext();
        const page= await context.newPage();
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");    
        const doclink= page.locator("[href*='documents-request']");
        await expect(doclink).toHaveAttribute("class","blinkingText");
        //Here the steps below should run parallely i,e async but using await changes it to a sync call
        //Here the issue is , we cant click before the waitforevent as, there wont be any event, and if we dont click the link, then there wont be any event hence needed a prallel calls
        // const newPage= await context.waitForEvent("page");        
        // await doclink.click();
        //Promise.all will wait for return status to be fulfilled till then it will run both steps parallely, in case it return rejected then the method will fail
        const [newPage] = await Promise.all(
                [context.waitForEvent("page"),doclink.click()]
        )
        const message = await newPage.locator("[class*='red']").textContent();
        const email=message.split("@")[1].split(" ")[0]
        await page.locator('input[name="username"]').fill(email);
        console.log(await page.locator('input[name="username"]').inputValue());
        
        
        

});