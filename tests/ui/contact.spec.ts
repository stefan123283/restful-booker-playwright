import { test, expect } from '../fixtures/test-fixtures';
import { readData } from '../../utils/unifiedDataReader';
import { createRandomUser } from '../../models/user';
import { generateRandomAlphanumericString } from '../../utils/testDataUtils';

const requiredFields = readData("test-data/contact/requiredFields.json");
const invalidEmails = readData("test-data/contact/invalidEmails.json");
const subjectLengths = readData("test-data/contact/subjectLengths.json");
const phoneLengths = readData("test-data/contact/phoneLengths.json");
const messageLengths = readData("test-data/contact/messageLengths.json");

test.describe("Contact form functionality", () => {

    test("Successful submission", async ({ homePage }) => {

        await test.step("Populate the contact form", async () => {
            const user = createRandomUser();
            await homePage.populateContactForm(user.firstName + " " + user.lastName,
                user.email,
                user.phoneNumber,
                generateRandomAlphanumericString(15),
                generateRandomAlphanumericString(30),
            );
        });

        await test.step("Click the [Submit] button", async () => {
            await homePage.contactFormSubmitButton.click();
        });

        await test.step("Verify if the contact form was submitted successfully", async () => {
            await expect(homePage.contactFormSuccessMessage).toBeVisible();
        });

    });

    for (const data of requiredFields) {

        test(`Submission with blank "${data.field}" field`, async ({ homePage }) => {

            await test.step("Populate the contact form", async () => {
                const user = createRandomUser();
                await homePage.populateContactForm(user.firstName + " " + user.lastName,
                    user.email,
                    user.phoneNumber,
                    generateRandomAlphanumericString(15),
                    generateRandomAlphanumericString(30),
                );
            });

            await test.step(`Clear the contents of the "${data.field}" field`, async () => {

                switch (`${data.field}`.toLowerCase()) {
                    case "name": homePage.contactFormNameInput.clear();
                        break;
                    case "email": homePage.contactFormEmailInput.clear();
                        break;
                    case "phone": homePage.contactFormPhoneInput.clear();
                        break;
                    case "subject": homePage.contactFormSubjectInput.clear();
                        break;
                    case "message": homePage.contactFormMessageInput.clear();
                }
            });

            await test.step("Click the [Submit] button", async () => {
                await homePage.contactFormSubmitButton.click();
            });

            await test.step(`Verify if the "${data.expectedMessage}" error message is displayed`, async () => {
                await expect(homePage.contactFormAlertMessage).toContainText(`${data.expectedMessage}`);
            });

        });

    }

    for (const data of invalidEmails) {

        test(`Submission of the "Email" field with "${data.missingPart}"`, async ({ homePage }) => {

            await test.step("Populate the contact form", async () => {
                const user = createRandomUser();
                await homePage.populateContactForm(user.firstName + " " + user.lastName,
                    data.value,
                    user.phoneNumber,
                    generateRandomAlphanumericString(15),
                    generateRandomAlphanumericString(30),
                );
            });

            await test.step("Click the [Submit] button", async () => {
                await homePage.contactFormSubmitButton.click();
            });

            await test.step('Verify if the "must be a well-formed email address" error message is displayed', async () => {
                await expect(homePage.contactFormAlertMessage).toContainText("must be a well-formed email address");
            });

        });

    }

    for (const data of subjectLengths) {

        test(`Submission of the "Subject" field with "${data.name}" length`, async ({ homePage }) => {

            await test.step("Populate the contact form", async () => {
                const user = createRandomUser();
                await homePage.populateContactForm(user.firstName + " " + user.lastName,
                    user.email,
                    user.phoneNumber,
                    generateRandomAlphanumericString(data.length),
                    generateRandomAlphanumericString(30),
                );
            });

            await test.step("Click the [Submit] button", async () => {
                await homePage.contactFormSubmitButton.click();
            });

            await test.step('Validate the "Subject" field', async () => {
                if (data.expected === "valid") {
                    await expect(homePage.contactFormSuccessMessage).toBeVisible();
                } else {
                    await expect(homePage.contactFormAlertMessage).toContainText("Subject must be between 5 and 100 characters.");
                }

            });

        });

    }

    for (const data of phoneLengths) {

        test(`Submission of the "Phone" field with "${data.name}" length`, async ({ homePage }) => {

            await test.step("Populate the contact form", async () => {
                const user = createRandomUser();
                await homePage.populateContactForm(user.firstName + " " + user.lastName,
                    user.email,
                    generateRandomAlphanumericString(data.length),
                    generateRandomAlphanumericString(15),
                    generateRandomAlphanumericString(30),
                );
            });

            await test.step("Click the [Submit] button", async () => {
                await homePage.contactFormSubmitButton.click();
            });

            await test.step('Validate the "Phone" field', async () => {
                if (data.expected === "valid") {
                    await expect(homePage.contactFormSuccessMessage).toBeVisible();
                } else {
                    await expect(homePage.contactFormAlertMessage).toContainText("Phone must be between 11 and 21 characters.");
                }

            });

        });

    }

    for (const data of messageLengths) {

        test(`Submission of the "Message" field with "${data.name}" length`, async ({ homePage }) => {

            await test.step("Populate the contact form", async () => {
                const user = createRandomUser();
                await homePage.populateContactForm(user.firstName + " " + user.lastName,
                    user.email,
                    user.phoneNumber,
                    generateRandomAlphanumericString(15),
                    generateRandomAlphanumericString(data.length),
                );
            });

            await test.step("Click the [Submit] button", async () => {
                await homePage.contactFormSubmitButton.click();
            });

            await test.step('Validate the "Phone" field', async () => {
                if (data.expected === "valid") {
                    await expect(homePage.contactFormSuccessMessage).toBeVisible();
                } else {
                    await expect(homePage.contactFormAlertMessage).toContainText("Message must be between 20 and 2000 characters.");
                }

            });

        });

    }

});