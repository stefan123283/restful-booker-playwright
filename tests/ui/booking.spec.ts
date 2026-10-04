import { test, expect } from '../fixtures/test-fixtures';
import { BookingPage } from '../../pages/BookingPage';
import { readData } from '../../utils/unifiedDataReader';
import { user } from '../../models/user';
import { generateRandomFutureDate, addDaysToDate, formatDate, generateRandomAlphanumericString } from '../../utils/testDataUtils';

const requiredFields = readData("test-data/booking/requiredFields.json");
const firstNameLengths = readData("test-data/booking/firstNameLengths.json");
const lastNameLengths = readData("test-data/booking/lastNameLengths.json");
const phoneLengths = readData("test-data/common/phoneLengths.json");
const invalidEmails = readData("test-data/common/invalidEmails.json");

let bookingPage: BookingPage;

test.describe("Room booking functionality", () => {

    test.beforeEach(async ({ page }) => {
        bookingPage = new BookingPage(page);
    });

    test('Verify if correct details are displayed for each room', async ({ page, homePage }) => {

        await test.step('Click the [Book now] button of the "Single Room"', async () => {
            await homePage.bookNowFirstRoomButton.click();
        });

        await test.step("Verify the details of the first room", async () => {
            await expect(bookingPage.heading).toContainText("Single Room");
        });

        await test.step("Navigate back to home page", async () => {
            await page.goBack();
        });

        await test.step("Click the [Book now] button of the second room", async () => {
            await homePage.bookNowSecondRoomButton.click();
        });

        await test.step("Verify the details of the second room", async () => {
            await expect(bookingPage.heading).toContainText("Double Room");
        });

        await test.step('Navigate back to "Home" page', async () => {
            await page.goBack();
        });

        await test.step("Click the [Book now] button of the third room", async () => {
            await homePage.bookNowThirdRoomButton.click();
        });

        await test.step("Verify the details of the third room", async () => {
            await expect(bookingPage.heading).toContainText("Suite Room");
        });

    });

    test('Verify booking creation with valid details', async ({ homePage }) => {

        const futureDate = generateRandomFutureDate(5);

        await test.step('Populate the "Check In" and "Check Out" fields', async () => {
            await homePage.populateBookingForm(formatDate(addDaysToDate(futureDate, -2)), formatDate(futureDate));
        });

        await test.step("Click the [Check Availability] button", async () => {
            await homePage.checkAvailabilityButton.click();
        });

        await test.step('Click the [Book now] button of the "Single Room"', async () => {
            await homePage.bookNowFirstRoomButton.click();
        });

        await test.step("Click the [Reserve Now] button", async () => {
            await bookingPage.reserveNowButton.click();
        });

        await test.step('Populate the "Check In" and "Check Out" fields', async () => {
            await bookingPage.populateBookingForm(user.firstName, user.lastName, user.email, user.phoneNumber);
        });

        await test.step("Click again the [Reserve Now] button", async () => {
            await bookingPage.reserveNowButton.click();
        });

        await test.step("Verify if the booking is confirmed", async () => {
            await expect(bookingPage.bookingConfirmedHeading).toBeVisible();
        });

        await test.step("Click the [Return home] button", async () => {
            await bookingPage.returnHomeButton.click();
        });

        await test.step("Verify if the user is redirected to home page", async () => {
            await expect(homePage.bookNowBannerButton).toBeVisible();
        });

    });

    for (const data of requiredFields) {

        test(`Booking creation with blank "${data.field}" field`, async ({ homePage }) => {

            await test.step('Click the [Book now] button of the "Single Room"', async () => {
                await homePage.bookNowFirstRoomButton.click();
            });

            await test.step("Click the [Reserve Now] button", async () => {
                await bookingPage.reserveNowButton.click();
            });

            await test.step('Populate the "Check In" and "Check Out" fields', async () => {
                await bookingPage.populateBookingForm(user.firstName, user.lastName, user.email, user.phoneNumber);
            });

            await test.step(`Clear the contents of the "${data.field}" field`, async () => {

                switch (`${data.field}`.toLowerCase()) {
                    case "first name": bookingPage.firstNameInput.clear();
                        break;
                    case "last name": bookingPage.lastNameInput.clear();
                        break;
                    case "email": bookingPage.emailInput.clear();
                        break;
                    case "phone": bookingPage.phoneInput.clear();
                }
            });

            await test.step("Click again the [Reserve Now] button", async () => {
                await bookingPage.reserveNowButton.click();
            });

            await test.step(`Verify if the "${data.expectedMessage}" error message is displayed`, async () => {
                await expect(bookingPage.alertMessage).toContainText(`${data.expectedMessage}`);
            });

        });

    }

    for (const data of firstNameLengths) {

        test(`Booking creation when the length of the "First name" field is "${data.name}"`, async ({ homePage }) => {

            await test.step('Click the [Book now] button of the "Single Room"', async () => {
                await homePage.bookNowFirstRoomButton.click();
            });

            await test.step("Click the [Reserve Now] button", async () => {
                await bookingPage.reserveNowButton.click();
            });

            await test.step('Populate the "Check In" and "Check Out" fields', async () => {
                await bookingPage.populateBookingForm(generateRandomAlphanumericString(data.length), user.lastName, "", user.phoneNumber);
            });

            await test.step("Click again the [Reserve Now] button", async () => {
                await bookingPage.reserveNowButton.click();
            });

            await test.step('Validate the "First name" field', async () => {
                if (data.expected === "valid") {
                    await expect(bookingPage.alertMessage).not.toContainText("size must be between 3 and 18");
                } else {
                    await expect(bookingPage.alertMessage).toContainText("size must be between 3 and 18");
                }

            });

        });

    }

    for (const data of lastNameLengths) {

        test(`Booking creation when the length of the "Last name" field is "${data.name}"`, async ({ homePage }) => {

            await test.step('Click the [Book now] button of the "Single Room"', async () => {
                await homePage.bookNowFirstRoomButton.click();
            });

            await test.step("Click the [Reserve Now] button", async () => {
                await bookingPage.reserveNowButton.click();
            });

            await test.step('Populate the "Check In" and "Check Out" fields', async () => {
                await bookingPage.populateBookingForm(user.firstName, generateRandomAlphanumericString(data.length), "", user.phoneNumber);
            });

            await test.step("Click again the [Reserve Now] button", async () => {
                await bookingPage.reserveNowButton.click();
            });

            await test.step('Validate the "Last name" field', async () => {
                if (data.expected === "valid") {
                    await expect(bookingPage.alertMessage).not.toContainText("size must be between 3 and 30");
                } else {
                    await expect(bookingPage.alertMessage).toContainText("size must be between 3 and 30");
                }

            });

        });

    }

    for (const data of phoneLengths) {

        test(`Booking creation when the length of the "Phone" field is "${data.name}"`, async ({ homePage }) => {

            await test.step('Click the [Book now] button of the "Single Room"', async () => {
                await homePage.bookNowFirstRoomButton.click();
            });

            await test.step("Click the [Reserve Now] button", async () => {
                await bookingPage.reserveNowButton.click();
            });

            await test.step('Populate the "Check In" and "Check Out" fields', async () => {
                await bookingPage.populateBookingForm(user.firstName, user.lastName, "", generateRandomAlphanumericString(data.length));
            });

            await test.step("Click again the [Reserve Now] button", async () => {
                await bookingPage.reserveNowButton.click();
            });

            await test.step('Validate the "Phone" field', async () => {
                if (data.expected === "valid") {
                    await expect(bookingPage.alertMessage).not.toContainText("size must be between 11 and 21");
                } else {
                    await expect(bookingPage.alertMessage).toContainText("size must be between 11 and 21");
                }

            });

        });

    }

    for (const data of invalidEmails) {

        test(`Booking creation when the "Email" field is missing "${data.missingPart}"`, async ({ homePage }) => {

            await test.step('Click the [Book now] button of the "Single Room"', async () => {
                await homePage.bookNowFirstRoomButton.click();
            });

            await test.step("Click the [Reserve Now] button", async () => {
                await bookingPage.reserveNowButton.click();
            });

            await test.step('Populate the "Check In" and "Check Out" fields', async () => {
                await bookingPage.populateBookingForm(user.firstName, user.lastName, data.value, user.phoneNumber);
            });

            await test.step("Click again the [Reserve Now] button", async () => {
                await bookingPage.reserveNowButton.click();
            });

            await test.step('Validate the "Email" field', async () => {

                await expect(bookingPage.alertMessage).toContainText("must be a well-formed email address");

            });

        });

    }

    test("Verify [Cancel] button from booking form", async ({ homePage }) => {

        await test.step('Click the [Book now] button of the "Single Room"', async () => {
            await homePage.bookNowFirstRoomButton.click();
        });

        await test.step("Click the [Reserve Now] button", async () => {
            await bookingPage.reserveNowButton.click();
        });

        await test.step("Click the [Cancel] button", async () => {
            await bookingPage.cancelButton.click();
        });

        await test.step("Verify that the booking form is not visible", async () => {
            await expect(bookingPage.firstNameInput).not.toBeVisible();
        });

        await test.step("Click again the [Reserve Now] button", async () => {
            await bookingPage.reserveNowButton.click();
        });

        await test.step("Verify that the booking form is visible", async () => {
            await expect(bookingPage.firstNameInput).toBeVisible();
        });

    });

    test('Verify navigation using the breadcrumbs links', async ({ page, homePage }) => {

        test.skip(true, "Blocked by GitHub issue #4");

        await test.step('Click the [Book now] button of the "Single Room"', async () => {
            await homePage.bookNowFirstRoomButton.click();
        });

        await test.step('Click the "Home" breadcrumb link', async () => {
            await bookingPage.breadcrumbHomeLink.click();
        });

        await test.step('Verify user is redirected to home page', async () => {
            await expect(homePage.bookNowBannerButton).toBeVisible();
        });

        await test.step('Navigate back to booking page', async () => {
            await page.goBack();
        });

        await test.step('Click the "Rooms" breadcrumb link', async () => {
            await bookingPage.breadcrumbRoomsLink.click();
        });

        await test.step('Verify user is redirected to the rooms section of the home page', async () => {
            await expect(homePage.roomsSection).toBeInViewport();
        });

    });

    test('Verify functionality of the [View Details] button', async ({ page, homePage }) => {

        await test.step('Click the [Book now] button of the "Single Room"', async () => {
            await homePage.bookNowFirstRoomButton.click();
        });

        await test.step('Click the [View Details] button of the "Double Room"', async () => {
            await bookingPage.viewDetailsFirstRoomButton.click();
        });

        await test.step('Verify the details of the "Double Room"', async () => {
            await expect(bookingPage.heading).toContainText("Double Room");
        });

        await test.step('Navigate back to booking page of the "Single Room"', async () => {
            await page.goBack();
        });

        await test.step('Click the [View Details] button of the "Suite Room"', async () => {
            await bookingPage.viewDetailsSecondRoomButton.click();
        });

        await test.step('Verify the details of the "Suite Room"', async () => {
            await expect(bookingPage.heading).toContainText("Suite Room");
        });

    });

})