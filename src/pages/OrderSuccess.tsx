
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, MapPin } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const OrderSuccess = () => {
  // Mock order details
  const orderDetails = {
    id: '#ORD-12345',
    time: '30-45 min',
    items: [
      { name: 'Classic Cheeseburger', quantity: 2, price: 8.99 },
      { name: 'French Fries', quantity: 1, price: 3.99 },
      { name: 'Soft Drink', quantity: 2, price: 2.49 }
    ],
    subtotal: 26.95,
    deliveryFee: 2.99,
    tax: 2.16,
    total: 32.10,
    restaurantName: 'Burger Haven',
    address: '123 Main St, Anytown, USA'
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Your order has been placed and is being prepared. You'll receive updates on your order status.
          </p>
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <div>
                <div className="text-gray-500 text-sm mb-1">Order Number</div>
                <div className="font-medium">{orderDetails.id}</div>
              </div>
              <div className="mt-3 sm:mt-0 sm:text-right">
                <div className="text-gray-500 text-sm mb-1">Estimated Delivery</div>
                <div className="font-medium flex items-center sm:justify-end">
                  <Clock className="h-4 w-4 mr-1" />
                  {orderDetails.time}
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="font-medium mb-3">Order Details</div>
              <div className="space-y-2 mb-4">
                {orderDetails.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{item.quantity}x {item.name}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-dashed pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${orderDetails.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Delivery Fee</span>
                  <span>${orderDetails.deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Tax</span>
                  <span>${orderDetails.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold pt-2">
                  <span>Total</span>
                  <span>${orderDetails.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="font-medium mb-3">Delivery Information</div>
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
              <div>
                <div>{orderDetails.restaurantName}</div>
                <div className="text-gray-600">{orderDetails.address}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-brand-500 hover:bg-brand-600" asChild>
            <Link to="/">Return to Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/track-order">Track Your Order</Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderSuccess;
