
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import FeaturedRestaurants from '@/components/home/FeaturedRestaurants';

const Index = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-50 to-brand-100">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                Delicious Food, <span className="text-brand-500">Delivered Fast</span>
              </h1>
              <p className="text-lg mb-6 text-gray-600 max-w-md">
                Order from your favorite local restaurants with just a few taps. 
                Fast delivery, easy payment, amazing food.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/restaurants">
                  <Button className="bg-brand-500 hover:bg-brand-600 text-white">
                    Explore Restaurants
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/restaurant-signup">
                  <Button variant="outline" className="border-brand-500 text-brand-500 hover:bg-brand-50">
                    Register Your Restaurant
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3" 
                alt="Delicious Food" 
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-secondary rounded-lg">
              <div className="bg-brand-100 mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <span className="text-brand-600 font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Choose A Restaurant</h3>
              <p className="text-gray-600">Browse from our diverse range of local restaurants offering delicious food.</p>
            </div>
            
            <div className="text-center p-6 bg-secondary rounded-lg">
              <div className="bg-brand-100 mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <span className="text-brand-600 font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Select Your Food</h3>
              <p className="text-gray-600">Explore menus and add your favorite dishes to your cart with just a click.</p>
            </div>
            
            <div className="text-center p-6 bg-secondary rounded-lg">
              <div className="bg-brand-100 mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <span className="text-brand-600 font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Receive & Enjoy</h3>
              <p className="text-gray-600">Track your order and get it delivered to your doorstep quickly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Restaurants</h2>
            <Link to="/restaurants" className="text-brand-500 hover:underline flex items-center">
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <FeaturedRestaurants />
          
          <div className="text-center mt-12">
            <Link to="/restaurants">
              <Button className="bg-brand-500 hover:bg-brand-600">
                Explore All Restaurants
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
