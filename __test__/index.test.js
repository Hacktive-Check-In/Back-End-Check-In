const request = require('supertest');
const app = require('../app');
const {
  User,
  Restaurant,
  Item,
  TransactionHeader,
  TransactionDetail,
  sequelize,
} = require('../models');

let access_token;

const tokenError =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ4In0.J03fCfb28GG8BajCqZ8xIuayt_j3R6hp-5qJY31bb6p';
const invalidToken = 'invalidToken';
const invalidSignature =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ4In0.at - XcSdO4jXT_LNQKYbnjeyAIVNb19aW7aVH3XxCEck';

beforeAll(async () => {
  try {
    await User.create({
      name: 'admin1',
      email: 'admin@gmail.com',
      password: '12345',
      phoneNumber: '04091467',
      avatar:
        'https://i.pinimg.com/474x/d2/4b/be/d24bbe79387549086d159aa4462bf4c9.jpg',
    });

    // Create Restaurants
    let restaurants = require('../data/restaurant.json').map((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    await sequelize.queryInterface.bulkInsert('Restaurants', restaurants, {});

    // Create Items
    let items = require('../data/item.json').map((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    await sequelize.queryInterface.bulkInsert('Items', items, {});
  } catch (error) {
    console.log(error);
  }
});

test('/register failed with existing email', async () => {
  await User.create({
    name: 'user1',
    email: 'user1@mail.com',
    password: 'user1',
    phoneNumber: '087654321',
  });

  const response = await request(app).post('/register').send({
    name: 'user2',
    email: 'user1@mail.com',
    password: 'user1',
    phoneNumber: '087654321',
  });

  const { body, status } = response;
  expect(status).toBe(400);
  expect(body).toEqual({
    message: 'email is already registered in the database',
  });
});

describe('POST /register', () => {
  test('Register success', async () => {
    try {
      const response = await request(app).post('/register').send({
        name: 'kevin',
        password: 'bebas',
        email: 'kevin@mail.com',
        phoneNumber: '081320473251',
      });
      const { status } = response;
      expect(status).toBe(201);
    } catch (error) {
      console.log(error);
    }
  });

  test('/register failed without name', async () => {
    const response = await request(app).post('/register').send({
      password: 'bebas',
      email: 'kevin@mail.com',
      phoneNumber: '081320473251',
    });
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body).toEqual({ message: 'name is required' });
  });

  test('/register failed without email', async () => {
    const response = await request(app).post('/register').send({
      name: 'kevin',
      password: 'bebas',
      phoneNumber: '081320473251',
    });
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body).toEqual({ message: 'email is required' });
  });

  test('/register failed without password', async () => {
    const response = await request(app).post('/register').send({
      name: 'kevin',
      email: 'kevin@mail.com',
      phoneNumber: '081320473251',
    });
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body).toEqual({ message: 'password is required' });
  });

  test('/register failed without phoneNumber', async () => {
    const response = await request(app).post('/register').send({
      name: 'kevin',
      password: 'bebas',
      email: 'kevin@mail.com',
    });
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body).toEqual({ message: 'phone number is required' });
  });
});

