import { test, expect } from '@playwright/test';
import { booking } from '../../models/booking';
import { createBookingRecord, getBooking } from '../../utils/restfulBookerApi';

test.describe("API - Booking - GetBooking", () => {

    test("Existent ID", async () => {
        const createBookingData = booking;
        const createBookingResponse = await createBookingRecord(createBookingData);
        const createBookingResponseBody = await createBookingResponse.json();
        const bookingID = createBookingResponseBody.bookingid;
        expect(createBookingResponse.status()).toEqual(200);

        const getBookingResponse = await getBooking(bookingID);
        const getBookingResponseBody = await getBookingResponse.json();
        expect(getBookingResponse.status()).toEqual(200);
        expect(getBookingResponseBody).toEqual(createBookingData);
    });

    test("Non-existent ID", async () => {
        const getBookingResponse = await getBooking("0");
        expect(getBookingResponse.status()).toEqual(404);
    });

})