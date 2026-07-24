import type { Locator, Page } from '@playwright/test';
import { expect} from '@playwright/test';

export interface EventData {
  title: string;
  description: string;
  startDate: number; // day of month
  startTime: string; // e.g., '12:30 AM'
  endDate: number; // day of month
  endTime: string; // e.g., '05:00 AM'
  cuisines: number[]; // array of li indices (e.g., [6, 7, 10, 14, 19])
  mapImagePath: string;
  streetAddress: string;
  city: string;
  zipCode: string;
  state: string;
  bannerImagePath: string;
}

export class EventsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToEventsList(): Promise<void> {
    await this.page.getByRole('link', { name: 'event_available Events' }).click();
  }

  async clickCreateEventButton(): Promise<void> {
    await this.page.getByRole('link', { name: 'Create Event' }).click();
  }

  async fillEventTitle(title: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Event Title:*' }).click();
    await this.page.getByRole('textbox', { name: 'Event Title:*' }).fill(title);
  }

  async fillDescription(description: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Description:*' }).click();
    await this.page.getByRole('textbox', { name: 'Description:*' }).fill(description);
  }

async selectStartDate(): Promise<void> {
  const today = new Date();

  const date =
    String(today.getMonth() + 1).padStart(2, '0') +
    '/' +
    String(today.getDate()).padStart(2, '0') +
    '/' +
    today.getFullYear();

  await this.page.locator('#start_date').fill(date);
}

  async selectStartTime(time: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Start Time:*' }).click();
    await this.page.getByText(time).click();
  }

//  async selectEndDate(): Promise<void> {
//   const today = new Date();

//   const date =
//     String(today.getMonth() + 1).padStart(2, '0') +
//     '/' +
//     String(today.getDate()).padStart(2, '0') +
//     '/' +
//     today.getFullYear();

//   await this.page.locator('#end_date').fill(date);
// }

async selectEndDate(): Promise<void> {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 7); // current date + 7 days
  const date =
    String(endDate.getMonth() + 1).padStart(2, '0') + '/' +
    String(endDate.getDate()).padStart(2, '0') + '/' +
    endDate.getFullYear();
  await this.page.locator('#end_date').fill(date);
}

  async selectEndTime(time: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'End Time:*' }).click();
    await this.page.getByRole('listitem').filter({ hasText: time }).click();
  }

  async selectCuisines(cuisineIndices: number[]): Promise<void> {
    // Click the cuisine search/dropdown field
    await this.page.locator('input[type="text"]').nth(5).click();

    // Select each cuisine checkbox by li index
    for (const index of cuisineIndices) {
      await this.page.locator(`li:nth-child(${index}) > span > label`).click();
    }
  }

  async uploadMapImage(imagePath: string): Promise<void> {
    await this.page.locator('#static_map_picture').setInputFiles('Test Data\\mapimage.jpg');
  }

 async fillStreetAddress(address: string): Promise<void> {
  await this.page.getByRole('textbox', { name: 'Street Address:*' }).click();
  await this.page.getByRole('textbox', { name: 'Street Address:*' }).fill(address);
}

  async fillCity(city: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'City:*' }).click();
    await this.page.getByRole('textbox', { name: 'City:*' }).fill(city);
  }

  async fillZipCode(zipCode: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'ZIP Code:*' }).click();
    await this.page.getByRole('textbox', { name: 'ZIP Code:*' }).fill(zipCode);
  }

  async fillState(state: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'State Abbreviation:*' }).click();
    await this.page.getByRole('textbox', { name: 'State Abbreviation:*' }).fill(state);

  }

  async uploadBannerImage(imagePath: string): Promise<void> {
      // await this.page.getByRole('button', { name: 'image Choose Banner Image' }).setInputFiles('Test Data\\Event banner.jpg');
await this.page.locator('#event_picture').setInputFiles('Test Data\\Event banner.jpg');
      // Test Data\\LP event banner.JPEG
}

async submitForm(): Promise<void> {
  await this.page.getByRole('button', { name: 'Save Event' }).click();
  await this.page.waitForTimeout(15000);
}

  async fillEventForm(data: EventData): Promise<void> {
    await this.fillEventTitle(data.title);
    await this.fillDescription(data.description);
    await this.selectStartDate();
    await this.selectStartTime(data.startTime);
    await this.selectEndDate();
    await this.selectEndTime(data.endTime);
    await this.selectCuisines(data.cuisines);
    await this.uploadMapImage(data.mapImagePath);
    await this.fillStreetAddress(data.streetAddress);
    await this.fillCity(data.city);
    await this.fillZipCode(data.zipCode);
    await this.fillState(data.state);
    await this.uploadBannerImage(data.bannerImagePath);
  }

  async getCreatedEventId(): Promise<string> {
    const url = this.page.url();
    return url.split('/').pop() ?? '';
  }
}

