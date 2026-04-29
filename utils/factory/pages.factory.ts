import { Page } from "@playwright/test";
import { CommonPageCommand } from "../../pages/common.command";
import { HomepageCommand } from "../../pages/homepage.command";
import { LoginPageCommand } from "../../pages/login.command";

export const createPages = (page: Page) => {
    return {
      commonPageCommand: new CommonPageCommand(page),
      loginPageCommand: new LoginPageCommand(page),
      homepageCommand: new HomepageCommand(page),
    };
  };          