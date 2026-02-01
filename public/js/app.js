/**
 * AliDeals - Frontend Application
 * Handles product display, filtering, search, and interactions
 */

// ============ Configuration ============
const CONFIG = {
  API_BASE: '/api',
  PRODUCTS_PER_PAGE: 12,
  TOAST_DURATION: 3000,
  USE_MOCK_DATA: true // Set to false when using with Node.js server
};

// ============ Theme Management ============
const ThemeManager = {
  currentTheme: localStorage.getItem('theme') || 'dark',

  init() {
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    this.updateIcon();
  },

  toggle() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
    this.updateIcon();
  },

  updateIcon() {
    const icon = document.getElementById('theme-icon');
    if (icon) {
      icon.className = this.currentTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
  }
};

// ============ Internationalization (i18n) ============
const i18n = {
  currentLang: localStorage.getItem('lang') || 'he',

  translations: {
    en: {
      // Header & Navigation
      searchPlaceholder: 'Search for products...',
      wishlist: 'Wishlist',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      categories: 'Categories',

      // Hero Section
      updatedDaily: 'Updated Daily',
      heroTitle: "Discover Today's Hottest Deals",
      heroDescription: 'Curated selection of trending products with thousands of orders. New items added every day!',
      exploreProducts: 'Explore Products',

      // Products Section
      trendingNow: 'Trending Now',
      allProducts: 'All Products',
      loadMore: 'Load More Products',
      loading: 'Loading...',
      noProducts: 'No products found. Try a different search or category.',
      viewDeal: 'View Deal',
      sold: 'sold',
      reviews: 'reviews',
      orders: 'orders',
      avgSavings: 'Avg. Savings',
      avgRating: 'Avg. Rating',

      // Product Badges
      hot: 'Hot',
      new: 'New',

      // Modal
      viewOnAliExpress: 'View on AliExpress',

      // Categories
      catAll: 'All Products',
      catElectronics: 'Electronics',
      catFashion: 'Fashion',
      catHome: 'Home & Garden',
      catSports: 'Sports',
      catBeauty: 'Beauty',
      catToys: 'Toys & Games',
      catAuto: 'Auto',
      catJewelry: 'Jewelry',

      // Footer
      footerDescription: 'Your daily source for trending products and amazing deals from AliExpress.',
      moreCategories: 'More Categories',
      information: 'Information',
      aboutUs: 'About Us',
      howItWorks: 'How It Works',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      copyright: '© 2025 AliDeals. All rights reserved. Products sourced from AliExpress.',

      // Counter
      product: 'product',
      products: 'products',

      // Toasts
      addedToWishlist: 'Added to wishlist!',
      removedFromWishlist: 'Removed from wishlist',
      failedToLoad: 'Failed to load products. Using cached data.',

      // Sorting & Filtering
      sortBy: 'Sort by',
      sortPopular: 'Popular',
      sortPriceLow: 'Price: Low to High',
      sortPriceHigh: 'Price: High to Low',
      sortRating: 'Highest Rated',
      sortNewest: 'Newest',
      priceRange: 'Price Range',
      applyFilter: 'Apply',
      clearFilters: 'Clear Filters',
      priceFilter: 'Price',

      // Language
      langLabel: 'עב'
    },
    he: {
      // Header & Navigation
      searchPlaceholder: 'חפש מוצרים...',
      wishlist: 'רשימת משאלות',
      openMenu: 'פתח תפריט',
      closeMenu: 'סגור תפריט',
      categories: 'קטגוריות',

      // Hero Section
      updatedDaily: 'מתעדכן יומית',
      heroTitle: 'גלו את המבצעים הכי חמים היום',
      heroDescription: 'מבחר מוצרים פופולריים עם אלפי הזמנות. מוצרים חדשים מתווספים כל יום!',
      exploreProducts: 'גלו מוצרים',

      // Products Section
      trendingNow: 'פופולרי עכשיו',
      allProducts: 'כל המוצרים',
      loadMore: 'טען עוד מוצרים',
      loading: 'טוען...',
      noProducts: 'לא נמצאו מוצרים. נסו חיפוש או קטגוריה אחרת.',
      viewDeal: 'צפה בעסקה',
      sold: 'נמכרו',
      reviews: 'ביקורות',
      orders: 'הזמנות',
      avgSavings: 'חיסכון ממוצע',
      avgRating: 'דירוג ממוצע',

      // Product Badges
      hot: 'חם',
      new: 'חדש',

      // Modal
      viewOnAliExpress: 'צפה באליאקספרס',

      // Categories
      catAll: 'כל המוצרים',
      catElectronics: 'אלקטרוניקה',
      catFashion: 'אופנה',
      catHome: 'בית וגינה',
      catSports: 'ספורט',
      catBeauty: 'יופי',
      catToys: 'צעצועים ומשחקים',
      catAuto: 'רכב',
      catJewelry: 'תכשיטים',

      // Footer
      footerDescription: 'המקור היומי שלכם למוצרים פופולריים ומבצעים מדהימים מאליאקספרס.',
      moreCategories: 'קטגוריות נוספות',
      information: 'מידע',
      aboutUs: 'אודותינו',
      howItWorks: 'איך זה עובד',
      privacyPolicy: 'מדיניות פרטיות',
      termsOfService: 'תנאי שימוש',
      copyright: '© 2025 AliDeals. כל הזכויות שמורות. מוצרים מ-AliExpress.',

      // Counter
      product: 'מוצר',
      products: 'מוצרים',

      // Toasts
      addedToWishlist: 'נוסף לרשימת המשאלות!',
      removedFromWishlist: 'הוסר מרשימת המשאלות',
      failedToLoad: 'טעינת המוצרים נכשלה. משתמש בנתונים שמורים.',

      // Sorting & Filtering
      sortBy: 'מיין לפי',
      sortPopular: 'פופולרי',
      sortPriceLow: 'מחיר: מהנמוך לגבוה',
      sortPriceHigh: 'מחיר: מהגבוה לנמוך',
      sortRating: 'דירוג גבוה',
      sortNewest: 'חדש ביותר',
      priceRange: 'טווח מחירים',
      applyFilter: 'החל',
      clearFilters: 'נקה מסננים',
      priceFilter: 'מחיר',

      // Language
      langLabel: 'EN',

      // Product Translations
      'prod-001-title': 'אוזניות בלוטות\' אלחוטיות Pro עם ביטול רעשים אקטיבי',
      'prod-001-desc': 'אוזניות אלחוטיות פרימיום עם ANC, סוללה ל-40 שעות, עמידות במים IPX5.',
      'prod-002-title': 'שעון חכם עם מעקב כושר ומד דופק',
      'prod-002-desc': 'שעון חכם עמוס בתכונות עם ניטור דופק 24/7, מעקב שינה, 100+ מצבי ספורט.',
      'prod-003-title': 'מטען נייד 20000mAh עם טעינה מהירה USB-C',
      'prod-003-desc': 'מטען נייד בקיבולת גבוהה עם טעינה מהירה 65W ויציאות כפולות.',
      'prod-004-title': 'מקלדת גיימינג מכנית RGB עם החלפה חמה',
      'prod-004-desc': 'מקלדת מכנית פרימיום עם מפסקים להחלפה חמה ותאורת RGB.',
      'prod-005-title': 'עכבר גיימינג אלחוטי 16000 DPI בעיצוב ארגונומי',
      'prod-005-desc': 'עכבר גיימינג מקצועי עם DPI מתכוונן.',
      'prod-006-title': 'קפוצ\'ון אוברסייז לנשים בסגנון רחוב',
      'prod-006-desc': 'קפוצ\'ון אוברסייז טרנדי מכותנה פרימיום.',
      'prod-007-title': 'בלייזר גברים קז\'ואל בגזרה צרה',
      'prod-007-desc': 'בלייזר מודרני בגזרה צרה לאירועים עסקיים.',
      'prod-008-title': 'משקפי שמש וינטג\' רטרו מסגרת מתכת UV400',
      'prod-008-desc': 'משקפי שמש רטרו קלאסיים עם הגנת UV400.',
      'prod-009-title': 'תיק קרוסבודי לנשים מעור אמיתי',
      'prod-009-desc': 'תיק קרוסבודי אלגנטי מעור אמיתי עם רצועה מתכווננת.',
      'prod-010-title': 'סרט LED RGB חכם עם שליטה באפליקציה WiFi',
      'prod-010-desc': 'סרט LED חכם עם שליטת WiFi וסנכרון מוזיקה.',
      'prod-011-title': 'מנורת שולחן LED מינימליסטית עם עמעום מגע',
      'prod-011-desc': 'מנורת LED מודרנית עם עמעום מגע ויציאת USB.',
      'prod-012-title': 'סט צמחים מלאכותיים לעיצוב הבית',
      'prod-012-desc': 'סט צמחים מלאכותיים ריאליסטיים בעציצים דקורטיביים.',
      'prod-013-title': 'קומקום חשמלי 1.7 ליטר נירוסטה',
      'prod-013-desc': 'קומקום חשמלי נירוסטה פרימיום עם רתיחה מהירה.',
      'prod-014-title': 'סט גומיות התנגדות לאימון כושר',
      'prod-014-desc': 'סט גומיות התנגדות מלא עם 5 רמות.',
      'prod-015-title': 'מזרן יוגה אקולוגי TPE 6מ"מ',
      'prod-015-desc': 'מזרן יוגה אקולוגי פרימיום עם משטח מונע החלקה.',
      'prod-016-title': 'סט משקולות מתכווננות 24 ק"ג לחדר כושר ביתי',
      'prod-016-desc': 'משקולות מתכווננות חוסכות מקום.',
      'prod-017-title': 'נעלי ריצה קלות ונושמות',
      'prod-017-desc': 'נעלי ריצה קלות במיוחד עם רשת נושמת.',
      'prod-018-title': 'סרום ויטמין C נגד הזדקנות והבהרה',
      'prod-018-desc': 'סרום ויטמין C 20% עוצמתי עם חומצה היאלורונית.',
      'prod-019-title': 'מברשת ניקוי פנים חשמלית סיליקון סוניק',
      'prod-019-desc': 'מברשת ניקוי פנים סוניק עמידה למים.',
      'prod-020-title': 'סט מברשות איפור מקצועי 15 חלקים',
      'prod-020-desc': 'סט 15 מברשות איפור מקצועיות עם נרתיק.',
      'prod-021-title': 'מכונית מרוץ שלט רחוק 1:16 מהירה 4WD',
      'prod-021-desc': 'מכונית RC מהירה עם 4WD ומהירות עד 40 קמ"ש.',
      'prod-022-title': 'סט קוביות בניה 1000 חלקים STEM',
      'prod-022-desc': 'סט 1000 קוביות בניה תואם למותגים מובילים.',
      'prod-023-title': 'פאזל 1000 חלקים נוף אמנותי למבוגרים',
      'prod-023-desc': 'פאזל 1000 חלקים באיכות פרימיום.',
      'prod-024-title': 'מחזיק טלפון מגנטי לרכב',
      'prod-024-desc': 'מחזיק טלפון מגנטי חזק עם סיבוב 360°.',
      'prod-025-title': 'שואב אבק אלחוטי לרכב בעוצמה גבוהה',
      'prod-025-desc': 'שואב אבק אלחוטי עוצמתי עם יניקה 12000PA.',
      'prod-026-title': 'ערכת תאורת LED פנימית לרכב',
      'prod-026-desc': 'ערכת תאורה RGB לרכב עם שליטה באפליקציה.',
      'prod-027-title': 'שרשרת כסף סטרלינג עם תליון קריסטל',
      'prod-027-desc': 'שרשרת כסף 925 אלגנטית עם תליון קריסטל אוסטרי.',
      'prod-028-title': 'שעון נירוסטה לגברים בעיצוב מינימליסטי',
      'prod-028-desc': 'שעון נירוסטה פרימיום עם מנגנון יפני.',
      'prod-029-title': 'עגילי חישוק מצופים זהב היפואלרגניים',
      'prod-029-desc': 'עגילי חישוק קלאסיים מצופים זהב.',
      'prod-030-title': 'מפצל USB-C 7 ב-1 רב יציאות',
      'prod-030-desc': 'מפצל USB-C רב-תכליתי עם HDMI 4K.',
      'prod-031-title': 'מצלמת רשת 4K Ultra HD עם מיקרופון',
      'prod-031-desc': 'מצלמת רשת מקצועית 4K עם מיקרופון מובנה.',
      'prod-032-title': 'מעמד לפטופ אלומיניום מתכוונן ארגונומי',
      'prod-032-desc': 'מעמד לפטופ אלומיניום פרימיום עם גובה מתכוונן.'
    }
  },

  t(key) {
    return this.translations[this.currentLang][key] || this.translations.en[key] || key;
  },

  setLang(lang) {
    this.currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    this.updateUI();
  },

  toggle() {
    this.setLang(this.currentLang === 'en' ? 'he' : 'en');
  },

  updateUI() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      el.textContent = this.t(key);
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      el.placeholder = this.t(key);
    });

    // Update language toggle label
    const langLabel = document.getElementById('lang-label');
    if (langLabel) {
      langLabel.textContent = this.t('langLabel');
    }

    // Re-render categories with translated names
    if (typeof renderCategories === 'function') {
      renderCategories();
    }

    // Re-render products with translated titles
    if (typeof renderProducts === 'function' && state && state.filteredProducts) {
      renderProducts(state.filteredProducts.slice(0, state.currentPage * CONFIG.PRODUCTS_PER_PAGE));
    }

    // Update section title
    updateSectionTitle();
  }
};

