import { test, expect } from '@playwright/test';
import { readData } from '../../utils/unifiedDataReader';
import { booking } from '../../models/booking';
import testConfig from "../../config/test-config.json";
import { createBookingRecord, updateBookingRecord } from '../../utils/restfulBookerApi';

test.describe("API - Booking - UpdateBooking - Authentificated user", () => {

    test.use({
        extraHTTPHeaders: {
            'Authorization': testConfig.RestfulBooker.authHeader,
        }
    });

    test("Successfull update - all valid fields", async () => {
        const createBookingData = booking;
        const createBookingresponse = await createBookingRecord(createBookingData);
        const createBookingResponseresponseBody = await createBookingresponse.json();
        const bookingID = createBookingResponseresponseBody.bookingid;
        expect(createBookingresponse.status()).toEqual(200);

        const updateBookingData = booking;
        const updateBookingresponse = await updateBookingRecord(updateBookingData, bookingID);
        const updateBookingResponseBody = await updateBookingresponse.json();
        expect(updateBookingresponse.status()).toEqual(200);
        expect(await updateBookingResponseBody).toEqual(updateBookingData);
    });

    test("Unsuccessfull update - non-existent id", async () => {
        test.skip(true, "Blocked by GitHub issue #10");
        const createBookingData = booking;
        const createBookingresponse = await createBookingRecord(createBookingData);
        expect(createBookingresponse.status()).toEqual(200);

        const updateBookingData = booking;
        const updateBookingresponse = await updateBookingRecord(updateBookingData, "0");
        expect(updateBookingresponse.status()).toEqual(404);
    });

    const missingRequiredFields = readData("tests/Restful-Booker/test-data/missingRequiredFields.json");

    for (const data of missingRequiredFields.bookingData) {

        test(`Unsuccessfull update - missing "${data.missingField}"`, async () => {
            const createBookingData = booking;
            const createBookingresponse = await createBookingRecord(createBookingData);
            const createBookingResponseresponseBody = await createBookingresponse.json();
            const bookingID = createBookingResponseresponseBody.bookingid;
            expect(createBookingresponse.status()).toEqual(200);

            const updateBookingresponse = await updateBookingRecord(data.payload, bookingID);
            expect(updateBookingresponse.status()).toEqual(400);
        });

    }

})

test.describe("API - Booking - UpdateBooking - Unauthentification user", () => {

    test("Unsuccessfull update - no authentification", async () => {
        test.skip(true, "Blocked by GitHub issue #11");
        const createBookingData = booking;
        const createBookingresponse = await createBookingRecord(createBookingData);
        const createBookingResponseresponseBody = await createBookingresponse.json();
        const bookingID = createBookingResponseresponseBody.bookingid;
        expect(createBookingresponse.status()).toEqual(200);

        const updateBookingData = booking;
        const updateBookingresponse = await updateBookingRecord(updateBookingData, bookingID);
        expect(updateBookingresponse.status()).toEqual(401);
    });

})