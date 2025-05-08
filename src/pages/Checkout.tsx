
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import MainLayout from '@/components/layout/MainLayout';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

// Mock order data
const cartItems = [
  {
    id: 101,
    name: "Classic Cheeseburger",
    price: 8.99,
    quantity: 2
  },
  {
    id: 104,
    name: "French Fries",
    price: 3.99,
    quantity: 1
  },
  {
    id: 106,
    name: "Soft Drink",
    price: 2.49,
    quantity: 2
  }
];

// Payment icons
const paymentIcons = {
  card: "https://cdn-icons-png.flaticon.com/512/196/196578.png",
  paypal: "https://cdn-icons-png.flaticon.com/512/174/174861.png",
  googlepay: "https://cdn-icons-png.flaticon.com/512/6124/6124998.png",
  applepay: "https://cdn-icons-png.flaticon.com/512/5968/5968145.png"
};

const Checkout = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    instructions: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardInfo, setCardInfo] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: ''
  });
  
  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 2.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + deliveryFee + tax;

  const handleDeliveryInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDeliveryInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleCardInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    if (step === 1) {
      // Validate delivery info
      if (!deliveryInfo.name || !deliveryInfo.phone || !deliveryInfo.address || !deliveryInfo.city || !deliveryInfo.zipCode) {
        toast.error("Please fill out all required fields");
        return;
      }
    } else if (step === 2 && paymentMethod === 'card') {
      // Validate card info
      if (!cardInfo.number || !cardInfo.name || !cardInfo.expiry || !cardInfo.cvc) {
        toast.error("Please fill out all card information");
        return;
      }
    }
    
    setStep(step + 1);
  };

  const handleSubmitOrder = () => {
    // In a real app, we would handle the payment processing here
    toast.success("Your order has been placed successfully!");
    
    // Simulate order processing delay
    setTimeout(() => {
      navigate('/order-success');
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-brand-500 text-white' : 'bg-gray-200'}`}>
              1
            </div>
            <div className={`h-1 flex-1 mx-2 ${step >= 2 ? 'bg-brand-500' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-brand-500 text-white' : 'bg-gray-200'}`}>
              2
            </div>
            <div className={`h-1 flex-1 mx-2 ${step >= 3 ? 'bg-brand-500' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? 'bg-brand-500 text-white' : 'bg-gray-200'}`}>
              3
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="w-20 text-center">Delivery</span>
            <span className="w-20 text-center">Payment</span>
            <span className="w-20 text-center">Confirm</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main content area */}
          <div className="md:col-span-2">
            {/* Step 1: Delivery Information */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Information</CardTitle>
                  <CardDescription>
                    Enter your delivery details so we can get your order to you.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        value={deliveryInfo.name} 
                        onChange={handleDeliveryInfoChange} 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        value={deliveryInfo.phone} 
                        onChange={handleDeliveryInfoChange} 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Delivery Address *</Label>
                    <Input 
                      id="address" 
                      name="address" 
                      value={deliveryInfo.address} 
                      onChange={handleDeliveryInfoChange} 
                      required 
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input 
                        id="city" 
                        name="city" 
                        value={deliveryInfo.city} 
                        onChange={handleDeliveryInfoChange} 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input 
                        id="zipCode" 
                        name="zipCode" 
                        value={deliveryInfo.zipCode} 
                        onChange={handleDeliveryInfoChange} 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
                    <Textarea 
                      id="instructions" 
                      name="instructions" 
                      value={deliveryInfo.instructions} 
                      onChange={handleDeliveryInfoChange} 
                      placeholder="E.g., Ring doorbell, leave at door, call upon arrival, etc." 
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button 
                    className="bg-brand-500 hover:bg-brand-600"
                    onClick={handleNextStep}
                  >
                    Continue to Payment
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {/* Step 2: Payment Information */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>
                    Select your preferred payment method.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className={`border rounded-lg p-4 flex items-center ${paymentMethod === 'card' ? 'border-brand-500' : ''}`}>
                        <RadioGroupItem value="card" id="card" className="mr-3" />
                        <img src={paymentIcons.card} alt="Credit/Debit Card" className="w-8 h-8 mr-3" />
                        <Label htmlFor="card" className="flex-grow cursor-pointer">Credit/Debit Card</Label>
                      </div>
                      
                      <div className={`border rounded-lg p-4 flex items-center ${paymentMethod === 'paypal' ? 'border-brand-500' : ''}`}>
                        <RadioGroupItem value="paypal" id="paypal" className="mr-3" />
                        <img src={paymentIcons.paypal} alt="PayPal" className="w-8 h-8 mr-3" />
                        <Label htmlFor="paypal" className="flex-grow cursor-pointer">PayPal</Label>
                      </div>
                      
                      <div className={`border rounded-lg p-4 flex items-center ${paymentMethod === 'googlepay' ? 'border-brand-500' : ''}`}>
                        <RadioGroupItem value="googlepay" id="googlepay" className="mr-3" />
                        <img src={paymentIcons.googlepay} alt="Google Pay" className="w-8 h-8 mr-3" />
                        <Label htmlFor="googlepay" className="flex-grow cursor-pointer">Google Pay</Label>
                      </div>
                      
                      <div className={`border rounded-lg p-4 flex items-center ${paymentMethod === 'applepay' ? 'border-brand-500' : ''}`}>
                        <RadioGroupItem value="applepay" id="applepay" className="mr-3" />
                        <img src={paymentIcons.applepay} alt="Apple Pay" className="w-8 h-8 mr-3" />
                        <Label htmlFor="applepay" className="flex-grow cursor-pointer">Apple Pay</Label>
                      </div>
                    </div>
                  </RadioGroup>
                  
                  {paymentMethod === 'card' && (
                    <div className="mt-6 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <Input 
                          id="cardNumber" 
                          name="number" 
                          value={cardInfo.number} 
                          onChange={handleCardInfoChange} 
                          placeholder="1234 5678 9012 3456" 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Name on Card *</Label>
                        <Input 
                          id="cardName" 
                          name="name" 
                          value={cardInfo.name} 
                          onChange={handleCardInfoChange} 
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date *</Label>
                          <Input 
                            id="expiry" 
                            name="expiry" 
                            value={cardInfo.expiry} 
                            onChange={handleCardInfoChange} 
                            placeholder="MM/YY" 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC *</Label>
                          <Input 
                            id="cvc" 
                            name="cvc" 
                            value={cardInfo.cvc} 
                            onChange={handleCardInfoChange} 
                            placeholder="123" 
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {(paymentMethod === 'paypal' || paymentMethod === 'googlepay' || paymentMethod === 'applepay') && (
                    <div className="mt-6 bg-secondary p-4 rounded-lg text-center">
                      <p>
                        You'll be redirected to complete the payment after reviewing your order.
                      </p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button 
                    className="bg-brand-500 hover:bg-brand-600"
                    onClick={handleNextStep}
                  >
                    Review Order
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {/* Step 3: Order Review */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Order Review</CardTitle>
                  <CardDescription>
                    Please review your order details before confirming.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Delivery Information</h3>
                    <div className="bg-secondary rounded-lg p-4">
                      <p className="font-medium">{deliveryInfo.name}</p>
                      <p>{deliveryInfo.phone}</p>
                      <p>{deliveryInfo.address}</p>
                      <p>{deliveryInfo.city}, {deliveryInfo.zipCode}</p>
                      {deliveryInfo.instructions && (
                        <p className="mt-2 text-sm italic">
                          Note: {deliveryInfo.instructions}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Payment Method</h3>
                    <div className="bg-secondary rounded-lg p-4 flex items-center">
                      <img 
                        src={paymentIcons[paymentMethod as keyof typeof paymentIcons]} 
                        alt={paymentMethod} 
                        className="w-8 h-8 mr-3" 
                      />
                      <div>
                        {paymentMethod === 'card' ? (
                          <p className="font-medium">
                            Card ending with {cardInfo.number.slice(-4)}
                          </p>
                        ) : (
                          <p className="font-medium">
                            {paymentMethod === 'paypal' ? 'PayPal' : 
                              paymentMethod === 'googlepay' ? 'Google Pay' : 'Apple Pay'}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Order Items</h3>
                    <div className="space-y-2">
                      {cartItems.map(item => (
                        <div key={item.id} className="flex justify-between">
                          <span>
                            {item.quantity} x {item.name}
                          </span>
                          <span className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button 
                    className="bg-brand-500 hover:bg-brand-600"
                    onClick={handleSubmitOrder}
                  >
                    Place Order
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
          
          {/* Order summary sidebar */}
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.quantity} x {item.name}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Checkout;
