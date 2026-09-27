import { test, expect } from '../fixtures/test-fixtures';

test("Verify functionality of [Book Now] banner button", async ({ homePage }) => {

    await test.step("Click the [Book Now] button", async () => {
        await homePage.bookNowBannerButton.click();
    });

    await test.step("Verify if the booking section is displayed in the viewport", async () => {
        await expect(homePage.bookingSection).toBeInViewport();
    });

});