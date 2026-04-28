import test from "@playwright/test";
import { LoginPageCommand } from "../pages/login.command";
import { CommonPageCommand } from "../pages/common.command";
import { HomepageCommand } from "../pages/homepage.command";

test.beforeEach('Navigate to test page', async ({ page }) => {
    const commonPageCommand = new CommonPageCommand(page);
    await commonPageCommand.navigateToPage();
});

test('User can Login successfully', async ({ page }) => {
    const loginPageCommand = new LoginPageCommand(page);
    const homePageCommand = new HomepageCommand(page);
    await homePageCommand.clickAdminLink();
    await loginPageCommand.login(process.env.USERNAME as string, process.env.PASSWORD as string);
});