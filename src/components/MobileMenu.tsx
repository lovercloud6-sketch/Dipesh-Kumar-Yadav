import React from 'react';
import { useStore, PageRoute } from '../context/StoreContext';
import { 
  X, 
  ChevronRight, 
  ShoppingBag, 
  Truck, 
  Star, 
  Info, 
  HelpCircle, 
  Mail, 
  User, 
  Heart, 
  ShieldCheck, 
  RotateCcw, 
  Phone,
  SlidersHorizontal,
  Search
} from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { setCurrentPage, settings, currentUser, setIsSearchOpen, wishlist } = useStore();

  if (!isOpen) return null;

  const navigateTo = (page: PageRoute) => {
    setCurrentPage(page);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      {/* Drawer */}
      <div className="relative w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto z-10 animate-in slide-in-from-left duration-300">
        <div>
          {/* Header */}
          <div className="p-4 border-b border-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-stone-900">
                {settings.brandName || 'STEPORA'}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-semibold uppercase tracking-wider">
                Footwear Lab
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Search Bar in Mobile Menu */}
          <div className="p-4 border-b border-stone-100 bg-stone-50/50">
            <button
              onClick={() => {
                onClose();
                setIsSearchOpen(true);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-500 shadow-2xs hover:border-stone-400 text-left"
            >
              <div className="flex items-center gap-2">
                <Search size={16} className="text-stone-400" />
                <span>Search slippers, insoles, clogs...</span>
              </div>
            </button>
          </div>

          {/* Quick Categories Banner */}
          <div className="px-4 py-3 bg-stone-100/50">
            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2">
              Foot Comfort Collections
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => navigateTo('shop')}
                className="text-left px-3 py-2 bg-white rounded-lg border border-stone-200 text-xs font-semibold text-stone-800 hover:bg-stone-50 transition-colors shadow-2xs"
              >
                🩴 Recovery Slides
              </button>
              <button
                onClick={() => navigateTo('shop')}
                className="text-left px-3 py-2 bg-white rounded-lg border border-stone-200 text-xs font-semibold text-stone-800 hover:bg-stone-50 transition-colors shadow-2xs"
              >
                👟 Ortho Clogs
              </button>
              <button
                onClick={() => navigateTo('shop')}
                className="text-left px-3 py-2 bg-white rounded-lg border border-stone-200 text-xs font-semibold text-stone-800 hover:bg-stone-50 transition-colors shadow-2xs"
              >
                🦶 Arch Insoles
              </button>
              <button
                onClick={() => navigateTo('shop')}
                className="text-left px-3 py-2 bg-white rounded-lg border border-stone-200 text-xs font-semibold text-stone-800 hover:bg-stone-50 transition-colors shadow-2xs"
              >
                🩹 Therapy Gear
              </button>
            </div>
          </div>

          {/* Main Links */}
          <div className="py-2">
            <button
              onClick={() => navigateTo('shop')}
              className="w-full px-5 py-3 flex items-center justify-between text-stone-800 hover:bg-stone-50 text-sm font-semibold border-b border-stone-100"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-stone-500" />
                <span>Shop All Footwear</span>
              </div>
              <ChevronRight size={16} className="text-stone-400" />
            </button>

            <button
              onClick={() => navigateTo('track-order')}
              className="w-full px-5 py-3 flex items-center justify-between text-stone-800 hover:bg-stone-50 text-sm font-semibold border-b border-stone-100"
            >
              <div className="flex items-center gap-3">
                <Truck size={18} className="text-emerald-600" />
                <div className="text-left">
                  <span>Track Your Order</span>
                  <span className="block text-[11px] font-normal text-stone-500">Live shipping milestones</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-stone-400" />
            </button>

            <button
              onClick={() => navigateTo('reviews')}
              className="w-full px-5 py-3 flex items-center justify-between text-stone-800 hover:bg-stone-50 text-sm font-semibold border-b border-stone-100"
            >
              <div className="flex items-center gap-3">
                <Star size={18} className="text-amber-500 fill-amber-400" />
                <span>Verified Reviews (4.9★)</span>
              </div>
              <ChevronRight size={16} className="text-stone-400" />
            </button>

            <button
              onClick={() => navigateTo('about')}
              className="w-full px-5 py-3 flex items-center justify-between text-stone-800 hover:bg-stone-50 text-sm font-medium border-b border-stone-100"
            >
              <div className="flex items-center gap-3">
                <Info size={18} className="text-stone-500" />
                <span>Our Story &amp; Science</span>
              </div>
              <ChevronRight size={16} className="text-stone-400" />
            </button>

            <button
              onClick={() => navigateTo('faq')}
              className="w-full px-5 py-3 flex items-center justify-between text-stone-800 hover:bg-stone-50 text-sm font-medium border-b border-stone-100"
            >
              <div className="flex items-center gap-3">
                <HelpCircle size={18} className="text-stone-500" />
                <span>FAQ &amp; Sizing Guide</span>
              </div>
              <ChevronRight size={16} className="text-stone-400" />
            </button>

            <button
              onClick={() => navigateTo('contact')}
              className="w-full px-5 py-3 flex items-center justify-between text-stone-800 hover:bg-stone-50 text-sm font-medium border-b border-stone-100"
            >
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-stone-500" />
                <span>Contact Customer Support</span>
              </div>
              <ChevronRight size={16} className="text-stone-400" />
            </button>
          </div>

          {/* Customer Profile & Wishlist */}
          <div className="px-5 py-3 bg-stone-50 border-t border-b border-stone-200">
            <button
              onClick={() => navigateTo('account')}
              className="w-full flex items-center justify-between py-2 text-sm font-semibold text-stone-900"
            >
              <div className="flex items-center gap-3">
                <User size={18} className="text-stone-700" />
                <span>{currentUser ? currentUser.name : 'Sign In / Register'}</span>
              </div>
              <ChevronRight size={16} className="text-stone-400" />
            </button>

            <button
              onClick={() => navigateTo('account')}
              className="w-full flex items-center justify-between py-2 text-sm font-medium text-stone-700"
            >
              <div className="flex items-center gap-3">
                <Heart size={18} className="text-rose-500 fill-rose-100" />
                <span>Saved Wishlist ({wishlist.length})</span>
              </div>
              <ChevronRight size={16} className="text-stone-400" />
            </button>

            <button
              onClick={() => navigateTo('admin')}
              className="w-full flex items-center justify-between py-2 text-sm font-medium text-stone-700"
            >
              <div className="flex items-center gap-3">
                <SlidersHorizontal size={18} className="text-stone-500" />
                <span>Admin Dashboard</span>
              </div>
              <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold">Admin</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-5 bg-stone-100 border-t border-stone-200 text-xs text-stone-600">
          <div className="flex items-center gap-2 mb-2 text-stone-800 font-semibold">
            <Phone size={14} className="text-amber-600" />
            <span>Support: {settings.supportPhone}</span>
          </div>
          <p className="text-[11px] text-stone-500 mb-3">
            Mon-Fri 9am - 6pm EST • 30-Day Risk-Free Comfort Guarantee
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-stone-500">
            <button onClick={() => navigateTo('shipping')} className="hover:underline">Shipping</button>
            <span>•</span>
            <button onClick={() => navigateTo('returns')} className="hover:underline">Returns</button>
            <span>•</span>
            <button onClick={() => navigateTo('warranty')} className="hover:underline">Warranty</button>
            <span>•</span>
            <button onClick={() => navigateTo('privacy')} className="hover:underline">Privacy</button>
          </div>
        </div>
      </div>
    </div>
  );
};
