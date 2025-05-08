
import React, { useState } from 'react';
import { toast } from 'sonner';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Plus } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  image: File | null;
  imagePreview: string;
}

const RestaurantSignup = () => {
  const [step, setStep] = useState(1);
  const [restaurant, setRestaurant] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    cuisine: '',
    logo: null as File | null,
    logoPreview: '',
    bannerImage: null as File | null,
    bannerPreview: ''
  });
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>(['Main Dishes', 'Sides', 'Drinks']);
  const [newCategory, setNewCategory] = useState('');

  // Handle file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'bannerImage') => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const preview = URL.createObjectURL(file);
      
      setRestaurant(prev => ({
        ...prev,
        [field]: file,
        [field === 'logo' ? 'logoPreview' : 'bannerPreview']: preview
      }));
    }
  };

  // Handle menu item file input
  const handleMenuItemImage = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const preview = URL.createObjectURL(file);
      
      setMenuItems(prev => prev.map(item => 
        item.id === id ? { ...item, image: file, imagePreview: preview } : item
      ));
    }
  };

  // Add new menu item
  const addMenuItem = () => {
    const newItem: MenuItem = {
      id: Date.now(),
      name: '',
      description: '',
      price: '',
      category: categories[0],
      image: null,
      imagePreview: ''
    };
    
    setMenuItems(prev => [...prev, newItem]);
  };

  // Remove menu item
  const removeMenuItem = (id: number) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  // Add new category
  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories(prev => [...prev, newCategory.trim()]);
      setNewCategory('');
    }
  };

  // Simulate form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you'd send this data to your backend
    console.log('Restaurant Data:', restaurant);
    console.log('Menu Items:', menuItems);
    
    toast.success("Restaurant registration successful! We'll review your information and get back to you soon.");
    
    // Redirect to owner dashboard (would be a protected route in a real app)
    setTimeout(() => {
      window.location.href = "/owner-dashboard";
    }, 2000);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Register Your Restaurant</h1>
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className={`flex-1 h-2 ${step >= 1 ? 'bg-brand-500' : 'bg-gray-200'} rounded-l-full`}></div>
            <div className={`flex-1 h-2 ${step >= 2 ? 'bg-brand-500' : 'bg-gray-200'}`}></div>
            <div className={`flex-1 h-2 ${step >= 3 ? 'bg-brand-500' : 'bg-gray-200'} rounded-r-full`}></div>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className={step >= 1 ? 'text-brand-500 font-medium' : 'text-gray-500'}>Basic Info</span>
            <span className={step >= 2 ? 'text-brand-500 font-medium' : 'text-gray-500'}>Menu Items</span>
            <span className={step >= 3 ? 'text-brand-500 font-medium' : 'text-gray-500'}>Review</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Basic Restaurant Info */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Restaurant Information</CardTitle>
                <CardDescription>
                  Tell us about your restaurant so customers can find you easily.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Restaurant Name *</Label>
                    <Input 
                      id="name" 
                      value={restaurant.name} 
                      onChange={e => setRestaurant({...restaurant, name: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cuisine">Cuisine Type *</Label>
                    <Input 
                      id="cuisine" 
                      value={restaurant.cuisine} 
                      onChange={e => setRestaurant({...restaurant, cuisine: e.target.value})}
                      placeholder="e.g. Italian, Mexican, Japanese"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea 
                    id="description" 
                    value={restaurant.description} 
                    onChange={e => setRestaurant({...restaurant, description: e.target.value})}
                    placeholder="Tell customers about your restaurant, specialties, history, etc."
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input 
                    id="address" 
                    value={restaurant.address} 
                    onChange={e => setRestaurant({...restaurant, address: e.target.value})}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      value={restaurant.phone} 
                      onChange={e => setRestaurant({...restaurant, phone: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={restaurant.email} 
                      onChange={e => setRestaurant({...restaurant, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="logo">Restaurant Logo *</Label>
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={e => handleFileChange(e, 'logo')}
                      required
                    />
                    {restaurant.logoPreview && (
                      <div className="mt-2">
                        <img 
                          src={restaurant.logoPreview} 
                          alt="Logo Preview" 
                          className="w-32 h-32 object-cover rounded-md"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="banner">Banner Image *</Label>
                    <Input
                      id="banner"
                      type="file"
                      accept="image/*"
                      onChange={e => handleFileChange(e, 'bannerImage')}
                      required
                    />
                    {restaurant.bannerPreview && (
                      <div className="mt-2">
                        <img 
                          src={restaurant.bannerPreview} 
                          alt="Banner Preview" 
                          className="w-full h-32 object-cover rounded-md"
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button 
                    type="button" 
                    onClick={() => setStep(2)}
                    className="bg-brand-500 hover:bg-brand-600"
                    disabled={
                      !restaurant.name || 
                      !restaurant.description || 
                      !restaurant.address || 
                      !restaurant.phone || 
                      !restaurant.email || 
                      !restaurant.cuisine || 
                      !restaurant.logo || 
                      !restaurant.bannerImage
                    }
                  >
                    Next: Add Menu Items
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Menu Items */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Menu Items</CardTitle>
                <CardDescription>
                  Add the dishes you want to offer to customers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Categories</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {categories.map(category => (
                      <div key={category} className="bg-secondary px-3 py-1 rounded-full text-sm">
                        {category}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a category"
                      value={newCategory}
                      onChange={e => setNewCategory(e.target.value)}
                      className="max-w-xs"
                    />
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={handleAddCategory}
                    >
                      Add
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Menu Items ({menuItems.length})</h3>
                    <Button 
                      type="button" 
                      onClick={addMenuItem}
                      className="bg-brand-500 hover:bg-brand-600"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Item
                    </Button>
                  </div>
                  
                  {menuItems.map((item, index) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex justify-between mb-3">
                        <h4 className="font-medium">Item #{index + 1}</h4>
                        <Button 
                          type="button" 
                          variant="destructive" 
                          size="sm"
                          onClick={() => removeMenuItem(item.id)}
                        >
                          Remove
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`item-name-${item.id}`}>Item Name *</Label>
                          <Input 
                            id={`item-name-${item.id}`}
                            value={item.name} 
                            onChange={e => setMenuItems(prev => prev.map(i => 
                              i.id === item.id ? { ...i, name: e.target.value } : i
                            ))}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`item-price-${item.id}`}>Price *</Label>
                          <Input 
                            id={`item-price-${item.id}`}
                            value={item.price} 
                            onChange={e => {
                              const value = e.target.value;
                              // Only allow numbers and one decimal point
                              if (/^\d*\.?\d*$/.test(value)) {
                                setMenuItems(prev => prev.map(i => 
                                  i.id === item.id ? { ...i, price: value } : i
                                ));
                              }
                            }}
                            placeholder="0.00"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2 mt-4">
                        <Label htmlFor={`item-desc-${item.id}`}>Description *</Label>
                        <Textarea 
                          id={`item-desc-${item.id}`}
                          value={item.description} 
                          onChange={e => setMenuItems(prev => prev.map(i => 
                            i.id === item.id ? { ...i, description: e.target.value } : i
                          ))}
                          placeholder="Describe the dish, ingredients, etc."
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor={`item-category-${item.id}`}>Category *</Label>
                          <select
                            id={`item-category-${item.id}`}
                            value={item.category}
                            onChange={e => setMenuItems(prev => prev.map(i => 
                              i.id === item.id ? { ...i, category: e.target.value } : i
                            ))}
                            className="w-full p-2 border rounded-md"
                            required
                          >
                            {categories.map(category => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`item-image-${item.id}`}>Item Image *</Label>
                          <Input
                            id={`item-image-${item.id}`}
                            type="file"
                            accept="image/*"
                            onChange={e => handleMenuItemImage(e, item.id)}
                            required
                          />
                          {item.imagePreview && (
                            <div className="mt-2">
                              <img 
                                src={item.imagePreview} 
                                alt={`${item.name} Preview`} 
                                className="w-24 h-24 object-cover rounded-md"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {menuItems.length === 0 && (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <p className="text-gray-500 mb-4">No menu items added yet</p>
                      <Button 
                        type="button" 
                        onClick={addMenuItem}
                        className="bg-brand-500 hover:bg-brand-600"
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Your First Item
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="pt-6 flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  
                  <Button 
                    type="button" 
                    onClick={() => setStep(3)}
                    className="bg-brand-500 hover:bg-brand-600"
                    disabled={menuItems.length === 0}
                  >
                    Next: Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Review Your Information</CardTitle>
                <CardDescription>
                  Please review all details before submitting.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-lg mb-3">Restaurant Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Restaurant Name</p>
                        <p className="font-medium">{restaurant.name}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Cuisine</p>
                        <p className="font-medium">{restaurant.cuisine}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium">{restaurant.address}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Contact</p>
                        <p className="font-medium">{restaurant.phone} | {restaurant.email}</p>
                      </div>
                    </div>
                    <div className="space-y-1 mt-4">
                      <p className="text-sm text-gray-500">Description</p>
                      <p>{restaurant.description}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-lg mb-3">Images</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Logo</p>
                        {restaurant.logoPreview && (
                          <img 
                            src={restaurant.logoPreview} 
                            alt="Logo" 
                            className="w-32 h-32 object-cover rounded-md"
                          />
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Banner</p>
                        {restaurant.bannerPreview && (
                          <img 
                            src={restaurant.bannerPreview} 
                            alt="Banner" 
                            className="w-full h-32 object-cover rounded-md"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-lg mb-3">Menu Items ({menuItems.length})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {menuItems.map((item) => (
                        <div key={item.id} className="flex bg-white p-3 rounded-lg border">
                          {item.imagePreview && (
                            <img 
                              src={item.imagePreview} 
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                          )}
                          <div className="ml-3">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-sm">${parseFloat(item.price).toFixed(2)}</span>
                              <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">
                                {item.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setStep(2)}
                    >
                      Back
                    </Button>
                    
                    <Button 
                      type="submit" 
                      className="bg-brand-500 hover:bg-brand-600"
                    >
                      Submit Registration
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </div>
    </MainLayout>
  );
};

export default RestaurantSignup;
