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

### Response:

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

### Response:

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

### Description:

- get the current user detail

### Request:

- headers

```json
{
  "Authorization": "Bearer <token>",
  "Content-Type": "multipart/form-data"
}
```

### Response:

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

### Description:

- get all of the restaurant that is registered into our application

### Request:

- query

```json
{
  "search": "string"
}
```

- headers

```json
{
  "Authorization": "Bearer <token>"
}
```

### Response:

_response (200-ok)_

```JSON
[
    {
        "id": 1,
        "name": "PASOLA Restaurant",
        "address": "Jakarta",
        "description": "Restoran ini menawarkan pengalaman kuliner yang unik dengan menu yang inovatif dan cita rasa yang luar biasa.",
        "rating": 5,
        "imgUrl": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/39/b2/74/pasola-restaurant-buffet.jpg?w=1200&h=-1&s=1",
        "createdAt": "2024-05-15T10:28:53.526Z",
        "updatedAt": "2024-05-15T10:28:53.526Z"
    },
    {
        "id": 2,
        "name": "Dining Room At Park Hyatt",
        "address": "Jakarta",
        "description": "menampilkan masakan kreatif yang menggunakan bahan-bahan lokal terbaik dengan sentuhan internasional.",
        "rating": 5,
        "imgUrl": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/24/cf/98/18/dining-room-open-kitchen.jpg?w=1200&h=-1&s=1",
        "createdAt": "2024-05-15T10:28:53.526Z",
        "updatedAt": "2024-05-15T10:28:53.526Z"
    },
    {
        "id": 3,
        "name": "Sugar & Spice",
        "address": "Jakarta",
        "description": "Merupakan salah satu destinasi kuliner Jepang yang mewah, dengan desain interior yang elegan dan menu sushi yang berkualitas tinggi.",
        "rating": 5,
        "imgUrl": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/81/48/34/sitting-arrangement.jpg?w=1200&h=-1&s=1",
        "createdAt": "2024-05-15T10:28:53.526Z",
        "updatedAt": "2024-05-15T10:28:53.526Z"
    },
    {
        "id": 4,
        "name": "Bondi Restaurant",
        "address": "Bali",
        "description": "menawarkan hidangan Perancis klasik dengan sentuhan modern, disajikan dengan layanan yang sangat profesional.",
        "rating": 5,
        "imgUrl": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/1f/65/32/bondi-cafe-at-finns-beach.jpg?w=1200&h=-1&s=1",
        "createdAt": "2024-05-15T10:28:53.526Z",
        "updatedAt": "2024-05-15T10:28:53.526Z"
    },
    {
        "id": 5,
        "name": "Copper Kitchen & Bar",
        "address": "Bali",
        "description": "Terletak di atas tebing dengan pemandangan laut yang spektakuler, menawarkan suasana yang romantis dan koktail yang lezat.",
        "rating": 4.5,
        "imgUrl": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/80/17/51/the-rooftop.jpg?w=1200&h=-1&s=1",
        "createdAt": "2024-05-15T10:28:53.526Z",
        "updatedAt": "2024-05-15T10:28:53.526Z"
    }
]
```

_response (401 - Unauthorized)_

```json
{
  "message": "Error authentication"
}
```

## 5. `GET` /restaurant/:id

### Description:

- get restaurant detail with their menus

### Request:

- params

```json
{
  "id": "string"
}
```

- headers

```json
{
  "Authorization": "Bearer <token>"
}
```

### Response:

_response (200-ok)_

```JSON
[
    {
        "id": 1,
        "name": "PASOLA Restaurant",
        "address": "Jakarta",
        "description": "Restoran ini menawarkan pengalaman kuliner yang unik dengan menu yang inovatif dan cita rasa yang luar biasa.",
        "rating": 5,
        "imgUrl": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/39/b2/74/pasola-restaurant-buffet.jpg?w=1200&h=-1&s=1",
        "createdAt": "2024-05-15T10:28:53.526Z",
        "updatedAt": "2024-05-15T10:28:53.526Z",
        "Items": [
            {
                "id": 1,
                "RestaurantId": 1,
                "name": "MIE GORENG",
                "description": "Fried Egg Noodles, Prawn, Beef Ball,Chicken Sate",
                "price": 125000,
                "imgUrl": "https://asset.kompas.com/crops/032NyNKaO9X61kL1ZpU9AS4khrU=/52x28:954x629/750x500/data/photo/2020/11/19/5fb641f087a66.jpg",
                "createdAt": "2024-05-15T10:28:53.555Z",
                "updatedAt": "2024-05-15T10:28:53.555Z"
            },
            {
                "id": 2,
                "RestaurantId": 1,
                "name": "KING PRAWNS",
                "description": "Spicy Sour Keung Sauce, Lingueine,Roasted Cherry Tomatoes",
                "price": 398000,
                "imgUrl": "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/prawns-88d2952.jpg",
                "createdAt": "2024-05-15T10:28:53.555Z",
                "updatedAt": "2024-05-15T10:28:53.555Z"
            },
            {
                "id": 3,
                "RestaurantId": 1,
                "name": "ASAM PADEH BOWL",
                "description": "Prawns,Scallops,Garouper, Baby Octopus,Tamarind Chili Lime Leaf",
                "price": 198000,
                "imgUrl": "https://img-global.cpcdn.com/recipes/0cb7219daddbeeda/680x482cq70/asam-padeh-gajeboh-foto-resep-utama.jpg",
                "createdAt": "2024-05-15T10:28:53.555Z",
                "updatedAt": "2024-05-15T10:28:53.555Z"
            },
            {
                "id": 4,
                "RestaurantId": 1,
                "name": "CHARRED AUSTRALIAN WAGYU TENDERLOIN",
                "description": "Beef Tenderloin,Pelawan Mushroom Sauce,Lobi Lobi Glaze, Mashed Potato",
                "price": 780000,
                "imgUrl": "https://i0.wp.com/yummylummy.com/wp-content/uploads/2018/12/Gary_Lum_Australian-Wagyu-beef-013.jpg?fit=2048%2C1638&ssl=1",
                "createdAt": "2024-05-15T10:28:53.555Z",
                "updatedAt": "2024-05-15T10:28:53.555Z"
            },
            {
                "id": 5,
                "RestaurantId": 1,
                "name": "BUMBU RUJAK BARBECUED GAROUPER",
                "description": "Sustainbly Farmed Garouper Fillet",
                "price": 280000,
                "imgUrl": "https://img-global.cpcdn.com/recipes/e37993496d46f45c/680x482cq70/sosis-bumbu-rujak-foto-resep-utama.jpg",
                "createdAt": "2024-05-15T10:28:53.555Z",
                "updatedAt": "2024-05-15T10:28:53.555Z"
            }
        ]
    }
]
```

