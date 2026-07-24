# Gourmeal Automation Framework

A Playwright + TypeScript end-to-end test automation framework built for **Gourmeal**, a multi-role web platform with distinct Superadmin, Admin, and Vendor portals.

## 🚀 Features

- **Page Object Model (POM)** design pattern for maintainable, reusable page interactions
- **Role-based test coverage** — Superadmin, Admin, and Vendor user flows tested independently
- **Environment-based configuration** via `.env` files (dev environment supported, easily extendable to qa/staging/prod)
- **Screenshot, video, and trace capture on failure** for fast debugging
- **Structured test data** — includes realistic fixtures (product images, vendor documents, event banners) for upload/form-heavy flows
- **Excel-based test data logging** via the `xlsx` package
- TypeScript for type-safe test and page object code

## 📋 Prerequisites

- Node.js (v18 or higher recommended)
- npm

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR-USERNAME/Gourmeal-Automation.git
   cd Gourmeal-Automation
   ```

2. Install dependencies:
   ```bash
   npm install
   npx playwright install
   ```

3. Set up real credentials for local test execution:

   `config/env/.env.dev` is checked into this repo with placeholder values only. To run tests locally, replace the placeholders with real credentials — then run the command below **once** so Git stops tracking further local changes to this file, preventing real values from ever being accidentally committed:
   ```bash
   git update-index --skip-worktree config/env/.env.dev
   git update-index --skip-worktree playwright/.auth/admin.json
   git update-index --skip-worktree playwright/.auth/superadmin.json
   git update-index --skip-worktree playwright/.auth/vendor.json
   ```
   To resume tracking a file later (e.g. to intentionally update the placeholder text), run `git update-index --no-skip-worktree <file>` first.

## 🏃 Running Tests

Run the full suite:
```bash
npx playwright test
```

Run only the auth/login tests:
```bash
npm run test:auth
```

Run in headed mode:
```bash
npm run test:headed
```

View the HTML report after a run:
```bash
npx playwright show-report
```

## 📁 Project Structure

```
├── config/env/         # Environment configuration (.env.example + .env.dev, values redacted)
├── pages/               # Page Object Model classes (currently: superadmin/)
├── tests/               # Test specs organized by role (currently: auth/, superadmin/)
├── utils/               # Shared utilities (e.g. test data logging)
├── Test Data/           # Sample upload files and test artifacts (all synthetic/dummy data)
├── Plans/               # Test planning notes for specific feature areas
└── playwright.config.ts # Playwright configuration
```

*Admin and vendor role coverage is planned but not yet implemented — the framework is structured to extend to those roles the same way superadmin was built.*

## 🔐 Security Note

`config/env/.env.dev` and `playwright/.auth/*.json` are included in this repository to show the framework's environment and auth-state structure, but all actual credential, session, and token values have been redacted and replaced with placeholder text ("REDACTED - Due to confidentiality this value has not been shared"). No real secrets are present anywhere in this repository.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests locally
5. Submit a pull request
