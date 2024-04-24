/*const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  // Open new page
  const page = await context.newPage();
  
  // Go to https://hakims-webshop-frontend.onrender.com/
  await page.goto('https://hakims-webshop-frontend.onrender.com/');
  
  // Click on the link with role 'link' and name 'Hakim Livs'
  await page.click('a[href="/"]');
  
  // Click on the link with role 'link' and name 'Skafferi'
  await page.click('a[href="/skafferi"]');
  
  // Click on the link with text 'Varukorg'
  await page.click('text=Varukorg');
  
  // Click on the link with text 'Hakim LivsLogga inVarukorg'
  await page.click('text=Hakim LivsLogga inVarukorg');
  
  // Click on the link with role 'link' and name 'Hakim Livs'
  await page.click('a[href="/"]');
  
  // Click on the image inside div:nth-child(2)
  await page.click('div:nth-child(2) > img');
  
  // Click on the image inside div:nth-child(3)
  await page.click('div:nth-child(3) > img');
  
  await context.close();
  await browser.close();
})();*/

/*

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://hakims-webshop-frontend.onrender.com/');
  await page.locator('div:nth-child(2) > img').click();
  await page.getByRole('link', { name: 'Hakim Livs' }).click();
  await page.getByText('Varukorg').click();
  await page.locator('div:nth-child(2) > .product-card-details > .m-1 > .btn').click();
  await page.getByText('Varukorg').click();
  await page.getByRole('button', { name: 'Ta bort' }).click();
  await page.getByRole('link', { name: 'Hakim Livs' }).click();
  await page.getByRole('link', { name: 'Grönsaker' }).click();
  await page.getByText('KÖP').click();
  await page.getByRole('link', { name: 'Hakim Livs' }).click();
  await page.getByRole('link', { name: 'Vegetariskt' }).click();
  await page.getByRole('link', { name: 'Hakim Livs' }).click();
  await page.getByPlaceholder('Search product').click();
  await page.getByPlaceholder('Search product').fill('banan');
  await page.getByText('Banan 5-7 pack').first().click();
});
*/
const { chromium } = require('playwright');


(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  
  // Click on the second image
  await page.locator('div:nth-child(2) > img').click();
  
  // Click on the link with role 'link' and name 'Hakim Livs'
  await page.click('a[href="/"]');
  
  // Click on the link with text 'Varukorg'
  await page.click('text=Varukorg');
  
  // Click on the button to add the product to the cart
  await page.click('div:nth-child(2) > .product-card-details > .m-1 > .btn');
  
  // Click on the text 'Varukorg' to view the cart
  await page.click('text=Varukorg');
  
  // Click on the button to remove the product from the cart
  await page.click('button:has-text("Ta bort")');
  
  // Click on the link with role 'link' and name 'Hakim Livs'
  await page.click('a[href="/"]');
  
  // Click on the link with role 'link' and name 'Grönsaker'
  await page.click('a[href="/groensaker"]');
  
  // Click on the button with text 'KÖP' to buy the product
  await page.click('text=KÖP');
  
  // Click on the link with role 'link' and name 'Hakim Livs'
  await page.click('a[href="/"]');
  
  // Click on the link with role 'link' and name 'Vegetariskt'
  await page.click('a[href="/vegetariskt"]');
  
  // Click on the link with role 'link' and name 'Hakim Livs'
  await page.click('a[href="/"]');
  
  // Click on the search input field and type 'banan'
  await page.click('input[placeholder="Search product"]');
  await page.fill('input[placeholder="Search product"]', 'banan');
  
  // Click on the first product with text 'Banan 5-7 pack'
  await page.click('text=Banan 5-7 pack');
});