_response (401 - Unauthorized)_

```json
{
  "message": "Error authentication"
}
```

## 6. `GET` /transaction

### Description:

- get the current logged in user receipt of success transaction

### Request:

- headers

```json
{
  "Authorization": "Bearer <token>"
}
```

### Response:

_response (200-ok)_

```JSON
[
    {
        "id": 1,
        "UserId": 2,
        "RestaurantId": 1,
        "reservationDate": "2024-05-16T11:48:57.622Z",
        "totalPrice": 350000,
        "status": "success",
        "createdAt": "2024-05-15T10:35:12.553Z",
        "updatedAt": "2024-05-15T10:35:26.102Z",
        "Restaurant": {
            "name": "PASOLA Restaurant",
            "address": "Jakarta",
            "description": "Restoran ini menawarkan pengalaman kuliner yang unik dengan menu yang inovatif dan cita rasa yang luar biasa.",
            "rating": 5,
            "imgUrl": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/39/b2/74/pasola-restaurant-buffet.jpg?w=1200&h=-1&s=1"
        }
    }
]
```

_response (401 - Unauthorized)_

```json
{
  "message": "Error authentication"
}
```

## 7. `POST` /transaction

### Request:

- body

```JSON
{
    "reservationDate": "2024-05-16 18:48:57.622 +0700",
    "totalPrice": 350000,
    "RestaurantId": 1,
    "items": [
        {"ItemId":1, "qty":2, "subTotal": 100000},
        {"ItemId":2, "qty":2, "subTotal": 200000}
    ]
}
```

- header

```json
{
  "Authorization": "Bearer <token>"
}
```

### Response:

_response (200-ok)_

```json
{
  "redirect_url": "https://app.sandbox.midtrans.com/snap/v4/redirection/4efc40e4-54c1-48a1-9e1d-6ebe1ab8e9cb"
}
```

_response (401 - Unauthorized)_

```json
{
  "message": "Error authentication"
}
```

## 8. `GET` /transaction/:id

### Description:

- get the transaction detail of the receipt

### Request:

- params

```json
{
  "id": "string"
}
```

- headers

```json
{
  "Authorization": "Bearer <token>"
}
```

### Response:

_response (200-ok)_

```JSON
{
    "id": 1,
    "UserId": 2,
    "RestaurantId": 1,
    "reservationDate": "2024-05-16T11:48:57.622Z",
    "totalPrice": 350000,
    "status": "success",
    "createdAt": "2024-05-15T10:35:12.553Z",
    "updatedAt": "2024-05-15T10:35:26.102Z",
    "Restaurant": {
        "name": "PASOLA Restaurant",
        "address": "Jakarta",
        "description": "Restoran ini menawarkan pengalaman kuliner yang unik dengan menu yang inovatif dan cita rasa yang luar biasa.",
        "rating": 5,
        "imgUrl": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/39/b2/74/pasola-restaurant-buffet.jpg?w=1200&h=-1&s=1"
    },
    "User": {
        "name": "user2",
        "phoneNumber": "08765432121"
    },
    "TransactionDetails": [
        {
            "qty": 2,
            "subTotal": 100000,
            "Item": {
                "name": "MIE GORENG",
                "description": "Fried Egg Noodles, Prawn, Beef Ball,Chicken Sate",
                "price": 125000
            }
        },
        {
            "qty": 2,
            "subTotal": 200000,
            "Item": {
                "name": "KING PRAWNS",
                "description": "Spicy Sour Keung Sauce, Lingueine,Roasted Cherry Tomatoes",
                "price": 398000
            }
        }
    ]
}
```

_response (401 - Unauthorized)_

```json
{
  "message": "Error authentication"
}
```

## 8. `POST` /transaction/midtrans/result

### Description:

- this post method is being used for midtrans give feedback if the user already paid the reservation or not

### Request:

- body

```JSON
{
  "transaction_time": "date",
  "transaction_status": "string",
  "transaction_id": "string",
  "status_message": "string",
  "status_code": "string",
  "signature_key": "string",
  "payment_type": "string",
  "order_id": "string",
  "merchant_id": "string",
  "masked_card": "string",
  "gross_amount": "string",
  "fraud_status": "string",
  "eci": "string",
  "currency": "string",
  "channel_response_message": "string",
  "channel_response_code": "string",
  "card_type": "string",
  "bank": "string",
  "approval_code": "string"
}
```

### Response:

_response (200-ok)_

```json
{
  "message": "midtrans transaction process finish"
}
```

## Global Error

_Response (500 - Internal Server Error)_

```JSON
{
    "message": "Internal server error"
}
```
