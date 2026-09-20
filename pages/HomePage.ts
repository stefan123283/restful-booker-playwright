import {Page, Locator, expect} from '@playwright/test';

export class HomePage {

    readonly page: Page;
    readonly homeHeaderLink : Locator;
    readonly roomsHeaderLink: Locator;
    readonly bookingHeaderLink: Locator;
    readonly amenitiesHeaderLink: Locator;
    readonly locationHeaderLink: Locator;
    readonly contactHeaderLink: Locator;
    readonly roomsSection: Locator;
    readonly bookingSection: Locator;
    readonly amenitiesSection: Locator;
    readonly locationSection: Locator;
    readonly contactSection: Locator;
    readonly bookNowBannerButton : Locator;
    readonly bookNowFirstRoomButton : Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeHeaderLink = page.locator("//a[.='Shady Meadows B&B']");
        this.roomsHeaderLink = page.locator("(//a[text()='Rooms'])[1]");
        this.bookingHeaderLink = page.locator("(//a[text()='Booking'])[1]");
        this.amenitiesHeaderLink = page.locator("(//a[text()='Amenities'])[1]");
        this.locationHeaderLink = page.locator("(//a[text()='Location'])[1]");
        this.contactHeaderLink = page.locator("(//a[text()='Contact'])[1]");
        this.roomsSection = page.locator("#rooms");
        this.bookingSection = page.locator("#booking");
        this.amenitiesSection = page.locator("#amenities");
        this.locationSection = page.locator("#location");
        this.contactSection = page.locator("#contact");
        this.bookNowBannerButton = page.locator("//a[text()='Book Now']");
        this.bookNowFirstRoomButton = page.locator("(//a[text()='Book now'])[1]");
    }

    async navigateToHomePageByURL() {
        await this.page.goto('/');
        await expect(this.bookNowBannerButton).toBeVisible();
    }

    async verifyLinkFunctionality(link: String) {
        switch (link.toUpperCase()) {
            case "ROOMS":
                await this.roomsHeaderLink.click();
                await expect (this.roomsSection).toBeInViewport();
                break;
            case "BOOKING":
                await this.bookingHeaderLink.click();
                await expect(this.bookingSection).toBeInViewport();
                break;
            case "AMENITIES":
                await this.amenitiesHeaderLink.click();
                await expect(this.amenitiesSection).toBeInViewport();
                break;
            case "LOCATION":
                await this.locationHeaderLink.click();
                await expect(this.locationSection).toBeInViewport();
                break;
            case "CONTACT":
                await this.contactHeaderLink.click();
                await expect(this.contactSection).toBeInViewport();
                break;
        }
    }

    async verifyBookNowBannerButtonFunctionality(){
        await this.bookNowBannerButton.click();
        await expect(this.bookingSection).toBeInViewport();
    }

    async navigateToBookingPageOfFirstRoom(){
        await this.bookNowFirstRoomButton.focus();
        await this.bookNowFirstRoomButton.click();
        await expect(this.page).toHaveURL(/\/reservation\/1/);
    }

    async navigateToHomePageByHomeLink(){
        await this.homeHeaderLink.click();
        await expect(this.bookNowBannerButton).toBeVisible();
    }

}