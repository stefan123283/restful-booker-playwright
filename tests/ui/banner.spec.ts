import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test("Verify functionality of [Book Now] banner button", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    await homePage.bookNowBannerButton.click();
    await expect(homePage.bookingSection).toBeInViewport();
});