import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Tag, 
  Truck, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft 
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    cartSubtotal, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon, 
    discountAmount, 
    shippingFee, 
    cartTotal, 
    setCurrentPage, 
    settings 
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError: boolean } | null>(null);

  const threshold = settings.freeShippingThreshold || 60;
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / threshold) * 100));
  const amountToFreeShipping = Math.max(0, threshold - cartSubtotal);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = await applyCoupon(couponCode.trim());
    if (res.success) {
      setCouponMsg({ text: res.message, isError: false });
      setCouponCode('');
    } else {
      setCouponMsg({ text: res.message, isError: true });
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center text-stone-400 mx-auto mb-5">
          <ShoppingBag size={36} />
        </div>
        <h1 className="text-2xl font-bold text-stone-900 mb-2">Your shopping bag is empty</h1>
        <p className="text-sm text-stone-500 max-w-sm mx-auto mb-8">
          Browse our ergonomic footwear catalog to find everyday pain relief and cloud-like comfort.
        </p>
        <button
          onClick={() => setCurrentPage('shop')}
          className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-sm transition-all"
        >
          Explore Best Sellers
        </button>
      </div>
    );
  }

  return (
    <div className="bg-stone-50/50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Review your selected footwear before secure checkout
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('shop')}
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-stone-700 hover:text-stone-900"
          >
            <ArrowLeft size={14} />
            <span>Continue Shopping</span>
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 mb-8">
          <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-amber-950 mb-2">
            <div className="flex items-center gap-2">
              <Truck size={16} className="text-amber-700" />
              {amountToFreeShipping > 0 ? (
                <span>
                  Add <strong className="text-amber-900 font-extrabold">${amountToFreeShipping.toFixed(2)}</strong> more to get <strong>FREE Express Shipping</strong>
                </span>
              ) : (
                <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                  <CheckCircle2 size={16} /> Congratulations! You unlocked FREE Express Shipping
                </span>
              )}
            </div>
            <span>{freeShippingProgress}%</span>
          </div>
          <div className="w-full h-2 bg-amber-200/80 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${amountToFreeShipping === 0 ? 'bg-emerald-500' : 'bg-amber-600'}`}
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Layout: Cart Items Table (Left) + Summary Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-stone-100 hidden sm:grid grid-cols-12 text-xs font-bold text-stone-400 uppercase tracking-wider">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-3 text-right">Total</div>
            </div>

            <div className="divide-y divide-stone-100 p-4 sm:p-6 space-y-4 sm:space-y-0">
              {cart.map(item => (
                <div key={item.id} className="sm:grid grid-cols-12 items-center gap-4 py-4 sm:py-5 first:pt-0">
                  
                  {/* Product details */}
                  <div className="col-span-6 flex gap-3.5 items-center mb-3 sm:mb-0">
                    <div className="w-20 h-20 bg-stone-100 rounded-xl overflow-hidden shrink-0 border border-stone-200">
                      <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-stone-900 truncate">{item.productName}</h3>
                      <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                        {item.colorHex && (
                          <span className="w-2.5 h-2.5 rounded-full border border-stone-300" style={{ backgroundColor: item.colorHex }} />
                        )}
                        <span>{item.color}</span>
                        <span>•</span>
                        <span className="font-semibold text-stone-700">{item.size}</span>
                      </div>
                      <span className="text-xs font-bold text-stone-900 block mt-1">
                        ${item.salePrice.toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-400 hover:text-rose-600 text-xs font-medium flex items-center gap-1 mt-1 transition-colors"
                      >
                        <Trash2 size={12} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="col-span-3 flex justify-start sm:justify-center items-center">
                    <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2.5 py-1 text-stone-600 hover:text-stone-900 font-bold text-sm"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="px-3 text-xs font-bold text-stone-900 min-w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2.5 py-1 text-stone-600 hover:text-stone-900 font-bold text-sm"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-3 text-right">
                    <span className="text-base font-extrabold text-stone-900">
                      ${(item.salePrice * item.quantity).toFixed(2)}
                    </span>
                    {item.price > item.salePrice && (
                      <span className="block text-xs text-stone-400 line-through">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Right Summary Card */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs p-6 space-y-5">
              <h2 className="text-base font-bold text-stone-900 pb-3 border-b border-stone-100">
                Order Summary
              </h2>

              {/* Coupon Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-xs text-emerald-900">
                    <div className="flex items-center gap-2">
                      <Tag size={14} className="text-emerald-600" />
                      <span>Coupon: <strong>{appliedCoupon.code}</strong> (-${discountAmount.toFixed(2)})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-stone-400 hover:text-rose-600 underline text-xs font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. COMFORT15)"
                      value={couponCode}
                      onChange={e => setCouponCode(e.target.value)}
                      className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={!couponCode.trim()}
                      className="bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold px-3.5 py-2 rounded-xl transition-colors disabled:opacity-50"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {couponMsg && (
                  <p className={`text-[11px] mt-1.5 ${couponMsg.isError ? 'text-rose-600' : 'text-emerald-600 font-medium'}`}>
                    {couponMsg.text}
                  </p>
                )}
              </div>

              {/* Calculation lines */}
              <div className="space-y-2 text-xs text-stone-600 pt-2 border-t border-stone-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">${cartSubtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-stone-900">
                    {shippingFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-stone-900 pt-3 border-t border-stone-100">
                  <span>Estimated Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => setCurrentPage('checkout')}
                className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm py-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Micro guarantees */}
            <div className="bg-stone-100/70 rounded-2xl p-5 border border-stone-200/80 space-y-3 text-xs text-stone-600">
              <div className="flex items-start gap-2.5">
                <ShieldCheck size={16} className="text-emerald-700 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-stone-900 block">30-Day Risk-Free Comfort Trial</span>
                  <span className="text-[11px] text-stone-500">Walk in them inside &amp; outside. Free returns if not completely satisfied.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Truck size={16} className="text-emerald-700 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-stone-900 block">Fast Tracked Delivery</span>
                  <span className="text-[11px] text-stone-500">Orders dispatched within 24 business hours.</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
