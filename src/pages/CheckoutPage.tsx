import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Lock, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  ArrowLeft, 
  CheckCircle2, 
  Footprints,
  Tag,
  AlertCircle
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    discountAmount, 
    shippingFee, 
    cartTotal, 
    appliedCoupon, 
    createOrder, 
    setCurrentPage, 
    currentUser 
  } = useStore();

  // Form Fields
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('CA');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('US');

  // Shipping Method
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const expressFee = 9.99;
  const selectedShippingFee = shippingMethod === 'express' ? shippingFee + expressFee : shippingFee;
  const finalTotal = cartTotal + (shippingMethod === 'express' ? expressFee : 0);

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'applepay'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  // Processing state
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-stone-900 mb-2">Your cart is currently empty</h2>
        <p className="text-xs text-stone-500 mb-6">Add items to your cart before proceeding to checkout.</p>
        <button
          onClick={() => setCurrentPage('shop')}
          className="bg-stone-900 text-white text-xs font-bold px-6 py-3 rounded-full"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !firstName || !lastName || !address1 || !city || !zip) {
      setErrorMessage('Please fill in all required contact and shipping address fields.');
      return;
    }

    if (paymentMethod === 'card' && (!cardNumber || !cardExpiry || !cardCvc)) {
      setErrorMessage('Please enter valid credit card details.');
      return;
    }

    setIsPlacingOrder(true);

    try {
      const orderData = {
        customerEmail: email,
        customerName: `${firstName} ${lastName}`,
        customerPhone: phone || undefined,
        shippingAddress: {
          firstName,
          lastName,
          address1,
          address2: address2 || undefined,
          city,
          state,
          zip,
          country,
        },
        items: cart.map(item => ({
          productId: item.productId,
          productName: item.productName,
          slug: item.slug,
          price: item.price,
          salePrice: item.salePrice,
          size: item.size,
          color: item.color,
          colorHex: item.colorHex,
          quantity: item.quantity,
          imageUrl: item.imageUrl,
        })),
        subtotal: cartSubtotal,
        discount: discountAmount,
        shippingFee: selectedShippingFee,
        total: finalTotal,
        paymentMethod,
        paymentStatus: 'paid' as const,
      };

      const newOrder = await createOrder(orderData);
      setIsPlacingOrder(false);

      if (newOrder) {
        setCurrentPage('order-confirmation', newOrder.orderNumber);
      } else {
        setErrorMessage('Failed to place order. Please try again.');
      }
    } catch (err: any) {
      setIsPlacingOrder(false);
      setErrorMessage(err.message || 'An error occurred during checkout.');
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-stone-200">
          <button
            onClick={() => setCurrentPage('cart')}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900"
          >
            <ArrowLeft size={14} />
            <span>Return to Cart</span>
          </button>
          
          <div className="flex items-center gap-2">
            <Lock size={14} className="text-emerald-600" />
            <span className="text-xs font-bold text-stone-800">256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Form Steps */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Step 1: Contact Information */}
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[10px] flex items-center justify-center font-bold">1</span>
                    <span>Contact Information</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. jessica@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Phone Number (For Tracking SMS)</label>
                    <input
                      type="tel"
                      placeholder="e.g. (555) 234-5678"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Address */}
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
                <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[10px] flex items-center justify-center font-bold">2</span>
                  <span>Shipping Address</span>
                </h2>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">First Name *</label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Last Name *</label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Street Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="House number and street name"
                    value={address1}
                    onChange={e => setAddress1(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Apartment, Suite, Unit (Optional)</label>
                  <input
                    type="text"
                    placeholder="Apt, Suite, Unit"
                    value={address2}
                    onChange={e => setAddress2(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">State *</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={e => setState(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Postal Code *</label>
                    <input
                      type="text"
                      required
                      value={zip}
                      onChange={e => setZip(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Shipping Method */}
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
                <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[10px] flex items-center justify-center font-bold">3</span>
                  <span>Shipping Method</span>
                </h2>

                <div className="space-y-2">
                  <label
                    onClick={() => setShippingMethod('standard')}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      shippingMethod === 'standard' ? 'border-stone-900 bg-stone-50' : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="ship"
                        checked={shippingMethod === 'standard'}
                        onChange={() => setShippingMethod('standard')}
                        className="accent-stone-900"
                      />
                      <div>
                        <span className="text-xs font-bold text-stone-900 block">Standard Tracked Delivery (3-5 Business Days)</span>
                        <span className="text-[11px] text-stone-500">Domestic ground carrier with tracking notifications</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-stone-900">
                      {shippingFee === 0 ? <span className="text-emerald-700 font-extrabold">FREE</span> : `$${shippingFee.toFixed(2)}`}
                    </span>
                  </label>

                  <label
                    onClick={() => setShippingMethod('express')}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      shippingMethod === 'express' ? 'border-stone-900 bg-stone-50' : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="ship"
                        checked={shippingMethod === 'express'}
                        onChange={() => setShippingMethod('express')}
                        className="accent-stone-900"
                      />
                      <div>
                        <span className="text-xs font-bold text-stone-900 block">Express Air Priority (1-2 Business Days)</span>
                        <span className="text-[11px] text-stone-500">Same-day fulfillment &amp; expedited flight routing</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-stone-900">
                      ${(shippingFee + expressFee).toFixed(2)}
                    </span>
                  </label>
                </div>
              </div>

              {/* Step 4: Payment Method */}
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
                <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[10px] flex items-center justify-center font-bold">4</span>
                  <span>Payment Method</span>
                </h2>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'card' ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <CreditCard size={16} />
                    <span>Credit Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentMethod('paypal');
                      setCardNumber('4242424242424242');
                      setCardExpiry('12/28');
                      setCardCvc('123');
                    }}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'paypal' ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span className="text-base font-black italic">PayPal</span>
                    <span>PayPal</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentMethod('applepay');
                      setCardNumber('4242424242424242');
                      setCardExpiry('12/28');
                      setCardCvc('123');
                    }}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'applepay' ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span className="text-base font-bold">Pay</span>
                    <span>Apple / Google</span>
                  </button>
                </div>

                {paymentMethod === 'card' ? (
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Card Number</label>
                      <input
                        type="text"
                        placeholder="•••• •••• •••• ••••"
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">Expiration (MM/YY)</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={e => setCardExpiry(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">Security Code (CVC)</label>
                        <input
                          type="text"
                          placeholder="CVC"
                          value={cardCvc}
                          onChange={e => setCardCvc(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-stone-50 rounded-xl text-center text-xs text-stone-600">
                    You will complete payment securely via {paymentMethod === 'paypal' ? 'PayPal' : 'Apple/Google Pay'}.
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Order Summary & Place Order */}
            <div className="lg:col-span-5 space-y-5 sticky top-24">
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-5">
                <h3 className="text-base font-bold text-stone-900 pb-3 border-b border-stone-100">
                  Order Summary ({cart.length} items)
                </h3>

                {/* Items preview */}
                <div className="max-h-60 overflow-y-auto divide-y divide-stone-100 pr-1">
                  {cart.map(item => (
                    <div key={item.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img src={item.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover border border-stone-200 shrink-0" />
                        <div className="min-w-0">
                          <p className="font-bold text-stone-900 truncate">{item.productName}</p>
                          <p className="text-stone-500 text-[11px]">{item.color} • {item.size} • Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-extrabold text-stone-900 shrink-0">
                        ${(item.salePrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Calculation breakdown */}
                <div className="space-y-2 text-xs text-stone-600 pt-3 border-t border-stone-100">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-stone-900">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Discount ({appliedCoupon?.code})</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold text-stone-900">
                      {selectedShippingFee === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `$${selectedShippingFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-black text-stone-900 pt-3 border-t border-stone-100">
                    <span>Total Due</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Place Order CTA Button */}
                <button
                  type="submit"
                  disabled={isPlacingOrder}
                  className="w-full bg-stone-900 hover:bg-stone-800 text-stone-50 font-bold text-xs sm:text-sm py-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] disabled:opacity-50"
                >
                  <Lock size={16} />
                  <span>{isPlacingOrder ? 'PROCESSING ORDER...' : `COMPLETE ORDER • $${finalTotal.toFixed(2)}`}</span>
                </button>

                <div className="text-[11px] text-stone-500 text-center space-y-1 pt-1">
                  <p className="flex items-center justify-center gap-1">
                    <ShieldCheck size={14} className="text-emerald-600" />
                    <span>Backed by our 30-Day Risk-Free Comfort Guarantee</span>
                  </p>
                  <p>By placing your order, you agree to our Terms &amp; Refund Policy.</p>
                </div>
              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
};
