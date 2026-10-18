import { request } from '@playwright/test';
import testConfig from "../config/test-config.json";

const baseURL = testConfig.RestfulBooker.baseURL;

export async function createToken(username: string, password: string) {
    const apiContext = await request.newContext();
    const response = await apiContext.post(baseURL + 'auth', {
        data: {
            "username": username,
            "password": password
        }
    });
    return response;
}

export async function getBookingIds(queryParameter1: string, queryValue1: string, queryParameter2: string, queryValue2: string) {
    const apiContext = await request.newContext();
    const response = await apiContext.get(baseURL + 'booking/' + '?' + queryParameter1 + '=' + queryValue1 + '&'
        + queryParameter2 + '=' + queryValue2);
    return response;
}

export async function getBooking(bookingID: string) {
    const apiContext = await request.newContext();
    const response = await apiContext.get(baseURL + 'booking/' + bookingID);
    return response;
}

export async function createBookingRecord(bookingData: any) {
    const apiContext = await request.newContext();
    const response = await apiContext.post(baseURL + 'booking', {
        data: bookingData
    });
    return response;
}

export async function updateBookingRecord(bookingData: any, bookingID: string) {
    const apiContext = await request.newContext();
    const response = await apiContext.put(baseURL + 'booking/' + bookingID, {
        data: bookingData
    });
    return response;
}

export async function partialUpdateBookingRecord(bookingData: any, bookingID: string) {
    const apiContext = await request.newContext();
    const response = await apiContext.patch(baseURL + 'booking/' + bookingID, {
        data: bookingData
    });
    return response;
}

export async function deleteBookingRecord(bookingID: string) {
    const apiContext = await request.newContext();
    const response = await apiContext.delete(baseURL + 'booking/' + bookingID);
    return response;
}

export async function healthCheck() {
    const apiContext = await request.newContext();
    const response = await apiContext.get(baseURL + 'ping');
    return response;
}
