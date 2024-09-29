# CleatCentral - Capstone Project

## Overview

The Idea behind **CleatCentral** is creating a modern e-commerce platform designed providing an exlusive collection of football cleats which the users can buy from. The platform offers a seamless user experience with features like product browsing, cart management, user authentication, and personalized user profiles. This project is a capstone, demonstrating advanced full-stack development skills, combining a **React**-based frontend and a **Node.js/Express** backend with a **MongoDB** database.

The current implementation of the project includes functionality up to adding products to the cart. Expanding the system to handle order creation introduces a range of valuable features such as real-time order tracking, receipt generation, and maintaining order history. However, given the time constraints, these advanced functionalities have been deferred to future development phases. This allows the project to remain focused on delivering core features while laying the groundwork for potential expansion.

The project is divided into two main components:
- **Backend**: Provides RESTful APIs for user authentication, product management, and order processing.
- **Frontend**: Offers a dynamic user interface for browsing products, managing shopping carts, and user profiles.

## Features

### Backend
- **User Authentication**: Secure login, signup, and token-based authentication using JWT stored in HttpOnly cookies.
- **Product Management**: APIs for listing, filtering, and retrieving football cleat products based on surface type, shoe height, and brand.
- **Cart Management**: Allow users to add, update, or remove items from the cart.
- **Profile Management**: Users can update their profiles, including contact details and addresses.
- **Logging & Error Handling**: Includes error handling middleware, HTTP logging with Morgan, and efficient compression.

### Frontend
- **Product Catalog**: A responsive interface showcasing football cleats, with filters and search functionality.
- **User-Friendly Cart**: Enables users to view and manage the items they wish to purchase.
- **User Authentication**: Easy login and signup forms with secure state management through **Context API**.
- **Responsive UI**: Tailored design using **Tailwind CSS** and **ShadCN UI** for a clean, modern appearance with dark mode support.

---

## Technologies Used

### Backend:
- **Node.js**: Server-side runtime for building scalable applications.
- **Express**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for efficient storage and retrieval of data.
- **JWT (JSON Web Tokens)**: Token-based authentication mechanism.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **Morgan**: HTTP request logger for easy debugging.
- **bcrypt**: Secure password hashing.
- **cors & cookie-parser**: Secure cookie handling and Cross-Origin Resource Sharing.

### Frontend:
- **React**: UI library for building dynamic, component-based interfaces.
- **Vite**: Fast build tool and development server for optimized builds.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **React Router**: Client-side routing for navigation between pages.
- **Context API**: For managing global state (authentication and cart).
- **ShadCN UI**: Component library for modern UI components.

---

## Environment Setup & Dev Server

### Backend

1. Create a `.env` file in the **backend** folder and add the following environment variables:

    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/cleatcentral
    JWT_SECRET=your_jwt_secret
    ```

2. Start the backend server:

    ```bash
    cd backend
    pnpm run dev
    ```

The backend will be accessible at `http://localhost:3000`.

### Frontend


Start the frontend development server:

    ```bash
    cd frontend
    pnpm run dev
    ```

The frontend will be accessible at `http://localhost:5173`.

---

## Folder Structure (both folder contain specific README.md files that provide a detailed overview of the functionalities covered)

### Backend

```
backend/
├── controllers/          # Handles API request logic
├── models/               # Mongoose schemas for MongoDB collections
├── routes/               # API route definitions (users, products, cart, etc.)
├── app.js                # Express app setup
├── .env                  # Environment variables
└── README.md             # Backend-specific documentation
```

### Frontend

```
frontend/
├── src/                  # Contains all source code (components, hooks, pages)
│   ├── components/       # Reusable UI components
│   ├── pages/            # Main pages (Home, Products, Cart, Profile, etc.)
│   ├── context/          # Auth and Cart Contexts for global state
├── styles.css            # Global CSS file for Tailwind
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
└── README.md             # Frontend-specific documentation
```

---

## API Documentation

The backend exposes several APIs for user authentication, product retrieval, cart management, and user profiles. For full details, check the [Backend API Documentation](./backend/README.md).


## Build and Deployment

### Production Build (for Deployment)

You are deploying the **frontend build** directly into the **backend** for production.

### Steps to Create Production Build:
1. **Build the Frontend**:
   ```bash
   cd frontend
   pnpm run build
   ```

   This will generate a production-ready build in the `frontend/dist` directory.


3. **Serving the Frontend**:
   After building the frontend, the `dist` directory will be deployed alongside the backend as static assets.
   The `backend` is set up to serve static files from the `frontend/dist` folder:
   ```javascript
   app.use(express.static(path.join(__dirname, 'frontend', 'dist')));
   app.get('*', (req, res) => {
     res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
   });
   ```

   Now, your backend will serve the frontend in production, and API routes will be handled seamlessly.

5. **Deployment Platform**:
   You are using **Render** to deploy the combined frontend and backend as a single web service. The production build is served by the backend, while API requests are routed through the same server.

### Render Deployment Example:

In Render's service settings:
- **Build Command**:
  ```bash
  cd frontend && pnpm install && pnpm run build && cd ../backend && pnpm install
  ```

- **Start Command**:
  ```bash
  cd backend && pnpm run start
  ```

This ensures that the frontend is built and served along with the backend in production.



### This project is part of the final capstone requirement for UpGrad/JavaScript Fullstack Dev Bootcamp.

