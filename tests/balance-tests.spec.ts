import { test, expect } from '@playwright/test';

// I am running this locally
const BASE_URL = process.env.BASE_URL || 'http://localhost:4000';

test.describe('API Tests for balance endpoint', () => {

    test('Do a balance check - Valid Request', async ({ request }) => {
            const userId = "user123456"
            const assetType = "XRP"
    const response = await request.get(`${BASE_URL}/balance?userId=${userId}&assetType=${assetType}`)

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('message', "Here you go: Your Balance! Go buy yourself something nice for a change. :)");
        expect(responseBody).toHaveProperty('balance');
        expect(responseBody.balance).toHaveProperty('status', 'completed');
    });

    test('Do a balance check - Invalid Request, too short userId', async ({ request }) => {
            const userId = "user"
            const assetType = "XRP"
    const response = await request.get(`${BASE_URL}/balance?userId=${userId}&assetType=${assetType}`)

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid userId: Must be exactly 10 alphanumeric characters."]);
    });

    test('Do a balance check - Invalid Request, too long userId', async ({ request }) => {
            const userId = "user1234567"
            const assetType = "XRP"
    const response = await request.get(`${BASE_URL}/balance?userId=${userId}&assetType=${assetType}`)

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid userId: Must be exactly 10 alphanumeric characters."]);
    });

    test('Do a balance check - Invalid Request, userId empty', async ({ request }) => {
            const userId = ""
            const assetType = "XRP"
    const response = await request.get(`${BASE_URL}/balance?userId=${userId}&assetType=${assetType}`)

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid userId: Must be exactly 10 alphanumeric characters."]);
    });

    test('Do a balance check - Invalid Request, userId containing integer, not string', async ({ request }) => {
            const userId = 100
            const assetType = "XRP"
    const response = await request.get(`${BASE_URL}/balance?userId=${userId}&assetType=${assetType}`)

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid userId: Must be exactly 10 alphanumeric characters."]);
    });

    test('Do a balance check - Invalid Request, userId containing symbols', async ({ request }) => {
            const userId = "user12345-"
            const assetType = "XRP"
    const response = await request.get(`${BASE_URL}/balance?userId=${userId}&assetType=${assetType}`)

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid userId: Must be exactly 10 alphanumeric characters."]);
    });

    test('Do a balance check - Invalid Request, assetType too short', async ({ request }) => {
            const userId = "user123456"
            const assetType = "X"
    const response = await request.get(`${BASE_URL}/balance?userId=${userId}&assetType=${assetType}`)

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid assetType: Must be exactly 3 uppercase letters."]);
    });

    test('Do a balance check - Invalid Request, assetType too long', async ({ request }) => {
            const userId = "user123456"
            const assetType = "XRPP"
    const response = await request.get(`${BASE_URL}/balance?userId=${userId}&assetType=${assetType}`)

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid assetType: Must be exactly 3 uppercase letters."]);
    });

    test('Do a balance check - Invalid Request, assetType not uppercase', async ({ request }) => {
            const userId = "user123456"
            const assetType = "xrp"
    const response = await request.get(`${BASE_URL}/balance?userId=${userId}&assetType=${assetType}`)

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid assetType: Must be exactly 3 uppercase letters."]);
    });

});