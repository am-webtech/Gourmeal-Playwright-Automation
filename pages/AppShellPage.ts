import type { Locator, Page } from '@playwright/test';

export class AppShellPage {
  readonly page: Page;
  readonly sidebar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sidebar = page.locator('.sidebar');
  }

  navLink(name: RegExp | string): Locator {
    return this.sidebar.getByRole('link', { name });
  }

  roleLabelLink(pattern: RegExp): Locator {
    return this.page.getByRole('link', { name: pattern }).first();
  }

  dashboardHeading(pattern: RegExp): Locator {
    return this.page.getByRole('heading', { name: pattern });
  }
}
