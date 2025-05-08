
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

// Mock restaurant data
const restaurantData = {
  id: 1,
  name: "Burger Haven",
  logo: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=1899&ixlib=rb-4.0.3",
  address: "123 Main St, Anytown USA",
  openingHours: "9:00 AM - 10:00 PM",
  orders: 254,
  revenue: 6842.50,
  rating: 4.8
};

// Mock orders data
const mockOrders = [
  {
    id: 1001,
    customerName: "John Doe",
    items: [
      { name: "Classic Cheeseburger", quantity: 2, price: 8.99 },
      { name: "French Fries", quantity: 1, price: 3.99 },
      { name: "Soft Drink", quantity: 2, price: 2.49 }
    ],
    total: 26.95,
    status: "New",
    time: "10 minutes ago",
    address: "456 Oak St, Anytown, USA",
    payment: "Credit Card"
  },
  {
    id: 1002,
    customerName: "Sarah Johnson",
    items: [
      { name: "Double Bacon Burger", quantity: 1, price: 12.99 },
      { name: "Onion Rings", quantity: 1, price: 4.99 }
    ],
    total: 17.98,
    status: "Preparing",
    time: "25 minutes ago",
    address: "789 Maple Ave, Anytown, USA",
    payment: "PayPal"
  },
  {
    id: 1003,
    customerName: "Mike Williams",
    items: [
      { name: "Veggie Burger", quantity: 1, price: 9.99 },
      { name: "French Fries", quantity: 1, price: 3.99 },
      { name: "Soft Drink", quantity: 1, price: 2.49 }
    ],
    total: 16.47,
    status: "Ready",
    time: "40 minutes ago",
    address: "321 Pine Rd, Anytown, USA",
    payment: "Debit Card"
  },
  {
    id: 1004,
    customerName: "Emily Davis",
    items: [
      { name: "Classic Cheeseburger", quantity: 3, price: 8.99 },
      { name: "French Fries", quantity: 2, price: 3.99 },
      { name: "Soft Drink", quantity: 3, price: 2.49 }
    ],
    total: 42.42,
    status: "Delivered",
    time: "1 hour ago",
    address: "654 Cedar Blvd, Anytown, USA",
    payment: "Apple Pay"
  },
  {
    id: 1005,
    customerName: "Robert Wilson",
    items: [
      { name: "Double Bacon Burger", quantity: 2, price: 12.99 },
      { name: "Onion Rings", quantity: 2, price: 4.99 },
      { name: "Soft Drink", quantity: 2, price: 2.49 }
    ],
    total: 40.94,
    status: "Delivered",
    time: "2 hours ago",
    address: "987 Birch St, Anytown, USA",
    payment: "Google Pay"
  }
];

// Types
type OrderStatus = 'New' | 'Preparing' | 'Ready' | 'Delivered' | 'Completed' | 'Cancelled';

// Order Filter Component
const OrderFilters = ({ activeFilter, setActiveFilter }: { 
  activeFilter: string, 
  setActiveFilter: (filter: string) => void 
}) => {
  const filters = ['All', 'New', 'Preparing', 'Ready', 'Delivered', 'Completed', 'Cancelled'];
  
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {filters.map(filter => (
        <Button
          key={filter}
          variant={activeFilter === filter ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter(filter)}
          className={activeFilter === filter ? "bg-brand-500" : ""}
        >
          {filter}
        </Button>
      ))}
    </div>
  );
};

