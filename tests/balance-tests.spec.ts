import { test, expect } from '@playwright/test';

// I am running this locally
const BASE_URL = process.env.BASE_URL || 'http://localhost:4000';

test.describe('API Tests for balance endpoint', () => {

    test('Make a Withdrawal - Valid Request', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/balance`, {
            data: {
                "userId": "user123456",
                "amount": 100,
                "assetType": "XRP",
                "address": "1234567890qwertyuiop"
            }
        })

        expect(response.status()).toBe(201);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('message', 'You have requested a withdrawal. Please hold.');
        expect(responseBody).toHaveProperty('withdrawal');
        expect(responseBody.withdrawal).toHaveProperty('status', 'Completed');
    });

    test('Make a Withdrawal - Invalid Request, userId empty', async ({ request }) => {
            const response = await request.post(`${BASE_URL}/create/withdrawal`, {
                data: {
                "userId": "",
                "amount": 100,
                "assetType": "XRP",
                "address": "1234567890qwertyuiop"
                }
            });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid userId: Must be exactly 10 alphanumeric characters."]);
        });

    test('Make a Withdrawal - Invalid Request, userId containing integer, not string', async ({ request }) => {
            const response = await request.post(`${BASE_URL}/create/withdrawal`, {
                data: {
                "userId": 100,
                "amount": 100,
                "assetType": "XRP",
                "address": "1234567890qwertyuiop"
                }
            });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid userId: Must be exactly 10 alphanumeric characters."]);
        });

    test('Make a Withdrawal - Invalid Request, too short userId', async ({ request }) => {
            const response = await request.post(`${BASE_URL}/create/withdrawal`, {
                data: {
                "userId": "user12",
                "amount": 100,
                "assetType": "XRP",
                "address": "1234567890qwertyuiop"
                }
            });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid userId: Must be exactly 10 alphanumeric characters."]);
        });

	test('Make a Withdrawal - Invalid Request, too long userId', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/create/withdrawal`, {
                data: {
                "userId": "user1234567",
                "amount": 100,
                "assetType": "XRP",
                "address": "1234567890qwertyuiop"
                }
            });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid userId: Must be exactly 10 alphanumeric characters."]);
	});

	test('Make a Withdrawal - Invalid Request,userI containing symbols', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/create/withdrawal`, {
                data: {
                "userId": "user12345$",
                "amount": 100,
                "assetType": "XRP",
                "address": "1234567890qwertyuiop"
                }
            });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid userId: Must be exactly 10 alphanumeric characters."]);
	});

	test('Make a Withdrawal - Invalid Request, amount empty', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/create/withdrawal`, {
                data: {
                "userId": "user123456",
                "amount": "",
                "assetType": "XRP",
                "address": "1234567890qwertyuiop"
                }
            });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid amount: Must be between 1 and 100000."]);
	});

	test('Make a Withdrawal - Invalid Request, amount containing string, not an integer', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/create/withdrawal`, {
                data: {
                "userId": "user123456",
                "amount": "100",
                "assetType": "XRP",
                "address": "1234567890qwertyuiop"
                }
            });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid amount: Must be between 1 and 100000."]);
	});

	test('Make a Withdrawal - Invalid Request, amount set to 0', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/create/withdrawal`, {
                data: {
                "userId": "user123456",
                "amount": 0,
                "assetType": "XRP",
                "address": "1234567890qwertyuiop"
                }
            });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid amount: Must be between 1 and 100000."]);
	});

	test('Make a Withdrawal - Invalid Request, amount set to 100001', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/create/withdrawal`, {
                data: {
                "userId": "user123456",
                "amount": 100001,
                "assetType": "XRP",
                "address": "1234567890qwertyuiop"
                }
            });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid amount: Must be between 1 and 100000."]);
	});

	test('Make a Withdrawal - Invalid Request, address too short', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/create/withdrawal`, {
                data: {
                "userId": "user123456",
                "amount": 100,
                "assetType": "XRP",
                "address": "12345abcde67890fdeg"
                }
            });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid address: Must be alphanumeric and 20 characters long."]);
	});

	test('Make a Withdrawal - Invalid Request, address too long', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/create/withdrawal`, {
                data: {
                "userId": "user123456",
                "amount": 100,
                "assetType": "XRP",
                "address": "12345abcde67890fdeg56"
                }
            });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid address: Must be alphanumeric and 20 characters long."]);
	});

	test('Make a Withdrawal - Invalid Request, address containing symbols', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/create/withdrawal`, {
                data: {
                "userId": "user123456",
                "amount": 100,
                "assetType": "XRP",
                "address": "12345abcde67890fdeg&"
                }
            });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid address: Must be alphanumeric and 20 characters long."]);
	});

	test('Make a Withdrawal - Invalid Request, address empty', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/create/withdrawal`, {
                data: {
                "userId": "user123456",
                "amount": 100,
                "assetType": "XRP",
                "address": ""
                }
            });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid address: Must be alphanumeric and 20 characters long."]);
	});

	test('Make a Withdrawal - Invalid Request, address containing integer, not string', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/create/withdrawal`, {
                data: {
                "userId": "user123456",
                "amount": 100,
                "assetType": "XRP",
                "address": 100
                }
            });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid address: Must be alphanumeric and 20 characters long."]);
	});

	test('Make a Withdrawal - Invalid Request, assetType too short', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/create/withdrawal`, {
                data: {
                "userId": "user123456",
                "amount": 100,
                "assetType": "A",
                "address": "12345abcde67890fdegh"
                }
            });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid assetType: Must be exactly 3 uppercase letters."]);
	});

	test('Make a Withdrawal - Invalid Request, assetType too long', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/create/withdrawal`, {
                data: {
                "userId": "user123456",
                "amount": 100,
                "assetType": "BTCC",
                "address": "12345abcde67890fdegh"
                }
            });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid assetType: Must be exactly 3 uppercase letters."]);
	});

	test('Make a Withdrawal - Invalid Request, assetType not uppercase', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/create/withdrawal`, {
                data: {
                "userId": "user123456",
                "amount": 100,
                "assetType": "xrp",
                "address": "12345abcde67890fdegh"
                }
            });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error', ["Invalid assetType: Must be exactly 3 uppercase letters."]);
	});
});