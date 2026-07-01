import { test, expect } from '@playwright/test';
import { login } from './utils/login';

test('listing form requires all mandatory fields before submit', async ({ page }) => {
  await login(page);
  await page.goto('/listings/new');

  await page.getByRole('button', { name: 'Create Listing' }).click();

  await expect(page).toHaveURL(/\/listings\/new$/);
  await expect(page.locator('#title')).toHaveJSProperty('validity.valueMissing', true);
  await expect(page.locator('#description')).toHaveJSProperty('validity.valueMissing', true);
  await expect(page.locator('#price')).toHaveJSProperty('validity.valueMissing', true);
});

test('server rejects invalid listing ids with a friendly error page', async ({ page }) => {
  await page.goto('/listings/not-a-valid-id');

  await expect(page.getByRole('heading', { name: /could not find/i })).toBeVisible();
  await expect(page.getByText('The page you are looking for does not exist.')).toBeVisible();
});
