const request = require('supertest');
const app = require('../app');
const { TransactionHeader, TransactionDetail, sequelize } = require('../models');



describe('Transaction Routes', () => {
    let authToken;
   
    beforeAll(async () => {
       
        const authResponse = await request(app)
            .post('/auth/login')
            .send({ email: 'user@example.com', password: 'password' });

        authToken = authResponse.body.token;
    });

    describe('POST /transaction', () => {
        test('creates a new transaction', async () => {
            // Data untuk pengujian
            const transactionData = {
                reservationDate: '2024-05-16 18:48:57.622 +0700',
                totalPrice: 350000,
                RestaurantId: 1,
                items: [
                    { ItemId: 1, qty: 2, subTotal: 100000 },
                    { ItemId: 2, qty: 2, subTotal: 200000 }
                ]
            };

            const response = await request(app)
                .post('/transaction')
                .set('Authorization', `Bearer ${authToken}`)
                .send(transactionData);

            expect(response.status).toBe(201);

            expect(response.body).toHaveProperty('transactionHeader');
            expect(response.body).toHaveProperty('transactionDetails');
            expect(response.body).toHaveProperty('redirect_url');
            expect(response.body).toHaveProperty('token');
        });
    });
});

