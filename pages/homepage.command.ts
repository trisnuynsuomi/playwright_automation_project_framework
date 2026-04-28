import { Page } from "@playwright/test";

export class HomepageCommand {
    adminLink = 'li a[href="/admin"]';


    constructor(private page: Page) {}

    async clickAdminLink() {
        await this.page.locator(this.adminLink).click();
    }
}