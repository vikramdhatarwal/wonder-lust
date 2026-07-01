import { test, expect } from '@playwright/test';

test('User can create a listing', async ({ page }) => {
  const title = `demo-${Date.now()}`;

  await page.goto('https://wanderlust-zwvw.onrender.com/');

  // Login
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Username:' }).fill('demo');
  await page.getByRole('textbox', { name: 'Password:' }).fill('1234');
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify login
  await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();

  // Create Listing
  await page.getByRole('link', { name: 'Create Listing' }).click();

  await expect(page).toHaveURL(/new/);

  await page.getByRole('textbox', { name: 'Title' }).fill(title);
  await page.getByRole('textbox', { name: 'Description' }).fill('Playwright automated test');

  await page
    .getByRole('button', { name: 'Upload Image' })
    .setInputFiles('tests/assets/random.jpg');

  await page.getByRole('spinbutton', { name: 'Price' }).fill('123');
  await page.getByRole('textbox', { name: 'Country' }).fill('India');
  await page.getByLabel('Category').selectOption('Other');
  await page.getByRole('textbox', { name: 'Location / Address' }).fill('Rajasthan');

  await page.getByRole('button', { name: 'Create Listing' }).click();

  // Verify redirect to listings page
  await expect(page).toHaveURL(/\/listings$/);

  // Logout
  await page.getByRole('link', { name: 'Logout' }).click();

  // Verify logout
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
});