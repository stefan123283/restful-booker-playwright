import { Page, Locator } from '@playwright/test';

export class HomePage {

    readonly page: Page;
    readonly homeHeaderLink: Locator;
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
    readonly bookNowBannerButton: Locator;
    readonly bookNowFirstRoomButton: Locator;
    readonly checkInInput: Locator;
    readonly checkOutInput: Locator;
    readonly checkAvailabilityButton: Locator;

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
        this.checkInInput = page.locator("//label[text()='Check In']//..//input");
        this.checkOutInput = page.locator("//label[text()='Check Out']//..//input");
        this.checkAvailabilityButton = page.locator("//button[text()='Check Availability']");
    }

}
