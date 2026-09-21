import fs from 'fs';
import path from 'path';
import { Product, ProductReview, Order, Coupon, StoreSettings, User, ShippingAddress } from '../src/types';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS, INITIAL_ORDERS, INITIAL_COUPONS, INITIAL_SETTINGS, INITIAL_USERS } from './data';

interface DatabaseSchema {
  settings: StoreSettings;
  products: Product[];
  reviews: ProductReview[];
  orders: Order[];
  coupons: Coupon[];
  users: User[];
}

class Database {
  private dataDir = path.join(process.cwd(), 'data');
  private dbFilePath = path.join(this.dataDir, 'db.json');
  private data: DatabaseSchema;

  constructor() {
    this.data = {
      settings: INITIAL_SETTINGS,
      products: INITIAL_PRODUCTS,
      reviews: INITIAL_REVIEWS,
      orders: INITIAL_ORDERS,
      coupons: INITIAL_COUPONS,
      users: INITIAL_USERS,
    };
    this.init();
  }

  private init() {
    try {
      if (!fs.existsSync(this.dataDir)) {
        fs.mkdirSync(this.dataDir, { recursive: true });
      }
      if (fs.existsSync(this.dbFilePath)) {
        const fileContent = fs.readFileSync(this.dbFilePath, 'utf-8');
        const parsed = JSON.parse(fileContent);
        this.data = {
          settings: { ...INITIAL_SETTINGS, ...(parsed.settings || {}) },
          products: parsed.products && parsed.products.length > 0 ? parsed.products : INITIAL_PRODUCTS,
          reviews: parsed.reviews && parsed.reviews.length > 0 ? parsed.reviews : INITIAL_REVIEWS,
          orders: parsed.orders && parsed.orders.length > 0 ? parsed.orders : INITIAL_ORDERS,
          coupons: parsed.coupons && parsed.coupons.length > 0 ? parsed.coupons : INITIAL_COUPONS,
          users: parsed.users && parsed.users.length > 0 ? parsed.users : INITIAL_USERS,
        };
      } else {
        this.persist();
      }
    } catch (err) {
      console.warn('Could not read persistent db.json, using initial state in memory:', err);
    }
  }

