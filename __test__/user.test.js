const request = require("supertest")
const app = require("../app");
const { User, Restaurant, Item } = require('../models')

let access_token;


beforeAll(async () => {
    try {
        const data = await User.create({
            name: "admin1",
            email: "admin@gmail.com",
            password: "12345",
            phoneNumber: "04091467",
            avatar: "https://i.pinimg.com/474x/d2/4b/be/d24bbe79387549086d159aa4462bf4c9.jpg"
        });
        await User.bulkCreate(data)
        let restaurant = require('../data/restaurant.json').map((el) => {
            delete el.id;
            el.createdAt = el.updatedAt = new Date();
            return el;
        });
        await queryInterface.bulkInsert("Restaurants", restaurant, {});
        let item = require('../data/item.json').map((el) => {
            delete el.id;
            el.createdAt = el.updatedAt = new Date();
            return el;
        });
        await queryInterface.bulkInsert("Items", item, {});
        // await sequelize.queryInterface.bulkInsert('Restaurant', data)
    } catch (error) {
        console.log(error)
    }
})
describe("POST /login", () => {
    //* a. berhasil login
    test(`Login Success`, async () => {
        const response = await request(app)
            .post(`/login`)
            .send({ email: `admin@gmail.com`, password: `12345` });
        const { body, status } = response;
        access_token = body.access_token;
        console.log(body.access_token, "<<<<<<<<<body");
        expect(status).toBe(200);
        expect(body).toHaveProperty("access_token", expect.any(String));
    })
    test('/login failed without password', async () => {
        const response = await request(app)
            .post('/login')
            .send({ email: 'admin@gmail.com' });
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toEqual({ message: 'email / password required' });
    });
    test('/login failed without email', async () => {
        const response = await request(app)
            .post('/login')
            .send({ password: '12345' });
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toEqual({ message: 'email / password required' });
    });
})
describe('Success Get /restaurants', () => {
    test("success Get /restaurants", async () => {
        // let token;
        const respone = (await request(app).get('/restaurants').set('Authorization', 'Bearer ' + access_token));
        const { body, status } = respone
        // access_token = body.access_token;
        console.log(body, "<<<<<<<ATASNYA")
        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Array);
        if (body.length > 0) {
            expect(body[0]).toBeInstanceOf(Object)
        }
    })
    test("authorization error /restaurants", async () => {
        // let token;
        const respone = await request(app).get('/restaurants')
        const { body, status } = respone
        // access_token = body.access_token;
        console.log(body, "<<<<<<<ATASNYA")
        expect(status).toBe(401);
        expect(body).toBeInstanceOf(Object);
    })
    test('Success Get Id/restaurants', async () => {
        const id = 1;
        const response = (await request(app).get(`/restaurants/${id}`).set('Authorization', 'Bearer ' + access_token))
        const { body, status } = response;
        access_token = body.access_token;
        console.log(body, "<<<<<<<<")
        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Array);
        if (body.length > 0) {
            expect(body[0]).toBeInstanceOf(Object)
        }
    }
    )
})
afterAll(async () => {
    try {
        await User.destroy({
            where: {},
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });
        await Restaurant.destroy({
            where: {},
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });
        await Item.destroy({
            where: {},
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });

    } catch (error) {
        console.log(error, "<<<< afterAll");

    } // Close the database connection
});