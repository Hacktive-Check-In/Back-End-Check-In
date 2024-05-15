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
    "message": "name is required"
}
OR
{
    "message": "name is required"
}
OR
{
    "message": "name is required"
}
```
