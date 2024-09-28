import test, { expect } from "@playwright/test";

test('Shall fetched data not visible without session token', async ({
    page, context,
}) => {
    await context.clearCookies()
    await page.goto('/task-crud')
    await expect(page.getByText('Data fetching in server failed')).toBeVisible()
    await expect(page.getByText('Task 1')).not.toBeVisible()
    await expect(page.getByText('Task 2')).not.toBeVisible()
})