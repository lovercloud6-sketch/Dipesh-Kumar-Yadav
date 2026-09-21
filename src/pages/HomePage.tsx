import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { ProductTechnology } from '../components/ProductTechnology';
import { BenefitsSection } from '../components/BenefitsSection';
import { GuaranteeSection } from '../components/GuaranteeSection';
import { ReviewCarousel } from '../components/ReviewCarousel';
import { CTASection } from '../components/CTASection';
import { ArrowRight, Sparkles, Filter } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products, setCurrentPage } = useStore();
  const [activeCategoryTab, setActiveCategoryTab] = useState('all');

  const categories = [
    { id: 'all', label: 'All Best Sellers' },
    { id: 'slides', label: 'Recovery Slides' },
    { id: 'clogs', label: 'Ortho Clogs' },
    { id: 'insoles', label: 'Arch Insoles' },
    { id: 'slippers', label: 'House Slippers' },
    { id: 'therapy', label: 'Therapy Gear' },
  ];

  const filteredProducts = activeCategoryTab === 'all'
    ? products
    : products.filter(p => p.category.toLowerCase() === activeCategoryTab);

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Best Sellers Showcase */}
      <section className="py-16 sm:py-24 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Showcase Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles size={14} className="text-amber-600" />
                <span>Customer Favorites</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-2">
                Engineered For Daily Relief
              </h2>
              <p className="text-sm text-stone-500 max-w-xl">
                Explore our best-selling orthopedic recovery slides, clogs, and arch-support insoles designed to soothe acute foot fatigue.
              </p>
            </div>

            <button
              onClick={() => setCurrentPage('shop')}
              className="inline-flex items-center gap-2 text-stone-900 hover:text-amber-800 font-bold text-sm transition-colors group shrink-0"
            >
              <span>View Full Catalog ({products.length})</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryTab(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategoryTab === cat.id
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Bottom view all banner */}
          <div className="mt-14 text-center">
            <button
              onClick={() => setCurrentPage('shop')}
              className="inline-flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full transition-colors"
            >
              <span>Explore All Recovery Footwear &amp; Insoles</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </section>

      {/* 3. Product Technology Section */}
      <ProductTechnology />

      {/* 4. Benefits Section */}
      <BenefitsSection />

      {/* 5. Guarantees Section */}
      <GuaranteeSection />

      {/* 6. Reviews Carousel */}
      <ReviewCarousel />

      {/* 7. Final High-Impact CTA */}
      <CTASection />
    </div>
  );
};
