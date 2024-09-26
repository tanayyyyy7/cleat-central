import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Link } from 'react-router-dom'
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Heart, ShoppingBag, ChevronDown, Menu, LogIn, CircleUser, User } from 'lucide-react'
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from '../../context/AuthContext'
import { useTheme } from "@/components/themeProvider"

const MenuContent = () => (
    <div className="space-y-4">
        <a href="/" className="block text-lg hover:underline">Home</a>
        <a href="/products-page" className="block text-lg hover:underline">Catalogue</a>
        <a href="/blog" className="block text-lg hover:underline">Blog</a>
        <a href="#" className="block text-lg hover:underline">Contact Us</a>
    </div>
)


export default function NavBar() {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isLoggedIn, verifyToken, logout } = useAuth();

    useEffect(() => {
        const checkToken = async () => {
          await verifyToken();
        };
        checkToken();
      }, []);


      const handleUserLogout = () => {
        logout();
        alert('You have been logged out.')
      };
      

    return (
        <div className="container mx-auto px-4 py-3 flex items-center justify-between border-b">
            <div className='flex items-center'> 
            <p className="text-md hidden sm:block">CleatsCentral</p>
            <img src={`assets/brand-logo-${theme}.svg`} width={60} height={24} className="w-12 h-auto" />
            </div>
            <div className="flex items-center space-x-4">
                <nav className="hidden md:flex space-x-4">
                    <a href="/" className="text-md hover:underline">Home</a>
                    <a href="/products-page" className="text-md hover:underline">Catalogue</a>
                    <a href="/blog" className="text-md hover:underline">Blog</a>
                    <a href="#" className="text-md hover:underline">Contact Us</a>
                </nav>
            </div>
            <div className="flex items-center space-x-2">
                <ModeToggle />
                <Button variant="ghost" size="icon" onClick={() => navigate('/cart')}>
                    <ShoppingBag size={20} />
                </Button>
                {isLoggedIn ? (
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full">
                            <CircleUser size={20}/>
                            <span className="sr-only">Toggle user menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>My Account</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <Link to="/profile">
                          <DropdownMenuItem>Profile</DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem>Orders</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={handleUserLogout}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                ) : (
                    <Button variant="ghost" size="icon" onClick={() => navigate('/signup-user')}>
                        <LogIn size={20} />
                    </Button>
                )}
                <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu size={20} />
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
