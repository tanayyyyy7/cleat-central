# CleatCentral Frontend Documentation

## Overview

This folder contains the frontend for the CleatCentral platform. Built primarily using **React**, **Vite**, and **Tailwind CSS**, it offers an optimized and modern web application experience. The frontend interacts with a backend API for handling user authentication, product listings, cart management, and user profiles.

### Technologies Used
- **React**: Library for building user interfaces.
- **Vite**: Fast build tool and development server for modern web projects.
- **Tailwind CSS**: Utility-first CSS framework.
- **React Router**: For managing client-side routing.
- **ShadCN UI**: A component library that helps build modern UI components.
- **Context API**: For managing authentication and cart state globally.

## Installation & Setup

1. Clone the frontend repository:

    ```bash
    git clone https://github.com/cleat-central.git
    ```

2. Navigate to the project directory and install dependencies:

    ```bash
    cd frontend
    pnpm install
    ```

3. Create a `.env` file in the root directory with any necessary environment variables:

    ```bash
    VITE_API_BASE_URL=http://localhost:3000/api
    ```

4. Run the development server:

    ```bash
    pnpm run dev
    ```

5. The application will be accessible at `http://localhost:5173`.

---

## Folder Structure

```
.
├── App.jsx                           # Main app entry point
├── assets                            # Stores static assets like images and SVG files
├── components                        # All reusable components and page components
│   ├── context                       # Context API providers (Auth, Cart)
│   ├── pages                         # Page components
│   │   ├── blog                      # Blog-related pages
│   │   ├── cart                      # Cart page
│   │   ├── home-page                 # Landing page
│   │   ├── product-details           # Product details page and image carousel component
│   │   ├── products-page             # Product listing page and filters
│   │   ├── shared-components         # Navbar, Footer, Skeleton loaders, etc.
│   │   ├── user-auth                 # User authentication (login, signup)
│   │   └── user-profile              # User profile page
├── dist                              # Build directory
├── index.html                        # Main HTML file
├── index.jsx                         # Application entry point
├── src                               # Contains ShadCN UI components, hooks, and helpers
├── styles.css                        # Global styles
├── tailwind.config.js                # Tailwind CSS configuration
├── vite.config.js                    # Vite configuration
```

### Main components that form the UI

- **`LandingPage.jsx`**: The homepage of the application.
- **`ProductsPage.jsx`**: Displays a list of football cleats, with filters.
- **`ProductDetails.jsx`**: Shows detailed information about a specific product.
- **`Cart.jsx`**: Manages the cart functionality (adding, removing, updating items).
- **`UserSignUp.jsx` & `UserLogIn.jsx`**: Authentication pages for user sign-up and login.
- **`UserProfilePage.jsx`**: Displays and allows updating of the user profile.

---

## Routing

The app uses **React Router** to manage the following routes:

- **`/`**: Landing page.
- **`/signup-user`**: User sign-up page.
- **`/login-user`**: User login page.
- **`/products-page`**: Displays all available products.
- **`/product-details/:productId`**: Displays details for a specific product based on its ID.
- **`/cart`**: Cart page showing items the user has added.
- **`/profile`**: User profile page with update functionality.
- **`/blog`**: A blog page with informative articles about football boots.

---

## Context API

### **AuthContext**

- Provides user authentication state (e.g., logged-in status).
- Responsible for managing user-specific JWT tokens and using them for making API requests

### **CartContext**

- Manages the shopping cart state and actions like adding or removing items.
- The cart persists in localStorage to maintain the state across sessions.

---

## Tailwind CSS & Styling

Tailwind CSS is used for styling, enabling rapid UI development with utility classes. The **dark mode** is enabled by default and can be managed through the theme provider from ShadCN UI.
The UI is kept clean and minimal for this frontend as it will make it easy to tailor the UI according to real customer requirements in the future.

---

## Vite for Development

Vite is used for fast builds and hot module replacement during development. It ensures a smooth development experience and optimized production builds.

---

## Running Production Build

To create a production build:

```bash
pnpm run build
```

This will generate static assets in the `dist` directory, ready to be served.