// ============ Mock Product Data (for static site usage) ============
const MOCK_PRODUCTS = [
  {
    id: "prod-001",
    title: "Wireless Bluetooth Earbuds Pro with Active Noise Cancellation",
    price: 24.99,
    originalPrice: 59.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 15420,
    orders: 52340,
    link: "https://www.aliexpress.com",
    description: "Premium wireless earbuds with ANC, 40-hour battery life, IPX5 waterproof rating."
  },
  {
    id: "prod-002",
    title: "Smart Watch Fitness Tracker with Heart Rate Monitor",
    price: 32.50,
    originalPrice: 79.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 8932,
    orders: 28450,
    link: "https://www.aliexpress.com",
    description: "Feature-packed smartwatch with 24/7 heart rate monitoring."
  },
  {
    id: "prod-003",
    title: "Portable Power Bank 20000mAh Fast Charging USB-C",
    price: 18.99,
    originalPrice: 45.00,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 12543,
    orders: 45670,
    link: "https://www.aliexpress.com",
    description: "High-capacity power bank with 65W fast charging."
  },
  {
    id: "prod-004",
    title: "Mechanical Gaming Keyboard RGB Backlit Hot-Swappable",
    price: 45.00,
    originalPrice: 89.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 6780,
    orders: 18920,
    link: "https://www.aliexpress.com",
    description: "Premium mechanical keyboard with hot-swappable switches.",
    isNew: true
  },
  {
    id: "prod-005",
    title: "Wireless Gaming Mouse 16000 DPI Ergonomic Design",
    price: 22.99,
    originalPrice: 49.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 9870,
    orders: 32100,
    link: "https://www.aliexpress.com",
    description: "Professional gaming mouse with adjustable DPI."
  },
  {
    id: "prod-006",
    title: "Women's Oversized Hoodie Streetwear Fashion",
    price: 19.99,
    originalPrice: 39.99,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
    rating: 4.4,
    reviews: 7650,
    orders: 25430,
    link: "https://www.aliexpress.com",
    description: "Trendy oversized hoodie made from premium cotton blend."
  },
  {
    id: "prod-007",
    title: "Men's Casual Slim Fit Blazer Business Jacket",
    price: 35.99,
    originalPrice: 75.00,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 4320,
    orders: 12890,
    link: "https://www.aliexpress.com",
    description: "Modern slim-fit blazer for business casual occasions."
  },
  {
    id: "prod-008",
    title: "Vintage Sunglasses Retro Round Metal Frame UV400",
    price: 8.99,
    originalPrice: 24.99,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop",
    rating: 4.3,
    reviews: 11200,
    orders: 67800,
    link: "https://www.aliexpress.com",
    description: "Classic retro sunglasses with UV400 protection."
  },
  {
    id: "prod-009",
    title: "Designer Crossbody Bag Genuine Leather Women's",
    price: 42.50,
    originalPrice: 89.99,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 5430,
    orders: 15670,
    link: "https://www.aliexpress.com",
    description: "Elegant crossbody bag crafted from genuine leather.",
    isNew: true
  },
  {
    id: "prod-010",
    title: "LED Strip Lights RGB Smart WiFi App Control",
    price: 12.99,
    originalPrice: 29.99,
    category: "home",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 18900,
    orders: 89540,
    link: "https://www.aliexpress.com",
    description: "Smart LED strip lights with WiFi control and music sync."
  },
  {
    id: "prod-011",
    title: "Minimalist Desk Lamp LED Touch Dimmable",
    price: 28.99,
    originalPrice: 55.00,
    category: "home",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 3450,
    orders: 9870,
    link: "https://www.aliexpress.com",
    description: "Modern LED desk lamp with touch dimming."
  },
  {
    id: "prod-012",
    title: "Artificial Plants Set Home Decor Faux Succulents",
    price: 15.99,
    originalPrice: 32.00,
    category: "home",
    image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=400&fit=crop",
    rating: 4.4,
    reviews: 6780,
    orders: 34560,
    link: "https://www.aliexpress.com",
    description: "Realistic artificial succulent plants set."
  },
  {
    id: "prod-013",
    title: "Electric Kettle 1.7L Stainless Steel Fast Boil",
    price: 24.50,
    originalPrice: 49.99,
    category: "home",
    image: "https://images.unsplash.com/photo-1594213114663-48a59ece7587?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 8920,
    orders: 42310,
    link: "https://www.aliexpress.com",
    description: "Premium stainless steel electric kettle."
  },
  {
    id: "prod-014",
    title: "Resistance Bands Set Exercise Fitness Workout",
    price: 11.99,
    originalPrice: 28.00,
    category: "sports",
    image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 15670,
    orders: 78900,
    link: "https://www.aliexpress.com",
    description: "Complete resistance bands set with 5 levels."
  },
  {
    id: "prod-015",
    title: "Yoga Mat Non-Slip Eco-Friendly TPE 6mm",
    price: 18.99,
    originalPrice: 39.99,
    category: "sports",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 9870,
    orders: 45230,
    link: "https://www.aliexpress.com",
    description: "Premium eco-friendly yoga mat with non-slip texture."
  },
  {
    id: "prod-016",
    title: "Adjustable Dumbbells Set 24kg Home Gym",
    price: 89.99,
    originalPrice: 179.99,
    category: "sports",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 4560,
    orders: 12340,
    link: "https://www.aliexpress.com",
    description: "Space-saving adjustable dumbbells.",
    isNew: true
  },
  {
    id: "prod-017",
    title: "Running Shoes Lightweight Breathable Athletic",
    price: 34.99,
    originalPrice: 69.99,
    category: "sports",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 7890,
    orders: 28760,
    link: "https://www.aliexpress.com",
    description: "Ultra-lightweight running shoes."
  },
  {
    id: "prod-018",
    title: "Vitamin C Serum Anti-Aging Brightening Skincare",
    price: 9.99,
    originalPrice: 25.00,
    category: "beauty",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 23450,
    orders: 98760,
    link: "https://www.aliexpress.com",
    description: "Potent 20% Vitamin C serum."
  },
  {
    id: "prod-019",
    title: "Electric Facial Cleansing Brush Silicone Sonic",
    price: 16.99,
    originalPrice: 35.00,
    category: "beauty",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 8760,
    orders: 34560,
    link: "https://www.aliexpress.com",
    description: "Sonic facial cleansing brush."
  },
  {
    id: "prod-020",
    title: "Professional Makeup Brush Set 15 Pieces",
    price: 14.99,
    originalPrice: 39.99,
    category: "beauty",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 12340,
    orders: 56780,
    link: "https://www.aliexpress.com",
    description: "Complete 15-piece makeup brush set."
  },
  {
    id: "prod-021",
    title: "RC Racing Car 1:16 Scale High Speed 4WD",
    price: 39.99,
    originalPrice: 79.99,
    category: "toys",
    image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 5670,
    orders: 18900,
    link: "https://www.aliexpress.com",
    description: "High-speed RC racing car with 4WD.",
    isNew: true
  },
  {
    id: "prod-022",
    title: "Building Blocks Set 1000 Pieces Creative STEM",
    price: 24.99,
    originalPrice: 49.99,
    category: "toys",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 8970,
    orders: 34560,
    link: "https://www.aliexpress.com",
    description: "1000-piece building blocks set."
  },
  {
    id: "prod-023",
    title: "Puzzle 1000 Pieces Adult Landscape Art",
    price: 12.99,
    originalPrice: 24.99,
    category: "toys",
    image: "https://images.unsplash.com/photo-1494059980473-813e73ee784b?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 4560,
    orders: 23450,
    link: "https://www.aliexpress.com",
    description: "Premium 1000-piece jigsaw puzzle."
  },
  {
    id: "prod-024",
    title: "Car Phone Holder Magnetic Air Vent Mount",
    price: 7.99,
    originalPrice: 19.99,
    category: "auto",
    image: "https://images.unsplash.com/photo-1600861194942-f883de0dfe96?w=400&h=400&fit=crop",
    rating: 4.4,
    reviews: 18760,
    orders: 89760,
    link: "https://www.aliexpress.com",
    description: "Strong magnetic car phone holder."
  },
  {
    id: "prod-025",
    title: "Car Vacuum Cleaner Wireless Handheld Powerful",
    price: 29.99,
    originalPrice: 59.99,
    category: "auto",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 6780,
    orders: 28760,
    link: "https://www.aliexpress.com",
    description: "Powerful cordless car vacuum."
  },
  {
    id: "prod-026",
    title: "LED Interior Car Lights Ambient Lighting Kit",
    price: 15.99,
    originalPrice: 34.99,
    category: "auto",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 9870,
    orders: 45670,
    link: "https://www.aliexpress.com",
    description: "RGB interior car lighting kit."
  },
  {
    id: "prod-027",
    title: "Sterling Silver Necklace Crystal Pendant",
    price: 18.99,
    originalPrice: 45.00,
    category: "jewelry",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 7890,
    orders: 34560,
    link: "https://www.aliexpress.com",
    description: "925 sterling silver necklace with crystal pendant."
  },
  {
    id: "prod-028",
    title: "Men's Stainless Steel Watch Minimalist Design",
    price: 45.99,
    originalPrice: 99.99,
    category: "jewelry",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 5670,
    orders: 18900,
    link: "https://www.aliexpress.com",
    description: "Premium stainless steel minimalist watch.",
    isNew: true
  },
  {
    id: "prod-029",
    title: "Gold Plated Hoop Earrings Hypoallergenic",
    price: 8.99,
    originalPrice: 22.00,
    category: "jewelry",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 12340,
    orders: 67890,
    link: "https://www.aliexpress.com",
    description: "Classic gold-plated hoop earrings."
  },
  {
    id: "prod-030",
    title: "USB-C Hub 7-in-1 Multiport Adapter",
    price: 22.99,
    originalPrice: 49.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 8760,
    orders: 32100,
    link: "https://www.aliexpress.com",
    description: "Versatile USB-C hub with HDMI 4K."
  },
  {
    id: "prod-031",
    title: "Webcam 4K Ultra HD with Microphone Auto Focus",
    price: 35.99,
    originalPrice: 79.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 4560,
    orders: 15670,
    link: "https://www.aliexpress.com",
    description: "Professional 4K webcam."
  },
  {
    id: "prod-032",
    title: "Laptop Stand Aluminum Adjustable Ergonomic",
    price: 28.99,
    originalPrice: 55.00,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 6780,
    orders: 23450,
    link: "https://www.aliexpress.com",
    description: "Premium aluminum laptop stand."
  }
];

