import { Page, Locator } from '@playwright/test';

export class HomePage {

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
    readonly contactFormNameInput: Locator;
    readonly contactFormEmailInput: Locator;
    readonly contactFormPhoneInput: Locator;
    readonly contactFormSubjectInput: Locator;
    readonly contactFormMessageInput: Locator;
    readonly contactFormSubmitButton: Locator;
    readonly contactFormSuccessMessage: Locator;
    readonly contactFormAlertMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeHeaderLink = page.locator("//a[.='Shady Meadows B&B']");
        this.roomsHeaderLink = page.locator("(//a[text()='Rooms'])[1]");
        this.bookingHeaderLink = page.locator("(//a[text()='Booking'])[1]");
        this.amenitiesHeaderLink = page.locator("(//a[text()='Amenities'])[1]");
        this.locationHeaderLink = page.locator("(//a[text()='Location'])[1]");
        this.contactHeaderLink = page.locator("(//a[text()='Contact'])[1]");
        this.homeFooterLink = page.locator("//a[.='Home']");
        this.roomsFooterLink = page.locator("(//a[text()='Rooms'])[2]");
        this.bookingFooterLink = page.locator("(//a[text()='Booking'])[2]");
        this.contactFooterLink = page.locator("(//a[text()='Contact'])[2]");
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
        this.contactFormNameInput = page.locator("#name");
        this.contactFormEmailInput = page.locator("#email");
        this.contactFormPhoneInput = page.locator("#phone");
        this.contactFormSubjectInput = page.locator("#subject");
        this.contactFormMessageInput = page.locator("#description");
        this.contactFormSubmitButton = page.locator("//button[text()='Submit']");
        this.contactFormSuccessMessage = page.locator("//h3[contains(text(), 'Thanks for getting in touch')]");
        this.contactFormAlertMessage = page.locator(".alert");
    }

    async populateBookingForm(checkInDate: string, checkOutDate: string,) {
        await this.checkInInput.fill(checkInDate);
        await this.checkOutInput.fill(checkOutDate);
    }

    async populateContactForm(name: string, email: string, phoneNumber: string, subject: string, message: string) {
        await this.contactFormNameInput.fill(name);
        await this.contactFormEmailInput.fill(email);
        await this.contactFormPhoneInput.fill(phoneNumber);
        await this.contactFormSubjectInput.fill(subject);
        await this.contactFormMessageInput.fill(message);
    }

}
