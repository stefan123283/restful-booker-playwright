import { test, expect } from '@playwright/test';
import { readData } from '../../utils/unifiedDataReader';
import { booking } from '../../models/booking';
import testConfig from "../../config/test-config.json";
import { createBookingRecord, partialUpdateBookingRecord } from '../../utils/restfulBookerApi';

test.describe("API - Booking - PartialUpdateBooking - Authentificated user", () => {

    test.use({
        extraHTTPHeaders: {
            'Authorization': testConfig.RestfulBooker.authHeader,
        }
    });

    test("Successfull partial update - all valid fields", async () => {
        const createBookingData = booking;
        const createBookingresponse = await createBookingRecord(createBookingData);
        const createBookingResponseresponseBody = await createBookingresponse.json();
        const bookingID = createBookingResponseresponseBody.bookingid;
        expect(createBookingresponse.status()).toEqual(200);

        const updateBookingData = booking;
        const partialUpdateBookingresponse = await partialUpdateBookingRecord(updateBookingData, bookingID);
        const partialpartialUpdateBookingResponseBody = await partialUpdateBookingresponse.json();
        expect(partialUpdateBookingresponse.status()).toEqual(200);
        expect(await partialpartialUpdateBookingResponseBody).toEqual(updateBookingData);
    });

    test("Successfull partial update - no updated fields", async () => {
        const createBookingData = booking;
        const createBookingresponse = await createBookingRecord(createBookingData);
        const createBookingResponseresponseBody = await createBookingresponse.json();
        const bookingID = createBookingResponseresponseBody.bookingid;
        expect(createBookingresponse.status()).toEqual(200);

        const partialUpdateBookingresponse = await partialUpdateBookingRecord({}, bookingID);
        const partialUpdateBookingResponseBody = await partialUpdateBookingresponse.json();
        expect(partialUpdateBookingresponse.status()).toEqual(200);
        expect(await partialUpdateBookingResponseBody).toEqual(createBookingData);
    });

    const partialUpdate = readData("tests/Restful-Booker/test-data/partialUpdate.json");

    for (const data of partialUpdate.bookingData) {

        test(`Successfull partial update - only ${data.field}`, async () => {
            const createBookingData = booking;
            const createBookingresponse = await createBookingRecord(createBookingData);
            const createBookingResponseresponseBody = await createBookingresponse.json();
            const bookingID = createBookingResponseresponseBody.bookingid;
            expect(createBookingresponse.status()).toEqual(200);

            const partialUpdateBookingresponse = await partialUpdateBookingRecord(data.payload, bookingID);
            expect(partialUpdateBookingresponse.status()).toEqual(200);
        });

    }

    test("Unsuccessfull partial update - non-existent id", async () => {
        test.skip(true, "Blocked by GitHub issue #10");
        const createBookingData = booking;
        const createBookingresponse = await createBookingRecord(createBookingData);
        expect(createBookingresponse.status()).toEqual(200);

        const updateBookingData = booking;
        const partialUpdateBookingresponse = await partialUpdateBookingRecord(updateBookingData, "0");
        expect(partialUpdateBookingresponse.status()).toEqual(404);
    });

})

test.describe("API - Booking - PartialUpdateBooking - Unauthentificated user", () => {

    test("Unsuccessfull partial update - no authentification", async () => {
        test.skip(true, "Blocked by GitHub issue #11");
        const createBookingData = booking;
        const createBookingresponse = await createBookingRecord(createBookingData);
        const createBookingResponseresponseBody = await createBookingresponse.json();
        const bookingID = createBookingResponseresponseBody.bookingid;
        expect(createBookingresponse.status()).toEqual(200);

        const updateBookingData = booking;
        const partialUpdateBookingresponse = await partialUpdateBookingRecord(updateBookingData, bookingID);
        expect(partialUpdateBookingresponse.status()).toEqual(401);
    });

})