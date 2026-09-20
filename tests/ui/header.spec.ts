import {test} from '@playwright/test';
import {HomePage} from '../../pages/HomePage';

test("Verify functionality of header links", async ({page}) => {
const homePage = new HomePage(page);
await homePage.navigateToHomePageByURL();
await homePage.verifyLinkFunctionality("Rooms");
await homePage.verifyLinkFunctionality("Booking");
await homePage.verifyLinkFunctionality("Location");
await homePage.verifyLinkFunctionality("Contact");
});

test("Verify functionality of Home header link", async ({page}) => {
const homePage = new HomePage(page);
await homePage.navigateToHomePageByURL();
await homePage.navigateToBookingPageOfFirstRoom();
await homePage.navigateToHomePageByHomeLink();

});

test.fixme("Verify functionality of 'Amenities' header link", async ({page}) => {
const homePage = new HomePage(page);
await homePage.navigateToHomePageByURL();
await homePage.verifyLinkFunctionality("Amenities");
});