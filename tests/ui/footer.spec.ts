import { test, expect } from '../fixtures/test-fixtures';

test.describe("Footer links functionality", () => {

    test('"Home" link', async ({ homePage }) => {

        await test.step('Click the "Home" footer link', async () => {
            await homePage.homeFooterLink.click();
        });

        await test.step("Verify if the page scrolls to top", async () => {
            await expect(homePage.bookNowBannerButton).toBeInViewport();
        });

    });

    test('"Rooms" link', async ({ homePage }) => {

        test.skip(true, "Blocked by GitHub issue #3");

        await test.step('Click the "Rooms" footer link', async () => {
            await homePage.roomsFooterLink.click();
        });

        await test.step("Verify if the rooms section is displayed in the viewport", async () => {
            await expect(homePage.roomsSection).toBeInViewport();
        });

    });

    test('"Booking" link', async ({ homePage }) => {

        test.skip(true, "Blocked by GitHub issue #3");

        await test.step('Click the "Booking" footer link', async () => {
            await homePage.bookingFooterLink.click();
        });

        await test.step("Verify if the booking section is displayed in the viewport", async () => {
            await expect(homePage.bookingSection).toBeInViewport();
        });

    });

    test('"Contact" link', async ({ homePage }) => {

        test.skip(true, "Blocked by GitHub issue #3");

        await test.step('Click the "Contact" footer link', async () => {
            await homePage.contactFooterLink.click();
        });

        await test.step("Verify if the contact section is displayed in the viewport", async () => {
            await expect(homePage.contactSection).toBeInViewport();
        });

    });

});
