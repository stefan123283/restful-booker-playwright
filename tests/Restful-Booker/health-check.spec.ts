import { test, expect } from '@playwright/test';
import { healthCheck } from '../../utils/restfulBookerApi';

test.describe("API - Ping", () => {

    test("HealthCheck", async () => {
        const response = await healthCheck();
        expect(response.status()).toBe(201);
    });

})
