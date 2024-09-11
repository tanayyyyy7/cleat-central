import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Heart, ShoppingBag, ChevronDown, Menu, SlidersHorizontal, X } from 'lucide-react'
import { ModeToggle } from "@/components/mode-toggle"

const MenuContent = () => (
    <div className="space-y-4">
        <a href="#" className="block text-lg hover:underline">Home</a>
        <a href="#" className="block text-lg hover:underline">Catalogue</a>
        <a href="#" className="block text-lg hover:underline">Blog</a>
        <a href="#" className="block text-lg hover:underline">Contact Us</a>
    </div>
)

export default function NavBar() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="container mx-auto px-4 py-4 flex items-center justify-between border-b">
            <div className="flex items-center space-x-4">
                <NikeLogo width={60} height={24} className="w-12 h-auto" />
                <nav className="hidden md:flex space-x-4">
                    <a href="#" className="text-md hover:underline">Home</a>
                    <a href="#" className="text-md hover:underline">Catalogue</a>
                    <a href="#" className="text-md hover:underline">Blog</a>
                    <a href="#" className="text-md hover:underline">Contact Us</a>
                </nav>
            </div>
            <div className="flex items-center space-x-4">
                <div className="relative hidden md:block">
                    <Input type="search" placeholder="Search" className="pl-8 pr-4 py-2 rounded-full bg-muted" />
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                </div>
                <ModeToggle />
                <Button variant="outline" size="icon" onClick={()=> navigate('/cart')}>
                    <ShoppingBag size={24} />
                </Button>
                <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu size={24} />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                        <div className="flex justify-between items-center mb-6">
                            <NikeLogo width={60} height={24} className="w-12 h-auto" />
                        </div>
                        <MenuContent />
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
}

function NikeLogo(props) {
    return (
        <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none">
            <path fill="currentColor" fillRule="evenodd" d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z" clipRule="evenodd" />
        </svg>
    )
}