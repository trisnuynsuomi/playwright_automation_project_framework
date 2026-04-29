import { test as base } from "@playwright/test";
import { createPages } from "../factory/pages.factory";


export type Pages = ReturnType<typeof createPages>;

export const test = base.extend<{ pages: Pages }>({
  pages: async ({ page }, use) => {
    await use(createPages(page));
  },
});

export { expect } from "@playwright/test";
