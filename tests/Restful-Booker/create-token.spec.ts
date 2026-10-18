import { test, expect } from '@playwright/test';
import { readData } from '../../utils/unifiedDataReader';
import { createToken } from '../../utils/restfulBookerApi';
import { generateRandomAlphanumericString } from '../../utils/testDataUtils';

const username = "admin";
const password = "password123";
const createTokenData = readData("tests/Restful-Booker/test-data/createTokenData.json");

test.describe("API - Auth", () => {

    for (const data of createTokenData) {

        test(`CreateToken - ${data.name}`, async () => {

            const response = await createToken(data.username, data.password);

            const responseBody = await response.json();
            if (data.expected === "success") {
                expect(responseBody.token).toHaveLength(15);
            } else {
                expect(responseBody.reason).toBe("Bad credentials");
            }

        });

    }

    test("CreateToken - very long username", async () => {
        const response = await createToken(generateRandomAlphanumericString(1000), password);
        const responseBody = await response.json();
        expect(responseBody.reason).toBe("Bad credentials");
    });

    test("CreateToken - return different tokens for repeated requests", async ({ request }) => {
        const firstResponse = await createToken(username, password);
        const firstResponseBody = await firstResponse.json();
        const secondResponse = await createToken(username, password);
        const secondResponseBody = await secondResponse.json();
        expect(firstResponseBody.token).not.toEqual(secondResponseBody.token);
    });

})
