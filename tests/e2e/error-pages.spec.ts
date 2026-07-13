import { test, expect } from '@playwright/test';
test('404 is branded and safe',async({page})=>{const res=await page.goto('/definitely-missing-route');expect(res?.status()).toBe(404);await expect(page.getByRole('heading')).toBeVisible();await expect(page.getByRole('link',{name:/home/i})).toBeVisible();await expect(page.getByText(/stack|trace|secret|api key/i)).toHaveCount(0);});
