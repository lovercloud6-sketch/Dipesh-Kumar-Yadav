import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Rating } from '../components/Rating';
import { 
  Check, 
  ShoppingBag, 
  Zap, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  Heart, 
  Share2, 
  Ruler, 
  CheckCircle2, 
  X,
  Footprints,
  Sparkles,
  ArrowRight,
  MessageSquare
} from 'lucide-react';

interface ProductDetailPageProps {
  slug: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug }) => {
  const { 
    products, 
    reviews, 
    addToCart, 
    setCurrentPage, 
    toggleWishlist, 
    isInWishlist,
    submitReview
  } = useStore();

  const product = products.find(p => p.slug === slug) || products[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || 'Standard');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[1] || product?.sizes[0] || 'US 8');
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Accordion open states
  const [openAccordion, setOpenAccordion] = useState<string | null>('features');

  // Review modal state
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    // Reset selections on slug change
    if (product) {
      setSelectedImageIndex(0);
      setSelectedColor(product.colors[0]?.name || 'Standard');
      setSelectedSize(product.sizes[1] || product.sizes[0] || 'US 8');
      window.scrollTo(0, 0);
    }
  }, [slug]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-stone-900">Product not found</h2>
        <button
          onClick={() => setCurrentPage('shop')}
          className="mt-4 inline-block bg-stone-900 text-white px-5 py-2.5 rounded-full text-xs font-semibold"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const selectedColorHex = product.colors.find(c => c.name === selectedColor)?.hex;
  const isFavorite = isInWishlist(product.id);
  const productReviews = reviews.filter(r => r.productId === product.id && r.status === 'approved');

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity, selectedColorHex);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity, selectedColorHex);
    setCurrentPage('checkout');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName || !reviewTitle || !reviewContent) return;
    setIsSubmittingReview(true);
    await submitReview({
      productId: product.id,
      productName: product.name,
      author: authorName,
      rating: reviewRating,
      title: reviewTitle,
      content: reviewContent,
      verifiedPurchase: true
    });
    setIsSubmittingReview(false);
    setIsReviewModalOpen(false);
    setAuthorName('');
    setReviewTitle('');
    setReviewContent('');
  };

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div className="bg-stone-50/50 min-h-screen pb-24">
      {/* Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
          <button onClick={() => setCurrentPage('home')} className="hover:text-stone-900">Home</button>
          <span>/</span>
          <button onClick={() => setCurrentPage('shop')} className="hover:text-stone-900">Footwear</button>
          <span>/</span>
          <span className="text-stone-900 font-bold truncate">{product.name}</span>
        </div>
      </div>

      {/* Main PDP Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-stone-200/90 shadow-md group">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start">
                {product.badge && (
                  <span className="bg-stone-900 text-stone-50 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {product.badge}
                  </span>
                )}
                {product.discountPercent > 0 && (
                  <span className="bg-amber-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                    Save {product.discountPercent}%
                  </span>
                )}
              </div>

              {/* Wishlist & Share buttons */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs text-stone-600 hover:text-stone-900 shadow-sm flex items-center justify-center transition-transform active:scale-95"
                  title="Copy link"
                >
                  <Share2 size={16} />
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs shadow-sm flex items-center justify-center transition-transform active:scale-95 ${
                    isFavorite ? 'text-rose-500' : 'text-stone-600 hover:text-stone-900'
                  }`}
                  title={isFavorite ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <Heart size={16} className={isFavorite ? 'fill-rose-500 text-rose-500' : ''} />
                </button>
              </div>

              {copiedLink && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-xs px-3 py-1.5 rounded-full shadow-lg">
                  Link copied to clipboard!
                </div>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`aspect-square rounded-xl overflow-hidden bg-white border-2 transition-all ${
                      selectedImageIndex === idx
                        ? 'border-stone-900 shadow-sm scale-100'
                        : 'border-stone-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details, Selection & Add to Cart */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Header Info */}
              <div>
                {/* Rating Link */}
                <div className="flex items-center gap-2 mb-2">
                  <Rating
                    rating={product.rating}
                    size={14}
                    showScore
                    reviewCount={product.reviewCount}
                    onClick={() => {
                      document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  />
                  <span className="text-xs text-stone-300">|</span>
                  <span className="text-xs font-semibold text-emerald-700">
                    In Stock • Ready to Dispatch
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-snug">
                  {product.name}
                </h1>

                <p className="text-xs sm:text-sm text-stone-500 mt-1.5 leading-relaxed">
                  {product.tagline}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mt-4">
                  <span className="text-3xl font-black text-stone-900">
                    ${product.salePrice.toFixed(2)}
                  </span>
                  {product.price > product.salePrice && (
                    <>
                      <span className="text-base text-stone-400 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
                        Save ${(product.price - product.salePrice).toFixed(2)} ({product.discountPercent}%)
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-stone-200">
                  <div className="flex items-center justify-between text-xs font-semibold text-stone-800">
                    <span>Color: <span className="font-normal text-stone-600">{selectedColor}</span></span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    {product.colors.map(c => (
                      <button
                        key={c.name}
                        onClick={() => {
                          setSelectedColor(c.name);
                          if (c.imageIndex !== undefined) setSelectedImageIndex(c.imageIndex);
                        }}
                        className={`w-8 h-8 rounded-full border-2 transition-all p-0.5 ${
                          selectedColor === c.name
                            ? 'border-stone-900 scale-110 shadow-xs'
                            : 'border-stone-200 hover:scale-105'
                        }`}
                        title={c.name}
                      >
                        <span className="w-full h-full rounded-full block" style={{ backgroundColor: c.hex }} />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-stone-200">
                  <div className="flex items-center justify-between text-xs font-semibold text-stone-800">
                    <span>Selected Size: <span className="font-bold text-stone-900">{selectedSize}</span></span>
                    <button
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-amber-800 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Ruler size={13} />
                      <span>Sizing &amp; Fit Guide</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2.5 px-3 text-xs font-semibold rounded-xl border text-center transition-all ${
                          selectedSize === size
                            ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                            : 'bg-white border-stone-200 text-stone-800 hover:border-stone-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="flex items-center gap-3 pt-2 border-t border-stone-200">
                <span className="text-xs font-semibold text-stone-700">Quantity:</span>
                <div className="flex items-center border border-stone-200 rounded-xl bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-stone-600 hover:text-stone-900 text-sm font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-stone-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-stone-600 hover:text-stone-900 text-sm font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-4 px-6 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-md transition-all ${
                    addedAnimation
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-900 hover:bg-stone-800 text-white'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check size={18} />
                      <span>ADDED TO CART SUCCESSFULLY</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} />
                      <span>ADD TO CART • ${(product.salePrice * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 py-3.5 px-6 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Zap size={16} />
                  <span>BUY IT NOW (EXPRESS CHECKOUT)</span>
                </button>
              </div>

              {/* Reassurance Trust Box */}
              <div className="p-4 bg-white rounded-2xl border border-stone-200 space-y-2.5 text-xs text-stone-600">
                <div className="flex items-center gap-2.5">
                  <Truck size={16} className="text-emerald-600 shrink-0" />
                  <span><strong>Free Domestic Shipping</strong> on orders over $60</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                  <span><strong>30-Day Comfort Guarantee:</strong> Return even if worn outside</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <RotateCcw size={16} className="text-emerald-600 shrink-0" />
                  <span><strong>Hassle-Free Exchanges:</strong> Easy size replacements</span>
                </div>
              </div>

              {/* Product Accordions */}
              <div className="border-t border-stone-200 pt-2 divide-y divide-stone-200">
                {/* Description & Features */}
                <div className="py-3">
                  <button
                    onClick={() => toggleAccordion('features')}
                    className="w-full flex items-center justify-between text-xs font-bold text-stone-900 text-left"
                  >
                    <span>Key Comfort Features</span>
                    {openAccordion === 'features' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {openAccordion === 'features' && (
                    <div className="pt-3 text-xs text-stone-600 space-y-2 leading-relaxed">
                      <p>{product.description}</p>
                      <ul className="space-y-1.5 pt-2">
                        {product.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 size={13} className="text-emerald-600 mt-0.5 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Technical Specifications */}
                <div className="py-3">
                  <button
                    onClick={() => toggleAccordion('specs')}
                    className="w-full flex items-center justify-between text-xs font-bold text-stone-900 text-left"
                  >
                    <span>Material &amp; Specifications</span>
                    {openAccordion === 'specs' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {openAccordion === 'specs' && (
                    <div className="pt-3 text-xs text-stone-600 space-y-1.5">
                      <div className="flex justify-between py-1 border-b border-stone-100">
                        <span className="text-stone-500">Compound Material</span>
                        <span className="font-semibold text-stone-900">Hydrophobic Closed-Cell EVA</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-stone-100">
                        <span className="text-stone-500">Sole Platform Height</span>
                        <span className="font-semibold text-stone-900">1.75 inches (4.5 cm)</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-stone-100">
                        <span className="text-stone-500">Heel-to-Toe Drop</span>
                        <span className="font-semibold text-stone-900">4mm Neutral Incline</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-stone-100">
                        <span className="text-stone-500">Average Weight</span>
                        <span className="font-semibold text-stone-900">4.8 oz (Super Lightweight)</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-stone-500">Care Instructions</span>
                        <span className="font-semibold text-stone-900">Wipe clean with cool water &amp; mild soap</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Shipping & Delivery */}
                <div className="py-3">
                  <button
                    onClick={() => toggleAccordion('shipping')}
                    className="w-full flex items-center justify-between text-xs font-bold text-stone-900 text-left"
                  >
                    <span>Delivery &amp; Free Returns</span>
                    {openAccordion === 'shipping' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {openAccordion === 'shipping' && (
                    <div className="pt-3 text-xs text-stone-600 space-y-2 leading-relaxed">
                      <p>
                        We dispatch all orders within 24 hours from our domestic fulfillment centers. Standard delivery takes 2 to 4 business days.
                      </p>
                      <p>
                        You are covered under our <strong>30-Day Comfort Walking Guarantee</strong>. If they aren't the most comfortable footwear you have ever stepped into, return them with our prepaid shipping label for a complete refund.
                      </p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Product-Specific Reviews Section */}
      <section id="reviews-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-12 border-t border-stone-200">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
              Customer Reviews for {product.name}
            </h2>
            <div className="flex items-center gap-3 mt-1.5">
              <Rating rating={product.rating} size={16} showScore reviewCount={product.reviewCount} />
              <span className="text-xs text-stone-500">98% of customers recommend this model</span>
            </div>
          </div>

          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-bold px-4 py-3 rounded-xl flex items-center gap-2 shadow-2xs transition-colors shrink-0"
          >
            <MessageSquare size={15} />
            <span>Write a Review</span>
          </button>
        </div>

        {productReviews.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-stone-200 text-center">
            <p className="text-xs text-stone-500">No reviews published yet for this specific model.</p>
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="mt-3 text-xs font-bold text-stone-900 underline"
            >
              Be the first to leave a review!
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productReviews.map(rev => (
              <div key={rev.id} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Rating rating={rev.rating} size={14} />
                    <span className="text-[11px] text-stone-400">{rev.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-stone-900 mb-1.5">"{rev.title}"</h4>
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-4">{rev.content}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-stone-100 font-bold text-xs text-stone-700 flex items-center justify-center">
                    {rev.author[0]}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-900 block leading-tight">{rev.author}</span>
                    <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 size={11} /> Verified Buyer
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Related Products Carousel / Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-12 border-t border-stone-200">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              You May Also Love
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">Frequently paired by customers</p>
          </div>
          <button
            onClick={() => setCurrentPage('shop')}
            className="text-xs font-bold text-stone-900 hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Sizing & Fit Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs" onClick={() => setIsSizeGuideOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Ruler size={20} className="text-amber-700" />
                <h3 className="text-lg font-bold text-stone-900">Sizing &amp; Fit Guide</h3>
              </div>
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-stone-600 mb-4 leading-relaxed">
              Stepora footwear runs true to standard US sizing with a roomy, ergonomic toe box to allow natural toe splay. If you wear half sizes, we recommend sizing up for slides and clogs.
            </p>

            <div className="overflow-x-auto border border-stone-200 rounded-xl mb-4">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-100 text-stone-800 font-bold border-b border-stone-200">
                  <tr>
                    <th className="p-2.5">US Men</th>
                    <th className="p-2.5">US Women</th>
                    <th className="p-2.5">EU Size</th>
                    <th className="p-2.5">Foot Length (in)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  <tr><td className="p-2.5 font-medium">US 6</td><td className="p-2.5">US 7.5</td><td className="p-2.5">EU 38-39</td><td className="p-2.5">9.4"</td></tr>
                  <tr><td className="p-2.5 font-medium">US 7</td><td className="p-2.5">US 8.5</td><td className="p-2.5">EU 40</td><td className="p-2.5">9.8"</td></tr>
                  <tr><td className="p-2.5 font-medium">US 8</td><td className="p-2.5">US 9.5</td><td className="p-2.5">EU 41</td><td className="p-2.5">10.1"</td></tr>
                  <tr><td className="p-2.5 font-medium">US 9</td><td className="p-2.5">US 10.5</td><td className="p-2.5">EU 42-43</td><td className="p-2.5">10.5"</td></tr>
                  <tr><td className="p-2.5 font-medium">US 10</td><td className="p-2.5">US 11.5</td><td className="p-2.5">EU 44</td><td className="p-2.5">10.8"</td></tr>
                  <tr><td className="p-2.5 font-medium">US 11</td><td className="p-2.5">US 12.5</td><td className="p-2.5">EU 45</td><td className="p-2.5">11.2"</td></tr>
                  <tr><td className="p-2.5 font-medium">US 12</td><td className="p-2.5">US 13.5</td><td className="p-2.5">EU 46</td><td className="p-2.5">11.5"</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900">
              <strong>Need a size swap?</strong> We provide 100% free size exchanges within 30 days!
            </div>
          </div>
        </div>
      )}

      {/* Write Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs" onClick={() => setIsReviewModalOpen(false)} />
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-stone-900">Review {product.name}</h3>
              <button onClick={() => setIsReviewModalOpen(false)} className="p-1 text-stone-400 hover:text-stone-900">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleReviewSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Your Rating</label>
                <div className="flex gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className="text-lg"
                    >
                      {star <= reviewRating ? '★' : '☆'}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. David L."
                  value={authorName}
                  onChange={e => setAuthorName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Headline *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Incredibly soft and supportive"
                  value={reviewTitle}
                  onChange={e => setReviewTitle(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Feedback *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell us about the arch support, fit, and comfort..."
                  value={reviewContent}
                  onChange={e => setReviewContent(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-900 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmittingReview}
                className="w-full bg-stone-900 text-white py-3 rounded-xl font-bold text-xs transition-colors hover:bg-stone-800 disabled:opacity-50"
              >
                {isSubmittingReview ? 'Submitting...' : 'Post Review'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Sticky Mobile Add to Cart Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-stone-200 p-3 sm:p-4 z-40 lg:hidden shadow-lg flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-bold text-stone-900 truncate">{product.name}</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-extrabold text-stone-900">${product.salePrice.toFixed(2)}</span>
            <span className="text-[11px] text-stone-500">({selectedSize})</span>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="bg-stone-900 text-white text-xs font-extrabold px-5 py-3 rounded-xl shadow-sm flex items-center gap-2 shrink-0 active:scale-95"
        >
          <ShoppingBag size={15} />
          <span>{addedAnimation ? 'ADDED!' : 'ADD TO CART'}</span>
        </button>
      </div>

    </div>
  );
};
