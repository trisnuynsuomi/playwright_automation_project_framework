import { Page } from "@playwright/test";
import { CommonPageCommand } from "./common.command";
import { LoginResponse } from "../utils/types/login.types";   

export class LoginPageCommand {
    constructor(
        private readonly page: Page,
        private readonly commonPageCommand: CommonPageCommand,
    ) {}

    username = '[id="username"]';
    password = '[id="password"]';
    loginButton = '[id="doLogin"]';

    async login(userName: string, password: string) {
        await this.page.locator(this.username).fill(userName);
        await this.page.locator(this.password).fill(password);
        const body = await this.commonPageCommand.triggerAndWaitApi<LoginResponse>("/api/auth/login", 200, async () => {
            await this.page.locator(this.loginButton).click();
        });
    }
}