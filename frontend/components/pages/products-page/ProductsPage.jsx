import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
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
  const [searchTerm, setSearchTerm] = useState('');
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
  }, [filters, productList, sortBy, searchTerm]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const applyFilters = () => {
    let filteredProducts = productList;

    // Apply search filter
    if (searchTerm.trim() !== '') {
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary">
      <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
        <NavBar />
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <FilterContent onFilterChange={handleFilterChange} />
            </SheetContent>
          </Sheet>
          <aside className="hidden h-fit md:sticky md:top-24 md:block md:w-64 p-4 border rounded-md bg-background/50 backdrop-blur-[1px]">
            <FilterContent onFilterChange={handleFilterChange} />
          </aside>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button variant="outline" className="md:hidden" onClick={() => setIsFilterOpen(true)}>
                  <SlidersHorizontal className=" mr-2 h-4 w-4" />
                  Filters
                </Button>
                <div className="relative flex-1 sm:flex-initial">
                  <Input 
                    type="search" 
                    placeholder="Search by name" 
                    className="pl-8 w-full" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
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
                Array.from({ length: 6 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))
              ) : filteredList.length > 0 ? (
                filteredList.map((product) => (
                  <Card key={product._id} className="overflow-hidden transition-all duration-300 hover:shadow-lg" onClick={() => handleCardClick(product._id)}>
                    <img className="w-full h-64 object-cover" src={product.image} alt={product.name} loading="lazy" />
                    <CardContent className="p-4">
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.surfaceType + " " + product.shoeHeight} Football Boot</p>
                      <p className="font-bold mt-2">Rs. {product.price}.00</p>
                    </CardContent>
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