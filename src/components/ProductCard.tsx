import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';
import { Rating } from './Rating';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setCurrentPage, addToCart, setQuickViewProduct, toggleWishlist, isInWishlist } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2] || product.sizes[0] || 'US 8');
  const [justAdded, setJustAdded] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const defaultColor = product.colors[0]?.name || 'Standard';
  const defaultColorHex = product.colors[0]?.hex;

  const handleCardClick = (e: React.MouseEvent) => {
    // Avoid triggering navigation if clicking a button inside
    if ((e.target as HTMLElement).closest('button')) return;
    setCurrentPage('product', product.slug);
  };

  const handleDirectAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedSize, defaultColor, 1, defaultColorHex);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const primaryImage = product.images[0] || '';
  const secondaryImage = product.images[1] || product.images[0] || '';

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-2xs hover:shadow-xl hover:border-stone-300 transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative aspect-square bg-stone-100 overflow-hidden">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          {product.badge && (
            <span className="bg-stone-900/90 backdrop-blur-xs text-stone-50 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
              {product.badge}
            </span>
          )}
          {product.discountPercent > 0 && (
            <span className="bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              Save {product.discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-transform duration-200 active:scale-90 ${
            isFavorited
              ? 'bg-rose-50 text-rose-500 shadow-sm'
              : 'bg-white/80 text-stone-600 hover:bg-white hover:text-stone-900 shadow-xs'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={16} className={isFavorited ? 'fill-rose-500 text-rose-500' : ''} />
        </button>

        {/* Product Images with Cross-fade on Hover */}
        <img
          src={primaryImage}
          alt={product.name}
          className={`w-full h-full object-cover object-center transition-all duration-500 ${
            isHovered ? 'scale-105 opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
        />
        <img
          src={secondaryImage}
          alt={`${product.name} alternate angle`}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 ${
            isHovered ? 'scale-105 opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />

        {/* Quick View Hover Pill */}
        <div className="absolute bottom-3 inset-x-3 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex">
          <button
            onClick={handleQuickView}
            className="w-full bg-white/95 hover:bg-white text-stone-900 backdrop-blur-sm text-xs font-semibold py-2 px-3 rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all"
          >
            <Eye size={14} />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Star Rating */}
          <div className="mb-1.5 flex items-center justify-between">
            <Rating rating={product.rating} size={13} showScore reviewCount={product.reviewCount} />
            <span className="text-[11px] font-semibold text-emerald-700 capitalize">
              In Stock
            </span>
          </div>

          {/* Product Title */}
          <h3 className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-stone-700 transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="text-xs text-stone-500 line-clamp-2 mb-3 leading-relaxed">
            {product.tagline}
          </p>

          {/* Color Swatch Dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mb-3">
              {product.colors.slice(0, 4).map((c, i) => (
                <span
                  key={i}
                  className="w-3 h-3 rounded-full border border-stone-300 shadow-2xs"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-[10px] text-stone-400 font-medium">
                  +{product.colors.length - 4} colors
                </span>
              )}
            </div>
          )}
        </div>

        {/* Pricing & Add to Cart Bar */}
        <div className="pt-3 border-t border-stone-100">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base sm:text-lg font-extrabold text-stone-900">
              ${product.salePrice.toFixed(2)}
            </span>
            {product.price > product.salePrice && (
              <span className="text-xs text-stone-400 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Action Button */}
          <button
            onClick={handleDirectAdd}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 shadow-2xs ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-stone-900 hover:bg-stone-800 text-white'
            }`}
          >
            {justAdded ? (
              <>
                <Check size={14} />
                <span>ADDED TO CART</span>
              </>
            ) : (
              <>
                <ShoppingBag size={14} />
                <span>ADD TO CART</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