  private persist() {
    try {
      if (!fs.existsSync(this.dataDir)) {
        fs.mkdirSync(this.dataDir, { recursive: true });
      }
      fs.writeFileSync(this.dbFilePath, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.warn('Failed to persist to db.json:', err);
    }
  }

  // --- Settings ---
  getSettings(): StoreSettings {
    return this.data.settings;
  }

  updateSettings(newSettings: Partial<StoreSettings>): StoreSettings {
    this.data.settings = { ...this.data.settings, ...newSettings };
    this.persist();
    return this.data.settings;
  }

  // --- Products ---
  getProducts(filters?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    sort?: string;
    featured?: boolean;
    bestSeller?: boolean;
  }): Product[] {
    let result = [...this.data.products];

    if (filters?.category && filters.category !== 'all') {
      result = result.filter(p => p.category.toLowerCase() === filters.category?.toLowerCase());
    }

    if (filters?.minPrice !== undefined) {
      result = result.filter(p => p.salePrice >= filters.minPrice!);
    }

    if (filters?.maxPrice !== undefined) {
      result = result.filter(p => p.salePrice <= filters.maxPrice!);
    }

    if (filters?.featured) {
      result = result.filter(p => p.featured);
    }

    if (filters?.bestSeller) {
      result = result.filter(p => p.bestSeller);
    }

    if (filters?.search) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.features.some(f => f.toLowerCase().includes(q))
      );
    }

    if (filters?.sort) {
      switch (filters.sort) {
        case 'price-asc':
          result.sort((a, b) => a.salePrice - b.salePrice);
          break;
        case 'price-desc':
          result.sort((a, b) => b.salePrice - a.salePrice);
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case 'bestselling':
          result.sort((a, b) => b.reviewCount - a.reviewCount);
          break;
        default:
          break;
      }
    }

    return result;
  }

  getProductByIdOrSlug(idOrSlug: string): Product | undefined {
    return this.data.products.find(p => p.id === idOrSlug || p.slug === idOrSlug);
  }

  createProduct(productData: Omit<Product, 'id' | 'createdAt'>): Product {
    const id = 'prod-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    const newProduct: Product = {
      ...productData,
      id,
      createdAt: new Date().toISOString(),
    };
    this.data.products.unshift(newProduct);
    this.persist();
    return newProduct;
  }

  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const idx = this.data.products.findIndex(p => p.id === id);
    if (idx === -1) return null;
    this.data.products[idx] = { ...this.data.products[idx], ...updates };
    this.persist();
    return this.data.products[idx];
  }

  deleteProduct(id: string): boolean {
    const initialLen = this.data.products.length;
    this.data.products = this.data.products.filter(p => p.id !== id);
    if (this.data.products.length !== initialLen) {
      this.persist();
      return true;
    }
    return false;
  }

  // --- Reviews ---
  getReviews(productId?: string, onlyApproved = true): ProductReview[] {
    let list = [...this.data.reviews];
    if (productId) {
      list = list.filter(r => r.productId === productId);
    }
    if (onlyApproved) {
      list = list.filter(r => r.status === 'approved');
    }
    return list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  addReview(reviewData: Omit<ProductReview, 'id' | 'date' | 'helpfulCount' | 'status'>): ProductReview {
    const newRev: ProductReview = {
      ...reviewData,
      id: 'rev-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      date: new Date().toISOString().split('T')[0],
      helpfulCount: 0,
      status: 'approved', // Auto-approved for realistic customer demo experience
    };
    this.data.reviews.unshift(newRev);

    // Update product review count & average rating
    const prod = this.getProductByIdOrSlug(reviewData.productId);
    if (prod) {
      const prodReviews = this.data.reviews.filter(r => r.productId === prod.id && r.status === 'approved');
      const avg = prodReviews.reduce((acc, r) => acc + r.rating, 0) / (prodReviews.length || 1);
      this.updateProduct(prod.id, {
        rating: Math.round(avg * 10) / 10,
        reviewCount: prodReviews.length,
      });
    }

    this.persist();
    return newRev;
  }

  updateReviewStatus(id: string, status: 'approved' | 'rejected' | 'pending'): ProductReview | null {
    const rev = this.data.reviews.find(r => r.id === id);
    if (!rev) return null;
    rev.status = status;
    this.persist();
    return rev;
  }

  deleteReview(id: string): boolean {
    const len = this.data.reviews.length;
    this.data.reviews = this.data.reviews.filter(r => r.id !== id);
    if (this.data.reviews.length !== len) {
      this.persist();
      return true;
    }
    return false;
  }

  // --- Orders & Tracking ---
  getOrders(): Order[] {
    return [...this.data.orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  getOrderById(id: string): Order | undefined {
    return this.data.orders.find(o => o.id === id || o.orderNumber === id);
  }

  trackOrder(orderNumber: string, emailOrPhone: string): Order | undefined {
    const cleanedNumber = orderNumber.trim().toUpperCase();
    const cleanedContact = emailOrPhone.trim().toLowerCase();

    return this.data.orders.find(o => {
      const matchNum = o.orderNumber.toUpperCase() === cleanedNumber;
      const matchContact =
        o.customerEmail.toLowerCase() === cleanedContact ||
        o.customerPhone.replace(/\D/g, '') === cleanedContact.replace(/\D/g, '');
      return matchNum && (matchContact || !emailOrPhone.trim());
    });
  }

  createOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'milestones'>): Order {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `STP-${randomNum}`;
    const id = `ord-${randomNum}`;
    const nowStr = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

    const newOrder: Order = {
      ...orderData,
      id,
      orderNumber,
      carrier: 'FedEx Express Tracking',
      trackingNumber: `FX-9400${Math.floor(1000000000000000 + Math.random() * 9000000000000000)}`,
      status: 'processing',
      createdAt: new Date().toISOString(),
      milestones: [
        { status: 'pending', label: 'Order Placed', description: 'Order confirmed and verified', timestamp: nowStr, completed: true },
        { status: 'processing', label: 'Order Processing', description: 'Warehouse fulfillment underway', timestamp: nowStr, completed: true },
        { status: 'shipped', label: 'Handed to Carrier', description: 'Carrier scheduled for pickup', timestamp: 'Pending', completed: false },
        { status: 'out_for_delivery', label: 'Out for Delivery', description: 'Final mile delivery', timestamp: 'Pending', completed: false },
        { status: 'delivered', label: 'Delivered', description: 'Delivered to shipping address', timestamp: 'Pending', completed: false }
      ]
    };

    this.data.orders.unshift(newOrder);
    this.persist();
    return newOrder;
  }

  updateOrderStatus(orderId: string, status: Order['status'], carrier?: string, trackingNumber?: string): Order | null {
    const order = this.data.orders.find(o => o.id === orderId || o.orderNumber === orderId);
    if (!order) return null;

    order.status = status;
    if (carrier) order.carrier = carrier;
    if (trackingNumber) order.trackingNumber = trackingNumber;

    const statusOrder: Order['status'][] = ['pending', 'processing', 'shipped', 'out_for_delivery', 'delivered'];
    const currentIdx = statusOrder.indexOf(status);

    const nowStr = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    order.milestones.forEach((m, idx) => {
      if (idx <= currentIdx) {
        m.completed = true;
        if (m.timestamp === 'Pending') m.timestamp = nowStr;
      }
    });

    this.persist();
    return order;
  }

  // --- Coupons ---
  getCoupons(): Coupon[] {
    return [...this.data.coupons];
  }

  validateCoupon(code: string, subtotal: number): { valid: boolean; coupon?: Coupon; message: string; discountAmount: number } {
    const found = this.data.coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      return { valid: false, message: 'Invalid promo code', discountAmount: 0 };
    }
    if (!found.isActive) {
      return { valid: false, message: 'This promo code has expired', discountAmount: 0 };
    }
    if (found.minOrderAmount && subtotal < found.minOrderAmount) {
      return { valid: false, message: `Minimum order of $${found.minOrderAmount.toFixed(2)} required for this code`, discountAmount: 0 };
    }

    let discount = 0;
    if (found.discountType === 'percentage') {
      discount = Math.round((subtotal * (found.discountValue / 100)) * 100) / 100;
    } else {
      discount = Math.min(subtotal, found.discountValue);
    }

    return {
      valid: true,
      coupon: found,
      message: `${found.description} applied!`,
      discountAmount: discount
    };
  }

  createCoupon(couponData: Omit<Coupon, 'id'>): Coupon {
    const newCoupon: Coupon = {
      ...couponData,
      id: 'c-' + Date.now().toString(36),
      code: couponData.code.toUpperCase().trim()
    };
    this.data.coupons.push(newCoupon);
    this.persist();
    return newCoupon;
  }

  deleteCoupon(id: string): boolean {
    const len = this.data.coupons.length;
    this.data.coupons = this.data.coupons.filter(c => c.id !== id);
    if (this.data.coupons.length !== len) {
      this.persist();
      return true;
    }
    return false;
  }

  // --- Users & Auth ---
  getUserByEmail(email: string): User | undefined {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
  }

  createUser(name: string, email: string, role: 'customer' | 'admin' = 'customer'): User {
    const newUser: User = {
      id: 'usr-' + Date.now().toString(36),
      name,
      email: email.toLowerCase().trim(),
      role,
      savedAddresses: [],
      wishlistProductIds: [],
      createdAt: new Date().toISOString()
    };
    this.data.users.push(newUser);
    this.persist();
    return newUser;
  }

  toggleWishlist(userId: string, productId: string): string[] {
    const user = this.data.users.find(u => u.id === userId);
    if (!user) return [];
    if (user.wishlistProductIds.includes(productId)) {
      user.wishlistProductIds = user.wishlistProductIds.filter(id => id !== productId);
    } else {
      user.wishlistProductIds.push(productId);
    }
    this.persist();
    return user.wishlistProductIds;
  }

  saveAddress(userId: string, address: ShippingAddress): ShippingAddress[] {
    const user = this.data.users.find(u => u.id === userId);
    if (!user) return [];
    user.savedAddresses.push(address);
    this.persist();
    return user.savedAddresses;
  }
}

export const db = new Database();
