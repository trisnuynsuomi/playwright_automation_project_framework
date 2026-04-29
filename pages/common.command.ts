import { Page, Response } from "@playwright/test";
import dotenv from "dotenv";
import { HomepageRoomResponse } from "../utils/types/homePage.types";

dotenv.config();

export class CommonPageCommand {

  constructor(private readonly page: Page) {}

  async navigateToPage() {
    await this.triggerAndWaitApi<HomepageRoomResponse>("/api/room", 200, async () => {
      await this.page.goto("");
    });
  }

  async triggerAndWaitApi<T = any>(
    url: string,
    status: number,
    action: () => Promise<void>,
  ): Promise<{ response: Response; body: T }> {
    const responsePromise = this.page.waitForResponse(
      (res) => res.url().includes(url) && res.status() === status,
    );

    await action();

    const response = await responsePromise;
    console.log(`API URL: ${response.url()}, API Status: ${response.status()}`);
    let body: T | null = null;

    try {
      body = await response.json();
      console.log('API body:', JSON.stringify(body, null, 2));
    } catch (e) {
      console.log('No JSON body or cannot parse');
    }
    return { response, body: body as T };
  }
}



