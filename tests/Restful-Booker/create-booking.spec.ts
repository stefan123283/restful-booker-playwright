import { test, expect } from '@playwright/test';
import { readData } from '../../utils/unifiedDataReader';
import { booking } from '../../models/booking';
import { createBookingRecord } from '../../utils/restfulBookerApi';

test.describe("API - Booking - CreateBooking", () => {

    test("Successfull submission - all valid fields", async () => {

        const bookingData = booking;
        const response = await createBookingRecord(bookingData);
        const responseBody = await response.json();
        const bookingID = responseBody.bookingid;

        expect(response.status()).toEqual(200);
        expect(await responseBody).toEqual(
            {
                "bookingid": bookingID,
                "booking": bookingData
            }
        );

    });

    const depositPaidValues = readData("tests/Restful-Booker/test-data/depositPaidValues.json");

    for (const data of depositPaidValues) {

        test(`Successfull submission - "depositpaid": ${data.value}`, async () => {

            const bookingData = booking;
            bookingData.depositpaid = data.value;
            const response = await createBookingRecord(bookingData);
            const responseBody = await response.json();
            const bookingID = responseBody.bookingid;

            expect(response.status()).toEqual(200);
            expect(await responseBody).toEqual({
                "bookingid": bookingID,
                "booking": bookingData
            });

        });
    }

    const invalidDates = readData("tests/Restful-Booker/test-data/invalidDates.json");

    for (const data of invalidDates) {

        test(`Invalid submission - "checkin" field with ${data.name}`, async () => {

            const bookingData = booking;
            bookingData.bookingdates.checkin = data.date;
            const response = await createBookingRecord(bookingData);
            const responseBody = await response.json();
            const bookingID = responseBody.bookingid;

            if (data.expected === "success") {

                expect(response.status()).toEqual(200);
                bookingData.bookingdates.checkin = "2027-09-20";
                expect(await responseBody).toEqual({
                    "bookingid": bookingID,
                    "booking": bookingData
                });

            } else {
                expect(response.status()).toEqual(422);
            }

        });

    }

    for (const data of invalidDates) {

        test(`Invalid submission - "checkout" field with ${data.name}`, async () => {

            const bookingData = booking;
            bookingData.bookingdates.checkout = data.date;
            const response = await createBookingRecord(bookingData);
            const responseBody = await response.json();
            const bookingID = responseBody.bookingid;

            if (data.expected === "success") {

                expect(response.status()).toEqual(200);
                bookingData.bookingdates.checkout = "2027-09-20";
                expect(await responseBody).toEqual({
                    "bookingid": bookingID,
                    "booking": bookingData
                });

            } else {
                expect(response.status()).toEqual(422);
            }

        });

    }

    test('Invalid submission - empty "firstname"', async () => {
        test.skip(true, "Blocked by GitHub issue #6");
        const bookingData = booking;
        bookingData.firstname = "";
        const response = await createBookingRecord(bookingData);
        expect(response.status()).toEqual(422);
    });

    test('Invalid submission - "checkout" before "checkin"', async () => {
        test.skip(true, "Blocked by GitHub issue #7");
        const bookingData = booking;
        bookingData.bookingdates.checkin = "2026-10-12";
        bookingData.bookingdates.checkout = "2026-10-10";
        const response = await createBookingRecord(bookingData);
        expect(response.status()).toEqual(422);
    });

    test('Invalid submission - negative "totalprice" value', async () => {
        test.skip(true, "Blocked by GitHub issue #8");
        const bookingData = booking;
        bookingData.totalprice = -100;
        const response = await createBookingRecord(bookingData);
        expect(response.status()).toEqual(422);
    });

    const missingRequiredFields = readData("tests/Restful-Booker/test-data/missingRequiredFields.json");

    for (const data of missingRequiredFields.bookingData) {

        test(`Invalid submission - missing "${data.missingField}"`, async () => {
            test.skip(data.run !== "yes", "Blocked by GitHub issue #9");
            const response = await createBookingRecord(data.payload);
            expect(response.status()).toEqual(400);
        });

    }

})