import test, { expect } from '@playwright/test'

test('Shall fetched data not visible without session token', async ({
  page,
  context,
}) => {
  await context.clearCookies()
  await page.goto('/task-crud')
  await expect(page.getByText('Data fetching in server failed')).toBeVisible()
  await expect(page.getByText('Task 1')).not.toBeVisible()
  await expect(page.getByText('Task 2')).not.toBeVisible()
})

test('Shall crud operation works properly', async ({ page }) => {
  await page.goto('/task-crud')
  await expect(page.getByRole('heading')).toHaveText(
    'Click a title on the left to view detail !'
  )
  // Create new task
  await page.getByRole('textbox').fill('Task new')
  await page.getByRole('button', { name: 'Create' }).click()
  const newTask = page.getByRole('listitem').nth(-1)
  await expect(newTask).toHaveText('Task new')
  // Update task
  await page.getByTestId('task-edit-icon').nth(-1).click()
  await page.getByRole('textbox').fill('Task new updated')
  await page.getByRole('button', { name: 'Update' }).click()
  const updatedTask = page.getByRole('listitem').nth(-1)
  await expect(updatedTask).toHaveText('Task new updated')
  // Delete task
  await page.getByTestId('task-delete0icon').nth(-1).click()
  const taskList = page.getByRole('listitem')
  await expect(taskList).toHaveCount(2)
  // Toggle compoleted checkbox
  await expect(taskList.first().getByRole('checkbox')).not.toBeChecked()
  await taskList.first().getByRole('checkbox').click()
  await expect(taskList.first().getByRole('checkbox')).toBeChecked()
  await taskList.first().getByRole('checkbox').click()
  await expect(taskList.first().getByRole('checkbox')).not.toBeChecked()
})
