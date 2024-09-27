import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram } from 'lucide-react'
import { useTheme } from "@/components/themeProvider"

export default function Footer() {
    const { theme } = useTheme();
    return (
        <footer id="#contactUs" className="bg-muted border-t py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className='space-y-4'>
                    <img src={`/assets/cleatcentral-logo-${theme}.svg`} width={130} height={24} className="w-25 h-auto" />
                    <p className="text-muted-foreground">Bringing you the best in class football cleats</p>
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
                                CleatsCentral
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-foreground flex items-center">
                                <Twitter className="h-5 w-5 mr-1" />
                                CleatsCentral
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-foreground flex items-center">
                                <Instagram className="h-5 w-5 mr-1" />
                                CleatsCentral
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 text-center text-muted-foreground">
                    <p>&copy; 2024 CleatsCentral. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}