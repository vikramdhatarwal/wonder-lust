import { test, expect } from '@playwright/test';

test('guest can navigate home and all listings pages', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'All Listings' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();

  await page.getByRole('link', { name: 'All Listings' }).click();

  await expect(page).toHaveURL(/\/listings$/);
  await expect(page.getByText('Explore stays')).toBeVisible();
});

test('unknown routes show the friendly not found page', async ({ page }) => {
  await page.goto('/this-page-does-not-exist');

  await expect(page.getByRole('heading', { name: /could not find/i })).toBeVisible();
  await expect(page.getByText('Page Not Found!')).toBeVisible();
});
