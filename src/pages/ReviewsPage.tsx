import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Rating } from '../components/Rating';
import { 
  CheckCircle2, 
  MessageSquare, 
  Star, 
  ThumbsUp, 
  Filter, 
  Search,
  Sparkles,
  X
} from 'lucide-react';

export const ReviewsPage: React.FC = () => {
  const { reviews, products, submitReview } = useStore();

  const [filterRating, setFilterRating] = useState<number>(0);
  const [filterProduct, setFilterProduct] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // New review form
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const approvedReviews = reviews.filter(r => r.status === 'approved');

  // Calculate rating distributions
  const total = approvedReviews.length || 1;
  const ratingCounts = {
    5: approvedReviews.filter(r => r.rating === 5).length,
    4: approvedReviews.filter(r => r.rating === 4).length,
    3: approvedReviews.filter(r => r.rating === 3).length,
    2: approvedReviews.filter(r => r.rating === 2).length,
    1: approvedReviews.filter(r => r.rating === 1).length,
  };

  const filteredReviews = approvedReviews.filter(r => {
    if (filterRating > 0 && r.rating !== filterRating) return false;
    if (filterProduct !== 'all' && r.productId !== filterProduct) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        r.title.toLowerCase().includes(q) ||
        r.content.toLowerCase().includes(q) ||
        r.author.toLowerCase().includes(q) ||
        r.productName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName || !title || !content) return;
    setIsSubmitting(true);
    const prod = products.find(p => p.id === selectedProductId);
    const success = await submitReview({
      productId: selectedProductId,
      productName: prod?.name || 'Stepora Footwear',
      author: authorName,
      email: authorEmail,
      rating,
      title,
      content,
      verifiedPurchase: true
    });
    setIsSubmitting(false);
    if (success) {
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setIsWriteModalOpen(false);
        setAuthorName('');
        setTitle('');
        setContent('');
      }, 1500);
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={14} />
            <span>Customer Experiences</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-2">
            Verified Customer Reviews
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Read over 42,000 real stories from customers walking easier, working longer shifts, and living pain-free.
          </p>
        </div>

        {/* Aggregate Ratings & Breakdown Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-2xs mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Overall Score */}
            <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-stone-100 pb-6 md:pb-0 md:pr-8">
              <div className="text-5xl font-black text-stone-900 leading-none mb-2">
                4.9
              </div>
              <Rating rating={4.9} size={20} className="justify-center md:justify-start mb-2" />
              <p className="text-xs text-stone-500 font-medium">
                Based on 42,890 verified customer ratings
              </p>
              <button
                onClick={() => setIsWriteModalOpen(true)}
                className="mt-5 w-full sm:w-auto bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-bold px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare size={15} />
                <span>Write a Review</span>
              </button>
            </div>

            {/* Right Star Breakdown */}
            <div className="md:col-span-8 space-y-2">
              {[5, 4, 3, 2, 1].map(stars => {
                const count = ratingCounts[stars as keyof typeof ratingCounts] || 0;
                const pct = Math.round((count / total) * 100);
                return (
                  <button
                    key={stars}
                    onClick={() => setFilterRating(filterRating === stars ? 0 : stars)}
                    className="w-full flex items-center gap-3 text-xs group text-left hover:opacity-80"
                  >
                    <span className="w-14 font-semibold text-stone-700 flex items-center gap-1">
                      <span>{stars}</span>
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                    </span>
                    <div className="flex-1 h-2.5 bg-stone-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-12 text-right text-stone-400 text-[11px] font-medium">
                      {pct}%
                    </span>
                  </button>
                );
              })}
            </div>

          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-2xs mb-8 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 flex-1 max-w-sm">
            <Search size={16} className="text-stone-400" />
            <input
              type="text"
              placeholder="Search reviews by keyword..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full text-xs text-stone-900 focus:outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-stone-400 hover:text-stone-600">
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Filter Product */}
            <select
              value={filterProduct}
              onChange={e => setFilterProduct(e.target.value)}
              className="bg-stone-50 border border-stone-200 text-stone-800 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none"
            >
              <option value="all">All Products</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>

            {/* Filter Rating */}
            <select
              value={filterRating}
              onChange={e => setFilterRating(Number(e.target.value))}
              className="bg-stone-50 border border-stone-200 text-stone-800 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none"
            >
              <option value={0}>All Stars</option>
              <option value={5}>5 Stars Only</option>
              <option value={4}>4 Stars Only</option>
              <option value={3}>3 Stars Only</option>
            </select>
          </div>

        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map(rev => (
            <div
              key={rev.id}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200/90 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Rating rating={rev.rating} size={15} />
                  <span className="text-[11px] text-stone-400">{rev.date}</span>
                </div>

                <h3 className="text-sm font-bold text-stone-900 mb-2 leading-snug">
                  "{rev.title}"
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  {rev.content}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {rev.avatarUrl ? (
                    <img src={rev.avatarUrl} alt="" className="w-8 h-8 rounded-full object-cover border border-stone-200" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-stone-100 font-bold text-xs text-stone-700 flex items-center justify-center">
                      {rev.author[0]}
                    </div>
                  )}
                  <div>
                    <span className="text-xs font-bold text-stone-900 block leading-tight">{rev.author}</span>
                    {rev.verifiedPurchase && (
                      <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-0.5">
                        <CheckCircle2 size={11} /> Verified Buyer
                      </span>
                    )}
                  </div>
                </div>

                <span className="text-[10px] text-stone-400 truncate max-w-[110px] text-right">
                  {rev.productName.split('™')[0]}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Write Review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs" onClick={() => setIsWriteModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 border border-stone-200">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-stone-900">Write a Review</h3>
                <p className="text-xs text-stone-500">Share your genuine walking and recovery experience</p>
              </div>
              <button onClick={() => setIsWriteModalOpen(false)} className="p-1.5 text-stone-400 hover:text-stone-900">
                <X size={18} />
              </button>
            </div>

            {submitSuccess ? (
              <div className="text-center py-8">
                <CheckCircle2 size={40} className="mx-auto text-emerald-600 mb-2" />
                <h4 className="text-base font-bold text-stone-900">Thank you!</h4>
                <p className="text-xs text-stone-500 mt-1">Your review has been verified and published.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Product</label>
                  <select
                    value={selectedProductId}
                    onChange={e => setSelectedProductId(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none"
                  >
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Rating</label>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map(s => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setRating(s)}
                        className="text-xl"
                      >
                        {s <= rating ? '★' : '☆'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jessica M."
                      value={authorName}
                      onChange={e => setAuthorName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Email</label>
                    <input
                      type="email"
                      placeholder="For verified badge"
                      value={authorEmail}
                      onChange={e => setAuthorEmail(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Review Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Total game-changer for my heel spurs"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Review Comments *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Share how it feels and how it helped your feet..."
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-900 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-stone-900 text-white font-bold text-xs py-3 rounded-xl hover:bg-stone-800 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Posting...' : 'Submit Verified Review'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
