import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";
import NavBar from "../shared-components/NavBar";
import Footer from "../shared-components/Footer";
import { ArrowRight, ShoppingBag, Truck, RefreshCw, Facebook, Twitter, Instagram, BookOpen } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products/featured')
      .then(res => {
        setFeaturedProducts(res.data.featuredProducts);
        console.log(res.data.featuredProducts);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleCardClick = (productId) => {
    navigate(`/product-details/${productId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary">
      <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <NavBar />
      </header>
      <main className="flex-grow">
        <section className="relative bg-cover bg-center py-32" style={{ backgroundImage: "url('assets/hero-background.jfif')" }}>
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">Step into Style and Performance</h1>
            <p className="text-xl mb-8 text-white/80">Discover the perfect football boots for your game</p>
            <Link to="/products-page">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Explore Our Collection <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-16 bg-background/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <Card key={index} className="overflow-hidden transition-all duration-300 hover:shadow-lg" >
                  <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <p className="text-muted-foreground mb-4">{product.colour}</p>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => handleCardClick(product._id)}>View Details</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-background/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Dont Know Much about Different Shoe Types?</h2>
            <p className="text-xl mb-8 text-muted-foreground">Explore our comprehensive guide to football boots and find your perfect match</p>
            <Card className="bg-background/50 backdrop-blur-sm p-8 max-w-2xl mx-auto">
              <CardContent className="flex flex-col items-center">
                <BookOpen className="h-16 w-16 text-primary mb-4" />
                <h3 className="text-2xl font-semibold mb-4">Boot Types and Surfaces</h3>
                <p className="text-muted-foreground mb-6">Learn about different boot styles, surface types, and how to choose the right boots for your playing style.</p>
                <Link to="/blog">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Read Our Guide <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="bg-muted/50 backdrop-blur-sm py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-background/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
                  <p className="text-muted-foreground">Choose from a vast array of top-brand football boots</p>
                </CardContent>
              </Card>
              <Card className="bg-background/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <Truck className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                  <p className="text-muted-foreground">Get your boots delivered quickly to your doorstep</p>
                </CardContent>
              </Card>
              <Card className="bg-background/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <RefreshCw className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
                  <p className="text-muted-foreground">Not satisfied? Return within 30 days for a full refund</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to Elevate Your Game?</h2>
            <Link to="/signup-user">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Shop Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}