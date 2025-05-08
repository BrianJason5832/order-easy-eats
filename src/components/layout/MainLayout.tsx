
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-bold text-2xl text-brand-500">
            EasyEats
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/restaurants" className="text-foreground hover:text-brand-500 transition-colors">
              Restaurants
            </Link>
            <Link to="/restaurant-signup" className="text-foreground hover:text-brand-500 transition-colors">
              Register Restaurant
            </Link>
            <Link to="/owner-dashboard" className="text-foreground hover:text-brand-500 transition-colors">
              Owner Dashboard
            </Link>
            <Link to="/cart">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-brand-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">0</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="bg-gray-100 border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">EasyEats</h3>
              <p className="text-gray-600">
                The easiest way to get your favorite food delivered.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-600 hover:text-brand-500">Home</Link></li>
                <li><Link to="/restaurants" className="text-gray-600 hover:text-brand-500">Restaurants</Link></li>
                <li><Link to="/restaurant-signup" className="text-gray-600 hover:text-brand-500">Register Restaurant</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <p className="text-gray-600">
                Email: info@easyeats.com<br />
                Phone: (555) 123-4567
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t text-center text-gray-600">
            <p>© {new Date().getFullYear()} EasyEats. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
