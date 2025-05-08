
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Search, Star } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Mock restaurant data (expanded list)
const allRestaurants = [
  {
    id: 1,
    name: "Burger Haven",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=1899&ixlib=rb-4.0.3",
    cuisine: "American",
    rating: 4.8,
    deliveryTime: "20-30 min",
    minOrder: 10
  },
  {
    id: 2,
    name: "Pasta Paradise",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
    cuisine: "Italian",
    rating: 4.7,
    deliveryTime: "25-40 min",
    minOrder: 15
  },
  {
    id: 3,
    name: "Sushi Sensation",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
    cuisine: "Japanese",
    rating: 4.9,
    deliveryTime: "30-45 min",
    minOrder: 20
  },
  {
    id: 4,
    name: "Taco Town",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=2080&ixlib=rb-4.0.3",
    cuisine: "Mexican",
    rating: 4.6,
    deliveryTime: "15-25 min",
    minOrder: 8
  },
  {
    id: 5,
    name: "Pizza Place",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=1981&ixlib=rb-4.0.3",
    cuisine: "Italian",
    rating: 4.5,
    deliveryTime: "20-35 min",
    minOrder: 12
  },
  {
    id: 6,
    name: "Noodle House",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=1780&ixlib=rb-4.0.3",
    cuisine: "Asian",
    rating: 4.6,
    deliveryTime: "25-35 min",
    minOrder: 15
  },
  {
    id: 7,
    name: "Falafel Factory",
    image: "https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&q=80&w=1780&ixlib=rb-4.0.3",
    cuisine: "Middle Eastern",
    rating: 4.7,
    deliveryTime: "20-30 min",
    minOrder: 10
  },
  {
    id: 8,
    name: "Curry Corner",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=1936&ixlib=rb-4.0.3",
    cuisine: "Indian",
    rating: 4.8,
    deliveryTime: "30-45 min",
    minOrder: 18
  }
];

// Cuisine options for filter
const cuisineOptions = ["All", "American", "Italian", "Japanese", "Mexican", "Asian", "Middle Eastern", "Indian"];

const Restaurants = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  
  // Filter restaurants based on search term and cuisine
  const filteredRestaurants = allRestaurants.filter((restaurant) => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCuisine = selectedCuisine === "All" || restaurant.cuisine === selectedCuisine;
    return matchesSearch && matchesCuisine;
  });

  return (
    <MainLayout>
      <section className="py-8 bg-brand-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Restaurants</h1>
          
          {/* Search and filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Input
                className="pl-10"
                placeholder="Search restaurants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {cuisineOptions.map((cuisine) => (
                <Button
                  key={cuisine}
                  variant={selectedCuisine === cuisine ? "default" : "outline"}
                  className={selectedCuisine === cuisine ? "bg-brand-500" : ""}
                  onClick={() => setSelectedCuisine(cuisine)}
                >
                  {cuisine}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          {filteredRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <Link 
                  to={`/restaurant/${restaurant.id}`} 
                  key={restaurant.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <img 
                      src={restaurant.image} 
                      alt={restaurant.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent w-full p-3">
                      <span className="text-white font-medium">{restaurant.cuisine}</span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{restaurant.name}</h3>
                    
                    <div className="flex items-center mt-2">
                      <div className="flex items-center text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="ml-1 text-sm font-medium">{restaurant.rating}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-500 ml-4">
                        <Clock className="h-4 w-4" />
                        <span className="ml-1 text-sm">{restaurant.deliveryTime}</span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-500 mt-2">
                      Minimum order: ${restaurant.minOrder}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No restaurants found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Restaurants;
