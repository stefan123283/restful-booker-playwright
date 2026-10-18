import { test, expect } from '../fixtures/restfulBookerPlatformFixtures';

test("UI - Verify functionality of [Book Now] banner button", async ({ homePage }) => {

    await test.step("Click the [Book Now] banner button", async () => {
        await homePage.bookNowBannerButton.click();
    });

    await test.step("Verify if the booking section is displayed in the viewport", async () => {
        await expect(homePage.bookingSection).toBeInViewport();
    });

});
