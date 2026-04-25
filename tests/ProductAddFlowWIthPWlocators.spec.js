const {test,expect}=require("@playwright/test")
const email= "rahul.royyy6@gmail.com";
const password = "TestAutomation@12345"

test.only("Validate Specified Product is Bought",async({page})=>{

    // Define the product we want to search and buy
const productName = "ZARA COAT 3";

// Locator for all product cards on dashboard
const products = page.locator('div[class*="card-body"]');

// Navigate to login page
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

// Enter login credentials
await page.getByPlaceholder("email@example.com").fill(email);
await page.getByPlaceholder("enter your passsword").fill(password);

// Click login button
await page.getByRole("button",{name:"login"}).click();

// Wait until dashboard is loaded (important sync point)
await page.getByText("Automation Practice").waitFor();

// Wait until at least one product is visible (ensures product list is loaded)
await products.first().waitFor();

// Debug: print all product cards text
console.log(await products.allTextContents());

// // Get total number of products
// const count = await products.count();

// // Loop through products to find matching product name
// for (let i = 0; i < count; ++i) {
//     // Get product title text (inside <b> tag)
//     const text = (await products.nth(i).locator("b").textContent()).trim();

//     // Compare with desired product
//     if (text === productName) {
//         // Click "Add To Cart" button for matched product
//         await products.nth(i).locator("text=Add To Cart").click();
//         break; // Exit loop once found
//     }
// }

await products.filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:" Add To Cart"}).click();

// Navigate to Cart page
await page.getByRole("button",{name:"  Cart "}).first().click();

// Wait until cart items are loaded
await page.getByText("ZARA COAT 3").waitFor();

// Verify selected product is present in cart
await expect(page.getByText(`${productName}`)).toBeVisible();

// Proceed to checkout
await page.getByRole("button",{name:"Checkout"}).click();

// Fill payment details
await page.locator("div:has-text('CVV Code ')").locator("+input").fill("456");
await page.locator("div:has-text('Name on Card ')").locator("+input").fill("Rahul Shetty");

// Verify email is correctly pre-filled
await expect(page.locator(".user__name label")).toHaveText(email);
await expect(page.locator(".user__name input").first()).toHaveValue(email);

// Enter country in auto-suggest field (typing slowly to trigger suggestions)
await page.getByPlaceholder("Select Country")
    .pressSequentially("ind", { delay: 150 });

// Wait for dropdown suggestions to appear
const section = page.locator(".ta-results");
await section.waitFor();

await page.getByRole('button', { name: 'India' }).nth(1).click();

// // Get all country options
// const options = section.locator("button span");
// const noOfOptions = await options.count();

// // Loop through options to select "India"
// for (let i = 0; i < noOfOptions; ++i) {
//     if ((await options.nth(i).textContent()).trim() === "India") {
//         await options.nth(i).click();
//         break;
//     }
// }

// Submit order
await page.getByText("Place Order ").click()
// await page.locator("[class*='action__submit']").click();

// Validate order confirmation message
await expect(page.locator(".hero-primary"))
    .toHaveText(" Thankyou for the order. ");

// Capture order ID
const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();

// Clean order ID (remove unwanted characters)
const trimmedOrderId = orderId.replace(/\|/g, "").trim();

// Go to "My Orders" page
await page.getByRole('button', { name: 'ORDERS' }).click();
// await page.locator("button[routerlink*='myorders']").click();

// Wait until orders page loads
await page.getByText("Your Orders").waitFor();

// Get all order rows
// const rows = page.locator("table tbody tr");
// const rowsCount = await rows.count();

// // Find matching order ID in table
// for (let i = 0; i < rowsCount; ++i) {
//     const rowOrderId = (await rows.nth(i).locator("th").textContent()).trim();

//     if (rowOrderId === trimmedOrderId) {
//         // Click "View" for matching order
//         await rows.nth(i).locator("button:has-text('View')").click();
//         break;
//     }
// }

await page.locator("tr:has-text('"+trimmedOrderId+"')").getByRole('button', { name: 'View' }).click();

// Verify order summary page is displayed
await expect(page.getByText(" order summary ")).toBeVisible()
await expect(page.getByText(trimmedOrderId)).toBeVisible();

// await expect(page.locator("div.col-text")).toHaveText(trimmedOrderId);
// Go to "My Orders" page again
await page.locator("div[routerlink*='myorders']").click();
await page.locator("button[routerlink='/dashboard']").click();
// Wait until dashboard is loaded (important sync point)
await page.locator("[routerlink='/dashboard']").waitFor();
       await page.pause();


});