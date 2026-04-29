import { Page } from "@playwright/test";
import { CommonPageCommand } from "../../pages/common.command";
import { HomepageCommand } from "../../pages/homepage.command";
import { LoginPageCommand } from "../../pages/login.command";

export const createPages = (page: Page) => {
    const commonPageCommand = new CommonPageCommand(page);
    const loginPageCommand = new LoginPageCommand(page, commonPageCommand);
    const homepageCommand = new HomepageCommand(page);
    return {
      commonPageCommand,
      loginPageCommand,
      homepageCommand,
    };
};              