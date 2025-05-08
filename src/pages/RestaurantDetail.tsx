
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, Star, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock restaurant data
const restaurants = [
  {
    id: 1,
    name: "Burger Haven",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=1899&ixlib=rb-4.0.3",
    cuisine: "American",
    rating: 4.8,
    deliveryTime: "20-30 min",
    minOrder: 10,
    description: "Serving the juiciest burgers in town since 2010. We use only premium quality beef and the freshest ingredients.",
    categories: ["Burgers", "Sides", "Drinks"],
    menu: [
      {
        id: 101,
        name: "Classic Cheeseburger",
        description: "Beef patty, cheddar cheese, lettuce, tomato, and our special sauce",
        price: 8.99,
        image: "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&q=80&w=1920&ixlib=rb-4.0.3",
        category: "Burgers"
      },
      {
        id: 102,
        name: "Double Bacon Burger",
        description: "Two beef patties, crispy bacon, American cheese, caramelized onions, and BBQ sauce",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&q=80&w=1968&ixlib=rb-4.0.3",
        category: "Burgers"
      },
      {
        id: 103,
        name: "Veggie Burger",
        description: "Plant-based patty, avocado, lettuce, tomato, and vegan mayo",
        price: 9.99,
        image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&q=80&w=1780&ixlib=rb-4.0.3",
        category: "Burgers"
      },
      {
        id: 104,
        name: "French Fries",
        description: "Crispy golden fries with our special seasoning",
        price: 3.99,
        image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
        category: "Sides"
      },
      {
        id: 105,
        name: "Onion Rings",
        description: "Crispy battered onion rings with dipping sauce",
        price: 4.99,
        image: "https://images.unsplash.com/photo-1621447504864-d8686e12698c?auto=format&fit=crop&q=80&w=1925&ixlib=rb-4.0.3",
        category: "Sides"
      },
      {
        id: 106,
        name: "Soft Drink",
        description: "Your choice of soda (Cola, Lemon-lime, Orange)",
        price: 2.49,
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
        category: "Drinks"
      }
    ]
  },
  // Additional restaurant data would go here
];

// Cart interface
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const RestaurantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const restaurantId = parseInt(id || "1");
  const restaurant = restaurants.find(r => r.id === restaurantId);
  const [activeTab, setActiveTab] = useState(restaurant?.categories[0] || "");
  const [cart, setCart] = useState<CartItem[]>([]);
  
  if (!restaurant) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Restaurant not found</h2>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </MainLayout>
    );
  }

  // Filter menu items by category
  const menuItems = restaurant.menu.filter(item => item.category === activeTab);
  
  // Calculate cart total
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const addToCart = (id: number, name: string, price: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === id);
      
      if (existingItem) {
        return prevCart.map(item => 
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { id, name, price, quantity: 1 }];
      }
    });
    
    toast(`${name} added to cart`);
  };

  const updateQuantity = (id: number, change: number) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      
      return updatedCart.filter(item => item.quantity > 0);
    });
  };

  return (
    <MainLayout>
      {/* Restaurant Header */}
      <div 
        className="relative h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${restaurant.image})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 relative h-full flex flex-col justify-end pb-6">
          <h1 className="text-white text-3xl font-bold mb-2">{restaurant.name}</h1>
          <div className="flex items-center text-white mb-1">
            <span className="mr-4">{restaurant.cuisine}</span>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1">{restaurant.rating}</span>
            </div>
            <div className="flex items-center ml-4">
              <Clock className="h-4 w-4" />
              <span className="ml-1">{restaurant.deliveryTime}</span>
            </div>
          </div>
          <p className="text-white/80 text-sm">Minimum order: ${restaurant.minOrder}</p>
        </div>
      </div>

      {/* Restaurant Description */}
      <section className="container mx-auto px-4 py-6">
        <p className="text-gray-700">{restaurant.description}</p>
      </section>

      {/* Menu */}
      <section className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Menu items */}
          <div className="flex-grow">
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                {restaurant.categories.map(category => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {restaurant.categories.map(category => (
                <TabsContent key={category} value={category} className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {restaurant.menu
                      .filter(item => item.category === category)
                      .map(item => (
                        <div key={item.id} className="flex bg-white p-4 rounded-lg shadow-sm">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-md"
                          />
                          <div className="ml-4 flex-grow">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="font-medium">${item.price.toFixed(2)}</span>
                              <Button 
                                size="sm" 
                                className="bg-brand-500 hover:bg-brand-600"
                                onClick={() => addToCart(item.id, item.name, item.price)}
                              >
                                <Plus className="h-4 w-4 mr-1" /> Add
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
          
          {/* Cart */}
          <div className="md:w-80 bg-white p-4 rounded-lg shadow-md h-fit sticky top-20">
            <h3 className="font-bold text-xl mb-4">Your Order</h3>
            
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-6">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-3 mb-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-gray-500 text-sm">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="mx-2 w-6 text-center">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-3 mb-4">
                  <div className="flex justify-between font-medium">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>Delivery Fee</span>
                    <span>$2.99</span>
                  </div>
                  <div className="flex justify-between font-bold mt-2 text-lg">
                    <span>Total</span>
                    <span>${(cartTotal + 2.99).toFixed(2)}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-brand-500 hover:bg-brand-600"
                  onClick={() => window.location.href = "/checkout"}
                >
                  Proceed to Checkout
                </Button>
              </>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default RestaurantDetail;
