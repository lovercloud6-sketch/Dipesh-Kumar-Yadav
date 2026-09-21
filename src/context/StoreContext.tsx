import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductReview, CartItem, Order, Coupon, StoreSettings, User, ShippingAddress, OrderStatus } from '../types';
import { INITIAL_PRODUCTS, INITIAL_SETTINGS, INITIAL_REVIEWS, INITIAL_ORDERS } from '../../server/data';

export type PageRoute = 
  | 'home' 
  | 'shop' 
  | 'product' 
  | 'cart' 
  | 'checkout' 
  | 'order-confirmation' 
  | 'track-order' 
  | 'reviews' 
  | 'about' 
  | 'faq' 
  | 'contact' 
  | 'shipping' 
  | 'shipping-policy'
  | 'returns' 
  | 'returns-policy'
  | 'warranty' 
  | 'privacy' 
  | 'terms' 
  | 'account' 
  | 'admin';

export interface StoreContextType {
  currentPage: PageRoute;
  currentProductSlug: string | null;
  pageParam: string | null;
  lastCreatedOrder: Order | null;
  setCurrentPage: (page: PageRoute, param?: string) => void;
  products: Product[];
  isLoadingProducts: boolean;
  selectedProduct: Product | null;
  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => Promise<void>;
  saveSettings: (newSettings: Partial<StoreSettings>) => Promise<void>;
  
  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, size: string, color: string, quantity?: number, colorHex?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  discountAmount: number;
  shippingFee: number;
  taxAmount: number;
  cartTotal: number;
  cartCount: number;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Quick View
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Auth & Account
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  login: (email: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;

  // Order Placement & Tracking
  orders: Order[];
  placeOrder: (orderData: any) => Promise<Order>;
  createOrder: (orderData: any) => Promise<Order>;
  trackOrder: (orderNumber: string, emailOrPhone?: string) => Promise<Order | null>;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string) => Promise<void>;

  // Products Management
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => Promise<Product>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;

  // Reviews
  reviews: ProductReview[];
  submitReview: (review: any) => Promise<boolean>;
  moderateReview: (reviewId: string, action: 'approve' | 'reject') => Promise<void>;

