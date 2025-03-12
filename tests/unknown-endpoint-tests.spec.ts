import { test, expect } from '@playwright/test';

// I am running this locally
const BASE_URL = process.env.BASE_URL || 'http://localhost:4000';

test.describe('API Tests for withdrawal endpoint', () => {

    test('Check resposne from unknown endpoint', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/create/updated`, {
            data: {
                "userId": "user123456",
                "amount": 100,
                "assetType": "XRP",
                "address": "1234567890qwertyuiop"
            }
        })

        expect(response.status()).toBe(404);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error');
        expect(responseBody.error).toBe("Endpoint not found");
    });

});