// ============ State Management ============
const state = {
  products: [],
  filteredProducts: [],
  categories: [],
  currentCategory: 'all',
  searchQuery: '',
  wishlist: JSON.parse(localStorage.getItem('wishlist') || '[]'),
  currentPage: 1,
  isLoading: false,
  currentSort: 'popular',
  currentView: 'grid',
  priceMin: null,
  priceMax: null
};

// ============ Categories Data ============
const CATEGORIES = [
  { id: 'all', nameKey: 'catAll', icon: 'fa-th-large', count: 0 },
  { id: 'electronics', nameKey: 'catElectronics', icon: 'fa-laptop', count: 0 },
  { id: 'fashion', nameKey: 'catFashion', icon: 'fa-shirt', count: 0 },
  { id: 'home', nameKey: 'catHome', icon: 'fa-house', count: 0 },
  { id: 'sports', nameKey: 'catSports', icon: 'fa-futbol', count: 0 },
  { id: 'beauty', nameKey: 'catBeauty', icon: 'fa-spa', count: 0 },
  { id: 'toys', nameKey: 'catToys', icon: 'fa-gamepad', count: 0 },
  { id: 'auto', nameKey: 'catAuto', icon: 'fa-car', count: 0 },
  { id: 'jewelry', nameKey: 'catJewelry', icon: 'fa-gem', count: 0 }
];