  // Admin Refreshes
  refreshData: () => Promise<void>;
  fetchInitialData: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPageState] = useState<PageRoute>('home');
  const [currentProductSlug, setCurrentProductSlug] = useState<string | null>(null);
  const [pageParam, setPageParam] = useState<string | null>(null);
  const [lastCreatedOrder, setLastCreatedOrder] = useState<Order | null>(null);

  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(false);
  const [settings, setSettings] = useState<StoreSettings>(INITIAL_SETTINGS);
  const [reviews, setReviews] = useState<ProductReview[]>(INITIAL_REVIEWS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('stepora_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);

  // Search & Quick View
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Wishlist state persisted to localStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('stepora_wishlist');
      return saved ? JSON.parse(saved) : ['prod-cloudstep-slide'];
    } catch {
      return ['prod-cloudstep-slide'];
    }
  });

  // Auth
  const [currentUser, setCurrentUserState] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('stepora_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const setCurrentUser = (user: User | null) => {
    setCurrentUserState(user);
    if (user) {
      localStorage.setItem('stepora_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('stepora_user');
    }
  };

  // Fetch initial data from server
  const refreshData = async () => {
    try {
      const [resProd, resSett, resRev, resOrd] = await Promise.allSettled([
        fetch('/api/products').then(r => r.ok ? r.json() : null),
        fetch('/api/settings').then(r => r.ok ? r.json() : null),
        fetch('/api/reviews').then(r => r.ok ? r.json() : null),
        fetch('/api/orders').then(r => r.ok ? r.json() : null),
      ]);

      if (resProd.status === 'fulfilled' && resProd.value) {
        setProducts(resProd.value);
      }
      if (resSett.status === 'fulfilled' && resSett.value) {
        setSettings(resSett.value);
      }
      if (resRev.status === 'fulfilled' && resRev.value) {
        setReviews(resRev.value);
      }
      if (resOrd.status === 'fulfilled' && resOrd.value) {
        setOrders(resOrd.value);
      }
    } catch (e) {
      console.warn('Using pre-seeded offline dataset:', e);
    }
  };

  const fetchInitialData = refreshData;

  useEffect(() => {
    refreshData();
  }, []);

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('stepora_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Save wishlist
  useEffect(() => {
    try {
      localStorage.setItem('stepora_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Page routing
  const setCurrentPage = (page: PageRoute, param?: string) => {
    setCurrentPageState(page);
    setPageParam(param || null);
    if (page === 'product' && param) {
      setCurrentProductSlug(param);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedProduct = currentProductSlug 
    ? products.find(p => p.slug === currentProductSlug || p.id === currentProductSlug) || products[0]
    : products[0] || null;

  // Cart operations
  const addToCart = (product: Product, size: string, color: string, quantity = 1, colorHex?: string) => {
    setCart(prev => {
      const id = `${product.id}-${color}-${size}`;
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        const newItem: CartItem = {
          id,
          productId: product.id,
          productName: product.name,
          slug: product.slug,
          price: product.price,
          salePrice: product.salePrice,
          color,
          colorHex: colorHex || (product.colors.find(c => c.name === color)?.hex),
          size,
          quantity,
          imageUrl: product.images[0] || ''
        };
        return [...prev, newItem];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setAppliedDiscount(0);
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.salePrice * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const discountAmount = appliedCoupon ? appliedDiscount : 0;
  const isFreeShipping = cartSubtotal >= settings.freeShippingThreshold || cartSubtotal === 0;
  const shippingFee = isFreeShipping ? 0 : 5.99;
  const taxableAmount = Math.max(0, cartSubtotal - discountAmount);
  const taxAmount = Math.round(taxableAmount * 0.08 * 100) / 100;
  const cartTotal = Math.max(0, Math.round((taxableAmount + shippingFee + taxAmount) * 100) / 100);

  // Coupon
  const applyCoupon = async (code: string) => {
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, subtotal: cartSubtotal }),
      });
      const data = await res.json();
      if (data.valid) {
        setAppliedCoupon(data.coupon);
        setAppliedDiscount(data.discountAmount);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Invalid coupon' };
      }
    } catch {
      // Local fallback
      if (code.toUpperCase() === 'COMFORT15') {
        const disc = Math.round(cartSubtotal * 0.15 * 100) / 100;
        setAppliedCoupon({
          id: 'c-1',
          code: 'COMFORT15',
          discountType: 'percentage',
          discountValue: 15,
          description: '15% Off Any Order',
          isActive: true
        });
        setAppliedDiscount(disc);
        return { success: true, message: '15% Off discount applied!' };
      }
      return { success: false, message: 'Coupon code not found' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setAppliedDiscount(0);
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Auth
  const login = async (email: string, password?: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        setCurrentUser(data.user);
        return { success: true };
      }
      return { success: false, message: data.error || 'Login failed' };
    } catch (e: any) {
      return { success: false, message: e.message };
    }
  };

  const register = async (name: string, email: string) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        setCurrentUser(data.user);
        return { success: true };
      }
      return { success: false, message: data.error || 'Registration failed' };
    } catch (e: any) {
      return { success: false, message: e.message };
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Settings update
  const updateSettings = async (newSettings: Partial<StoreSettings>) => {
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings),
      });
      const data = await res.json();
      setSettings(data);
    } catch (e) {
      setSettings(prev => ({ ...prev, ...newSettings }));
    }
  };

  const saveSettings = updateSettings;

  // Place order
  const placeOrder = async (orderData: any): Promise<Order> => {
    const formattedAddress: ShippingAddress = {
      firstName: orderData.shippingAddress.firstName,
      lastName: orderData.shippingAddress.lastName,
      email: orderData.customerEmail,
      phone: orderData.customerPhone || orderData.shippingAddress.phone || '+1 555-0192',
      addressLine1: orderData.shippingAddress.address1 || orderData.shippingAddress.addressLine1 || '',
      addressLine2: orderData.shippingAddress.address2 || orderData.shippingAddress.addressLine2 || '',
      city: orderData.shippingAddress.city,
      state: orderData.shippingAddress.state,
      postalCode: orderData.shippingAddress.zip || orderData.shippingAddress.postalCode || '90210',
      country: orderData.shippingAddress.country || 'United States',
    };

    const finalSubtotal = orderData.subtotal ?? cartSubtotal;
    const finalDiscount = orderData.discount ?? appliedDiscount;
    const finalShipping = orderData.shippingFee ?? shippingFee;
    const finalTotal = orderData.total ?? cartTotal;

    const payload = {
      ...orderData,
      items: orderData.items || cart,
      subtotal: finalSubtotal,
      discountAmount: finalDiscount,
      couponCodeApplied: appliedCoupon?.code,
      shippingFee: finalShipping,
      taxAmount,
      totalAmount: finalTotal,
      total: finalTotal,
      discount: finalDiscount,
      shippingAddress: formattedAddress,
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const created: Order = await res.json();
        created.total = created.totalAmount;
        created.discount = created.discountAmount;
        created.estimatedDelivery = created.estimatedDeliveryDate;
        setOrders(prev => [created, ...prev]);
        setLastCreatedOrder(created);
        clearCart();
        return created;
      }
      throw new Error('API creation failed');
    } catch {
      // Fallback order generation if offline or server is warming up
      const fallbackOrder: Order = {
        id: 'ord-' + Date.now(),
        orderNumber: 'STP-' + Math.floor(10000 + Math.random() * 90000),
        customerName: `${orderData.shippingAddress.firstName} ${orderData.shippingAddress.lastName}`,
        customerEmail: orderData.customerEmail,
        customerPhone: orderData.customerPhone || '+1 555-0192',
        items: orderData.items || [...cart],
        subtotal: finalSubtotal,
        discountAmount: finalDiscount,
        discount: finalDiscount,
        couponCodeApplied: appliedCoupon?.code,
        shippingMethod: orderData.shippingMethod || 'Standard Ground',
        shippingFee: finalShipping,
        taxAmount,
        totalAmount: finalTotal,
        total: finalTotal,
        status: 'processing',
        shippingAddress: formattedAddress,
        carrier: 'FedEx Priority Ground',
        trackingNumber: 'FX-' + Math.floor(1000000000000000 + Math.random() * 9000000000000000),
        estimatedDeliveryDate: new Date(Date.now() + 4 * 86400000).toLocaleDateString(),
        estimatedDelivery: new Date(Date.now() + 4 * 86400000).toLocaleDateString(),
        milestones: [
          { status: 'pending', label: 'Order Placed', description: 'Order confirmed and verified', timestamp: 'Just now', completed: true },
          { status: 'processing', label: 'Order Processing', description: 'Warehouse packing underway', timestamp: 'In Progress', completed: true },
          { status: 'shipped', label: 'Carrier Pickup', description: 'Scheduled for FedEx dispatch', timestamp: 'Pending', completed: false }
        ],
        paymentMethod: orderData.paymentMethod || 'Credit Card',
        paymentStatus: 'paid',
        createdAt: new Date().toISOString()
      };
      setOrders(prev => [fallbackOrder, ...prev]);
      setLastCreatedOrder(fallbackOrder);
      clearCart();
      return fallbackOrder;
    }
  };

  const createOrder = placeOrder;

  // Track order
  const trackOrder = async (orderNumber: string, emailOrPhone?: string): Promise<Order | null> => {
    // Check local state first
    const foundLocal = orders.find(o => 
      o.orderNumber.toLowerCase() === orderNumber.toLowerCase() ||
      o.trackingNumber?.toLowerCase() === orderNumber.toLowerCase()
    );
    if (foundLocal) {
      if (!foundLocal.total) foundLocal.total = foundLocal.totalAmount;
      if (!foundLocal.estimatedDelivery) foundLocal.estimatedDelivery = foundLocal.estimatedDeliveryDate;
      return foundLocal;
    }

    try {
      const query = new URLSearchParams({ orderNumber, emailOrPhone: emailOrPhone || '' });
      const res = await fetch(`/api/orders/track?${query}`);
      if (!res.ok) return null;
      const data: Order = await res.json();
      data.total = data.totalAmount;
      data.estimatedDelivery = data.estimatedDeliveryDate;
      return data;
    } catch {
      return null;
    }
  };

  // Update order status (Admin)
  const updateOrderStatus = async (orderId: string, status: OrderStatus, trackingNumber?: string) => {
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, trackingNumber }),
      });
    } catch (e) {
      console.error(e);
    }
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status, trackingNumber: trackingNumber || o.trackingNumber } : o))
    );
  };

  // Add product (Admin)
  const addProduct = async (productData: Omit<Product, 'id' | 'createdAt'>): Promise<Product> => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      if (res.ok) {
        const created: Product = await res.json();
        setProducts(prev => [created, ...prev]);
        return created;
      }
      throw new Error('Failed to create product');
    } catch {
      const fallback: Product = {
        ...productData,
        id: 'prod-' + Date.now().toString(36),
        createdAt: new Date().toISOString(),
      };
      setProducts(prev => [fallback, ...prev]);
      return fallback;
    }
  };

  // Update product (Admin)
  const updateProduct = async (prod: Product) => {
    try {
      await fetch(`/api/products/${prod.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prod),
      });
    } catch (e) {
      console.error(e);
    }
    setProducts(prev => prev.map(p => (p.id === prod.id ? prod : p)));
  };

  // Delete product (Admin)
  const deleteProduct = async (id: string) => {
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.error(e);
    }
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Reviews
  const submitReview = async (rev: any): Promise<boolean> => {
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rev),
      });
      if (res.ok) {
        const newRev = await res.json();
        setReviews(prev => [newRev, ...prev]);
        return true;
      }
      // Offline fallback
      const localRev: ProductReview = {
        id: 'rev-' + Date.now(),
        productId: rev.productId,
        productName: rev.productName,
        author: rev.author,
        email: rev.email,
        rating: rev.rating,
        title: rev.title,
        content: rev.content,
        date: 'Today',
        verifiedPurchase: true,
        helpfulCount: 0,
        status: 'approved',
      };
      setReviews(prev => [localRev, ...prev]);
      return true;
    } catch {
      return false;
    }
  };

  const moderateReview = async (reviewId: string, action: 'approve' | 'reject') => {
    const status = action === 'approve' ? 'approved' : 'rejected';
    try {
      await fetch(`/api/reviews/${reviewId}/moderate`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
    } catch (e) {
      console.error(e);
    }
    setReviews(prev =>
      prev.map(r => (r.id === reviewId ? { ...r, status } : r))
    );
  };

  return (
    <StoreContext.Provider
      value={{
        currentPage,
        currentProductSlug,
        pageParam,
        lastCreatedOrder,
        setCurrentPage,
        products,
        isLoadingProducts,
        selectedProduct,
        settings,
        updateSettings,
        saveSettings,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discountAmount,
        shippingFee,
        taxAmount,
        cartTotal,
        cartCount,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        setQuickViewProduct,
        wishlist,
        toggleWishlist,
        isInWishlist,
        currentUser,
        setCurrentUser,
        login,
        register,
        logout,
        orders,
        placeOrder,
        createOrder,
        trackOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        reviews,
        submitReview,
        moderateReview,
        refreshData,
        fetchInitialData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
