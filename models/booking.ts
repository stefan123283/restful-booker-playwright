import { faker } from '@faker-js/faker';
import { generateRandomFutureDate, addDaysToDate, formatDate } from '../utils/testDataUtils';

interface BookingDates {
    checkin: string;
    checkout: string;
}

interface Booking {
    firstname: string;
    lastname: string;
    totalprice: number;
    depositpaid: boolean;
    bookingdates: BookingDates;
    additionalneeds: string;
}

function createBookingData(): Booking {
    const initialCheckInDate = generateRandomFutureDate(5);
    const initialCheckOutDate = addDaysToDate(initialCheckInDate, 2);
    return {
        "firstname": faker.person.firstName(),
        "lastname": faker.person.lastName(),
        "totalprice": faker.number.int(1000),
        "depositpaid": true,
        "bookingdates": {
            "checkin": formatDate(initialCheckInDate, "yyyy-MM-dd"),
            "checkout": formatDate(initialCheckOutDate, "yyyy-MM-dd"),
        },
        "additionalneeds": "Breakfast",
    }
}

export const booking = createBookingData();
