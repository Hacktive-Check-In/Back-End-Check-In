const request = require("supertest")
const app = require("../app");
const { User } = require('../models')

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
        // await sequelize.queryInterface.bulkInsert('Lodgings', data)
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
        const respone = await request(app).get('/restaurants');
        const { body, status } = respone
        console.log(body)
        expect(status).toBe(200);
        expect(Array.isArray(body.data)).toBe(false)
        console.log(body, "bodyyyyy11111")
        expect(status).toBe(200)
        expect(body).toHaveProperty('data')
    })
})
afterAll(async () => {
    try {
        await User.destroy({
            where: {},
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });

    } catch (error) {
        console.log(error, "<<<< afterAll");

    } // Close the database connection
});