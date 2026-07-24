import { test, expect, type Page } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { AppShellPage } from '../../pages/AppShellPage';
import { EventsPage, type EventData } from '../../pages/superadmin/EventsPage';
import { EventListPage } from '../../pages/superadmin/EventListPage';
import { logCreatedEvent } from '../../utils/testDataLogger';

test.describe('Super Admin - Event Management', () => {
    
  test('can create an event', async ({ page }) => {
    test.setTimeout(60000); // Set timeout to 60 seconds for this test
    const email = process.env.SUPERADMIN_EMAIL;
    const password = process.env.SUPERADMIN_PASSWORD;
    test.skip(!email || !password, 'SUPERADMIN_EMAIL and SUPERADMIN_PASSWORD must be set in config/env/.env.dev');

    // Login as super admin
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(email!, password!);

    // Assert logged in as superadmin
    const appShell = new AppShellPage(page);
    await expect(page).toHaveURL(/\/admin\/home/);
    await expect(appShell.roleLabelLink(/SuperAdmin/i)).toBeVisible();

    // Generate unique event name with timestamp to avoid duplicates
    const eventTimestamp = Date.now();
    const eventName = `Test Event ${eventTimestamp}`;

    // Navigate to events and create a new event
    const eventsPage = new EventsPage(page);
    await eventsPage.navigateToEventsList();
    await eventsPage.clickCreateEventButton();

    // Fill event form with test data
    const eventData: EventData = {
      title: eventName,
      description: 'This is a test event created. It can be edited later if needed for further testing.',
      startDate: 8,
      startTime: '12:30 AM',
      endDate: 13,
      endTime: '05:00 AM',
      cuisines: [6, 7, 10, 14, 19], // Italian, Asian, Mexican, Mediterranean, American
      mapImagePath: 'germany-states-and-capital-map.jpg',
      streetAddress: '29 Washington Pl, New York, NY 10003, USA',
      city: 'New York',
      zipCode: '10003',
      state: 'NY',
      bannerImagePath: 'LP event banner2.jpg',
    };

    await eventsPage.fillEventForm(eventData);
    // await page.pause();
    await eventsPage.submitForm();
    
logCreatedEvent(eventName);
// Verify event was created
    const eventListPage = new EventListPage(page);
await eventListPage.navigateToEventsList();
await eventListPage.searchEventByName(eventName);
await eventListPage.assertEventVisible(eventName);
    // Verify event was created
    // const eventId = await eventsPage.getCreatedEventId();
    // console.log(eventId);
    // const eventListPage = new EventListPage(page);
    // await eventListPage.navigateToEventById(eventId);
    // await page.waitForLoadState('networkidle');
  });
});