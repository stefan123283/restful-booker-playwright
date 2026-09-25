import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { addDaysToCurrentDate } from '../../utils/dateUtils';
import bookingDates from '../../test-data/json/bookingDates.json';
import bookingInvalidInputs from '../../test-data/json/bookingInvalidInputs.json';

test("Verify room availability using default 'Check In' and 'Check Out' dates", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    await homePage.checkAvailabilityButton.click();
    await expect(homePage.bookNowFirstRoomButton).toBeVisible();
});

bookingDates.forEach((data) => {
    if (!data.run) return;

    test(`Verify room availability with ${data.name}`, async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigateToHomePage();

        await homePage.checkInInput.fill(addDaysToCurrentDate(data.checkInDaysFromToday));
        await homePage.checkOutInput.fill(addDaysToCurrentDate(data.checkOutDaysFromToday));
        await homePage.checkAvailabilityButton.click();

        if (data.expected === "visible") {
            await expect(homePage.bookNowFirstRoomButton).toBeVisible();
        } else {
            await expect(homePage.bookNowFirstRoomButton).not.toBeVisible();
        }

    });
});

bookingInvalidInputs.forEach((data) => {
    if (!data.run) return;

    test(`Verify room availability with ${data.name}`, async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigateToHomePage();
        await homePage.checkInInput.fill(data.input);
        await homePage.checkOutInput.fill(data.input);
        await homePage.checkAvailabilityButton.click();
        await expect(homePage.bookNowFirstRoomButton).toBeVisible();
    });
});

