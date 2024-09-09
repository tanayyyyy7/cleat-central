import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ChevronDown } from 'lucide-react'
import NavBar from './NavBar'
import axios from 'axios'
export default function ProductDetails() {
  const { productId } = useParams();
  console.log(productId);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`/api/product/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        const prod = data.product;
        console.log(prod);
        setProduct(prod);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
      });
  }, [productId]);

  console.log(product?.name);
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image Gallery */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="aspect-square">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt={`Product image ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </Card>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/3 space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product?.name}</h1>
              <p className="text-lg text-muted-foreground">{product?.surfaceType} {product?.shoeHeight} Football Boot</p>
            </div>

            <div>
              <p className="text-2xl font-bold">MRP: &#8377; {product?.price}.00</p>
            </div>

            <div className="space-y-2">
              <p className="font-semibold">Select Size</p>
              <div className="grid grid-cols-3 gap-2">
                {['UK 7 / W 8.5', 'UK 7.5 / W 9', 'UK 8 / W 9.5', 'UK 8.5 / W 10', 'UK 9 / W 10.5', 'UK 9.5 / W 11'].map((size) => (
                  <Button key={size} variant="outline" className="text-sm">{size}</Button>
                ))}
              </div>
            </div>

            <Button className="w-full text-lg py-6">Add to Bag</Button>

            <Button variant="outline" className="w-full text-lg py-6">Favorite</Button>

            <div className="space-y-4">
              <p>
              <p className='italic'>{product?.brand} says:</p>
               {product?.description}
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Shown: White/Bright Crimson/Volt</li>
                <li>Style: DJ5625-146</li>
              </ul>
            </div>

            {/* <Button variant="link" className="flex items-center">
            View Product Details
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button> */}

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
            {/* Add review content here */}
          </TabsContent>
          <TabsContent value="details" className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Product Details</h2>
            {/* Add product details content here */}
          </TabsContent>
          <TabsContent value="shipping" className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Shipping & Returns</h2>
            {/* Add shipping and returns content here */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}