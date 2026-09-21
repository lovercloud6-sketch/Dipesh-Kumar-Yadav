export interface ProductVariant {
  id: string;
  name: string; // e.g. "Cloud Gray / US 8 (EU 39)"
  color: string; // e.g. "Cloud Gray"
  colorHex: string; // e.g. "#9CA3AF"
  size: string; // e.g. "US 8 (EU 39)"
  sku: string;
  price: number;
  salePrice?: number;
  inventory: number;
  imageUrl?: string;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  fullDescription: string;
  price: number;
  salePrice: number;
  discountPercent: number;
  category: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  bestSeller: boolean;
  isNewArrival?: boolean;
  badge?: string; // e.g. "Bestseller", "25% OFF", "Doctor Recommended"
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string; imageIndex?: number }[];
  variants: ProductVariant[];
  features: string[];
  benefits: string[];
  specifications: ProductSpecification[];
  stockQuantity: number;
  inStock: boolean;
  createdAt: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  productName: string;
  author: string;
  email?: string;
  avatarUrl?: string;
  rating: number; // 1-5
  title: string;
  content: string;
  date: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  status: 'approved' | 'pending' | 'rejected';
  photos?: string[];
}

export interface CartItem {
  id: string; // unique item id in cart (combination of product id + variant)
  productId: string;
  productName: string;
  slug: string;
  price: number;
  salePrice: number;
  color: string;
  colorHex?: string;
  size: string;
  quantity: number;
  imageUrl: string;
  variantId?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // e.g. 15 for 15% or 10 for $10
  minOrderAmount?: number;
  description: string;
  isActive: boolean;
  expiryDate?: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface OrderMilestone {
  status: OrderStatus;
  label: string;
  description: string;
  timestamp: string;
  completed: boolean;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. STP-84920
  customerId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  couponCodeApplied?: string;
  shippingMethod: string;
  shippingFee: number;
  taxAmount: number;
  totalAmount: number;
  total?: number; // alias for totalAmount
  discount?: number; // alias for discountAmount
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  carrier?: string; // e.g. "FedEx", "USPS Priority"
  trackingNumber?: string;
  estimatedDeliveryDate: string;
  estimatedDelivery?: string; // alias for estimatedDeliveryDate
  milestones: OrderMilestone[];
  paymentMethod: string;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  createdAt: string;
}

export type Review = ProductReview;


export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  savedAddresses: ShippingAddress[];
  wishlistProductIds: string[];
  createdAt: string;
}

export interface StoreSettings {
  brandName: string;
  announcementBarText: string;
  announcementBarEnabled: boolean;
  heroHeadline: string;
  heroSubheadline: string;
  heroCtaText: string;
  heroImageUrl: string;
  freeShippingThreshold: number;
  supportEmail: string;
  supportPhone: string;
  guaranteeDays: number;
  currencySymbol: string;
  currencyCode: string;
}

export interface FAQCategory {
  category: string;
  items: {
    question: string;
    answer: string;
  }[];
}