describe('POST /login', () => {
  test('login failed not Bearer', async () => {
    const response = await request(app)
      .post('/login')
      .set('Authorization', `BearerP ${access_token}`)
      .send({ email: 'admin99@gmail.com', password: '12345' });
    const { body, status } = response;
    expect(status).toBe(401);
    expect(body).toHaveProperty('message', 'Invalid email / password');
  });
  test('login failed with tokenError', async () => {
    const response = await request(app)
      .post('/login')
      .set('Authorization', `Bearer ${tokenError}`)
      .send({ email: 'admin99@gmail.com', password: '12345' });
    const { body, status } = response;
    expect(status).toBe(401);
    expect(body).toHaveProperty('message', 'Invalid email / password');
  });

  test(`Login Success`, async () => {
    const response = await request(app)
      .post(`/login`)
      .send({ email: `admin@gmail.com`, password: `12345` });
    const { body, status } = response;
    access_token = body.access_token;
    console.log(body.access_token, '<<<<<<<<<body');
    expect(status).toBe(200);
    expect(body).toHaveProperty('access_token', expect.any(String));
  });
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
});
describe('GET /user/detail', () => {
  it('should return user details with status 200 when authenticated', async () => {
    const response = await request(app)
      .get('/user/detail')
      .set('Authorization', `Bearer ${access_token}`);

    expect(response.statusCode).toBe(200);
  });

  it('should return unauthorized error with status 401 if token is missing', async () => {
    const response = await request(app).get('/user/detail');

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', 'Error authentication');
  });

  it('should return unauthorized error with status 401 if token is invalid', async () => {
    const response = await request(app)
      .get('/user/detail')
      .set('Authorization', `Bearer ${invalidSignature}`);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', 'Error authentication');
  });

  it('should return unauthorized error with status 401 if token is invalid', async () => {
    const response = await request(app)
      .get('/user/detail')
      .set('Authorization', `Bearer ${tokenError}`);
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', 'Error authentication');
  });
});
describe('Success Get /restaurants', () => {
  it('should return unauthorized error with status 401 if token is invalid', async () => {
    const response = await request(app)
      .get('/restaurants')
      .set('Authorization', `Bearer ${invalidToken}`);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', 'Error authentication');
  });
  test('success Get /restaurants', async () => {
    const respone = await request(app)
      .get('/restaurants')
      .set('Authorization', 'Bearer ' + access_token);
    const { body, status } = respone;
    console.log(body, '<<<<<<<ATASNYA');
    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Array);
    if (body.length > 0) {
      expect(body[0]).toBeInstanceOf(Object);
    }
  });
  test('success Get /restaurants with search', async () => {
    const respone = await request(app)
      .get('/restaurants?search=dining')
      .set('Authorization', 'Bearer ' + access_token);
    const { body, status } = respone;
    console.log(body, '<<<<<<<ATASNYA');
    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Array);
    if (body.length > 0) {
      expect(body[0]).toBeInstanceOf(Object);
    }
  });
  test('authorization error /restaurants', async () => {
    const respone = await request(app).get('/restaurants');
    const { body, status } = respone;
    console.log(body, '<<<<<<<ATASNYA');
    expect(status).toBe(401);
    expect(body).toBeInstanceOf(Object);
  });
  test('should return unauthorized error with status 401 if token is invalid', async () => {
    const response = await request(app)
      .get('/restaurants')
      .set('Authorization', `Bearer ${invalidSignature}`);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', 'Error authentication');
  });
  test('should return unauthorized error with status 401 if token is invalid', async () => {
    const response = await request(app)
      .get('/restaurants')
      .set('Authorization', `Bearer ${tokenError}`);
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', 'Error authentication');
  });
  test('Success Get Id/restaurants', async () => {
    const id = 1;
    const response = await request(app)
      .get(`/restaurants/${id}`)
      .set('Authorization', 'Bearer ' + access_token);
    const { body, status } = response;
    console.log(body, '<<<<<<<<');
    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Array);
    if (body.length > 0) {
      expect(body[0]).toBeInstanceOf(Object);
    }
  });
});
describe('success post /Transcation', () => {
  test('should create a new transaction', async () => {
    const response = await request(app)
      .post('/transaction')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        RestaurantId: 1,
        reservationDate: '2024-05-16 18:48:57.622 +0700',
        totalPrice: 350000,
        items: [
          { ItemId: 1, qty: 2, subTotal: 100000 },
          { ItemId: 2, qty: 2, subTotal: 200000 },
        ],
      });
    const { body, status } = response;
    // console.log(body, "TRANSCATION<<<<<<<<<<<<<");
    expect(status).toBe(201);
    expect(body).toHaveProperty('redirect_url', expect.any(String));
  });
  test('Error reservationDate missing', async () => {
    const response = await request(app)
      .post('/transaction')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        RestaurantId: 1,
        totalPrice: 350000,
        items: [
          { ItemId: 1, qty: 2, subTotal: 100000 },
          { ItemId: 2, qty: 2, subTotal: 200000 },
        ],
      });
    const { body, status } = response;
    // console.log(body, "TRANSCATION<<<<<<<<<<<<<");
    expect(status).toBe(400);
    expect(body).toHaveProperty('message', 'reservation date is required');
  });
});
describe('Success Get /Transcation', () => {
  test('success Get /Transcation', async () => {
    // console.log('Access Token:', access_token);
    const respone = await request(app)
      .get('/transaction')
      .set('Authorization', `Bearer ${access_token}`);
    const { body, status } = respone;
    // console.log('Status:', status);
    // console.log('Body:', body, "<<<<<<<ATASNYA")
    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Array);
    if (body.length > 0) {
      expect(body[0]).toBeInstanceOf(Object);
    }
  });
  test('Success Get Id /Transcation', async () => {
    const id = 1;
    const response = await request(app)
      .get(`/transaction/${id}`)
      .set('Authorization', 'Bearer ' + access_token);
    const { body, status } = response;
    console.log(body, '<<<<<<<<');
    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Object);
  });
  test('Missing Authorization /Transcation', async () => {
    const response = await request(app).get(`/transaction`);
    const { body, status } = response;
    console.log(body, '<<<<<<<<');
    expect(status).toBe(401);
    expect(body).toHaveProperty('message', 'Error authentication');
  });
  test('Error Token/Transcation', async () => {
    const response = await request(app)
      .get(`/transaction`)
      .set('Authorization', 'Bearer ' + tokenError);
    const { body, status } = response;
    // console.log(body, "<<<<<<<<")
    expect(status).toBe(401);
    expect(body).toHaveProperty('message', 'Error authentication');
  });
  test('InvalidSignature /Transcation', async () => {
    const response = await request(app)
      .get(`/transaction`)
      .set('Authorization', 'Bearer ' + invalidSignature);
    const { body, status } = response;
    // console.log(body, "<<<<<<<<")
    expect(status).toBe(401);
    expect(body).toHaveProperty('message', 'Error authentication');
  });
});
describe('midtrans result /Transcation', () => {
  test('transaction result success settlement', async () => {
    const respone = await request(app)
      .post('/transaction/midtrans/result')
      .send({
        order_id: 'payment-1-asalajaini',
        transaction_status: 'settlement',
      });
    const { body, status } = respone;
    console.log(body, '<<<<< MIDTRAns');
    expect(status).toBe(200);
    expect(body).toHaveProperty(
      'message',
      'midtrans transaction process finish'
    );
  });

  test('transaction result success capture', async () => {
    const respone = await request(app)
      .post('/transaction/midtrans/result')
      .send({
        order_id: 'payment-1-asalajaini',
        transaction_status: 'capture',
      });
    const { body, status } = respone;
    console.log(body, '<<<<< MIDTRAns');
    expect(status).toBe(200);
    expect(body).toHaveProperty(
      'message',
      'midtrans transaction process finish'
    );
  });

  test('transaction result success cancel', async () => {
    const respone = await request(app)
      .post('/transaction/midtrans/result')
      .send({
        order_id: 'payment-1-asalajaini',
        transaction_status: 'cancel',
      });
    const { body, status } = respone;
    console.log(body, '<<<<< MIDTRAns');
    expect(status).toBe(200);
    expect(body).toHaveProperty(
      'message',
      'midtrans transaction process finish'
    );
  });
});
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
    await TransactionHeader.destroy({
      where: {},
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await TransactionDetail.destroy({
      where: {},
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  } catch (error) {
    console.log(error, '<<<< afterAll');
  } // Close the database connection
});