// Helper function to get translated category name
function getCategoryName(category) {
  return i18n.t(category.nameKey);
}

// ============ DOM Elements ============
const DOM = {
  productGrid: document.getElementById('product-grid'),
  categoryList: document.getElementById('category-list'),
  mobileCategoryList: document.getElementById('mobile-category-list'),
  categoryPills: document.getElementById('category-pills'),
  searchInput: document.getElementById('search-input'),
  mobileSearchInput: document.getElementById('mobile-search-input'),
  menuToggle: document.getElementById('menu-toggle'),
  mobileNav: document.getElementById('mobile-nav'),
  mobileNavClose: document.getElementById('mobile-nav-close'),
  productModal: document.getElementById('product-modal'),
  modalClose: document.getElementById('modal-close'),
  wishlistCount: document.getElementById('wishlist-count'),
  productCount: document.getElementById('product-count'),
  sectionTitleText: document.getElementById('section-title-text'),
  loadMoreBtn: document.getElementById('load-more-btn'),
  loadMoreContainer: document.getElementById('load-more-container'),
  toastContainer: document.getElementById('toast-container'),
  langToggle: document.getElementById('lang-toggle'),
  themeToggle: document.getElementById('theme-toggle'),
  sortDropdown: document.getElementById('sort-dropdown'),
  sortBtn: document.getElementById('sort-btn'),
  viewToggleBtns: document.querySelectorAll('.view-toggle-btn'),
  priceMin: document.getElementById('price-min'),
  priceMax: document.getElementById('price-max'),
  applyPriceFilter: document.getElementById('apply-price-filter'),
  activeFilters: document.getElementById('active-filters'),
  scrollTopBtn: document.getElementById('scroll-top-btn')
};

