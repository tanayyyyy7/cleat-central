# Cart Routes API Documentation

This API allows authenticated users to manage their shopping cart, including adding, updating, removing items, and clearing the cart.

## Base URL
`/api/cart`

---

## GET `/api/cart/`
### Description
Fetches the current user's cart.

### Authentication
This route requires the user to be authenticated via `authMiddleware`.

### Response
- **200 OK**
```json
{
  "userId": "64f5b7f2f1234c0012345678",
  "items": [
    {
      "productId": "64f5b7f2f1234c0098765432",
      "name": "Nike Mercurial Superfly",
      "price": 199.99,
      "image": "https://example.com/nike.jpg",
      "size": "10",
      "quantity": 2
    }
  ]
}
```

### Errors
- **500 Internal Server Error**: If there’s an issue fetching the cart.

---

## POST `/api/cart/add`
### Description
Adds an item to the user's cart. If the product already exists in the cart with the same size, it updates the quantity.

### Authentication
This route requires the user to be authenticated via `authMiddleware`.

### Request Body
```json
{
  "productId": "64f5b7f2f1234c0098765432",
  "size": "10",
  "quantity": 2
}
```

### Response
- **200 OK**
```json
{
  "userId": "64f5b7f2f1234c0012345678",
  "items": [
    {
      "productId": "64f5b7f2f1234c0098765432",
      "name": "Nike Mercurial Superfly",
      "price": 199.99,
      "image": "https://example.com/nike.jpg",
      "size": "10",
      "quantity": 2
    }
  ]
}
```

### Errors
- **404 Not Found**: If the product does not exist.
```json
{
  "error": "Product not found"
}
```
- **500 Internal Server Error**: If there’s an issue adding the product to the cart.

---

## PUT `/api/cart/update`
### Description
Updates the quantity of a specific item in the cart.

### Authentication
This route requires the user to be authenticated via `authMiddleware`.

### Request Body
```json
{
  "productId": "64f5b7f2f1234c0098765432",
  "size": "10",
  "quantity": 3
}
```

### Response
- **200 OK**
```json
{
  "userId": "64f5b7f2f1234c0012345678",
  "items": [
    {
      "productId": "64f5b7f2f1234c0098765432",
      "name": "Nike Mercurial Superfly",
      "price": 199.99,
      "image": "https://example.com/nike.jpg",
      "size": "10",
      "quantity": 3
    }
  ]
}
```

### Errors
- **404 Not Found**: If the item does not exist in the cart.
```json
{
  "error": "Item not found in cart"
}
```
- **500 Internal Server Error**: If there’s an issue updating the quantity.

---

## DELETE `/api/cart/remove`
### Description
Removes a specific item from the cart based on `productId` and `size`.

### Authentication
This route requires the user to be authenticated via `authMiddleware`.

### Request Body
```json
{
  "productId": "64f5b7f2f1234c0098765432",
  "size": "10"
}
```

### Response
- **200 OK**
```json
{
  "userId": "64f5b7f2f1234c0012345678",
  "items": []
}
```

### Errors
- **404 Not Found**: If the item does not exist in the cart.
```json
{
  "error": "Item not found in cart"
}
```
- **500 Internal Server Error**: If there’s an issue removing the item.

---

## DELETE `/api/cart/clear`
### Description
Clears all items from the cart.

### Authentication
This route requires the user to be authenticated via `authMiddleware`.

### Response
- **200 OK**
```json
{
  "userId": "64f5b7f2f1234c0012345678",
  "items": []
}
```

### Errors
- **404 Not Found**: If the cart does not exist.
```json
{
  "error": "Cart not found"
}
```
- **500 Internal Server Error**: If there’s an issue clearing the cart.

---

## Error Handling
All error responses will follow this format:
```json
{
  "error": "Error message"
}
```

- **401 Unauthorized**: If the user is not authenticated.
- **404 Not Found**: If the item or cart is not found.
- **500 Internal Server Error**: Server encountered an issue.
