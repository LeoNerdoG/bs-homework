import { test, expect } from '@playwright/test';

// I am running this locally
const BASE_URL = process.env.BASE_URL || 'http://localhost:4000';

test.describe('API Tests for deposit endpoint', () => {

    test('Make a Deposit - Valid Request', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/create/deposit`, {
            data: {
                "amount": 100,
                "assetType": "XRP",
                "address": "1234567890qwertyuiop"
            }
        })

        expect(response.status()).toBe(201);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('message', 'Deposit request has been created. Please hold...');
        expect(responseBody).toHaveProperty('deposit');
        expect(responseBody.deposit).toHaveProperty('status', 'completed');
    });

    test('Make a Deposit - Invalid Request, amount set to 0', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/create/deposit`, {
            data: {
                "amount": 0,
                "assetType": "XRP",
                "address": "1234567890qwertyuiop"
            }
        })

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid amount: Must be between 1 and 100000."]);
    });

    test('Make a Deposit - Invalid Request, amount set to 100001', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/create/deposit`, {
            data: {
                "amount": 100001,
                "assetType": "XRP",
                "address": "1234567890qwertyuiop"
            }
        })

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid amount: Must be between 1 and 100000."]);
    });

    test('Make a Deposit - Invalid Request, amount empty', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/create/deposit`, {
            data: {
                "amount": "",
                "assetType": "XRP",
                "address": "1234567890qwertyuiop"
            }
        })

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid amount: Must be between 1 and 100000."]);
    });

	test('Make a Deposit - Invalid Request, amount containing string, not an integer', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/create/deposit`, {
                data: {
                "amount": "100",
                "assetType": "XRP",
                "address": "1234567890qwertyuiop"
                }
            });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid amount: Must be between 1 and 100000."]);
	});

	test('Make a Deposit - Invalid Request, assetType too short', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/create/deposit`, {
                data: {
                "amount": 100,
                "assetType": "A",
                "address": "12345abcde67890fdegh"
                }
            });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid assetType: Must be exactly 3 uppercase letters."]);
	});

	test('Make a Deposit - Invalid Request, assetType too long', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/create/deposit`, {
                data: {
                "amount": 100,
                "assetType": "BTCC",
                "address": "12345abcde67890fdegh"
                }
            });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid assetType: Must be exactly 3 uppercase letters."]);
	});

	test('Make a Deposit - Invalid Request, assetType not uppercase', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/create/deposit`, {
                data: {
                "amount": 100,
                "assetType": "xrp",
                "address": "12345abcde67890fdegh"
                }
            });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid assetType: Must be exactly 3 uppercase letters."]);
	});


	test('Make a Deposit - Invalid Request, address too short', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/create/deposit`, {
                data: {
                "amount": 100,
                "assetType": "XRP",
                "address": "12345abcde67890fdeg"
                }
            });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid address: Must be alphanumeric and 20 characters long."]);
	});

	test('Make a Deposit - Invalid Request, address too long', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/create/deposit`, {
                data: {
                "amount": 100,
                "assetType": "XRP",
                "address": "12345abcde67890fdeg56"
                }
            });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid address: Must be alphanumeric and 20 characters long."]);
	});

	test('Make a Deposit - Invalid Request, address containing symbols', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/create/deposit`, {
                data: {
                "amount": 100,
                "assetType": "XRP",
                "address": "12345abcde67890fdeg&"
                }
            });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid address: Must be alphanumeric and 20 characters long."]);
	});

	test('Make a Deposit - Invalid Request, address empty', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/create/deposit`, {
                data: {
                "amount": 100,
                "assetType": "XRP",
                "address": ""
                }
            });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid address: Must be alphanumeric and 20 characters long."]);
	});

	test('Make a Deposit - Invalid Request, address containing integer, not string', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/create/deposit`, {
                data: {
                "amount": 100,
                "assetType": "XRP",
                "address": 100
                }
            });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid address: Must be alphanumeric and 20 characters long."]);
	});
});