// ============ API Functions ============
async function fetchProducts(category = 'all') {
  // Use embedded mock data for static site
  if (CONFIG.USE_MOCK_DATA) {
    console.log('📦 Using embedded mock data (static site mode)');
    // Simulate small network delay for realistic UX
    await new Promise(resolve => setTimeout(resolve, 300));

    if (category === 'all') {
      return [...MOCK_PRODUCTS];
    }
    return MOCK_PRODUCTS.filter(p => p.category === category);
  }

  // Fetch from API server
  try {
    const endpoint = category === 'all'
      ? `${CONFIG.API_BASE}/products`
      : `${CONFIG.API_BASE}/products/category/${category}`;

    const response = await fetch(endpoint);
    if (!response.ok) throw new Error('Failed to fetch products');

    const data = await response.json();
    return data.products || data;
  } catch (error) {
    console.error('Error fetching products:', error);
    // Fallback to mock data
    console.log('📦 Falling back to mock data');
    if (category === 'all') {
      return [...MOCK_PRODUCTS];
    }
    return MOCK_PRODUCTS.filter(p => p.category === category);
  }
}

async function searchProducts(query) {
  try {
    const response = await fetch(`${CONFIG.API_BASE}/products/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Search failed');

    const data = await response.json();
    return data.products || data;
  } catch (error) {
    console.error('Search error:', error);
    // Fallback to client-side search
    return state.products.filter(p =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );
  }
}

// ============ Render Functions ============
function renderCategories() {
  // Update counts
  CATEGORIES.forEach(cat => {
    if (cat.id === 'all') {
      cat.count = state.products.length;
    } else {
      cat.count = state.products.filter(p => p.category === cat.id).length;
    }
  });

  const categoryHTML = CATEGORIES.map(cat => `
    <li class="category-item ${state.currentCategory === cat.id ? 'active' : ''}" 
        data-category="${cat.id}">
      <span class="icon"><i class="fas ${cat.icon}"></i></span>
      <span class="category-name">${getCategoryName(cat)}</span>
      <span class="category-count">${cat.count}</span>
    </li>
  `).join('');

  // Desktop sidebar
  if (DOM.categoryList) {
    DOM.categoryList.innerHTML = categoryHTML;
  }

  // Mobile sidebar
  if (DOM.mobileCategoryList) {
    DOM.mobileCategoryList.innerHTML = categoryHTML;
  }

  // Category pills (mobile/tablet)
  if (DOM.categoryPills) {
    DOM.categoryPills.innerHTML = CATEGORIES.map(cat => `
      <button class="category-pill ${state.currentCategory === cat.id ? 'active' : ''}" 
              data-category="${cat.id}">
        <i class="fas ${cat.icon}"></i>
        ${getCategoryName(cat)}
      </button>
    `).join('');
  }

  // Add event listeners
  document.querySelectorAll('[data-category]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const category = el.dataset.category;
      setCategory(category);
      closeMobileNav();
    });
  });
}

function renderProducts(products, append = false) {
  if (!DOM.productGrid) return;

  if (!append) {
    DOM.productGrid.innerHTML = '';
  }

  if (products.length === 0) {
    DOM.productGrid.innerHTML = `
      <div class="text-center text-muted" style="grid-column: 1/-1; padding: 3rem;">
        <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
        <p>${i18n.t('noProducts')}</p>
      </div>
    `;
    return;
  }

  const productsHTML = products.map(product => createProductCard(product)).join('');

  if (append) {
    DOM.productGrid.insertAdjacentHTML('beforeend', productsHTML);
  } else {
    DOM.productGrid.innerHTML = productsHTML;
  }

  // Add event listeners to new cards
  DOM.productGrid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.product-wishlist') && !e.target.closest('.quick-add-btn')) {
        const productId = card.dataset.productId;
        openProductModal(productId);
      }
    });
  });

  // Wishlist buttons
  DOM.productGrid.querySelectorAll('.product-wishlist').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const productId = btn.dataset.productId;
      toggleWishlist(productId);
    });
  });

  // Quick add buttons
  DOM.productGrid.querySelectorAll('.quick-add-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const productId = btn.dataset.productId;
      const product = state.products.find(p => p.id === productId);
      if (product && product.link) {
        window.open(product.link, '_blank');
      }
    });
  });

  // Update product count
  updateProductCount();
}

function createProductCard(product) {
  const isWishlisted = state.wishlist.includes(product.id);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const starsHTML = generateStars(product.rating);

  // Get translated product title and description
  const translatedTitle = i18n.t(`${product.id}-title`) !== `${product.id}-title` 
    ? i18n.t(`${product.id}-title`) 
    : product.title;
  const translatedDesc = i18n.t(`${product.id}-desc`) !== `${product.id}-desc` 
    ? i18n.t(`${product.id}-desc`) 
    : (product.description || '');

  let badgeHTML = '';
  if (product.orders > 5000) {
    badgeHTML = `<span class="product-badge hot">${i18n.t('hot')}</span>`;
  } else if (product.isNew) {
    badgeHTML = `<span class="product-badge new">${i18n.t('new')}</span>`;
  }
  if (discount > 30) {
    badgeHTML += `<span class="product-badge sale">-${discount}%</span>`;
  }

  return `
    <article class="product-card" data-product-id="${product.id}">
      <div class="product-image">
        <img src="${product.image}" alt="${escapeHTML(translatedTitle)}" loading="lazy">
        <div class="product-badges">${badgeHTML}</div>
        <button class="product-wishlist ${isWishlisted ? 'active' : ''}" 
                data-product-id="${product.id}" 
                aria-label="${isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}">
          <i class="${isWishlisted ? 'fas' : 'far'} fa-heart"></i>
        </button>
        <!-- Hover tooltip with product details -->
        <div class="product-tooltip">
          <h4 class="tooltip-title">${escapeHTML(translatedTitle)}</h4>
          <p class="tooltip-desc">${escapeHTML(translatedDesc)}</p>
          <div class="tooltip-meta">
            <span class="tooltip-price">$${product.price.toFixed(2)}</span>
            <span class="tooltip-rating"><i class="fas fa-star"></i> ${product.rating.toFixed(1)}</span>
            <span class="tooltip-orders">${formatNumber(product.orders)} ${i18n.t('sold')}</span>
          </div>
        </div>
      </div>
      <div class="product-info">
        <h3 class="product-title">${escapeHTML(translatedTitle)}</h3>
        <div class="product-price">
          <span class="price-current">$${product.price.toFixed(2)}</span>
          ${product.originalPrice ? `
            <span class="price-original">$${product.originalPrice.toFixed(2)}</span>
            <span class="price-discount">-${discount}%</span>
          ` : ''}
        </div>
        <div class="product-meta">
          <div class="product-rating">
            <span class="stars">${starsHTML}</span>
            <span>${product.rating.toFixed(1)}</span>
            <span class="count">(${formatNumber(product.reviews)} ${i18n.t('reviews')})</span>
          </div>
          <span class="product-orders">
            <strong>${formatNumber(product.orders)}</strong> ${i18n.t('sold')}
          </span>
        </div>
      </div>
      <div class="quick-add">
        <button class="quick-add-btn" data-product-id="${product.id}">
          <i class="fas fa-external-link-alt"></i>
          ${i18n.t('viewDeal')}
        </button>
      </div>
    </article>
  `;
}

function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  let html = '';
  for (let i = 0; i < fullStars; i++) html += '<i class="fas fa-star"></i>';
  if (halfStar) html += '<i class="fas fa-star-half-alt"></i>';
  for (let i = 0; i < emptyStars; i++) html += '<i class="far fa-star"></i>';

  return html;
}

// ============ Modal Functions ============
function openProductModal(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  const isWishlisted = state.wishlist.includes(product.id);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  // Get translated product title and description
  const translatedTitle = i18n.t(`${product.id}-title`) !== `${product.id}-title` 
    ? i18n.t(`${product.id}-title`) 
    : product.title;
  const translatedDesc = i18n.t(`${product.id}-desc`) !== `${product.id}-desc` 
    ? i18n.t(`${product.id}-desc`) 
    : (product.description || 'מוצר איכותי עם ביקורות מצוינות. לחצו על "צפה באליאקספרס" לפרטים מלאים.');

  document.getElementById('modal-image').src = product.image;
  document.getElementById('modal-image').alt = translatedTitle;
  document.getElementById('modal-title').textContent = translatedTitle;
  document.getElementById('modal-price').textContent = `$${product.price.toFixed(2)}`;
  document.getElementById('modal-original-price').textContent =
    product.originalPrice ? `$${product.originalPrice.toFixed(2)}` : '';
  document.getElementById('modal-discount').textContent =
    discount > 0 ? `-${discount}%` : '';
  document.getElementById('modal-discount').style.display = discount > 0 ? 'inline' : 'none';
  document.getElementById('modal-stars').innerHTML = generateStars(product.rating);
  document.getElementById('modal-stars').dataset.rating = product.rating;
  document.getElementById('modal-rating').textContent = product.rating.toFixed(1);
  document.getElementById('modal-reviews').textContent = `(${formatNumber(product.reviews)} ${i18n.t('reviews')})`;
  document.getElementById('modal-description').textContent = translatedDesc;
  document.getElementById('modal-orders').innerHTML =
    `<strong>${formatNumber(product.orders)}</strong> ${i18n.t('orders')}`;
  document.getElementById('modal-link').href = product.link || '#';

  const wishlistBtn = document.getElementById('modal-wishlist');
  wishlistBtn.innerHTML = `<i class="${isWishlisted ? 'fas' : 'far'} fa-heart"></i>`;
  wishlistBtn.onclick = () => {
    toggleWishlist(product.id);
    wishlistBtn.innerHTML = `<i class="${state.wishlist.includes(product.id) ? 'fas' : 'far'} fa-heart"></i>`;
  };

  DOM.productModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  DOM.productModal.classList.remove('active');
  document.body.style.overflow = '';
}

// ============ Category & Search Functions ============
async function setCategory(category) {
  state.currentCategory = category;
  state.currentPage = 1;
  state.searchQuery = '';

  // Clear search inputs
  if (DOM.searchInput) DOM.searchInput.value = '';
  if (DOM.mobileSearchInput) DOM.mobileSearchInput.value = '';

  // Update UI
  renderCategories();
  updateSectionTitle();

  // Show loading
  showLoadingState();

  // Apply all filters including sort
  applyFilters();
}

async function handleSearch(query) {
  state.searchQuery = query.trim();
  state.currentPage = 1;

  if (!state.searchQuery) {
    setCategory(state.currentCategory);
    return;
  }

  // Update title
  DOM.sectionTitleText.textContent = `${i18n.currentLang === 'he' ? 'חיפוש' : 'Search'}: "${state.searchQuery}"`;

  showLoadingState();

  // Apply all filters including search
  applyFilters();
}

function updateSectionTitle() {
  const category = CATEGORIES.find(c => c.id === state.currentCategory);
  const titleText = category?.id === 'all'
    ? i18n.t('trendingNow')
    : getCategoryName(category);

  if (DOM.sectionTitleText) {
    DOM.sectionTitleText.textContent = titleText;
  }
}

function updateProductCount() {
  const count = state.filteredProducts.length;
  const label = count === 1 ? i18n.t('product') : i18n.t('products');
  DOM.productCount.textContent = `${count} ${label}`;
}

// ============ Pagination ============
function getPageProducts() {
  const start = 0;
  const end = state.currentPage * CONFIG.PRODUCTS_PER_PAGE;
  return state.filteredProducts.slice(start, end);
}

function loadMoreProducts() {
  state.currentPage++;
  const newProducts = getPageProducts().slice(
    (state.currentPage - 1) * CONFIG.PRODUCTS_PER_PAGE
  );
  renderProducts(newProducts, true);
  updateLoadMoreVisibility();
}

function updateLoadMoreVisibility() {
  const totalShown = state.currentPage * CONFIG.PRODUCTS_PER_PAGE;
  const hasMore = totalShown < state.filteredProducts.length;
  DOM.loadMoreContainer.style.display = hasMore ? 'block' : 'none';
}

// ============ Wishlist Functions ============
function toggleWishlist(productId) {
  const index = state.wishlist.indexOf(productId);

  if (index > -1) {
    state.wishlist.splice(index, 1);
    showToast(i18n.t('removedFromWishlist'), 'info');
  } else {
    state.wishlist.push(productId);
    showToast(i18n.t('addedToWishlist'), 'success');
  }

  localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
  updateWishlistCount();

  // Update UI
  document.querySelectorAll(`.product-wishlist[data-product-id="${productId}"]`).forEach(btn => {
    const isWishlisted = state.wishlist.includes(productId);
    btn.classList.toggle('active', isWishlisted);
    btn.innerHTML = `<i class="${isWishlisted ? 'fas' : 'far'} fa-heart"></i>`;
  });
}

function updateWishlistCount() {
  DOM.wishlistCount.textContent = state.wishlist.length;
  DOM.wishlistCount.style.display = state.wishlist.length > 0 ? 'flex' : 'none';
}

// ============ Mobile Navigation ============
function openMobileNav() {
  DOM.mobileNav.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  DOM.mobileNav.classList.remove('active');
  document.body.style.overflow = '';
}

// ============ Utility Functions ============
function showLoadingState() {
  DOM.productGrid.innerHTML = Array(6).fill(`
    <div class="skeleton skeleton-card"></div>
  `).join('');
}

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
    <span>${message}</span>
  `;

  DOM.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideIn 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }, CONFIG.TOAST_DURATION);
}

