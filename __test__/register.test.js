const request = require("supertest");
const app = require("../app");
const { User } = require("../models");

beforeAll(async () => {
    try {
        await User.create({
            name: "admin1",
            email: "admin@gmail.com",
            password: "12345",
            phoneNumber: "04091467",
            avatar: "https://i.pinimg.com/474x/d2/4b/be/d24bbe79387549086d159aa4462bf4c9.jpg"
        });
    } catch (error) {
        console.log(error);
    }
});

describe("POST /register", () => {
    test("Register success", async () => {
        try {
            const response = await request(app)
                .post("/register")
                .send({
                    name: "admin2",
                    email: "admin2@gmail.com",
                    password: "54321",
                    phoneNumber: "04091468",
                    avatar: "https://i.pinimg.com/474x/d2/4b/be/d24bbe79387549086d159aa4462bf4c9.jpg"
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
                email: "admin@gmail.com",
                password: "12345",
                phoneNumber: "04091467",
                avatar: "https://i.pinimg.com/474x/d2/4b/be/d24bbe79387549086d159aa4462bf4c9.jpg"
            });
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toEqual({ message: ["name is required"] });
    });

    test("/register failed without email", async () => {
        const response = await request(app)
            .post("/register")
            .send({
                name: "admin1",
                password: "12345",
                phoneNumber: "04091467",
                avatar: "https://i.pinimg.com/474x/d2/4b/be/d24bbe79387549086d159aa4462bf4c9.jpg"
            });
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toEqual({ message: ["email is required"] });
    });

    test("/register failed without password", async () => {
        const response = await request(app)
            .post("/register")
            .send({
                name: "admin1",
                email: "admin@gmail.com",
                phoneNumber: "04091467",
                avatar: "https://i.pinimg.com/474x/d2/4b/be/d24bbe79387549086d159aa4462bf4c9.jpg"
            });
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toEqual({ message: ["password is required"] });
    });

    test("/register failed without phoneNumber", async () => {
        const response = await request(app)
            .post("/register")
            .send({
                name: "admin1",
                email: "admin@gmail.com",
                password: "12345",
                avatar: "https://i.pinimg.com/474x/d2/4b/be/d24bbe79387549086d159aa4462bf4c9.jpg"
            });
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toEqual({ message: ["phoneNumber is required"] });
    });
});
