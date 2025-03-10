import { test, expect } from '@playwright/test';

// I am running this locally
const BASE_URL = process.env.BASE_URL || 'http://localhost:4000';

test.describe('API Tests for deposit, withdrawal and getting balance', () => {

// Withdrawal tests
    test('Make a Withdrawal - Valid Request', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/create/withdrawal`, {
            data: {
                userId: 'user123456',
                amount: 100,
                currency: 'XRP',
                address: '1234567890qwertyuiop'
            }
        });

        expect(response.status()).toBe(201);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('message', 'Success! Go buy yourself something nice!');
        expect(responseBody).toHaveProperty('withdrawal');
        expect(responseBody.withdrawal).toHaveProperty('status', 'Completed');
    });

    test('Make a Withdrawal - Invalid Request, too short userId', async ({ request }) => {
            const response = await request.post(`${BASE_URL}/create/withdrawal`, {
                data: {
                    userId: 'user',
                    amount: 100,
                    currency: 'XRP',
                    address: '1234567890qwertyuiop'
                }
            });

            expect(response.status()).toBe(400);
            const responseBody = await response.json();
            expect(responseBody).toHaveProperty('error', 'Invalid userId: Must be exactly 10 alphanumeric characters.');
        });

        test('Make a Withdrawal - Invalid Request, too long userId', async ({ request }) => {
                    const response = await request.post(`${BASE_URL}/create/withdrawal`, {
                        data: {
                            userId: 'user1234567890123',
                            amount: 100,
                            currency: 'XRP',
                            address: '1234567890qwertyuiop'
                        }
                    });

                    expect(response.status()).toBe(400);
                    const responseBody = await response.json();
                    expect(responseBody).toHaveProperty('error', 'Invalid userId: Must be exactly 10 alphanumeric characters.');
                });

    test('Make a Withdrawal - Invalid Request, amount set to 0', async ({ request }) => {
                        const response = await request.post(`${BASE_URL}/create/withdrawal`, {
                            data: {
                                userId: 'user1234567890123',
                                amount: 0,
                                currency: 'XRP',
                                address: '1234567890qwertyuiop'
                            }
                        });

                        expect(response.status()).toBe(400);
                        const responseBody = await response.json();
                        expect(responseBody).toHaveProperty('error', 'Invalid amount: Must be between 0 and 100000.');
                    });


// Deposit tests
    test('Make a Deposit - Valid Request', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/create/deposit`, {
            data: {
                userId: 'user123456',
                amount: 200,
                currency: 'USD'
            }
        });

        expect(response.status()).toBe(201);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('message', 'Deposit request created');
        expect(responseBody).toHaveProperty('deposit');
        expect(responseBody.deposit).toHaveProperty('status', 'completed');
    });

// GET Balance tests
    test('Get Balance - Valid User & Valid AssetType', async ({ request }) => {
        const userId = 'user123456';
        const response = await request.get(`${BASE_URL}/balance?userId=${userId}`);

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('message', 'Balance retrieved');
        expect(responseBody).toHaveProperty('balance');
        expect(responseBody.balance).toHaveProperty('userId', userId);
        expect(responseBody.balance.amount).toBeGreaterThanOrEqual(0);
    });

    test('Get Balance - Valid User & Invalid AssetType', async ({ request }) => {
        const userId = 'user123456';
        const response = await request.get(`${BASE_URL}/balance?userId=${userId}`);

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('message', 'Balance retrieved');
        expect(responseBody).toHaveProperty('balance');
        expect(responseBody.balance).toHaveProperty('userId', userId);
        expect(responseBody.balance.amount).toBeGreaterThanOrEqual(0);
    });
});