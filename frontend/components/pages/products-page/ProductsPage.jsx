import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal } from 'lucide-react';
import NavBar from '../shared-components/NavBar';
import Footer from '../shared-components/Footer';
import FilterContent from './FilterContent';
import axios from 'axios';
import ProductCardSkeleton from '../shared-components/ProductCardSkeleton';
import { useToast } from "@/hooks/use-toast";

export default function ProductsPage() {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const { toast } = useToast();
  const [filters, setFilters] = useState({
    brands: [],
    surfaceTypes: [],
    shoeHeights: [],
  });


  useEffect(() => {
    axios.get('/api/products/catalogue')
      .then(res => {
        setProductList(res.data.products);
        setFilteredList(res.data.products);
        setIsLoading(false);
      })
      .catch(error => {
        toast({
          title: 'Error',
          description: 'Failed to fetch products. Please Try Again Later',
          variant: 'destructive',
        });
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, productList, sortBy]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const applyFilters = () => {
    let filteredProducts = productList;

    if (filters.brands.length > 0) {
      filteredProducts = filteredProducts.filter(product => filters.brands.includes(product.brand));
    }

    if (filters.surfaceTypes.length > 0) {
      filteredProducts = filteredProducts.filter(product => filters.surfaceTypes.includes(product.surfaceType));
    }

    if (filters.shoeHeights.length > 0) {
      filteredProducts = filteredProducts.filter(product => filters.shoeHeights.includes(product.shoeHeight));
    }

    let sortedProducts = [...filteredProducts];

    switch (sortBy) {
      case 'newest':
        sortedProducts.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
        break;
      case 'oldest':
        sortedProducts.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
        break;
      case 'price-low-high':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        sortedProducts.sort(() => Math.random() - 0.5);
        break;
    }

    setFilteredList(sortedProducts);
    
  };

  const handleCardClick = (productId) => {
    navigate(`/product-details/${productId}`);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b bg-background px-4">
        <NavBar />
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <FilterContent onFilterChange={handleFilterChange} />
            </SheetContent>
          </Sheet>
          <aside className="hidden md:block md:w-64 p-4 border rounded-md">
            <FilterContent onFilterChange={handleFilterChange} />
          </aside>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button variant="outline" className="md:hidden" onClick={() => setIsFilterOpen(true)}>
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>
                <div className="relative flex-1 sm:flex-initial">
                  <Input type="search" placeholder="Search" className="pl-8 w-full" />
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="price-high-low">Price: High-Low</SelectItem>
                    <SelectItem value="price-low-high">Price: Low-High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {isLoading ? (
                // Display skeleton loading while fetching data
                Array.from({ length: 6 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))
              ) : filteredList.length > 0 ? (
                filteredList.map((product) => (
                  <Card key={product._id} className="flex flex-col p-4" onClick={() => handleCardClick(product._id)}>
                    <img className="w-full h-auto bg-muted rounded-md mb-4" src={product.image} alt={product.name} loading="lazy" />
                    <div className="text-left">
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.surfaceType + " " + product.shoeHeight} Football Boot</p>
                      <p className="font-bold mt-2">Rs. {product.price}.00</p>
                    </div>
                  </Card>
                ))
              ) : (
                <h1>No Products Found</h1>
              )}
            </div>
          </div>
        </div>
      </main>
     <Footer />
    </div>
  );
}

function NikeLogo(props) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none" {...props}>
      <path fill="currentColor" fillRule="evenodd" d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z" clipRule="evenodd" />
    </svg>
  );
}

function FacebookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}