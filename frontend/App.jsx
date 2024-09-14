
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from "./components/pages/home-page/LandingPage";
import UserSignUp from "./components/pages/user-auth/UserSignUp";
import AuthProvider from './components/context/AuthContext'; 
import ProductsPage02 from "./components/pages/products-page/ProductPage-02";
import ProductDetails from "./components/pages/product-details/ProductDetails";
import Cart from "./components/pages/cart/Cart";
import { CartProvider } from './components/context/CartContext';
import UserProfilePage from "./components/pages/profile/UserProfilePage";

export default function App() {
 
  return (
    <AuthProvider>
      <CartProvider>
      <Routes>
        {/* Set LandingPage as the root route */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup-user" element={<UserSignUp />} />
        <Route path="/products-page" element={<ProductsPage02 />} />
        <Route path="/product-details/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<UserProfilePage />} />
        {/* Add more routes as needed */}
      </Routes>
      </CartProvider>
    </AuthProvider>
  );
}
