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

_response (200-ok)_

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

_response (401 - Unauthorized)_

```json
{
  "message": "Error authentication"
}
```

## 4. `GET` /restaurant

### request

- params

```json
{
  "search": "string"
}
```

- headers

```json
{
  "Authorization": "Bearer <token>",
  "Content-Type": "multipart/form-data"
}
```

### response:

```JSON
[
    {
        "id": 1,
        "name": "KFC Jakarta Central",
        "address": "Jakarta, Indonesia",
        "description": "KFC Jakarta bietet eine umfassende Speisekarte.",
        "rating": 4.5,
        "imgUrl": "https://klasika.kompas.id/wp-content/uploads/2017/07/2707-Klasiloka-KFC_FEAT.jpg",
        "createdAt": "2024-05-14T10:08:16.387Z",
        "updatedAt": "2024-05-14T10:08:16.387Z"
    },
    {
        "id": 2,
        "name": "Pizza Hut Bekasi",
        "address": "Bekasi, Indonesia",
        "description": "Pizza Hut provides excellent service, when you come here you will be satisfied",
        "rating": 4.2,
        "imgUrl": "https://images.bisnis.com/posts/2023/01/03/1614712/pzza-sarimelati-1.jpg",
        "createdAt": "2024-05-14T10:08:16.387Z",
        "updatedAt": "2024-05-14T10:08:16.387Z"
    },
    {
        "id": 3,
        "name": "McDonald's Bogor",
        "address": "Bogor, Indonesia",
        "description": "In this place you will be served well and special",
        "rating": 4.3,
        "imgUrl": "https://d2vuyvo9qdtgo9.cloudfront.net/assets/img/bg/img_visi.jpg",
        "createdAt": "2024-05-14T10:08:16.387Z",
        "updatedAt": "2024-05-14T10:08:16.387Z"
    },
    {
        "id": 4,
        "name": "Burger King Bandung",
        "address": "Bandung, Indonesia",
        "description": "Wenn Sie hierher kommen, erhalten Sie viele Rabatte.",
        "rating": 4.1,
        "imgUrl": "https://images.bisnis.com/posts/2020/11/03/1313185/burger-king.jpg",
        "createdAt": "2024-05-14T10:08:16.387Z",
        "updatedAt": "2024-05-14T10:08:16.387Z"
    },
    {
        "id": 5,
        "name": "Starbucks Jakarta",
        "address": "Jakarta, Indonesia",
        "description": "Jetzt sind die Preise bei Starbucks günstiger, es ist sicher, Kaffee zu genießen.",
        "rating": 4.4,
        "imgUrl": "https://asumsi.co/wp-content/uploads/1644398291857_starbucksge35acbd7b1920.jpg",
        "createdAt": "2024-05-14T10:08:16.387Z",
        "updatedAt": "2024-05-14T10:08:16.387Z"
    }
]
```

## 5. `GET` /restaurant/:id

### request

- headers

```json
{
  "Authorization": "Bearer <token>",
  "Content-Type": "multipart/form-data"
}
```

### response
