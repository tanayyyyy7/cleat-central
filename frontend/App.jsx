
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from "./components/pages/home-page/LandingPage";
import UserSignUp from "./components/pages/user-auth/UserSignUp";
import UserLogIn from "./components/pages/user-auth/UserLogIn";
import AuthProvider from './components/context/AuthContext'; 
import ProductsPage02 from "./components/pages/products-page/ProductPage-02";
import ProductDetails from "./components/pages/product-details/ProductDetails";
import Cart from "./components/pages/cart/Cart";
import { CartProvider } from './components/context/CartContext';
import UserProfilePage from "./components/pages/user-profile/UserProfilePage";
import KnowYourBoots from "./components/pages/blog/KnowYourBoots";

export default function App() {
 
  return (
    <AuthProvider>
      <CartProvider>
      <Routes>
        {/* Set LandingPage as the root route */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup-user" element={<UserSignUp />} />
        <Route path="/login-user" element={<UserLogIn />} />
        <Route path="/products-page" element={<ProductsPage02 />} />
        <Route path="/product-details/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/blog" element={<KnowYourBoots />} />
       
      </Routes>
      </CartProvider>
    </AuthProvider>
  );
}
