import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class BookingPage extends BasePage {

    readonly page: Page;
    readonly heading: Locator;
    readonly reserveNowButton: Locator;
    readonly cancelButton: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly phoneInput: Locator;
    readonly bookingConfirmedHeading: Locator;
    readonly returnHomeButton: Locator;
    readonly breadcrumbHomeLink: Locator;
    readonly breadcrumbRoomsLink: Locator;
    readonly viewDetailsFirstRoomButton: Locator;
    readonly viewDetailsSecondRoomButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.heading = this.page.locator("//h1");
        this.reserveNowButton = this.page.locator("//button[text()='Reserve Now']");
        this.cancelButton = this.page.locator("//button[text()='Cancel']");
        this.firstNameInput = this.page.locator("//input[@name='firstname']");
        this.lastNameInput = this.page.locator("//input[@name='lastname']");
        this.emailInput = this.page.locator("//input[@name='email']");
        this.phoneInput = this.page.locator("//input[@name='phone']");
        this.bookingConfirmedHeading = this.page.locator("//h2[text()='Booking Confirmed']");
        this.returnHomeButton = this.page.locator("//a[text()='Return home']");
        this.breadcrumbHomeLink = this.page.locator("(//a[text()='Home'])[1]");
        this.breadcrumbRoomsLink = this.page.locator("(//a[text()='Rooms'])[2]");
        this.viewDetailsFirstRoomButton = this.page.locator("(//a[text()='View Details'])[1]");
        this.viewDetailsSecondRoomButton = this.page.locator("(//a[text()='View Details'])[2]");
    }

    async populateBookingForm(firstName: string, lastName: string, email: string, phoneNumber: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.phoneInput.fill(phoneNumber);
    }

}