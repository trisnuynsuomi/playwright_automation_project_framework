import { test } from "../utils/fixtures/pages.fixture";

test.describe("Login Suites", () => {
  test.beforeEach(async ({ pages }) => {
    await pages.commonPageCommand.navigateToPage();
  });

  test("User can Login successfully", async ({ pages }) => {
    await pages.homepageCommand.clickAdminLink();
    await pages.loginPageCommand.login(
      process.env.USERNAME as string,
      process.env.PASSWORD as string,
    );
  });
});
