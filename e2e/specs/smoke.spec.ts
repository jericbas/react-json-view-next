import { expect, test } from '@playwright/test';
import { JsonViewerPage } from '../pages/JsonViewerPage';

test.describe('React JSON View Storybook', () => {
  test('should load the default story and display JSON viewer components', async ({ page }) => {
    const jsonViewerPage = new JsonViewerPage(page);
    await jsonViewerPage.goto();

    await expect(jsonViewerPage.container.first()).toBeVisible();
    await expect(jsonViewerPage.objectKeyVal.first()).toBeVisible();
  });
});
