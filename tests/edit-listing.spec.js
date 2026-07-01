import { test, expect } from '@playwright/test';
import { login } from './utils/login';

test('User can edit a listing', async ({ page }) => {
  await login(page);
});