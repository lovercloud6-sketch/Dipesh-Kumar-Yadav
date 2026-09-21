import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { 
  SlidersHorizontal, 
  X, 
  ChevronDown, 
  Check, 
  Footprints, 
  ArrowUpDown,
  Sparkles,
  Search
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { products } = useStore();

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all'); // all, under-50, 50-75, over-75
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'slides', label: 'Recovery Slides' },
    { id: 'clogs', label: 'Ortho Clogs' },
    { id: 'insoles', label: 'Arch Insoles' },
    { id: 'slippers', label: 'House Slippers' },
    { id: 'therapy', label: 'Therapy Gear' },
  ];

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category
      if (selectedCategory !== 'all' && product.category.toLowerCase() !== selectedCategory) {
        return false;
      }
      // Price
      if (priceRange === 'under-50' && product.salePrice >= 50) return false;
      if (priceRange === '50-75' && (product.salePrice < 50 || product.salePrice > 75)) return false;
      if (priceRange === 'over-75' && product.salePrice <= 75) return false;
      // In Stock
      if (onlyInStock && !product.inStock) return false;
      // Rating
      if (minRating > 0 && product.rating < minRating) return false;
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesTagline = product.tagline.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        if (!matchesName && !matchesTagline && !matchesDesc) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.salePrice - b.salePrice;
      if (sortBy === 'price-high') return b.salePrice - a.salePrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
      return 0; // featured default
    });
  }, [products, selectedCategory, priceRange, onlyInStock, minRating, sortBy, searchQuery]);

  const hasActiveFilters = selectedCategory !== 'all' || priceRange !== 'all' || onlyInStock || minRating > 0 || searchQuery.trim() !== '';

  const resetFilters = () => {
    setSelectedCategory('all');
    setPriceRange('all');
    setOnlyInStock(false);
    setMinRating(0);
    setSearchQuery('');
  };

  return (
    <div className="bg-stone-50/50 min-h-screen pb-20">
      {/* Shop Banner */}
      <div className="bg-white border-b border-stone-200 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 inline-block mb-2">
              Orthopedic Collection
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              All Ergonomic Footwear &amp; Insoles
            </h1>
            <p className="text-sm text-stone-500 mt-1 max-w-xl">
              Podiatrist-formulated footwear engineered to alleviate foot fatigue, plantar fasciitis, and joint stress.
            </p>
          </div>

          <div className="text-sm font-semibold text-stone-500">
            Showing <span className="text-stone-900 font-bold">{filteredProducts.length}</span> of {products.length} products
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Filter & Sort Action Bar */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-stone-200/80 shadow-2xs mb-8 flex flex-wrap items-center justify-between gap-3">
          
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors"
          >
            <SlidersHorizontal size={14} />
            <span>Filters {hasActiveFilters && '• Active'}</span>
          </button>

          {/* Search in Catalog */}
          <div className="relative flex-1 max-w-xs">
            <input
              type="text"
              placeholder="Search in shop..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 pl-8 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-800"
            />
            <Search size={14} className="absolute left-2.5 top-2.5 text-stone-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-stone-400 hover:text-stone-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-stone-500 hidden sm:inline">Sort by:</label>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-stone-50 border border-stone-200 text-stone-800 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-stone-800"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviewed</option>
            </select>
          </div>
        </div>

        {/* Main Content Layout (Sidebar Filters + Products Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <span className="font-extrabold text-sm text-stone-900">Filter By</span>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs font-semibold text-amber-700 hover:underline"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2.5">
                Category
              </label>
              <div className="space-y-1">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                      selectedCategory === cat.id
                        ? 'bg-stone-900 text-white font-bold'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <span>{cat.label}</span>
                    {selectedCategory === cat.id && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="pt-4 border-t border-stone-100">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2.5">
                Price
              </label>
              <div className="space-y-1.5 text-xs text-stone-600">
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under-50', label: 'Under $50' },
                  { id: '50-75', label: '$50 to $75' },
                  { id: 'over-75', label: 'Over $75' },
                ].map(p => (
                  <label key={p.id} className="flex items-center gap-2 cursor-pointer hover:text-stone-900 py-1">
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange === p.id}
                      onChange={() => setPriceRange(p.id)}
                      className="accent-stone-900"
                    />
                    <span>{p.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* In Stock Toggle */}
            <div className="pt-4 border-t border-stone-100">
              <label className="flex items-center gap-2.5 text-xs font-semibold text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={e => setOnlyInStock(e.target.checked)}
                  className="rounded text-stone-900 focus:ring-stone-900 accent-stone-900"
                />
                <span>In Stock Items Only</span>
              </label>
            </div>

            {/* Rating Filter */}
            <div className="pt-4 border-t border-stone-100">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2.5">
                Minimum Rating
              </label>
              <div className="space-y-1 text-xs text-stone-600">
                {[
                  { score: 0, label: 'All Ratings' },
                  { score: 4.5, label: '★ 4.5 & higher' },
                  { score: 4.8, label: '★ 4.8 & higher' }
                ].map(r => (
                  <label key={r.score} className="flex items-center gap-2 cursor-pointer hover:text-stone-900 py-1">
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === r.score}
                      onChange={() => setMinRating(r.score)}
                      className="accent-stone-900"
                    />
                    <span>{r.label}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* Product Cards Grid */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 max-w-lg mx-auto">
                <Footprints size={40} className="mx-auto text-stone-300 mb-3" />
                <h3 className="text-base font-bold text-stone-900 mb-1">No products match your criteria</h3>
                <p className="text-xs text-stone-500 mb-6">
                  Try adjusting your filter settings or search keywords.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-stone-900 text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-stone-800 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-start lg:hidden">
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto z-10 animate-in slide-in-from-left duration-300">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-5">
                <h3 className="font-extrabold text-stone-900 text-base">Filter Catalog</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 text-stone-400 hover:text-stone-900"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Category
                </label>
                <div className="space-y-1">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between ${
                        selectedCategory === cat.id ? 'bg-stone-900 text-white font-bold' : 'text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <span>{cat.label}</span>
                      {selectedCategory === cat.id && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-6 pt-4 border-t border-stone-100">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Price
                </label>
                <div className="space-y-1 text-xs text-stone-600">
                  {['all', 'under-50', '50-75', 'over-75'].map(p => (
                    <label key={p} className="flex items-center gap-2 py-1">
                      <input
                        type="radio"
                        name="m-price"
                        checked={priceRange === p}
                        onChange={() => setPriceRange(p)}
                        className="accent-stone-900"
                      />
                      <span className="capitalize">{p.replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 space-y-2">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-stone-900 text-white font-bold text-xs py-3 rounded-xl shadow-sm"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="w-full text-center text-xs text-stone-500 hover:underline py-1"
                >
                  Reset All Filters
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
