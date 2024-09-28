
# Backend API Documentation

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

## Installation & Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/your-repo/your-backend.git
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root of the project and add the necessary environment variables. For example:

    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/yourdatabase
    JWT_SECRET=your_jwt_secret
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

5. The server will start running at `http://localhost:3000`.

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

---

## Deployment

1. Make sure to configure environment variables correctly in production.
2. Install production dependencies:
    ```bash
    npm install --production
    ```
3. Build and start the app:
    ```bash
    npm run build
    npm start
    ```

---

## License

This project is licensed under the MIT License.