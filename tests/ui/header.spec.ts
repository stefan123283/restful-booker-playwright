import { test, expect } from '../fixtures/test-fixtures';

test.describe("Header links functionality", () => {

    test('"Rooms" link', async ({ homePage }) => {

        await test.step('Click the "Rooms" header link', async () => {
            await homePage.roomsHeaderLink.click();
        });

        await test.step("Verify if the rooms section is displayed in the viewport", async () => {
            await expect(homePage.roomsSection).toBeInViewport();
        });

    });

    test('"Booking" link', async ({ homePage }) => {

        await test.step('Click the "Booking" header link', async () => {
            await homePage.bookingHeaderLink.click();
        });

        await test.step("Verify if the booking section is displayed in the viewport", async () => {
            await expect(homePage.bookingSection).toBeInViewport();
        });

    });

    test('"Amenities" link', async ({ homePage }) => {

        test.skip(true, "Blocked by GitHub issue #1");

        await test.step('Click the "Amenities" header link', async () => {
            await homePage.amenitiesHeaderLink.click();
        });

        await test.step("Verify if the amenities section is displayed in the viewport", async () => {
            await expect(homePage.amenitiesSection).toBeInViewport();
        });

    });

    test('"Location" link', async ({ homePage }) => {

        await test.step('Click the "Location" header link', async () => {
            await homePage.locationHeaderLink.click();
        });

        await test.step("Verify if the location section is displayed in the viewport", async () => {
            await expect(homePage.locationSection).toBeInViewport();
        });

    });

    test('"Contact" link', async ({ homePage }) => {

        await test.step('Click the "Contact" header link', async () => {
            await homePage.contactHeaderLink.click();
        });

        await test.step("Verify if the contact section is displayed in the viewport", async () => {
            await expect(homePage.contactSection).toBeInViewport();
        });

    });

    test('"Home" link', async ({ homePage }) => {

        await test.step('Click the "Location" header link', async () => {
            await homePage.locationHeaderLink.click();
        });

        await test.step("Verify if the location section is displayed in the viewport", async () => {
            await expect(homePage.locationSection).toBeInViewport();
        });

        await test.step('Click the "Home" header link', async () => {
            await homePage.homeHeaderLink.click();
        });

        await test.step("Verify if the page reloads", async () => {
            await expect(homePage.bookNowBannerButton).toBeInViewport();
        });

    });

});
