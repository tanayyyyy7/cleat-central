# Product Routes API Documentation

This API handles product catalog operations, including fetching all products, retrieving details for specific products, and filtering products.

## Base URL
`/api/products`

---

## GET `/api/products/catalogue`
### Description
Fetches the entire product catalogue.

### Response
- **200 OK**
```json
[
  {
    "name": "Nike Mercurial Superfly",
    "description": "High-performance football shoes",
    "price": 199.99,
    "image": "https://example.com/merc.jpg",
    "surfaceType": "Firm Ground",
    "shoeHeight": "Low-Top",
    "colour": "Red",
    "stock": {
      "isAvailable": true
    },
    "brand": "Nike",
    "images": [
      {
        "src": "https://example.com/image1.jpg",
        "alt": "Nike Mercurial Front View"
      }
    ],
    "createdAt": "2023-08-01T00:00:00.000Z"
  }
]
```

### Errors
- **500 Internal Server Error**: If there’s an issue fetching the product catalogue.

---

## GET `/api/products/product/:productId`
### Description
Fetches details for a specific product by its `productId`.

### URL Parameters
- `productId` (optional): The unique ID of the product.

### Response
- **200 OK**
```json
{
  "name": "Nike Phantom GT",
  "description": "Precision control football shoes",
  "price": 179.99,
  "image": "https://example.com/phantom.jpg",
  "surfaceType": "Turf",
  "shoeHeight": "Low-Top",
  "colour": "Blue",
  "stock": {
    "isAvailable": true
  },
  "brand": "Nike",
  "images": [
    {
      "src": "https://example.com/phantom1.jpg",
      "alt": "Nike Phantom Side View"
    }
  ],
  "createdAt": "2023-07-15T00:00:00.000Z"
}
```

### Errors
- **404 Not Found**: If the product with the specified `productId` does not exist.
```json
{
  "error": "Product not found"
}
```
- **500 Internal Server Error**: If there’s an issue fetching the product details.

---

## GET `/api/products/featured`
### Description
Fetches a set of randomly selected featured products. Default limit is 3.

### Query Parameters
- `limit` (optional): Number of featured products to return. Defaults to 3.

### Response
- **200 OK**
```json
[
  {
    "name": "Adidas Predator",
    "description": "Football shoes with precision grip",
    "price": 199.99,
    "image": "https://example.com/predator.jpg",
    "surfaceType": "Firm Ground",
    "shoeHeight": "Low-Top",
    "colour": "Black",
    "stock": {
      "isAvailable": true
    },
    "brand": "Adidas",
    "images": [
      {
        "src": "https://example.com/predator1.jpg",
        "alt": "Adidas Predator Side View"
      }
    ]
  }
]
```

### Errors
- **500 Internal Server Error**: If there’s an issue fetching featured products.

---

## GET `/api/products/filtered`
### Description
Filters products based on `surfaceType` and/or `shoeHeight`.

### Query Parameters
- `surfaceType` (optional): The surface type (e.g., "Firm Ground", "Artificial Grass").
- `shoeHeight` (optional): The shoe height (e.g., "Low", "Mid").

### Response
- **200 OK**
```json
[
  {
    "name": "Puma Future Z",
    "description": "High agility football shoes",
    "price": 159.99,
    "image": "https://example.com/futurez.jpg",
    "surfaceType": "Firm Ground",
    "shoeHeight": "High-Top",
    "colour": "Yellow",
    "stock": {
      "isAvailable": true
    },
    "brand": "Puma",
    "images": [
      {
        "src": "https://example.com/futurez1.jpg",
        "alt": "Puma Future Z Side View"
      }
    ],
    "createdAt": "2023-06-10T00:00:00.000Z"
  }
]
```

### Errors
- **400 Bad Request**: If neither `surfaceType` nor `shoeHeight` is provided.
```json
{
  "error": "At least one parameter (surfaceType or shoeHeight) is required"
}
```
- **404 Not Found**: If no products match the given filters.
```json
{
  "error": "No products found for the given parameters"
}
```
- **500 Internal Server Error**: If there’s an issue filtering products.

---

## Error Handling
All error responses will follow this format:
```json
{
  "error": "Error message"
}
```

- **400 Bad Request**: Incorrect or missing data in the request.
- **404 Not Found**: If the product does not exist.
- **500 Internal Server Error**: Server encountered an issue.
```
