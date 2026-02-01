/**
 * AliDeals - Express Server
 * Serves static files and provides API endpoints for products
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const cron = require('node-cron');
const productsApi = require('./api/products');

const app = express();
const PORT = process.env.PORT || 3000;

// ============ Middleware ============
app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// ============ API Routes ============

// Get all products
app.get('/api/products', (req, res) => {
    try {
        const products = productsApi.getAllProducts();
        res.json({
            success: true,
            products,
            count: products.length,
            lastUpdated: productsApi.getLastUpdated()
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch products' });
    }
});

// Get products by category
app.get('/api/products/category/:categoryId', (req, res) => {
    try {
        const { categoryId } = req.params;
        const products = productsApi.getProductsByCategory(categoryId);
        res.json({
            success: true,
            products,
            count: products.length,
            category: categoryId
        });
    } catch (error) {
        console.error('Error fetching category products:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch products' });
    }
});

// Get trending/popular products
app.get('/api/products/trending', (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const products = productsApi.getTrendingProducts(limit);
        res.json({
            success: true,
            products,
            count: products.length
        });
    } catch (error) {
        console.error('Error fetching trending products:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch trending products' });
    }
});

// Search products
app.get('/api/products/search', (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.json({ success: true, products: [], count: 0 });
        }
        const products = productsApi.searchProducts(q);
        res.json({
            success: true,
            products,
            count: products.length,
            query: q
        });
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ success: false, error: 'Search failed' });
    }
});

// Get single product by ID
app.get('/api/products/:productId', (req, res) => {
    try {
        const { productId } = req.params;
        const product = productsApi.getProductById(productId);
        if (!product) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }
        res.json({ success: true, product });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch product' });
    }
});

// Get categories with counts
app.get('/api/categories', (req, res) => {
    try {
        const categories = productsApi.getCategories();
        res.json({ success: true, categories });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch categories' });
    }
});

// Manually trigger product update (for testing)
app.post('/api/products/update', (req, res) => {
    try {
        productsApi.updateProducts();
        res.json({ success: true, message: 'Products updated successfully' });
    } catch (error) {
        console.error('Error updating products:', error);
        res.status(500).json({ success: false, error: 'Failed to update products' });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        status: 'healthy',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// ============ Fallback to index.html for SPA ============
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// ============ Scheduled Tasks ============

// Update products daily at midnight
cron.schedule('0 0 * * *', () => {
    console.log('🔄 Running scheduled product update...');
    try {
        productsApi.updateProducts();
        console.log('✅ Scheduled product update completed');
    } catch (error) {
        console.error('❌ Scheduled product update failed:', error);
    }
}, {
    scheduled: true,
    timezone: 'UTC'
});

// ============ Error Handling ============
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

// ============ Start Server ============
app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════╗
║                                                   ║
║   🔥 AliDeals Server Running!                     ║
║                                                   ║
║   Local:    http://localhost:${PORT}                 ║
║   API:      http://localhost:${PORT}/api/products    ║
║                                                   ║
║   Daily product updates scheduled at midnight     ║
║                                                   ║
╚═══════════════════════════════════════════════════╝
  `);
});

module.exports = app;
