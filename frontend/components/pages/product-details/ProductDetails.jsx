import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, ChevronDown, Loader2 } from 'lucide-react';
import NavBar from '../shared-components/NavBar';
import ProductCarousel from './ProductCarousel';
import { useCart } from '../../context/CartContext';
import Footer from '../shared-components/Footer';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../../context/AuthContext';
import { ToastAction } from "@/components/ui/toast"

export default function ProductDetails() {
  const { productId } = useParams();
  const { isLoggedIn, verifyToken } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const { toast } = useToast();
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`/api/products/product/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data.product);
      })
      .catch((error) => {
        toast({
          title: 'Error fetching product details',
          description: error.message,
          variant: 'destructive',
          duration: 3000,
      });
  })
}, [productId]);

  const handleAddToCart = async () => {
    await verifyToken();
    const token = localStorage.getItem('token');
    if (!isLoggedIn) {
      toast({
        title: 'You must be logged in to add products to your cart.',
        description: 'Please log in or sign up to continue.',
        variant: 'destructive',
        duration: 3000,
        action: (
          <ToastAction
            altText="Login"
            onClick={() => navigate('/login-user')}
          >
            Login
          </ToastAction>
        )
      });
      return;
    }
    if (!selectedSize) {
      toast({
        title: 'Size not selected',
        description: 'Please select a size before adding the product to the cart.',
        variant: 'destructive',
      });
      return;
    }
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0].src,
      size: selectedSize,
      quantity: 1
    });
    toast({
      title: 'Product added to cart',
      description: 'Your product has been added to the cart.',
      duration: 2000,
      action: (
        <ToastAction
          altText="View Cart"
          onClick={() => navigate('/cart')}
        >
          View Cart
        </ToastAction>
      )
    });
  };

  if (!product) {
    return <Loader2 className="mr-2 h-1/2 w-1/2 animate-spin" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image Gallery */}
          <div className="lg:w-2/3">
            <ProductCarousel images={product.images} />
          </div>
          {/* Product Info */}
          <div className="lg:w-1/3 space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-lg text-muted-foreground">{product.surfaceType} {product.shoeHeight} Football Boot</p>
            </div>

            <div>
              <p className="text-2xl font-bold">MRP: &#8377; {product.price}.00</p>
            </div>

            <div className="space-y-2">
              <p className="font-semibold">Select Size</p>
              <div className="grid grid-cols-3 gap-2">
                {['UK 7', 'UK 7.5', 'UK 8', 'UK 8.5', 'UK 9', 'UK 9.5', 'UK 10', 'UK 10.5', 'UK 11'].map((size, idx) => (
                  <Button
                    key={idx}
                    variant={selectedSize === size ? "default" : "outline"}
                    className="text-sm"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <Button className="w-full text-lg py-6" onClick={handleAddToCart}>Add to Bag</Button>

            <div className="space-y-4">
              <p>
                <span className='block italic'>{product.brand} says: </span>
                {product.description}
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Colour Shown: {product.colour}</li>
                <li>Style: DJ5625-146</li>
              </ul>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(123)</span>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="reviews" className="mt-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="details">Product Details</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>
          <TabsContent value="reviews" className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
            <p>No reviews yet. Be the first to review this product!</p>
          </TabsContent>
          <TabsContent value="details" className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Product Details</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Brand: {product.brand}</li>
              <li>Surface Type: {product.surfaceType}</li>
              <li>Shoe Height: {product.shoeHeight}</li>
              <li>Colour: {product.colour}</li>
              <li>Availability: {product.stock?.isAvailable ? 'In Stock' : 'Out of Stock'}</li>
            </ul>
          </TabsContent>
          <TabsContent value="shipping" className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Shipping & Returns</h2>
            <p>Free standard shipping on orders over ₹14,000.</p>
            <p>You can return your order for any reason, free of charge, within 30 days.</p>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}