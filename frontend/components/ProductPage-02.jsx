import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Heart, ShoppingBag, ChevronDown, Menu, SlidersHorizontal, X } from 'lucide-react'
import NavBar from './NavBar';
import productData from './products-data';

export default function ProductsPage02() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const products = productData.group;

  const FilterContent = () => (
  <ScrollArea className="h-[calc(100vh-4rem)] ">
      <div className="space-y-4 p-4">
        <div>
          <Label className="block mb-2">Keywords</Label>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Spring</Badge>
            <Badge variant="secondary">Smart</Badge>
            <Badge variant="secondary">Modern</Badge>
          </div>
        </div>
        <div>
          <Label className="block mb-2">Category</Label>
          <div className="space-y-2">
            {['Lifestyle', 'Running', 'Basketball', 'Football'].map((category, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox id={`category${index}`} />
                <label htmlFor={`category${index}`} className="text-sm">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Label className="block mb-2">Price</Label>
          <Input type="range" min="0" max="100" />
        </div>
        <div>
          <Label className="block mb-2">Color</Label>
          <div className="space-y-2">
            {['Black', 'White', 'Red', 'Orange', 'Pink', 'Brown', 'Gray'].map((color, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox id={`color${index}`} />
                <label htmlFor={`color${index}`} className="text-sm">
                  {color}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Label className="block mb-2">Size</Label>
          <div className="space-y-2">
            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox id={`size${index}`} />
                <label htmlFor={`size${index}`} className="text-sm">
                  {size}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Label className="block mb-2">Brands</Label>
          <div className="space-y-2">
            {['Nike','Adidas', 'Puma', 'New Balance', 'Umbro'].map((size, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox id={`size${index}`} />
                <label htmlFor={`size${index}`} className="text-sm">
                  {size}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  )



  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b bg-background px-4">
        <NavBar />
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <FilterContent />
            </SheetContent>
          </Sheet>
          <aside className="hidden md:block md:w-64 p-4 border rounded-md">
            <FilterContent />
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
                <Select>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-high-low">Price: High-Low</SelectItem>
                    <SelectItem value="price-low-high">Price: Low-High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, idx) => (
                <Card key={idx} className="flex flex-col items-center p-4">
                  <img className="w-full h-auto bg-muted rounded-md mb-4" src='https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/b556ec75-0fb1-481d-ae46-9a0440accc73/ZOOM+SUPERFLY+9+ELITE+FG+SE.png' />
                  <div className="text-center">
                    <p className="font-semibold">Nike Product</p>
                    <p className="text-sm text-muted-foreground">Men's Shoes</p>
                    <p className="font-bold mt-2">$129.99</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <NikeLogo width={60} height={24} className="w-12 h-auto mb-4" />
              <div className="flex gap-4">
                <FacebookIcon className="w-6 h-6" />
                <TwitterIcon className="w-6 h-6" />
                <InstagramIcon className="w-6 h-6" />
              </div>
            </div>
            {['Products', 'Help', 'Company'].map((section, index) => (
              <div key={index}>
                <h4 className="font-bold mb-2">{section}</h4>
                <ul className="space-y-1 text-sm">
                  {['Item 1', 'Item 2', 'Item 3', 'Item 4'].map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

function NikeLogo(props) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none">
      <path fill="currentColor" fillRule="evenodd" d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z" clipRule="evenodd" />
    </svg>
  )
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
  )
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
  )
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
  )
}