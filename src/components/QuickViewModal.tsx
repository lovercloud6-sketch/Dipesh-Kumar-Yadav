import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Check, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { Rating } from './Rating';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, setCurrentPage } = useStore();

  if (!quickViewProduct) return null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(quickViewProduct.colors[0]?.name || 'Standard');
  const [selectedSize, setSelectedSize] = useState(quickViewProduct.sizes[0] || 'US 8');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const selectedColorHex = quickViewProduct.colors.find(c => c.name === selectedColor)?.hex;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedSize, selectedColor, quantity, selectedColorHex);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setQuickViewProduct(null);
    }, 1200);
  };

  const handleViewFullDetails = () => {
    setQuickViewProduct(null);
    setCurrentPage('product', quickViewProduct.slug);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 text-stone-400 hover:text-stone-900 rounded-full bg-stone-100 hover:bg-stone-200 transition-colors"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gallery View */}
          <div className="p-4 sm:p-6 bg-stone-100 flex flex-col justify-between">
            <div className="aspect-square rounded-xl overflow-hidden bg-white border border-stone-200 mb-3 relative">
              <img
                src={quickViewProduct.images[selectedImageIndex] || quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover object-center"
              />
              {quickViewProduct.badge && (
                <span className="absolute top-3 left-3 bg-stone-900 text-stone-50 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {quickViewProduct.badge}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {quickViewProduct.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                      selectedImageIndex === idx ? 'border-stone-900 shadow-xs' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details & Selection */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              <div className="mb-2">
                <Rating rating={quickViewProduct.rating} size={14} showScore reviewCount={quickViewProduct.reviewCount} />
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight mb-1">
                {quickViewProduct.name}
              </h2>

              <p className="text-xs text-stone-500 mb-4 leading-relaxed">
                {quickViewProduct.tagline}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-2xl font-black text-stone-900">
                  ${quickViewProduct.salePrice.toFixed(2)}
                </span>
                {quickViewProduct.price > quickViewProduct.salePrice && (
                  <>
                    <span className="text-sm text-stone-400 line-through">
                      ${quickViewProduct.price.toFixed(2)}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Save {quickViewProduct.discountPercent}%
                    </span>
                  </>
                )}
              </div>

              {/* Color Selector */}
              {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
                <div className="mb-4">
                  <div className="flex justify-between items-center text-xs mb-1.5 font-semibold text-stone-700">
                    <span>Color: <span className="font-normal text-stone-600">{selectedColor}</span></span>
                  </div>
                  <div className="flex gap-2">
                    {quickViewProduct.colors.map(c => (
                      <button
                        key={c.name}
                        onClick={() => {
                          setSelectedColor(c.name);
                          if (c.imageIndex !== undefined) setSelectedImageIndex(c.imageIndex);
                        }}
                        className={`w-7 h-7 rounded-full border-2 transition-all p-0.5 ${
                          selectedColor === c.name ? 'border-stone-900 scale-110 shadow-xs' : 'border-stone-200 hover:scale-105'
                        }`}
                        title={c.name}
                      >
                        <span className="w-full h-full rounded-full block" style={{ backgroundColor: c.hex }} />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
                <div className="mb-5">
                  <div className="flex justify-between items-center text-xs mb-1.5 font-semibold text-stone-700">
                    <span>Size: <span className="font-normal text-stone-600">{selectedSize}</span></span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {quickViewProduct.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 px-2 text-xs font-medium rounded-lg border text-center transition-all ${
                          selectedSize === size
                            ? 'bg-stone-900 text-white border-stone-900 font-bold'
                            : 'bg-stone-50 border-stone-200 text-stone-800 hover:border-stone-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-semibold text-stone-700">Quantity:</span>
                <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-1 text-stone-600 hover:text-stone-900 text-sm font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-stone-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2.5 py-1 text-stone-600 hover:text-stone-900 text-sm font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2.5 pt-2 border-t border-stone-100">
              <button
                onClick={handleAddToCart}
                disabled={added}
                className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all ${
                  added ? 'bg-emerald-600 text-white' : 'bg-stone-900 hover:bg-stone-800 text-white'
                }`}
              >
                {added ? (
                  <>
                    <Check size={16} />
                    <span>ADDED TO CART</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    <span>ADD TO CART • ${(quickViewProduct.salePrice * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleViewFullDetails}
                className="w-full py-2.5 text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>View Full Specifications &amp; Reviews</span>
                <ArrowRight size={14} />
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] text-stone-400 pt-1">
                <span className="flex items-center gap-1">
                  <Truck size={12} /> Fast Free Shipping 2-3 Days
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck size={12} /> 30-Day Comfort Guarantee
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
