import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";
import NavMenuBar from "./NavMenuBar";
import NavBar from "./NavBar";

import { Link } from 'react-router-dom'

import { ArrowRight, ShoppingBag, Truck, RefreshCw, Facebook, Twitter, Instagram } from 'lucide-react'
export default function LandingPage() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    // setIsSignedIn(!isSignedIn);
    navigate("/user-auth");
  };

  const ctaEmail = (email) => {
    if (email) {
      navigate("/dashboard");
      // setIsSignedIn(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header>
      <NavBar />
      </header>
      <main className="flex-grow">
        <section className="relative bg-cover bg-center py-32" style={{backgroundImage: "url('/hero-background.jpg')"}}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">Step into Style and Performance</h1>
            <p className="text-xl mb-8 text-white">Discover the perfect football boots for your game</p>
            <Link to="/signup-user">
              <Button size="lg" className="">
                Shop Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Nike Mercurial Superfly", price: 24995, image: "/placeholder.svg?height=300&width=300" },
                { name: "Adidas X Speedflow", price: 22995, image: "/placeholder.svg?height=300&width=300" },
                { name: "Puma Future Z", price: 19995, image: "/placeholder.svg?height=300&width=300" },
              ].map((product, index) => (
                <Card key={index} className="overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <p className="text-muted-foreground mb-4">₹ {product.price.toFixed(2)}</p>
                    <Button className="w-full">View Details</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                  <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
                  <p className="text-muted-foreground">Choose from a vast array of top-brand football boots</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Truck className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                  <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                  <p className="text-muted-foreground">Get your boots delivered quickly to your doorstep</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <RefreshCw className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                  <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
                  <p className="text-muted-foreground">Not satisfied? Return within 30 days for a full refund</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to Elevate Your Game?</h2>
            <Link to="/products">
              <Button size="lg">
                Explore Our Collection <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-muted border-t py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-4">Sporty Aesthetics</h3>
              <p className="text-muted-foreground">Bringing you the best in football footwear</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/products" className="hover:underline">Products</Link></li>
                <li><Link to="/about" className="hover:underline">About Us</Link></li>
                <li><Link to="/contact" className="hover:underline">Contact</Link></li>
                <li><Link to="/terms" className="hover:underline">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Connect With Us</h3>
              <div className="flex flex-col space-y-3">
                <a href="#" className="text-muted-foreground hover:text-foreground flex items-center">
                  <Facebook className="h-5 w-5 mr-1" />
                  facebook-username
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground flex items-center">
                  <Twitter className="h-5 w-5 mr-1" />
                  Twitter-username
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground flex items-center">
                  <Instagram className="h-5 w-5 mr-1" />
                  Instagram-username
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-muted-foreground">
            <p>&copy; 2023 FootwearFusion. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
    </div>
  );
}

