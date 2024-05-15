const request = require("supertest");
const app = require("../app");
const { User } = require("../models");

beforeAll(async () => {
    try {
        await User.create({
            name: "kevin",
            password: "bebas",
            email: "kevin@mail.com",
            phoneNumber: "081320473251"
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
        expect(body).toEqual({ message: "password is required"});
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
