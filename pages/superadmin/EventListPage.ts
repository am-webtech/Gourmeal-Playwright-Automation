import type { Locator, Page } from '@playwright/test';

export class EventListPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToEventsList(): Promise<void> {
    await this.page.goto('/admin/events');
  }

  async searchEventByName(eventName: string): Promise<void> {
    const searchBox = this.page.getByRole('textbox', { name: 'Search event by name' });
    await searchBox.click();
    await searchBox.fill(eventName);
    await searchBox.press('Enter');
  }

  async assertEventVisible(eventName: string): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await this.page.locator('#page-content-wrapper').getByText(eventName).waitFor({ state: 'visible' });
  }

  // eventCard(eventName: string): Locator {
  //   return this.page.locator('#page-content-wrapper').getByText(eventName);
  // }

  // async navigateToEventById(eventId: string): Promise<void> {
  //   await this.page.goto(`/admin/events/${eventId}`);
  //   await this.page.waitForLoadState('networkidle');
  // }
}
