import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test("Verify functionality of 'Rooms' header link", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePageByURL();
    await homePage.clickRoomsHeaderLink();
    await expect(homePage.roomsSection).toBeInViewport();
});

test("Verify functionality of 'Booking' header link", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePageByURL();
    await homePage.clickBookingHeaderLink();
    await expect(homePage.bookingSection).toBeInViewport();
});

test.fixme("Verify functionality of 'Amenities' header link", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePageByURL();
    await homePage.clickAmenitiesHeaderLink();
    await expect(homePage.amenitiesSection).toBeInViewport();
});

test("Verify functionality of 'Location' header link", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePageByURL();
    await homePage.clickLocationHeaderLink();
    await expect(homePage.locationSection).toBeInViewport();
});

test("Verify functionality of 'Contact' header link", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePageByURL();
    await homePage.clickContactHeaderLink();
    await expect(homePage.contactSection).toBeInViewport();
});

test("Verify functionality of Home header link", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePageByURL();
    await homePage.navigateToBookingPageOfFirstRoom();
    await expect(page).toHaveURL(/\/reservation\/1/);
    await homePage.navigateToHomePageByHomeLink();
    await expect(homePage.bookNowBannerButton).toBeVisible();
});
