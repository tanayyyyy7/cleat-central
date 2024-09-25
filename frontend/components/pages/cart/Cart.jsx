// Cart.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag, UserX, Loader2 } from 'lucide-react';
import NavBar from '../shared-components/NavBar';
import Footer from '../shared-components/Footer';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"

export default function Cart() {
  const { isLoggedIn, verifyToken } = useAuth();
  const [ cartItems, setCartItems ] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { cart, error, removeFromCart, updateQuantity, fetchCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const checkTokenAndFetchCart = async () => {
      await verifyToken();
      setIsLoading(true)
      await fetchCart();
      setIsLoading(false)
      if(cart){
        setCartItems(cart);
      }
    };

    checkTokenAndFetchCart();
  }, [verifyToken]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  if (!isLoggedIn) {
    return (
      <>
        <header className="sticky top-0 z-50 border-b bg-background px-4">
          <NavBar />
        </header>
        <div className="min-h-screen flex flex-col mx-4">
          <div className="flex-grow flex items-center justify-center">
            <Card className="w-full max-w-md">
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
                <Button onClick={() => navigate('/login-user')}>Head to Log In</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen flex flex-col mx-4">
          <div className="flex-grow flex items-center justify-center">
            <Loader2 className="h-16 w-16 animate-spin" />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (cartItems?.length === 0) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen flex flex-col mx-4">
          <div className="flex-grow flex items-center justify-center">
            <Card className="w-full max-w-md">
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
                <Button onClick={() => navigate('/products-page')}>Start Shopping</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-background px-4">
        <NavBar />
      </header>
      <div className="min-h-screen flex flex-col">
        <div className="container mx-auto px-4 py-8 flex-grow">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={`${item.productId}-${item.size}`} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="w-full h-48 sm:w-1/3">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow p-4 flex flex-col justify-between">
                      <div>
                        <h2 className="text-xl font-semibold">{item.name}</h2>
                        <p className="text-muted-foreground">Size: {item.size}</p>
                        <p className="font-bold mt-2">₹ {item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="icon" onClick={() => updateQuantity(item.productId, item.size, Math.max(1, item.quantity - 1))}>
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span>{item.quantity}</span>
                          <Button variant="outline" size="icon" onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.productId, item.size)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹ {total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>₹ {total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Proceed to Checkout</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}