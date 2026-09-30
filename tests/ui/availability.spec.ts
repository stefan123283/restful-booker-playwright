import { test, expect } from '../fixtures/test-fixtures';
import { addDaysToCurrentDate } from '../../utils/testDataUtils';
import { readData } from '../../utils/unifiedDataReader';

const dates = readData("test-data/availability/dates.json");
const invalidInputs = readData("test-data/availability/invalidInputs.json");

test.describe("Room availability functionality", () => {

    test('Default "Check In" and "Check Out" dates', async ({ homePage }) => {

        await test.step("Click the [Check Availability] button", async () => {
            await homePage.checkAvailabilityButton.click();
        });

        await test.step("Verify if the rooms are displayed", async () => {
            await expect(homePage.bookNowFirstRoomButton).toBeVisible();
        });
    });

    for (const data of dates) {

        test(`${data.name} dates`, async ({ homePage }) => {

            test.skip(data.run !== "yes", "Blocked by GitHub issue #2");

            await test.step("Populate the booking form", async () => {
                await homePage.populateBookingForm(addDaysToCurrentDate(data.checkInDaysFromToday),
                    addDaysToCurrentDate(data.checkOutDaysFromToday));
            });

            await test.step("Click the [Check Availability] button", async () => {
                await homePage.checkAvailabilityButton.click();
            });

            await test.step("Verify if the rooms are displayed", async () => {
                if (data.expected === "visible") {
                    await expect(homePage.bookNowFirstRoomButton).toBeVisible();
                } else {
                    await expect(homePage.bookNowFirstRoomButton).not.toBeVisible();
                }
            });
        });
    }

    for (const data of invalidInputs) {

        test(`${data.name} values`, async ({ homePage }) => {

            test.skip(data.run !== "yes");

            await test.step("Populate the booking form", async () => {
                await homePage.populateBookingForm(data.input, data.input);
            });

            await test.step("Click the [Check Availability] button", async () => {
                await homePage.checkAvailabilityButton.click();
            });

            await test.step("Verify if the rooms are displayed", async () => {
                await expect(homePage.bookNowFirstRoomButton).toBeVisible();
            });

        });
    }
})