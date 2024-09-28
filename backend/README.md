# Cleat Central Backend API Documentation

## Overview

This project is the backend for an e-commerce platform, offering APIs for user authentication, product catalog, cart management, and user profile operations. It is built using **Node.js**, **Express**, and **MongoDB**. The backend handles all API requests, serves static assets, and interacts with the MongoDB database.

### Technologies Used:
- **Node.js**: Backend runtime environment.
- **Express**: Web framework for building the API.
- **MongoDB**: Database for storing data.
- **Mongoose**: MongoDB ODM for handling database schemas.
- **morgan**: Logging HTTP requests.
- **cookie-parser**: Middleware for handling cookies.
- **compression**: Middleware to gzip compress responses.
- **cors**: Middleware for enabling CORS support.
- **bcrypt**: A cryptographic hash function designed for password hashing and safe storing in the backend of applications in a way that is less susceptible to dictionary-based cyberattacks.

## Backend Installation & Setup

1. Clone the repository's backend folder:

    ```bash
    git clone https://github.com/cleat-central/backend.git
    ```

2. Install dependencies:

    ```bash
    pnpm install
    ```

3. Create a `.env` file in the root of the project and add the necessary environment variables. For example:

    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/yourdatabase
    JWT_SECRET=your_jwt_secret
    ```

4. Start the development server:

    ```bash
    pnpm run dev
    ```

5. The server will start running at `http://localhost:3000`.
---


## JWT-Cookie Based Authentication

The backend implements **JWT (JSON Web Token) based authentication** using **HttpOnly cookies** to secure user identity and control access to protected routes. Here's how this approach strengthens the system's security and mitigates potential cyber-attacks:

### How JWT-Cookie Authentication Works:

1. **User Login**:
   - Upon a successful login, a JWT is generated and stored in an HttpOnly cookie. This JWT is sent with each subsequent request to authenticate the user.

2. **HttpOnly Cookies**:
   - The JWT is stored in an HttpOnly cookie, preventing JavaScript in the browser from accessing the token. This helps mitigate **XSS (Cross-Site Scripting)** attacks, where malicious scripts attempt to steal sensitive information.

3. **Stateless Authentication**:
   - The backend is **stateless**, meaning no session data is stored on the server. Every request carries the JWT, which contains all the necessary information for authentication. This simplifies scaling, as there is no need for session storage in the database or memory.

4. **Token Expiration & Refresh Tokens**:
   - JWT tokens are short-lived for security purposes. A **refresh token** (also stored as an HttpOnly cookie) is used to issue new access tokens without requiring the user to log in again. This ensures minimal risk if the token is compromised since it expires quickly.

5. **Authentication Middleware**:
   - The **authMiddleware** checks for a valid JWT in the cookie for protected routes (e.g., cart actions, user profile updates). If no valid JWT is found, access is denied. This ensures that only authenticated users can access sensitive resources.

6. **Cross-Origin Resource Sharing (CORS)**:
   - **CORS** is configured to only allow requests from trusted domains. This reduces the risk of **CSRF (Cross-Site Request Forgery)** attacks by ensuring cookies are not sent on requests from unauthorized origins.

7. **Secure Cookies**:
   - Cookies are marked **Secure** and **SameSite** to prevent them from being sent over non-HTTPS connections or in cross-site requests. This further reduces the risk of **CSRF** attacks and protects against cookie theft.

By using **JWT in HttpOnly cookies** and following security best practices, this backend creates a robust and secure authentication system that protects users from common threats without the complexity of session management.

---
## API Endpoints

### **/api/user**
- **POST /signup**: Create a new user account.
- **POST /login**: Log in a user and receive a JWT token.
- **POST /refresh-token**: Refresh the JWT token using the refresh token.
- **POST /logout**: Log out the user and invalidate the refresh token.
- **GET /check-auth**: Check if the user is authenticated.

### **/api/products**
- **GET /catalogue**: Get a list of all products.
- **GET /product/:productId**: Get details for a specific product by ID.
- **GET /featured**: Get a random selection of featured products.
- **GET /filtered?surfaceType=&shoeHeight=**: Get a list of products filtered by surface type and shoe height.

### **/api/cart**
- **GET /**: Get the current user's cart.
- **POST /add**: Add an item to the cart.
- **PUT /update**: Update the quantity of an item in the cart.
- **DELETE /remove**: Remove an item from the cart.
- **DELETE /clear**: Clear the entire cart.

### **/api/user-profile**
- **GET /**: Get the current user's profile.
- **POST /**: Update the current user's profile information.

---

## Middleware Used

- **`authMiddleware`**: Middleware for checking user authentication before allowing access to certain routes. This ensures the user is logged in before interacting with protected endpoints like cart and user profile.
  
- **`cookieParser`**: Parses cookies for JWT and refresh token handling.
  
- **`compression`**: Compresses response bodies for all requests to improve performance.

---

## Database Models

### **User Model**
- **firstName** (String): User's first name.
- **lastName** (String): User's last name.
- **email** (String): User's email (unique).
- **password** (String): Hashed password.
- **refreshToken** (String): Token used for refreshing JWT.
- **phone** (String): User's phone number.
- **address** (String): User's address.
- **pincode** (String): Postal code of the user.

### **Product Model**
- **name** (String): Product name.
- **description** (String): Product description.
- **price** (Number): Product price.
- **surfaceType** (String): Surface type for which the shoe is suited.
- **shoeHeight** (String): Shoe height (e.g., low-cut, mid-cut).
- **brand** (String): Product brand (e.g., Nike, Adidas).
- **images** (Array): Array of image URLs.
- **stock.isAvailable** (Boolean): Availability status.

### **Cart Model**
- **userId** (ObjectId): Reference to the user.
- **items** (Array): List of items in the cart, each containing:
  - **productId** (ObjectId): Reference to the product.
  - **name** (String): Product name.
  - **price** (Number): Product price.
  - **image** (String): Product image URL.
  - **size** (String): Product size.
  - **quantity** (Number): Number of units for this item.

---

## Logging & Error Handling

- **morgan**: HTTP request logger, logs requests to the console as well as a file named `server.log` in the project root.
- **Fallback Routes**: Any unhandled routes will be caught by the `catchAll` middleware to ensure proper error handling and response.

---

## Folder Structure

```
├── controllers/          # Business logic for handling requests
├── models/               # Mongoose models for MongoDB collections
├── routes/               # API route definitions
│   ├── api/
│   ├── user/
│   ├── products/
│   ├── cart/
│   ├── userProfile/
├── db/                   # Database connection logic
├── utils/                # Utility functions and middlewares
├── app.js                # Main entry point of the application
└── .env                  # Environment variables
```
