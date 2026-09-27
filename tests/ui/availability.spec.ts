import { test, expect } from '../fixtures/test-fixtures';
import { addDaysToCurrentDate } from '../../utils/dateUtils';
import { readData } from '../../utils/unifiedDataReader';

const bookingDates = readData("test-data/bookingDates.json");
const bookingInvalidInputs = readData("test-data/bookingInvalidInputs.json");

test.describe("Room availability functionality", () => {

    test("Default 'Check In' and 'Check Out' dates", async ({ homePage }) => {

        await test.step("Click the [Check Availability] button", async () => {
            await homePage.checkAvailabilityButton.click();
        });

        await test.step("Verify if the rooms are displayed", async () => {
            await expect(homePage.bookNowFirstRoomButton).toBeVisible();
        });
    });

    for (const data of bookingDates) {

        test(`${data.name} dates`, async ({ homePage }) => {

            test.skip(data.run !== "yes");

            await test.step("Fill in the 'Check In' field", async () => {
                await homePage.checkInInput.fill(addDaysToCurrentDate(data.checkInDaysFromToday));
            });

            await test.step("Fill in the 'Check Out' field", async () => {
                await homePage.checkOutInput.fill(addDaysToCurrentDate(data.checkOutDaysFromToday));
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

    for (const data of bookingInvalidInputs) {

        test(`${data.name} values`, async ({ homePage }) => {

            test.skip(data.run !== "yes");

            await test.step("Fill in the 'Check In' field", async () => {
                await homePage.checkInInput.fill(data.input);
            });

            await test.step("Fill in the 'Check Out' field", async () => {
                await homePage.checkOutInput.fill(data.input);
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