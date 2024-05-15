# CheckIn Documentation

## Endpoints:

List of available endpoints:

- `POST` /register
- `POST` /login
- `GET` /user/detail

- `GET` /restaurant
- `GET` /restaurant/:id

- `GET` /transaction
- `POST` /transaction
- `GET` /transaction/:id
- `POST` /transaction/midtrans/result

## 1. `POST` /register

### Request:

- body

```JSON
{
    "name": "kevin",
    "password": "tester123",
    "email" : "kevin@mail.com",
    "phoneNumber": "081320473251"
}
```

### response

_respone(201 - created)_

```JSON
{
    "message": "Register succes",
    "id": 6,
    "email": "kevin@mail.com",
    "name": "kevin"
}
```

_response (400 - Bad request)_

```JSON
{
    "message": "name is required"
}
OR
{
    "message": "password is required"
}
OR
{
    "message": "email is required"
}
OR
{
    "message": "invalid email format"
}
OR
{
    "message": "phone number is required"
}
OR
{
    "message": "email is already registered in the database"
}
```

## 2. `POST` /login

### Request:

- body

```JSON
{
    "email" : "kevin@mail.com",
    "password": "tester123",
}
```

### response

_respone(200 - ok)_

```JSON
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE1NzY3NzQwfQ.oW1Meqc67tRjKTi3OawD_n1lZR75t4KJQHHZMXcT3xU"
}
```

_response (400 - Bad request)_

```JSON
{
    "message": "Invalid email / password"
}
OR
{
    "message": "email / password required"
}
```

## 3. `GET` /user/detail

### request:

- headers

```json
{
  "Authorization": "Bearer <token>",
  "Content-Type": "multipart/form-data"
}
```

### response:

```JSON
{
    "id": 1,
    "name": "user1",
    "email": "user1@mail.com",
    "password": "$2a$10$mpiPAlS7oNlU97VGFS8JIemQF.w6AAfLicRuLckfHGgqRFqZXosm6",
    "phoneNumber": "087654321",
    "avatar": "https://res.cloudinary.com/dghilbqdk/image/upload/v1714440067/profile%20pic/blggo1bqrandlpfurdp5.jpg",
    "createdAt": "2024-05-14T10:08:14.860Z",
    "updatedAt": "2024-05-14T10:08:14.860Z"
}
```
