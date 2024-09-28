# User Profile Routes API Documentation

This API allows authenticated users to retrieve and update their profile information.

## Base URL
`/api/user-profile`

---

## GET `/api/user-profile`
### Description
Fetches the profile details of the authenticated user.

### Authentication
This route requires the user to be authenticated via `authMiddleware`.

### Response
- **200 OK**
```json
{
  "_id": "64f5b7f2f1234c0012345678",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "1234567890",
  "address": "123 Main St",
  "pincode": "10001",
  "createdAt": "2023-08-27T14:55:30.000Z",
  "updatedAt": "2023-08-27T14:55:30.000Z"
}
```

### Errors
- **404 Not Found**: If the user profile is not found.
```json
{
  "error": "User not found"
}
```
- **500 Internal Server Error**: If there’s an issue fetching the user profile.

---

## POST `/api/user-profile`
### Description
Updates the profile details of the authenticated user. Only specific fields such as `firstName`, `lastName`, `phone`, `address`, and `pincode` can be updated.

### Authentication
This route requires the user to be authenticated via `authMiddleware`.

### Request Body
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "phone": "9876543210",
  "address": "456 Elm St",
  "pincode": "10002"
}
```

### Response
- **200 OK**
```json
{
  "_id": "64f5b7f2f1234c0012345678",
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "9876543210",
  "address": "456 Elm St",
  "pincode": "10002",
  "createdAt": "2023-08-27T14:55:30.000Z",
  "updatedAt": "2023-09-01T12:45:00.000Z"
}
```

### Errors
- **404 Not Found**: If the user profile is not found.
```json
{
  "error": "User not found"
}
```
- **500 Internal Server Error**: If there’s an issue updating the user profile.

---

## Error Handling
All error responses will follow this format:
```json
{
  "error": "Error message"
}
```

- **401 Unauthorized**: If the user is not authenticated.
- **404 Not Found**: If the user profile is not found.
- **500 Internal Server Error**: If there’s a server-side issue.

---

## Fallback Route
A fallback route is included to handle any undefined endpoints.
```json
{
  "error": "Route not found"
}
```

