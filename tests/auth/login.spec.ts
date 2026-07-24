import { test, expect, type Page } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { AppShellPage } from '../../pages/AppShellPage';

type Role = 'superadmin' | 'admin' | 'vendor';

interface RoleExpectation {
  urlPattern: RegExp;
  roleLabel: RegExp;
  dashboardHeading?: RegExp;
  visibleNav: RegExp[];
  hiddenNav: RegExp[];
}

const roleExpectations: Record<Role, RoleExpectation> = {
  superadmin: {
    urlPattern: /\/admin\/home/,
    roleLabel: /SuperAdmin/i,
    dashboardHeading: /Admin Dashboard/i,
    visibleNav: [/Events/i, /Vendors/i, /User management/i, /Gourmeal Commision/i],
    hiddenNav: [],
  },
  admin: {
    urlPattern: /\/admin\/home/,
    roleLabel: /Gourmeal Admin/i,
    dashboardHeading: /Admin Dashboard/i,
    visibleNav: [/Events/i, /Vendors/i, /Vendor approvals/i],
    hiddenNav: [/User management/i, /Gourmeal Commision/i],
  },
  vendor: {
    urlPattern: /\/(admin|vendor)\//,
    roleLabel: /Vendor/i,
    visibleNav: [/Events/i],
    hiddenNav: [/User management/i],
  },
};

async function assertLoggedInAs(
  page: Page,
  appShell: AppShellPage,
  role: Role
): Promise<void> {
  const expectations = roleExpectations[role];

  await expect(page).toHaveURL(expectations.urlPattern);
  await expect(appShell.roleLabelLink(expectations.roleLabel)).toBeVisible();

  if (expectations.dashboardHeading) {
    await expect(appShell.dashboardHeading(expectations.dashboardHeading)).toBeVisible();
  }

  for (const navPattern of expectations.visibleNav) {
    await expect(appShell.navLink(navPattern)).toBeVisible();
  }

  for (const navPattern of expectations.hiddenNav) {
    await expect(appShell.navLink(navPattern)).toHaveCount(0);
  }
}

test.describe('Super Admin login', () => {
  test('can sign in', async ({ page }) => {
    const email = process.env.SUPERADMIN_EMAIL;
    const password = process.env.SUPERADMIN_PASSWORD;
    test.skip(!email || !password, 'SUPERADMIN_EMAIL and SUPERADMIN_PASSWORD must be set in config/env/.env.dev');

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(page).toHaveURL(/sign-in/);
    await expect(loginPage.emailInput).toBeVisible();

    await loginPage.login(email!, password!);
    await assertLoggedInAs(page, new AppShellPage(page), 'superadmin');
  });
});

test.describe('Admin login', () => {
  test('can sign in', async ({ page }) => {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    test.skip(!email || !password, 'ADMIN_EMAIL and ADMIN_PASSWORD must be set in config/env/.env.dev');

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(page).toHaveURL(/sign-in/);
    await expect(loginPage.emailInput).toBeVisible();

    await loginPage.login(email!, password!);
    await assertLoggedInAs(page, new AppShellPage(page), 'admin');
  });
});

test.describe('Vendor login', () => {
  test('can sign in', async ({ page }) => {
    const email = process.env.VENDOR_EMAIL;
    const password = process.env.VENDOR_PASSWORD;
    test.skip(!email || !password, 'VENDOR_EMAIL and VENDOR_PASSWORD must be set in config/env/.env.dev');

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(page).toHaveURL(/sign-in/);
    await expect(loginPage.emailInput).toBeVisible();

    await loginPage.login(email!, password!);
    await assertLoggedInAs(page, new AppShellPage(page), 'vendor');
  });
});
