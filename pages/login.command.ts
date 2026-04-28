import { Page } from "@playwright/test";
import { CommonPageCommand } from "./common.command";
import { LoginResponse } from "../types/login.types";

export class LoginPageCommand {
    constructor( private page: Page) {}

    username = '[id="username"]';
    password = '[id="password"]';
    loginButton = '[id="doLogin"]';
    

    async login(userName: string, password: string) {
        const commonPageCommand = new CommonPageCommand(this.page);
        await this.page.locator(this.username).fill(userName);
        await this.page.locator(this.password).fill(password);
        const body = await commonPageCommand.triggerAndWaitApi<LoginResponse>(this.page, "/api/auth/login", 200, async () => {
            await this.page.locator(this.loginButton).click();
        });
    }
}