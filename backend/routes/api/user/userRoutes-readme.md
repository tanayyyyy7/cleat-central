# User Routes API Documentation

This API handles user authentication, login, signup, token management, and user session checks.

## Base URL
`/api/user`

---

## POST `/api/user/signup`
### Description
Registers a new user by accepting basic user details.

### Request Body
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Response
- **201 Created**
```json
{
  "user": {
    "id": "abc123",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### Errors
- **400 Bad Request**: If validation fails or email already exists.
```json
{
  "error": "Validation error or email already exists"
}
```

---

## POST `/api/user/login`
### Description
Logs in a user and generates a token for authenticated access.

### Request Body
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Response
- **200 OK**
```json
{
  "user": {
    "id": "abc123",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### Errors
- **401 Unauthorized**: Invalid email or password.
```json
{
  "error": "Invalid email or password"
}
```

---

## POST `/api/user/refresh-token`
### Description
Generates a new access token and refresh token based on the existing refresh token in cookies.

### Request Body
None (relies on cookies).

### Response
- **200 OK**
```json
{
  "message": "Tokens refreshed successfully"
}
```

### Errors
- **401 Unauthorized**: Invalid or expired refresh token.
```json
{
  "error": "Invalid refresh token"
}
```

---

## POST `/api/user/logout`
### Description
Logs the user out and clears the authentication and refresh tokens.

### Headers
- `Authorization: Bearer <token>`

### Response
- **200 OK**
```json
{
  "message": "Logged out successfully"
}
```

### Errors
- **500 Internal Server Error**
```json
{
  "error": "Logout error message"
}
```

---

## GET `/api/user/check-auth`
### Description
Checks if the user is authenticated based on the token in cookies.

### Headers
- `Authorization: Bearer <token>`

### Response
- **200 OK**
```json
{
  "isAuthenticated": true,
  "user": {
    "id": "abc123",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### Errors
- **401 Unauthorized**: Invalid or expired token.
```json
{
  "error": "Invalid token",
  "isAuthenticated": false
}
```

---

## Error Handling
All error responses will follow this format:
```json
{
  "error": "Error message"
}
```

- **400 Bad Request**: Incorrect or missing data in the request.
- **401 Unauthorized**: Authentication failure, invalid token, or not logged in.
- **500 Internal Server Error**: Server encountered an issue.

---

## Authentication
All endpoints (except for `/signup` and `/login`) require JWT tokens for authentication. Tokens are passed through cookies and should be refreshed periodically using the `/refresh-token` endpoint.
