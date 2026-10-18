import { test, expect } from '@playwright/test';
import { readData } from '../../utils/unifiedDataReader';
import { booking } from '../../models/booking';
import { createBookingRecord, getBookingIds } from '../../utils/restfulBookerApi';

test.describe("API - Booking - GetBookingIds", () => {

    test("All IDs", async () => {
        const getBookingIdsResponse = await getBookingIds("", "", "", "");
        const getBookingIdsResponseBody = await getBookingIdsResponse.json();
        expect(getBookingIdsResponse.status()).toBe(200);
        expect(typeof getBookingIdsResponseBody[0].bookingid).toEqual("number");
    });

    const filterData = readData("tests/Restful-Booker/test-data/filterData.json");

    for (const data of filterData) {

        test(`Filter by ${data.name}`, async () => {

            test.skip(data.run !== "yes", "Blocked by GitHub issue #5");

            const createBookingData = booking;
            const createBookingResponse = await createBookingRecord(createBookingData);
            const createBookingResponseBody = await createBookingResponse.json();
            const bookingID = createBookingResponseBody.bookingid;
            expect(createBookingResponse.status()).toEqual(200);

            let queryParameter1 = '';
            let queryParameter2 = '';
            let queryValue1 = '';
            let queryValue2 = '';

            switch (data.name) {
                case 'firstname': {
                    queryParameter1 = 'firstname';
                    queryValue1 = createBookingData.firstname;
                    break;
                }
                case 'lastname': {
                    queryParameter1 = 'lastname';
                    queryValue1 = createBookingData.lastname;
                    break;
                }
                case 'firstname and lastname': {
                    queryParameter1 = 'firstname';
                    queryValue1 = createBookingData.firstname;
                    queryParameter2 = 'lastname';
                    queryValue2 = createBookingData.lastname;
                    break;
                }
                case 'checkin': {
                    queryParameter1 = 'checkin';
                    queryValue1 = createBookingData.bookingdates.checkin;
                    break;
                }
                case 'checkout': {
                    queryParameter1 = 'checkout';
                    queryValue1 = createBookingData.bookingdates.checkout;
                    break;
                }
                case 'checkin and checkout': {
                    queryParameter1 = 'checkin';
                    queryValue1 = createBookingData.bookingdates.checkin;
                    queryParameter2 = 'checkout';
                    queryValue2 = createBookingData.bookingdates.checkout;
                }
            }

            const getBookingIdsResponse = await getBookingIds(queryParameter1, queryValue1, queryParameter2, queryValue2);
            const getBookingIdsResponseBody = await getBookingIdsResponse.json();
            expect(getBookingIdsResponse.status()).toBe(200);
            expect(await getBookingIdsResponseBody).toContainEqual({ "bookingid": bookingID });
        });

    }

})