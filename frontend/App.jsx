
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

import Dashboard from "./components/DashBoard";
import LandingPage from "./components/LandingPage";
import UserLogin from "./components/UserLogin";
import UserSignUp from "./components/UserSignUp";
import AuthProvider from './components/AuthContext'; 
import ProductsPage from "./components/ProductsPage";
import ProductsPage02 from "./components/ProductPage-02";
import ProductDetails from "./components/ProductDetails";

export default function App() {
  const navigate = useNavigate();
 
  return (
    <AuthProvider>
    <NextUIProvider navigate={navigate}>
      <Routes>
        {/* Set LandingPage as the root route */}
        <Route path="/" element={<LandingPage />} /> 
        <Route path="/institution" />
        <Route path="/sample-dashboard" element={<Dashboard />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-signup" element={<UserSignUp />} />
        <Route path="/products-page" element={<ProductsPage />} />
        <Route path="/products-page-02" element={<ProductsPage02 />} />
        <Route path="/product-details" element={<ProductDetails />} />
        {/* Add more routes as needed */}
      </Routes>
    </NextUIProvider>
    </AuthProvider>
  );
}
