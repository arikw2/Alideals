/**
 * Products API Service
 * Handles product data management, caching, and external API integration
 */

const fs = require('fs');
const path = require('path');

// Path to cached products data
const DATA_PATH = path.join(__dirname, '..', 'data', 'products.json');

// In-memory cache
let productsCache = null;
let lastUpdated = null;

/**
 * Load products from JSON file
 */
function loadProducts() {
    try {
        const data = fs.readFileSync(DATA_PATH, 'utf-8');
        const parsed = JSON.parse(data);
        productsCache = parsed.products || [];
        lastUpdated = parsed.lastUpdated || new Date().toISOString();
        console.log(`📦 Loaded ${productsCache.length} products from cache`);
        return productsCache;
    } catch (error) {
        console.error('Error loading products:', error);
        productsCache = [];
        return [];
    }
}

/**
 * Save products to JSON file
 */
function saveProducts(products) {
    try {
        const data = {
            products,
            lastUpdated: new Date().toISOString()
        };
        fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
        productsCache = products;
        lastUpdated = data.lastUpdated;
        console.log(`💾 Saved ${products.length} products to cache`);
    } catch (error) {
        console.error('Error saving products:', error);
    }
}

/**
 * Get all products
 */
function getAllProducts() {
    if (!productsCache) {
        loadProducts();
    }
    return productsCache;
}

/**
 * Get products by category
 */
function getProductsByCategory(categoryId) {
    const products = getAllProducts();
    if (categoryId === 'all') {
        return products;
    }
    return products.filter(p => p.category === categoryId);
}

/**
 * Get trending products (sorted by orders)
 */
function getTrendingProducts(limit = 10) {
    const products = getAllProducts();
    return [...products]
        .sort((a, b) => b.orders - a.orders)
        .slice(0, limit);
}

/**
 * Search products by title
 */
function searchProducts(query) {
    const products = getAllProducts();
    const searchTerm = query.toLowerCase().trim();

    return products.filter(p =>
        p.title.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm) ||
        (p.description && p.description.toLowerCase().includes(searchTerm))
    );
}

/**
 * Get product by ID
 */
function getProductById(productId) {
    const products = getAllProducts();
    return products.find(p => p.id === productId);
}

/**
 * Get categories with product counts
 */
function getCategories() {
    const products = getAllProducts();
    const categoryCounts = {};

    products.forEach(p => {
        categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });

    const categories = [
        { id: 'all', name: 'All Products', icon: 'fa-th-large', count: products.length },
        { id: 'electronics', name: 'Electronics', icon: 'fa-laptop', count: categoryCounts.electronics || 0 },
        { id: 'fashion', name: 'Fashion', icon: 'fa-shirt', count: categoryCounts.fashion || 0 },
        { id: 'home', name: 'Home & Garden', icon: 'fa-house', count: categoryCounts.home || 0 },
        { id: 'sports', name: 'Sports', icon: 'fa-futbol', count: categoryCounts.sports || 0 },
        { id: 'beauty', name: 'Beauty', icon: 'fa-spa', count: categoryCounts.beauty || 0 },
        { id: 'toys', name: 'Toys & Games', icon: 'fa-gamepad', count: categoryCounts.toys || 0 },
        { id: 'auto', name: 'Auto', icon: 'fa-car', count: categoryCounts.auto || 0 },
        { id: 'jewelry', name: 'Jewelry', icon: 'fa-gem', count: categoryCounts.jewelry || 0 }
    ];

    return categories;
}

/**
 * Get last updated timestamp
 */
function getLastUpdated() {
    return lastUpdated || new Date().toISOString();
}

/**
 * Update products (placeholder for real API integration)
 * 
 * To use the real AliExpress API:
 * 1. Sign up at https://rapidapi.com
 * 2. Subscribe to "AliExpress True API" or similar
 * 3. Add your API key below
 * 4. Uncomment the fetchFromAliExpress function
 */
async function updateProducts() {
    console.log('🔄 Updating products...');

    // For demo: Just simulate an update by refreshing timestamps
    // In production, this would fetch from the real API

    const products = getAllProducts();

    // Simulate some price fluctuations and order increases
    const updatedProducts = products.map(p => ({
        ...p,
        // Simulate daily order increase (0-100 new orders)
        orders: p.orders + Math.floor(Math.random() * 100),
        // Small random price adjustments (±5%)
        price: Math.round((p.price * (0.95 + Math.random() * 0.1)) * 100) / 100
    }));

    saveProducts(updatedProducts);
    console.log('✅ Products updated successfully');

    return updatedProducts;
}

/**
 * Fetch products from AliExpress API (RapidAPI)
 * Uncomment and configure when you have an API key
 */
/*
const axios = require('axios');

async function fetchFromAliExpress(category = 'all', limit = 50) {
  const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || 'YOUR_API_KEY_HERE';
  const RAPIDAPI_HOST = 'aliexpress-true-api.p.rapidapi.com';
  
  try {
    const response = await axios.get(`https://${RAPIDAPI_HOST}/api/v3/products`, {
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': RAPIDAPI_HOST
      },
      params: {
        category: category !== 'all' ? category : undefined,
        limit,
        sort: 'orders_desc'
      }
    });
    
    // Transform API response to match our data structure
    const products = response.data.products.map(p => ({
      id: p.productId,
      title: p.title,
      price: p.salePrice,
      originalPrice: p.originalPrice,
      category: mapCategory(p.categoryId),
      image: p.imageUrl,
      rating: p.rating,
      reviews: p.reviewCount,
      orders: p.orderCount,
      link: p.productUrl,
      description: p.description,
      isNew: p.isNew
    }));
    
    return products;
  } catch (error) {
    console.error('Error fetching from AliExpress API:', error.message);
    throw error;
  }
}
*/

// Initialize products on module load
loadProducts();

module.exports = {
    getAllProducts,
    getProductsByCategory,
    getTrendingProducts,
    searchProducts,
    getProductById,
    getCategories,
    getLastUpdated,
    updateProducts,
    loadProducts,
    saveProducts
};
