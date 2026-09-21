import React, { useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { MobileMenu } from './components/MobileMenu';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { AboutPage } from './pages/AboutPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { PolicyPage } from './pages/PolicyPage';
import { AccountPage } from './pages/AccountPage';
import { AdminDashboard } from './pages/AdminDashboard';

const MainLayout: React.FC = () => {
  const { currentPage, pageParam } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Scroll to top on page transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, pageParam]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'product':
        return <ProductDetailPage slug={pageParam || 'stepora-cloudflex-recovery-slide'} />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-confirmation':
        return <OrderConfirmationPage orderNumber={pageParam || 'STP-84920'} />;
      case 'track-order':
        return <TrackOrderPage initialOrderNumber={pageParam || undefined} />;
      case 'reviews':
        return <ReviewsPage />;
      case 'about':
        return <AboutPage />;
      case 'faq':
        return <FAQPage />;
      case 'contact':
        return <ContactPage />;
      case 'shipping':
      case 'shipping-policy':
        return <PolicyPage initialPolicy="shipping" />;
      case 'returns':
      case 'returns-policy':
        return <PolicyPage initialPolicy="returns" />;
      case 'warranty':
        return <PolicyPage initialPolicy="warranty" />;
      case 'privacy':
        return <PolicyPage initialPolicy="privacy" />;
      case 'terms':
        return <PolicyPage initialPolicy="terms" />;
      case 'account':
        return <AccountPage />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 antialiased selection:bg-stone-900 selection:text-white">
      {/* Global Announcements */}
      <AnnouncementBar />

      {/* Global Header Navigation */}
      <Header onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

      {/* Slide-out & Overlay Drawers/Modals */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <CartDrawer />
      <SearchModal />
      <QuickViewModal />

      {/* Page Content */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Global Site Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}
