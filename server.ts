import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { db } from './server/db';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing JSON requests
  app.use(express.json());

  // Health check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', time: new Date().toISOString(), brand: 'STEPORA' });
  });

  // --- Store Settings ---
  app.get('/api/settings', (req: Request, res: Response) => {
    try {
      const settings = db.getSettings();
      res.json(settings);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put('/api/settings', (req: Request, res: Response) => {
    try {
      const updated = db.updateSettings(req.body);
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // --- Products ---
  app.get('/api/products', (req: Request, res: Response) => {
    try {
      const { category, minPrice, maxPrice, search, sort, featured, bestSeller } = req.query;
      const products = db.getProducts({
        category: category as string,
        minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
        search: search as string,
        sort: sort as string,
        featured: featured === 'true',
        bestSeller: bestSeller === 'true'
      });
      res.json(products);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get('/api/products/:idOrSlug', (req: Request, res: Response) => {
    try {
      const product = db.getProductByIdOrSlug(req.params.idOrSlug);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/products', (req: Request, res: Response) => {
    try {
      const newProduct = db.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put('/api/products/:id', (req: Request, res: Response) => {
    try {
      const updated = db.updateProduct(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete('/api/products/:id', (req: Request, res: Response) => {
    try {
      const deleted = db.deleteProduct(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json({ success: true, message: 'Product deleted' });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // --- Reviews ---
  app.get('/api/reviews', (req: Request, res: Response) => {
    try {
      const { productId, all } = req.query;
      const reviews = db.getReviews(productId as string, all !== 'true');
      res.json(reviews);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/reviews', (req: Request, res: Response) => {
    try {
      const { productId, productName, author, email, rating, title, content } = req.body;
      if (!productId || !author || !rating || !content) {
        return res.status(400).json({ error: 'Missing required review fields' });
      }
      const review = db.addReview({
        productId,
        productName: productName || 'Stepora Product',
        author,
        email,
        rating: Number(rating),
        title: title || 'Great comfort!',
        content,
        verifiedPurchase: true
      });
      res.status(201).json(review);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put('/api/reviews/:id/status', (req: Request, res: Response) => {
    try {
      const { status } = req.body;
      const updated = db.updateReviewStatus(req.params.id, status);
      if (!updated) return res.status(404).json({ error: 'Review not found' });
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete('/api/reviews/:id', (req: Request, res: Response) => {
    try {
      const deleted = db.deleteReview(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Review not found' });
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // --- Orders & Tracking ---
  app.get('/api/orders', (req: Request, res: Response) => {
    try {
      const orders = db.getOrders();
      res.json(orders);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get('/api/orders/track', (req: Request, res: Response) => {
    try {
      const { orderNumber, emailOrPhone } = req.query;
      if (!orderNumber) {
        return res.status(400).json({ error: 'Order number is required' });
      }
      const order = db.trackOrder(orderNumber as string, (emailOrPhone as string) || '');
      if (!order) {
        return res.status(404).json({ error: 'No order found matching the provided details. Please check your order ID (e.g. STP-84920) or contact support.' });
      }
      res.json(order);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get('/api/orders/:id', (req: Request, res: Response) => {
    try {
      const order = db.getOrderById(req.params.id);
      if (!order) return res.status(404).json({ error: 'Order not found' });
      res.json(order);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/orders', (req: Request, res: Response) => {
    try {
      const { customerName, customerEmail, customerPhone, items, subtotal, discountAmount, couponCodeApplied, shippingMethod, shippingFee, taxAmount, totalAmount, shippingAddress, paymentMethod, estimatedDeliveryDate } = req.body;
      if (!customerEmail || !items || !items.length || !shippingAddress) {
        return res.status(400).json({ error: 'Missing required checkout information' });
      }

      const newOrder = db.createOrder({
        customerName: customerName || `${shippingAddress.firstName} ${shippingAddress.lastName}`,
        customerEmail,
        customerPhone: customerPhone || shippingAddress.phone || '',
        items,
        subtotal: Number(subtotal),
        discountAmount: Number(discountAmount) || 0,
        couponCodeApplied,
        shippingMethod: shippingMethod || 'Standard Delivery',
        shippingFee: Number(shippingFee) || 0,
        taxAmount: Number(taxAmount) || 0,
        totalAmount: Number(totalAmount),
        shippingAddress,
        paymentMethod: paymentMethod || 'Credit Card',
        paymentStatus: 'paid',
        status: 'processing',
        estimatedDeliveryDate: estimatedDeliveryDate || new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0]
      });

      res.status(201).json(newOrder);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put('/api/orders/:id/status', (req: Request, res: Response) => {
    try {
      const { status, carrier, trackingNumber } = req.body;
      const updated = db.updateOrderStatus(req.params.id, status, carrier, trackingNumber);
      if (!updated) return res.status(404).json({ error: 'Order not found' });
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // --- Coupons ---
  app.get('/api/coupons', (req: Request, res: Response) => {
    try {
      res.json(db.getCoupons());
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/coupons/validate', (req: Request, res: Response) => {
    try {
      const { code, subtotal } = req.body;
      if (!code) return res.status(400).json({ valid: false, message: 'Coupon code required' });
      const validation = db.validateCoupon(code, Number(subtotal) || 0);
      res.json(validation);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/coupons', (req: Request, res: Response) => {
    try {
      const newCoupon = db.createCoupon(req.body);
      res.status(201).json(newCoupon);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete('/api/coupons/:id', (req: Request, res: Response) => {
    try {
      const deleted = db.deleteCoupon(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Coupon not found' });
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // --- Auth & Customer Profile ---
  app.post('/api/auth/login', (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const cleanEmail = (email || '').toLowerCase().trim();

      if (cleanEmail === 'admin@stepora.com' && (password === 'admin123' || !password)) {
        const user = db.getUserByEmail('admin@stepora.com');
        return res.json({ success: true, user, token: 'mock-jwt-admin-token' });
      }

      let user = db.getUserByEmail(cleanEmail);
      if (!user) {
        // Auto-provision demo account for friction-free review
        user = db.createUser(cleanEmail.split('@')[0], cleanEmail, 'customer');
      }

      res.json({ success: true, user, token: 'mock-jwt-user-token' });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/auth/register', (req: Request, res: Response) => {
    try {
      const { name, email } = req.body;
      if (!email || !name) {
        return res.status(400).json({ error: 'Name and email are required' });
      }
      let user = db.getUserByEmail(email);
      if (user) {
        return res.status(400).json({ error: 'Account with this email already exists' });
      }
      user = db.createUser(name, email, 'customer');
      res.status(201).json({ success: true, user, token: 'mock-jwt-user-token' });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/auth/wishlist/toggle', (req: Request, res: Response) => {
    try {
      const { userId, productId } = req.body;
      const wishlist = db.toggleWishlist(userId || 'usr-cust-1', productId);
      res.json({ success: true, wishlist });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // --- Contact form endpoint ---
  app.post('/api/contact', (req: Request, res: Response) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }
    // In production, this dispatches via SendGrid / Resend / AWS SES
    res.json({
      success: true,
      ticketId: 'STP-SUP-' + Math.floor(10000 + Math.random() * 90000),
      message: 'Thank you! Our orthopedic foot care support team will respond within 24 hours.'
    });
  });

  // --- Vite middleware for development & static serving for production ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`STEPORA Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