function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ============ Sorting Functions ============
function sortProducts(products, sortType) {
  const sorted = [...products];
  
  switch (sortType) {
    case 'price-low':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
    case 'popular':
    default:
      sorted.sort((a, b) => b.orders - a.orders);
      break;
  }
  
  return sorted;
}

function applySort(sortType) {
  state.currentSort = sortType;
  state.currentPage = 1;
  
  // Update UI
  document.querySelectorAll('.sort-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.sort === sortType);
  });
  
  // Close dropdown
  DOM.sortDropdown?.classList.remove('active');
  
  // Re-filter and render
  applyFilters();
}

// ============ View Toggle Functions ============
function setView(viewType) {
  state.currentView = viewType;
  
  // Update buttons
  DOM.viewToggleBtns?.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === viewType);
  });
  
  // Update grid
  DOM.productGrid?.classList.toggle('list-view', viewType === 'list');
}

// ============ Price Filter Functions ============
function applyPriceFilter() {
  const min = parseFloat(DOM.priceMin?.value) || null;
  const max = parseFloat(DOM.priceMax?.value) || null;
  
  state.priceMin = min;
  state.priceMax = max;
  state.currentPage = 1;
  
  applyFilters();
  updateActiveFilters();
}

function clearPriceFilter() {
  state.priceMin = null;
  state.priceMax = null;
  if (DOM.priceMin) DOM.priceMin.value = '';
  if (DOM.priceMax) DOM.priceMax.value = '';
  
  applyFilters();
  updateActiveFilters();
}

