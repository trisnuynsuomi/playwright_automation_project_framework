# Playwright Practice

End-to-end test framework built with [Playwright](https://playwright.dev/) and TypeScript.

## Project Structure

```
.
├── pages/        # Page objects / commands
├── tests/        # Test specs
├── types/        # Shared TypeScript types
├── playwright.config.ts
└── .env          # Local environment variables (not committed)
```

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- npm (bundled with Node.js)

## 1. Install Dependencies

Install the project dependencies declared in `package.json`:

```bash
npm install
```

Then download the Playwright browser binaries (Chromium, Firefox, WebKit):

```bash
npx playwright install
```

## 2. Configure Environment Variables

Create a `.env` file in the project root with the following keys:

```env
BASE_URL=https://automationintesting.online
USERNAME=admin
PASSWORD=password
```

| Variable     | Description                                          |
| ------------ | ---------------------------------------------------- |
| `BASE_URL`   | Base URL used by `page.goto('')` and API calls       |
| `USERNAME`   | Login username injected into tests via Playwright    |
| `PASSWORD`   | Login password injected into tests via Playwright    |

> The `.env` file is git-ignored. Each developer should maintain their own copy locally.

## 3. Run Tests

### Open Playwright in UI Mode (recommended for local development)

```bash
npx playwright test --ui
```

UI mode opens an interactive runner where you can pick specs, watch traces, time-travel through steps, and re-run individual tests.

### Other Useful Commands

```bash
# Headless run on all browsers
npx playwright test

# Run a single spec
npx playwright test tests/login.spec.ts

# Run only on Chromium
npx playwright test --project=chromium

# Open the last HTML report
npx playwright show-report
```
