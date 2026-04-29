import test from "@playwright/test";
import { createPages } from "../utils/factory/pages.factory";

let pages: ReturnType<typeof createPages>;

test.beforeEach('Navigate to test page', async ({ page }) => {
    pages = createPages(page);
    await pages.commonPageCommand.navigateToPage();
});

test('User can Login successfully', async ({ page }) => {
    await pages.homepageCommand.clickAdminLink();
    await pages.loginPageCommand.login(process.env.USERNAME as string, process.env.PASSWORD as string);
}); 