import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {

    readonly page: Page;
    readonly roomsSection: Locator;
    readonly bookingSection: Locator;
    readonly amenitiesSection: Locator;
    readonly locationSection: Locator;
    readonly contactSection: Locator;
    readonly bookNowBannerButton: Locator;
    readonly bookNowFirstRoomButton: Locator;
    readonly bookNowSecondRoomButton: Locator;
    readonly bookNowThirdRoomButton: Locator;
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

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.roomsSection = this.page.locator("#rooms");
        this.bookingSection = this.page.locator("#booking");
        this.amenitiesSection = this.page.locator("#amenities");
        this.locationSection = this.page.locator("#location");
        this.contactSection = this.page.locator("#contact");
        this.bookNowBannerButton = this.page.locator("//a[text()='Book Now']");
        this.bookNowFirstRoomButton = this.page.locator("(//a[text()='Book now'])[1]");
        this.bookNowSecondRoomButton = this.page.locator("(//a[text()='Book now'])[2]");
        this.bookNowThirdRoomButton = this.page.locator("(//a[text()='Book now'])[3]");
        this.checkInInput = this.page.locator("//label[text()='Check In']//..//input");
        this.checkOutInput = this.page.locator("//label[text()='Check Out']//..//input");
        this.checkAvailabilityButton = this.page.locator("//button[text()='Check Availability']");
        this.contactFormNameInput = this.page.locator("#name");
        this.contactFormEmailInput = this.page.locator("#email");
        this.contactFormPhoneInput = this.page.locator("#phone");
        this.contactFormSubjectInput = this.page.locator("#subject");
        this.contactFormMessageInput = this.page.locator("#description");
        this.contactFormSubmitButton = this.page.locator("//button[text()='Submit']");
        this.contactFormSuccessMessage = this.page.locator("//h3[contains(text(), 'Thanks for getting in touch')]");
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