function applyFilters() {
  let filtered = [...state.products];
  
  // Category filter
  if (state.currentCategory !== 'all') {
    filtered = filtered.filter(p => p.category === state.currentCategory);
  }
  
  // Search filter
  if (state.searchQuery) {
    const query = state.searchQuery.toLowerCase();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(query) || 
      (i18n.t(`${p.id}-title`) || '').toLowerCase().includes(query)
    );
  }
  
  // Price filter
  if (state.priceMin !== null) {
    filtered = filtered.filter(p => p.price >= state.priceMin);
  }
  if (state.priceMax !== null) {
    filtered = filtered.filter(p => p.price <= state.priceMax);
  }
  
  // Sort
  filtered = sortProducts(filtered, state.currentSort);
  
  state.filteredProducts = filtered;
  renderProducts(getPageProducts());
  updateProductCount();
  updateLoadMoreVisibility();
}

function updateActiveFilters() {
  if (!DOM.activeFilters) return;
  
  let html = '';
  
  if (state.priceMin !== null || state.priceMax !== null) {
    const minText = state.priceMin !== null ? `$${state.priceMin}` : '';
    const maxText = state.priceMax !== null ? `$${state.priceMax}` : '';
    const priceText = `${i18n.t('priceFilter')}: ${minText} - ${maxText}`;
    
    html += `
      <span class="filter-tag">
        ${priceText}
        <button onclick="clearPriceFilter()" aria-label="Remove filter">
          <i class="fas fa-times"></i>
        </button>
      </span>
    `;
  }
  
  DOM.activeFilters.innerHTML = html;
}

