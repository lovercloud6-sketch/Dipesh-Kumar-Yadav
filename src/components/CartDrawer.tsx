import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag, 
  Tag, 
  CheckCircle2, 
  Truck,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
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
    settings,
    setCurrentPage 
  } = useStore();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  if (!isCartOpen) return null;

  const threshold = settings.freeShippingThreshold || 60;
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / threshold) * 100));
  const amountToFreeShipping = Math.max(0, threshold - cartSubtotal);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    setIsApplyingCoupon(true);
    setCouponMessage(null);
    const result = await applyCoupon(couponCodeInput.trim());
    setIsApplyingCoupon(false);
    if (result.success) {
      setCouponMessage({ text: result.message, isError: false });
      setCouponCodeInput('');
    } else {
      setCouponMessage({ text: result.message, isError: true });
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setCurrentPage('checkout');
  };

  const handleContinueShopping = () => {
    setIsCartOpen(false);
    setCurrentPage('shop');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dark overlay backdrop */}
      <div 
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart side panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={20} className="text-stone-900" />
            <h2 className="text-base font-bold text-stone-900">Your Cart</h2>
            <span className="text-xs bg-stone-200 text-stone-700 px-2 py-0.5 rounded-full font-semibold">
              {cart.length} {cart.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-200 transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Goal Meter */}
        <div className="px-5 py-3.5 bg-amber-50/70 border-b border-amber-100 text-xs text-amber-950">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 font-semibold">
              <Truck size={14} className="text-amber-700" />
              {amountToFreeShipping > 0 ? (
                <span>
                  Add <span className="font-extrabold text-amber-900">${amountToFreeShipping.toFixed(2)}</span> more for <strong>FREE Express Shipping</strong>
                </span>
              ) : (
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 size={14} /> You unlocked FREE Express Shipping!
                </span>
              )}
            </div>
            <span className="font-bold text-stone-600">{freeShippingProgress}%</span>
          </div>
          <div className="w-full h-1.5 bg-amber-200/70 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 rounded-full ${amountToFreeShipping === 0 ? 'bg-emerald-500' : 'bg-amber-600'}`}
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-stone-100">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-4">
                <ShoppingBag size={28} />
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-1">Your cart is empty</h3>
              <p className="text-xs text-stone-500 max-w-xs mb-6">
                Explore our best-selling ergonomic slippers, slides, and biomechanical insoles.
              </p>
              <button
                onClick={handleContinueShopping}
                className="inline-flex items-center gap-2 bg-stone-900 text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-stone-800 transition-colors shadow-sm"
              >
                <span>Shop Best Sellers</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="py-4 first:pt-0 flex gap-3.5 group">
                <div className="w-20 h-20 bg-stone-100 rounded-xl overflow-hidden shrink-0 border border-stone-200 relative">
                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs sm:text-sm font-semibold text-stone-900 truncate leading-snug">
                        {item.productName}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-400 hover:text-rose-600 transition-colors p-1 -mr-1"
                        title="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="text-[11px] text-stone-500 flex items-center gap-2 mt-1">
                      {item.colorHex && (
                        <span 
                          className="w-2.5 h-2.5 rounded-full border border-stone-300 shrink-0" 
                          style={{ backgroundColor: item.colorHex }}
                        />
                      )}
                      <span>{item.color}</span>
                      <span>•</span>
                      <span className="font-medium text-stone-700">{item.size}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2.5">
                    {/* Stepper */}
                    <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 text-stone-600 hover:text-stone-900 disabled:opacity-30"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="px-2 text-xs font-bold text-stone-900 min-w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 text-stone-600 hover:text-stone-900"
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <span className="text-xs sm:text-sm font-extrabold text-stone-900">
                        ${(item.salePrice * item.quantity).toFixed(2)}
                      </span>
                      {item.price > item.salePrice && (
                        <span className="block text-[10px] text-stone-400 line-through">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer actions when cart has items */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 space-y-3.5">
            {/* Promo Code Accordion/Input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl text-xs text-emerald-900">
                  <div className="flex items-center gap-2">
                    <Tag size={14} className="text-emerald-600" />
                    <span>Promo: <strong>{appliedCoupon.code}</strong> (-${discountAmount.toFixed(2)})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-stone-400 hover:text-rose-600 text-xs font-semibold underline ml-2"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Discount code (e.g. COMFORT15)"
                      value={couponCodeInput}
                      onChange={e => setCouponCodeInput(e.target.value)}
                      className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 pl-8 focus:outline-none focus:ring-1 focus:ring-stone-800"
                    />
                    <Tag size={13} className="absolute left-2.5 top-2.5 text-stone-400" />
                  </div>
                  <button
                    type="submit"
                    disabled={isApplyingCoupon || !couponCodeInput.trim()}
                    className="bg-stone-200 text-stone-800 hover:bg-stone-300 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors disabled:opacity-50 shrink-0"
                  >
                    {isApplyingCoupon ? '...' : 'Apply'}
                  </button>
                </form>
              )}

              {couponMessage && (
                <p className={`text-[11px] mt-1.5 ${couponMessage.isError ? 'text-rose-600' : 'text-emerald-600 font-medium'}`}>
                  {couponMessage.text}
                </p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600 pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900">${cartSubtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Savings</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-stone-900">
                  {shippingFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-stone-900 pt-2 border-t border-stone-200">
                <span>Estimated Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full bg-stone-900 hover:bg-stone-800 text-stone-50 py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-stone-900"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight size={16} />
            </button>

            {/* Micro Trust badges */}
            <div className="flex items-center justify-center gap-4 text-[10px] text-stone-500 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck size={12} className="text-emerald-600" /> 30-Day Comfort Guarantee
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Sparkles size={12} className="text-amber-600" /> Free Returns &amp; Exchanges
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
