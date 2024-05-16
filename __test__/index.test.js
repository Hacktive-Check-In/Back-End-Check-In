const request = require("supertest")
const app = require("../app");
const { User, Restaurant, Item } = require('../models')

let access_token;

const tokenError = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ4In0.J03fCfb28GG8BajCqZ8xIuayt_j3R6hp-5qJY31bb6p"
const invalidToken = "invalidToken";
const invalidSignature = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ4In0.at - XcSdO4jXT_LNQKYbnjeyAIVNb19aW7aVH3XxCEck"

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

test("/register failed with existing email", async () => {
    await User.create({
        name: "user1",
        email: "user1@mail.com",
        password: "user1",
        phoneNumber: "087654321"
    });

    const response = await request(app)
        .post("/register")
        .send({
            name: "user2",
            email: "user1@mail.com", 
            password: "user1",
            phoneNumber: "087654321"
        });

    const { body, status } = response;
    expect(status).toBe(400);
    expect(body).toEqual({ message: "email is already registered in the database" });
});


describe("POST /register", () => {
    test("Register success", async () => {
        try {
            const response = await request(app)
                .post("/register")
                .send({
                    name: "kevin",
                    password: "bebas",
                    email: "kevin@mail.com",
                    phoneNumber: "081320473251"
                });
            const { status } = response;
            expect(status).toBe(201);
        } catch (error) {
            console.log(error);
        }
    });

    test("/register failed without name", async () => {
        const response = await request(app)
            .post("/register")
            .send({
                password: "bebas",
                email: "kevin@mail.com",
                phoneNumber: "081320473251"
            });
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toEqual({ message: "name is required" });
    });

    test("/register failed without email", async () => {
        const response = await request(app)
            .post("/register")
            .send({
                name: "kevin",
                password: "bebas",
                phoneNumber: "081320473251"
            });
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toEqual({ message: "email is required" });
    });

    test("/register failed without password", async () => {
        const response = await request(app)
            .post("/register")
            .send({
                name: "kevin",
                email: "kevin@mail.com",
                phoneNumber: "081320473251"
            });
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toEqual({ message: "password is required" });
    });

    test("/register failed without phoneNumber", async () => {
        const response = await request(app)
            .post("/register")
            .send({
                name: "kevin",
                password: "bebas",
                email: "kevin@mail.com"
            });
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toEqual({ message: "phone number is required" });
    });
});



describe("POST /login", () => {
    test("login failed not Bearer", async () => {
        const response = await request(app)
            .post("/login")
            .set("Authorization", `BearerP ${access_token}`)
            .send({ email: "admin99@gmail.com", password: "12345" });
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", 'Invalid email / password');
    });
    test("login failed with tokenError", async () => {
        const response = await request(app)
            .post("/login")
            .set("Authorization", `Bearer ${tokenError}`)
            .send({ email: "admin99@gmail.com", password: "12345" });
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid email / password");
    });


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
describe("GET /user/detail", () => {
    it("should return user details with status 200 when authenticated", async () => {
        const response = await request(app)
            .get("/user/detail")
            .set("Authorization", `Bearer ${access_token}`);

        expect(response.statusCode).toBe(200);
    });

    it("should return unauthorized error with status 401 if token is missing", async () => {
        const response = await request(app)
            .get("/user/detail");

        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty("message", "Error authentication");
    });

    it("should return unauthorized error with status 401 if token is invalid", async () => {
        const response = await request(app)
            .get("/user/detail")
            .set("Authorization", `Bearer ${invalidSignature}`);

        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty("message", "Error authentication");
    });

    it("should return unauthorized error with status 401 if token is invalid", async () => {
        const response = await request(app)
            .get("/user/detail")
            .set("Authorization", `Bearer ${tokenError}`);
        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty("message", "Error authentication");
    });
});
describe('Success Get /restaurants', () => {
    it("should return unauthorized error with status 401 if token is invalid", async () => {
        const response = await request(app)
            .get("/restaurants")
            .set("Authorization", `Bearer ${invalidToken}`);

        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty("message", "Error authentication");
    });
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
    test("success Get /restaurants with search", async () => {
        // let token;
        const respone = (await request(app).get('/restaurants?search=dining').set('Authorization', 'Bearer ' + access_token));
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