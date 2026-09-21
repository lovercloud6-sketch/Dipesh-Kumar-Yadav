import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, X, ArrowRight, Star, Footprints } from 'lucide-react';
import { Rating } from './Rating';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products, setCurrentPage } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchTerm('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = searchTerm.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.features.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  const handleSelectProduct = (slug: string) => {
    setIsSearchOpen(false);
    setCurrentPage('product', slug);
  };

  const popularSearches = [
    'Plantar Fasciitis',
    'Recovery Slides',
    'Ortho Clogs',
    'Arch Insoles',
    'House Slippers',
    'Memory Foam'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-stone-100 flex items-center gap-3 bg-stone-50/70">
          <Search size={20} className="text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search foot comfort products, pain relief, insoles..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent text-sm sm:text-base font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-stone-400 hover:text-stone-600 p-1 rounded-full text-xs font-semibold"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-200 transition-colors"
            aria-label="Close search"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results / Popular searches */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5">
          {searchTerm.trim() ? (
            filteredProducts.length > 0 ? (
              <div className="space-y-3">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                  Products ({filteredProducts.length})
                </p>
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product.slug)}
                    className="flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-stone-50 transition-colors cursor-pointer group border border-transparent hover:border-stone-200"
                  >
                    <div className="w-14 h-14 rounded-lg bg-stone-100 overflow-hidden shrink-0 border border-stone-200">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-stone-900 truncate group-hover:text-amber-800 transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs text-stone-500 truncate">{product.tagline}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Rating rating={product.rating} size={12} showScore reviewCount={product.reviewCount} />
                        <span className="text-xs font-bold text-stone-900">
                          ${product.salePrice.toFixed(2)}
                        </span>
                        {product.price > product.salePrice && (
                          <span className="text-[11px] text-stone-400 line-through">
                            ${product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-stone-300 group-hover:text-stone-800 transition-colors shrink-0" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <Footprints size={32} className="mx-auto text-stone-300 mb-2" />
                <p className="text-sm font-semibold text-stone-800">No matching products found</p>
                <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                  Try searching for terms like "slides", "clogs", "insoles", or "plantar relief".
                </p>
              </div>
            )
          ) : (
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2.5">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {popularSearches.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSearchTerm(tag)}
                    className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-full text-xs font-medium transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2.5">
                Featured Best Sellers
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {products.slice(0, 2).map(product => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product.slug)}
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-stone-200 hover:border-stone-400 transition-colors cursor-pointer bg-stone-50/50"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover bg-white"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-stone-900 truncate">{product.name}</p>
                      <p className="text-xs font-semibold text-stone-900 mt-0.5">${product.salePrice.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
