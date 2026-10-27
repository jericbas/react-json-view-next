import type { Locator, Page } from '@playwright/test';

export class JsonViewerPage {
  readonly page: Page;
  readonly container: Locator;
  readonly objectKeyVal: Locator;
  readonly dataTypeLabels: Locator;
  readonly objectSizes: Locator;
  readonly copyIcons: Locator;
  readonly variableRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.locator('.react-json-view-next, .react-json-view');
    this.objectKeyVal = page.locator('.object-key-val');
    this.dataTypeLabels = page.locator('.data-type-label');
    this.objectSizes = page.locator('.object-size');
    this.copyIcons = page.locator('.copy-to-clipboard-container');
    this.variableRows = page.locator('.variable-row');
  }

  async goto(storyId = 'components-reactjsonview--default') {
    await this.page.goto(`/iframe.html?id=${storyId}&viewMode=story`);
  }

  async getObjectKeys(): Promise<string[]> {
    return this.page.locator('.object-key').allTextContents();
  }

  async toggleFirstCollapsedNode() {
    const icon = this.page.locator('.icon-container').first();
    await icon.click();
  }
}