// ============ Scroll to Top ============
function initScrollToTop() {
  const scrollBtn = DOM.scrollTopBtn;
  if (!scrollBtn) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });
  
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ============ Event Listeners ============
function initEventListeners() {
  // Mobile menu
  DOM.menuToggle?.addEventListener('click', openMobileNav);
  DOM.mobileNavClose?.addEventListener('click', closeMobileNav);
  DOM.mobileNav?.addEventListener('click', (e) => {
    if (e.target === DOM.mobileNav) closeMobileNav();
  });

  // Modal
  DOM.modalClose?.addEventListener('click', closeProductModal);
  DOM.productModal?.addEventListener('click', (e) => {
    if (e.target === DOM.productModal) closeProductModal();
  });

  // Search
  const handleSearchDebounced = debounce(handleSearch, 300);
  DOM.searchInput?.addEventListener('input', (e) => handleSearchDebounced(e.target.value));
  DOM.mobileSearchInput?.addEventListener('input', (e) => handleSearchDebounced(e.target.value));

  // Load more
  DOM.loadMoreBtn?.addEventListener('click', loadMoreProducts);

  // Language toggle
  DOM.langToggle?.addEventListener('click', () => {
    i18n.toggle();
  });

  // Theme toggle
  DOM.themeToggle?.addEventListener('click', () => {
    ThemeManager.toggle();
  });

  // Sort dropdown
  DOM.sortBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    DOM.sortDropdown?.classList.toggle('active');
  });

  document.querySelectorAll('.sort-option').forEach(opt => {
    opt.addEventListener('click', () => {
      applySort(opt.dataset.sort);
    });
  });

  // Close sort dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!DOM.sortDropdown?.contains(e.target)) {
      DOM.sortDropdown?.classList.remove('active');
    }
  });

  // View toggle
  DOM.viewToggleBtns?.forEach(btn => {
    btn.addEventListener('click', () => {
      setView(btn.dataset.view);
    });
  });

  // Price filter
  DOM.applyPriceFilter?.addEventListener('click', applyPriceFilter);

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProductModal();
      closeMobileNav();
      DOM.sortDropdown?.classList.remove('active');
    }
  });

  // Initialize scroll to top
  initScrollToTop();
}

// ============ Initialization ============
async function init() {
  console.log('🚀 AliDeals App Starting...');

  // Initialize theme
  ThemeManager.init();

  // Initialize event listeners
  initEventListeners();

  // Apply language settings
  i18n.setLang(i18n.currentLang);

  // Update wishlist count
  updateWishlistCount();

  // Show loading state
  showLoadingState();

  try {
    // Fetch products
    const products = await fetchProducts();
    state.products = products;
    state.filteredProducts = [...products];

    // Render UI
    renderCategories();
    renderProducts(getPageProducts());
    updateLoadMoreVisibility();

    console.log(`✅ Loaded ${products.length} products`);
  } catch (error) {
    console.error('❌ Failed to initialize:', error);
    showToast('Failed to load products. Please refresh the page.', 'error');
  }
}

// Make clearPriceFilter globally accessible for onclick handler
window.clearPriceFilter = clearPriceFilter;

// Start app when DOM is ready
document.addEventListener('DOMContentLoaded', init);
