# API Overview

This document provides an overview of the `/api` routes used in the application. Each route is organized by feature and includes basic information about its functionality.

## Base URL

All API routes are prefixed with `/api`.

## Overview of Routes

1. **User Routes** (`/api/user`)
   - These routes handle user authentication, authorization, and token management.
   - **Available Endpoints:**
     - `POST /signup`: Create a new user account.
     - `POST /login`: Log in with existing credentials.
     - `POST /refresh-token`: Refresh the user's authentication token.
     - `POST /logout`: Log out and clear user session tokens.
     - `GET /check-auth`: Check if the current user is authenticated.

2. **Product Routes** (`/api/products`)
   - These routes handle product retrieval and filtering for the e-commerce platform.
   - **Available Endpoints:**
     - `GET /catalogue`: Get a list of all available products in the catalogue.
     - `GET /product/:productId`: Retrieve details of a specific product by its ID.
     - `GET /featured`: Retrieve a set of randomly featured products.
     - `GET /filtered`: Get products filtered by attributes such as surface type and shoe height.

3. **Cart Routes** (`/api/cart`)
   - These routes handle shopping cart operations, including adding, removing, and updating items.
   - **Available Endpoints:**
     - `GET /`: Retrieve the current user's cart.
     - `POST /add`: Add an item to the user's cart.
     - `PUT /update`: Update the quantity of an item in the user's cart.
     - `DELETE /remove`: Remove an item from the user's cart.
     - `DELETE /clear`: Clear all items from the user's cart.

4. **User Profile Routes** (`/api/user-profile`)
   - These routes allow authenticated users to manage their profile information.
   - **Available Endpoints:**
     - `GET /`: Fetch the profile details of the currently authenticated user.
     - `POST /`: Update the user's profile information such as name, phone, and address.

---

## Authentication and Authorization

Most routes require user authentication via tokens. Routes are secured using an `authMiddleware` that validates the user's access token before allowing access to protected routes.

- **Protected Routes:**
  - All routes under `/api/cart`
  - All routes under `/api/user-profile`
  - `POST /api/user/logout`
  - `GET /api/user/check-auth`

---


## Fallback Route

Each feature module includes a fallback route to handle undefined endpoints, which returns an error response with the message:
```json
{
  "error": "Route not found"
}