// Order Item Component
const OrderItem = ({ order, updateStatus }: { 
  order: typeof mockOrders[0], 
  updateStatus: (id: number, status: OrderStatus) => void 
}) => {
  const [expanded, setExpanded] = useState(false);
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Preparing': return 'bg-yellow-100 text-yellow-800';
      case 'Ready': return 'bg-green-100 text-green-800';
      case 'Delivered': return 'bg-purple-100 text-purple-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getNextStatus = (currentStatus: string): OrderStatus | null => {
    switch(currentStatus) {
      case 'New': return 'Preparing';
      case 'Preparing': return 'Ready';
      case 'Ready': return 'Delivered';
      case 'Delivered': return 'Completed';
      default: return null;
    }
  };
  
  const nextStatus = getNextStatus(order.status);
  
  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center">
              <h3 className="font-medium text-lg">Order #{order.id}</h3>
              <Badge variant="outline" className={`ml-3 ${getStatusColor(order.status)}`}>
                {order.status}
              </Badge>
            </div>
            <p className="text-sm text-gray-500">{order.time} • {order.customerName}</p>
          </div>
          <div className="text-right">
            <p className="font-bold">${order.total.toFixed(2)}</p>
            <p className="text-sm text-gray-500">{order.payment}</p>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t">
          <div className="flex justify-between items-center">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Hide Details" : "View Details"}
            </Button>
            
            <div className="flex gap-2">
              {order.status !== 'Completed' && order.status !== 'Cancelled' && (
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => updateStatus(order.id, 'Cancelled')}
                >
                  Cancel
                </Button>
              )}
              
              {nextStatus && (
                <Button 
                  size="sm"
                  className="bg-brand-500 hover:bg-brand-600"
                  onClick={() => updateStatus(order.id, nextStatus)}
                >
                  Mark as {nextStatus}
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {expanded && (
          <div className="mt-4 pt-3 border-t">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium mb-2">Order Items</h4>
                <ul className="space-y-2">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between">
                      <span>{item.quantity}x {item.name}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-2 border-t">
                <h4 className="font-medium mb-2">Delivery Address</h4>
                <p>{order.address}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Main Dashboard Component
const OwnerDashboard = () => {
  const [filter, setFilter] = useState('All');
  const [orders, setOrders] = useState(mockOrders);
  const navigate = useNavigate();

  const filteredOrders = filter === 'All' 
    ? orders 
    : orders.filter(order => order.status === filter);

  const updateOrderStatus = (id: number, newStatus: OrderStatus) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ));
    
    toast.success(`Order #${id} marked as ${newStatus}`);
  };
  
  // Calculate statistics
  const newOrders = orders.filter(order => order.status === 'New').length;
  const preparingOrders = orders.filter(order => order.status === 'Preparing').length;
  const readyOrders = orders.filter(order => order.status === 'Ready').length;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Restaurant Dashboard</h1>
          <Button onClick={() => navigate('/restaurant-signup')}>Edit Restaurant</Button>
        </div>
        
        {/* Restaurant Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center">
            <img 
              src={restaurantData.logo} 
              alt={restaurantData.name} 
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="ml-4">
              <h2 className="text-2xl font-bold">{restaurantData.name}</h2>
              <p className="text-gray-500">{restaurantData.address}</p>
            </div>
            <div className="ml-auto text-right">
              <div className="text-sm text-gray-500">Hours</div>
              <div>{restaurantData.openingHours}</div>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{restaurantData.orders}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${restaurantData.revenue.toFixed(2)}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{restaurantData.rating}/5.0</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Pending Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{newOrders + preparingOrders + readyOrders}</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Orders */}
        <Tabs defaultValue="orders">
          <TabsList className="mb-6">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="menu">Menu Management</TabsTrigger>
            <TabsTrigger value="settings">Restaurant Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders" className="mt-0">
            <OrderFilters activeFilter={filter} setActiveFilter={setFilter} />
            
            {filteredOrders.length > 0 ? (
              filteredOrders.map(order => (
                <OrderItem 
                  key={order.id} 
                  order={order} 
                  updateStatus={updateOrderStatus} 
                />
              ))
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-lg mb-2">No {filter !== 'All' ? filter : ''} Orders</h3>
                <p className="text-gray-500">
                  {filter !== 'All' 
                    ? `You don't have any ${filter.toLowerCase()} orders at the moment.` 
                    : "You don't have any orders yet."}
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="menu" className="mt-0">
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Menu Management</h3>
              <p className="text-gray-500 mb-4">
                Update your menu items, prices, and availability.
              </p>
              <Button onClick={() => navigate('/restaurant-signup')}>
                Edit Menu Items
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-0">
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Restaurant Settings</h3>
              <p className="text-gray-500 mb-4">
                Update your restaurant information, opening hours, and delivery options.
              </p>
              <Button onClick={() => navigate('/restaurant-signup')}>
                Edit Restaurant Information
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default OwnerDashboard;
