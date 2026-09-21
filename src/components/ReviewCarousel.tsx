import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Rating } from './Rating';
import { 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  ThumbsUp, 
  Plus, 
  MessageSquare,
  Sparkles,
  X,
  Star
} from 'lucide-react';

export const ReviewCarousel: React.FC = () => {
  const { reviews, submitReview, products } = useStore();
  const [scrollIndex, setScrollIndex] = useState(0);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // Review Form state
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || 'prod-cloudstep-slide');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Filter approved reviews
  const approvedReviews = reviews.filter(r => r.status === 'approved');
  const averageRating = 4.9;
  const totalReviewsCount = 4892;

  const handleNext = () => {
    setScrollIndex(prev => (prev + 1) % Math.max(1, approvedReviews.length - 1));
  };

  const handlePrev = () => {
    setScrollIndex(prev => (prev - 1 + Math.max(1, approvedReviews.length - 1)) % Math.max(1, approvedReviews.length - 1));
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName || !content || !title) return;

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
      verifiedPurchase: true,
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
    <section className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Aggregate Stats */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles size={14} />
              <span>Verified Customer Feedback</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-2">
              Loved by Over 42,000 Walkers
            </h2>
            <p className="text-sm text-stone-600">
              Read authentic, unfiltered experiences from everyday nurses, athletes, teachers, and grandparents.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white p-3.5 px-5 rounded-2xl border border-stone-200 shadow-2xs flex items-center gap-3">
              <div className="text-3xl font-black text-stone-900 leading-none">
                {averageRating}
              </div>
              <div>
                <Rating rating={averageRating} size={15} />
                <span className="text-[11px] text-stone-500 font-semibold block mt-0.5">
                  Based on {totalReviewsCount.toLocaleString()} reviews
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-bold px-4 py-3.5 rounded-xl flex items-center gap-2 shadow-xs transition-colors shrink-0"
            >
              <MessageSquare size={16} />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Horizontal Scroller */}
        <div className="relative">
          <div className="flex gap-5 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory">
            {approvedReviews.map((rev) => (
              <div
                key={rev.id}
                className="w-[85vw] sm:w-[360px] lg:w-[380px] shrink-0 bg-white p-6 sm:p-7 rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between snap-start"
              >
                <div>
                  {/* Rating + Date */}
                  <div className="flex items-center justify-between mb-3">
                    <Rating rating={rev.rating} size={15} />
                    <span className="text-[11px] text-stone-400 font-medium">
                      {rev.date}
                    </span>
                  </div>

                  {/* Review Title */}
                  <h3 className="text-sm sm:text-base font-bold text-stone-900 mb-2 leading-snug">
                    "{rev.title}"
                  </h3>

                  {/* Review Content */}
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-4 mb-4">
                    {rev.content}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {rev.avatarUrl ? (
                      <img
                        src={rev.avatarUrl}
                        alt={rev.author}
                        className="w-9 h-9 rounded-full object-cover border border-stone-200"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-stone-100 text-stone-700 font-bold flex items-center justify-center text-xs">
                        {rev.author[0]}
                      </div>
                    )}
                    <div>
                      <span className="text-xs font-bold text-stone-900 block leading-tight">
                        {rev.author}
                      </span>
                      {rev.verifiedPurchase && (
                        <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 size={11} /> Verified Buyer
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="text-[10px] text-stone-400 truncate max-w-[120px] text-right">
                    {rev.productName.split('™')[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Write a Review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs" 
            onClick={() => setIsWriteModalOpen(false)} 
          />
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-stone-900">Share Your Experience</h3>
                <p className="text-xs text-stone-500">Help fellow walkers choose their ideal foot comfort</p>
              </div>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100"
              >
                <X size={18} />
              </button>
            </div>

            {submitSuccess ? (
              <div className="text-center py-8">
                <CheckCircle2 size={42} className="mx-auto text-emerald-600 mb-2" />
                <h4 className="text-base font-bold text-stone-900">Thank you for your review!</h4>
                <p className="text-xs text-stone-500 mt-1">Your review has been verified and published.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Product</label>
                  <select
                    value={selectedProductId}
                    onChange={e => setSelectedProductId(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  >
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform"
                      >
                        <Star
                          size={24}
                          className={star <= rating ? 'fill-amber-400 text-amber-400' : 'fill-stone-200 text-stone-300'}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-stone-700 ml-2">{rating} of 5 stars</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jessica M."
                      value={authorName}
                      onChange={e => setAuthorName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Email (Private)</label>
                    <input
                      type="email"
                      placeholder="For verified buyer badge"
                      value={authorEmail}
                      onChange={e => setAuthorEmail(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Review Headline *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Total game-changer for my heel spurs"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Your Review *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="How does it feel compared to standard footwear? How has it helped your daily routine?"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-stone-900 hover:bg-stone-800 text-stone-50 py-3 rounded-xl font-bold text-xs shadow-md transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'SUBMIT VERIFIED REVIEW'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
