import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Minus, Plus, Trash2 } from 'lucide-react'
import NavBar from './NavBar'
import { useCart } from './CartContext'
import { useAuth } from './AuthContext'

export default function Cart() {
  const { isLoggedIn } = useAuth()
  const { verifyToken } = useAuth()
  const { cart, removeFromCart, updateQuantity } = useCart()
  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  useEffect(() => {
    const checkToken = async () => {
      await verifyToken();
    };

    checkToken();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        {isLoggedIn ? (cart.items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3 space-y-4">
              {cart.items.map((item) => (
                <Card key={`${item._id}-${item.size}`} className="p-4 flex items-center">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover mr-4" />
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-muted-foreground">Size: {item.size}</p>
                    <p className="font-bold mt-2">₹ {item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center">
                    <Button variant="outline" size="icon" onClick={() => updateQuantity(item._id, item.size, Math.max(1, item.quantity - 1))}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button variant="outline" size="icon" onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="ml-2" onClick={() => removeFromCart(item._id, item.size)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            <div className="lg:w-1/3">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹ {total.toFixed(2)}</span>
                  </div>
                </div>
                <Button className="w-full">Proceed to Checkout</Button>
              </Card>
            </div>
          </div>
        )) : (<h1> Please login to view cart</h1>)}
      </div>
    </div>
  )
}