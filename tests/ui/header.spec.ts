import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test("Verify functionality of 'Rooms' header link", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    await homePage.roomsHeaderLink.click();
    await expect(homePage.roomsSection).toBeInViewport();
});

test("Verify functionality of 'Booking' header link", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    await homePage.bookingHeaderLink.click();
    await expect(homePage.bookingSection).toBeInViewport();
});

test.fixme("Verify functionality of 'Amenities' header link", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    await homePage.amenitiesHeaderLink.click();
    await expect(homePage.amenitiesSection).toBeInViewport();
});

test("Verify functionality of 'Location' header link", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    await homePage.locationHeaderLink.click();
    await expect(homePage.locationSection).toBeInViewport();
});

test("Verify functionality of 'Contact' header link", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    await homePage.contactHeaderLink.click();
    await expect(homePage.contactSection).toBeInViewport();
});

test("Verify functionality of Home header link", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    await homePage.bookNowFirstRoomButton.click();
    await expect(page).toHaveURL(/\/reservation\/1/);
    await homePage.homeHeaderLink.click();
    await expect(homePage.bookNowBannerButton).toBeVisible();
});
