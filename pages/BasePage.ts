import { Page, Locator } from '@playwright/test';

export abstract class BasePage {

    readonly page: Page;
    readonly homeHeaderLink: Locator;
    readonly roomsHeaderLink: Locator;
    readonly bookingHeaderLink: Locator;
    readonly amenitiesHeaderLink: Locator;
    readonly locationHeaderLink: Locator;
    readonly contactHeaderLink: Locator;
    readonly homeFooterLink: Locator;
    readonly roomsFooterLink: Locator;
    readonly bookingFooterLink: Locator;
    readonly contactFooterLink: Locator;
    readonly alertMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeHeaderLink = this.page.locator("//a[.='Shady Meadows B&B']");
        this.roomsHeaderLink = this.page.locator("(//a[text()='Rooms'])[1]");
        this.bookingHeaderLink = this.page.locator("(//a[text()='Booking'])[1]");
        this.amenitiesHeaderLink = this.page.locator("(//a[text()='Amenities'])[1]");
        this.locationHeaderLink = this.page.locator("(//a[text()='Location'])[1]");
        this.contactHeaderLink = this.page.locator("(//a[text()='Contact'])[1]");
        this.homeFooterLink = this.page.locator("(//a[.='Home'])[last()]");
        this.roomsFooterLink = this.page.locator("(//a[text()='Rooms'])[last()]");
        this.bookingFooterLink = this.page.locator("(//a[text()='Booking'])[2]");
        this.contactFooterLink = this.page.locator("(//a[text()='Contact'])[2]");
        this.alertMessage = this.page.locator(".alert");
    }

}