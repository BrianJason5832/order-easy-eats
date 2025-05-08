
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star } from 'lucide-react';

// Mock restaurant data
const featuredRestaurants = [
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
  }
];

const FeaturedRestaurants = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredRestaurants.map((restaurant) => (
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
  );
};

export default FeaturedRestaurants;
