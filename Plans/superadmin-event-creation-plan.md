# Plan: Super Admin Event Creation Test

## TL;DR
Create a Playwright test that logs in as a super admin, navigates to Events > Create Event, fills in all required fields (including file uploads for banners and map images), submits the form, and verifies the event was created by checking success message and finding the event in the events list. Event name will include timestamp to avoid duplicates.

## Steps

### Phase 1: Create Page Objects

1. Create **EventsPage.ts** (superadmin page object)
   - Navigate to events list (`/admin/events` or similar)
   - Click "Create Event" button
   - Methods for filling form fields (name, date, location, description, etc.)
   - Methods for uploading banner and map images
   - Method to submit the form

2. Create **EventDetailPage.ts** or **EventListPage.ts** (for verification)
   - Method to find event by name in the list
   - Method to assert event visibility with expected details
   - Method to check success message (if applicable)

### Phase 2: Write Test in events.spec.ts

1. Import LoginPage, AppShellPage, and new EventsPage page objects
2. Test structure:
   - Login as super admin using env credentials (SUPERADMIN_EMAIL/PASSWORD)
   - Assert logged in as superadmin (reuse `assertLoggedInAs` from login.spec.ts)
   - Click Events nav link to navigate to events list
   - Click "Create Event" button
   - Fill all form fields (using timestamp in event name: `Test Event ${Date.now()}`)
   - Upload banner and map images
   - Submit form
   - Wait for success confirmation/redirect
   - Navigate to events list (or verify from confirmation page)
   - Assert the newly created event is visible with correct details

### Phase 3: File Setup & Test Assets

1. Add placeholder test images (banner.jpg, map.jpg) to fixtures folder if needed
2. Update EventsPage to handle file upload locators

## Relevant Files
- `tests/superadmin/events.spec.ts` — where test will be written
- `pages/superadmin/EventsPage.ts` — NEW page object (to create)
- `pages/LoginPage.ts` — reuse for login
- `pages/AppShellPage.ts` — reuse for assertions
- `tests/auth/login.spec.ts` — reference pattern for test structure

## Verification
1. Test runs without errors
2. Super admin successfully logs in (existing pattern)
3. Event form is found and all fields are fillable
4. File uploads work (banner + map images)
5. Form submission succeeds
6. Event appears in the events list with correct data
7. Timestamp in event name ensures no duplicate failures on repeated runs

## Decisions
- **Timestamp-based event names**: Include `Date.now()` in event name to avoid duplicates on repeated test runs
- **Single happy-path test**: One test covering the full flow; edge cases and error scenarios excluded for now
- **Reuse existing patterns**: Follow login.spec.ts structure for consistency
- **Multiple verification**: Check both success message + event list visibility

## Further Considerations
1. **Exact event form fields & UI selectors** — Need to inspect the actual Create Event form to identify all field locators (name, date, location, description, banner upload button, map upload button, submit button, success message selector, events list table/card selector)