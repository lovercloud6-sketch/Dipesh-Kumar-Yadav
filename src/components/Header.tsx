import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShoppingBag, 
  Search, 
  User as UserIcon, 
  Menu, 
  X, 
  Truck, 
  Heart, 
  SlidersHorizontal,
  ChevronRight,
  Footprints
} from 'lucide-react';

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const { 
    currentPage, 
    setCurrentPage, 
    cartCount, 
    setIsCartOpen, 
    setIsSearchOpen, 
    wishlist, 
    currentUser,
    settings 
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Shop All', page: 'shop' as const },
    { label: 'Track Order', page: 'track-order' as const, icon: Truck },
    { label: 'Reviews', page: 'reviews' as const },
    { label: 'Our Story', page: 'about' as const },
    { label: 'FAQ', page: 'faq' as const },
    { label: 'Contact', page: 'contact' as const },
  ];

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-200 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-200/80 py-3' 
          : 'bg-stone-50 border-b border-stone-200/60 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Mobile Left: Menu Hamburger */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={onOpenMobileMenu}
            className="p-2 -ml-2 text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-400"
            aria-label="Open mobile menu"
          >
            <Menu size={22} />
          </button>
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
            aria-label="Search products"
          >
            <Search size={20} />
          </button>
        </div>

        {/* Brand Logo */}
        <div className="flex items-center">
          <button
            onClick={() => setCurrentPage('home')}
            className="group flex items-center gap-2 text-left focus:outline-none"
            aria-label="STEPORA homepage"
          >
            <div className="w-8 h-8 rounded-lg bg-stone-900 text-stone-50 flex items-center justify-center font-bold shadow-sm group-hover:bg-amber-600 transition-colors">
              <Footprints size={18} className="text-amber-400 group-hover:text-white transition-colors" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-stone-900 font-sans block leading-none">
                {settings.brandName || 'STEPORA'}
              </span>
              <span className="text-[10px] tracking-widest text-stone-500 uppercase font-semibold block pt-0.5">
                Foot Comfort Lab
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Primary Navigation */}
        <nav className="hidden lg:flex items-center space-x-7">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.label}
                onClick={() => setCurrentPage(link.page)}
                className={`text-sm font-medium transition-colors relative py-1 focus:outline-none flex items-center gap-1.5 ${
                  isActive 
                    ? 'text-stone-900 font-semibold' 
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {link.icon && <link.icon size={14} className="text-stone-400" />}
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Icons (Search, Wishlist, Account, Cart, Admin) */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          {/* Desktop Search */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="hidden lg:flex items-center gap-2 text-stone-600 hover:text-stone-900 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-stone-200/60 transition-colors"
            title="Search products"
          >
            <Search size={16} />
            <span className="text-stone-500">Search</span>
            <kbd className="hidden xl:inline-block px-1.5 py-0.5 text-[10px] bg-stone-200 text-stone-600 rounded">⌘K</kbd>
          </button>

          {/* Wishlist Link */}
          <button
            onClick={() => setCurrentPage('account')}
            className="p-2 text-stone-700 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors relative hidden sm:flex"
            title="Wishlist"
            aria-label="Wishlist"
          >
            <Heart size={20} className={wishlist.length > 0 ? 'fill-rose-50 text-rose-500' : ''} />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
            )}
          </button>

          {/* Account */}
          <button
            onClick={() => setCurrentPage('account')}
            className="p-2 text-stone-700 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors"
            title={currentUser ? `Signed in as ${currentUser.name}` : 'Account / Login'}
            aria-label="Customer Account"
          >
            <UserIcon size={20} />
          </button>

          {/* Admin Dashboard Quick Access */}
          <button
            onClick={() => setCurrentPage('admin')}
            className="p-2 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors"
            title="Store Admin Dashboard"
            aria-label="Admin Dashboard"
          >
            <SlidersHorizontal size={18} />
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 bg-stone-900 text-stone-50 hover:bg-stone-800 px-3.5 py-2 rounded-full transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-1"
            aria-label={`Cart with ${cartCount} items`}
          >
            <ShoppingBag size={18} className="text-amber-300" />
            <span className="text-xs font-semibold hidden md:inline">Cart</span>
            <span className="bg-amber-400 text-stone-950 text-xs font-extrabold w-5 h-5 rounded-full flex items-center justify-center -mr-1">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
