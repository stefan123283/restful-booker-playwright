import { test, expect } from '@playwright/test';
import { booking } from '../../models/booking';
import testConfig from "../../config/test-config.json";
import { createBookingRecord, deleteBookingRecord } from '../../utils/restfulBookerApi';

test.describe("API - Booking - DeleteBooking - Authentificated user", () => {

    test.use({
        extraHTTPHeaders: {
            'Authorization': testConfig.RestfulBooker.authHeader,
        }
    });

    test("Successfull delete - non-existent id", async () => {
        const createBookingData = booking;
        const createBookingresponse = await createBookingRecord(createBookingData);
        const createBookingResponseresponseBody = await createBookingresponse.json();
        const bookingID = createBookingResponseresponseBody.bookingid;
        expect(createBookingresponse.status()).toEqual(200);

        const deleteBookingresponse = await deleteBookingRecord(bookingID);
        expect(deleteBookingresponse.status()).toEqual(201);
    });

    test("Unsuccessfull delete - invalid id", async () => {
        test.skip(true, "Blocked by GitHub issue #10");
        const createBookingData = booking;
        const createBookingresponse = await createBookingRecord(createBookingData);
        expect(createBookingresponse.status()).toEqual(200);

        const deleteBookingresponse = await deleteBookingRecord("0");
        expect(deleteBookingresponse.status()).toEqual(404);
    });

})

test.describe("API - Booking - DeleteBooking - Authentificated user", () => {

    test("Unsuccessfull delete - no authentification", async () => {
        test.skip(true, "Blocked by GitHub issue #11");
        const createBookingData = booking;
        const createBookingresponse = await createBookingRecord(createBookingData);
        const createBookingResponseresponseBody = await createBookingresponse.json();
        const bookingID = createBookingResponseresponseBody.bookingid;
        expect(createBookingresponse.status()).toEqual(200);

        const deleteBookingresponse = await deleteBookingRecord(bookingID);
        expect(deleteBookingresponse.status()).toEqual(401);
    });

})