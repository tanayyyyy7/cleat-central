import React, { useEffect, useCallback, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag, UserX, Loader2 } from 'lucide-react';
import NavBar from '../shared-components/NavBar';
import Footer from '../shared-components/Footer';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import ShippingInfo from './ShippingInfo';

export default function Cart() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { cart, loading, error, removeFromCart, updateQuantity, fetchCart } = useCart();
  const { toast } = useToast();
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const initializeCart = useCallback(async () => {
    setIsInitialLoading(true);
    if (isLoggedIn) {
      await fetchCart();
    }
    setIsInitialLoading(false);
  }, [isLoggedIn, fetchCart]);

  useEffect(() => {
    initializeCart();
  }, [initializeCart]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Oops, something went wrong",
        description: error,
        variant: "destructive",
        action: (
          <ToastAction
            altText="Reload"
            onClick={() => window.location.reload()}
          >
            Reload
          </ToastAction>
        )
      });
    }
  }, [error, toast]);

  const handleUpdateQuantity = async (productId, size, newQuantity) => {
    try {
      await updateQuantity(productId.toString(), size, newQuantity);
    } catch (error) {
      toast({
        title: "Error updating quantity",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleRemoveFromCart = async (productId, size) => {
    try {
      await removeFromCart(productId.toString(), size);
    } catch (error) {
      toast({
        title: "Error removing item",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (isInitialLoading) {
    return (
      <Layout>
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="h-16 w-16 animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!isLoggedIn) {
    return (
      <Layout>
        <Card className="w-full max-w-md bg-background/50 backdrop-blur-[1px]">
          <CardHeader>
            <CardTitle className="text-center">Please Log In</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <UserX className="h-24 w-24 text-muted-foreground" />
            </div>
            <p className="text-center text-muted-foreground">You need to be logged in to view your cart.</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => navigate('/login-user')} className="bg-primary hover:bg-primary/90 text-primary-foreground">Head to Log In</Button>
          </CardFooter>
        </Card>
      </Layout>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <Layout>
        <Card className="w-full max-w-md bg-background/50 backdrop-blur-[1px]">
          <CardHeader>
            <CardTitle className="text-center">Your Cart is Empty</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <ShoppingBag className="h-24 w-24 text-muted-foreground" />
            </div>
            <p className="text-center mt-4 text-muted-foreground">Looks like you haven't added any items to your cart yet.</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => navigate('/products-page')} className="bg-primary hover:bg-primary/90 text-primary-foreground">Start Shopping</Button>
          </CardFooter>
        </Card>
      </Layout>
    );
  }

  const handleItemClick = (productId) => {
    navigate(`/product-details/${productId}`);
  };



  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = subtotal > 14000 ? 0 : 500;
  const total = subtotal + shippingCost;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={`${item.productId}-${item.size}`} className="overflow-hidden bg-background/50 backdrop-blur-[1px]">
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full h-48 sm:w-1/3">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" onClick={() => handleItemClick(item.productId)} />
                  </div>
                  <div className="flex-grow p-4 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-semibold hover:underline" onClick={() => handleItemClick(item.productId)}>{item.name}</h2>
                      <p className="text-muted-foreground">Size: {item.size}</p>
                      <p className="font-bold mt-2">₹ {item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handleUpdateQuantity(item.productId, item.size, Math.max(1, item.quantity - 1))}
                          disabled={loading}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handleUpdateQuantity(item.productId, item.size, item.quantity + 1)}
                          disabled={loading}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleRemoveFromCart(item.productId, item.size)}
                        disabled={loading}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div>
            <Card className="sticky top-24 bg-background/50 backdrop-blur-[1px]">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <ShippingInfo />
                    <span>₹ {shippingCost === 0 ? 'Free' : shippingCost.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹ {total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Proceed to Checkout</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const Layout = ({ children }) => (
  <div className="min-h-screen min-w-screen flex flex-col bg-gradient-to-b from-background to-secondary">
    <header className=" w-full bg-background/85 backdrop-blur-sm sticky top-0 z-50">
      <NavBar />
    </header>
    <main className="w-full">{children}</main>
    <Footer />
  </div>
);