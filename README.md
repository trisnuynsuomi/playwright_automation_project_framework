# Playwright Practice

End-to-end test framework built with [Playwright](https://playwright.dev/) and TypeScript.

## Project Structure

```
.
├── pages/              # Page objects / commands
├── tests/              # Test specs
├── utils/types/        # Shared TypeScript types
├── utils/factory/      # Page factory (createPages)
├── playwright.config.ts
└── .env                # Local environment variables (not committed)
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

## 3. Page factory (`createPages`)

Tests do not instantiate page commands one by one. A small **factory** (`utils/factory/pages.factory.ts`) builds every command for the current Playwright `page` in one place and wires **one shared** `CommonPageCommand` into commands that need helpers like `triggerAndWaitApi`.

### What it returns

Calling `createPages(page)` returns an object with:

- `commonPageCommand` — navigation, `triggerAndWaitApi`, shared helpers
- `loginPageCommand` — login UI flow (receives the same `CommonPageCommand` instance)
- `homepageCommand` — homepage actions

### Declare and use in a spec

Type the bundle once so TypeScript knows every command on `pages`:

```ts
import test from "@playwright/test";
import { createPages } from "../utils/factory/pages.factory";

let pages: ReturnType<typeof createPages>;

test.beforeEach(async ({ page }) => {
  pages = createPages(page);
  await pages.commonPageCommand.navigateToPage();
});

test("example", async () => {
  await pages.homepageCommand.clickAdminLink();
  await pages.loginPageCommand.login(process.env.USERNAME!, process.env.PASSWORD!);
});
```

`ReturnType<typeof createPages>` keeps typings in sync when you add or remove commands in the factory.

### Add a new page command

1. Implement the class under `pages/` (inject `Page`; inject `CommonPageCommand` in the constructor if the command needs `triggerAndWaitApi` or other shared behavior).
2. In `createPages`, construct `CommonPageCommand` first, then pass it into any command that depends on it.
3. Add the new instance to the object returned from `createPages`.
4. Use it in tests via `pages.yourNewCommand.*`.

## 4. Run Tests

### Open Playwright in UI mode (recommended for local development)

```bash
npx playwright test --ui
```

UI mode opens an interactive runner where you can pick specs, watch traces, time-travel through steps, and re-run individual tests.

### Other useful commands

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
