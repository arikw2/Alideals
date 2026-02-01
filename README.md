# AliDeals - AliExpress Products Showcase

A modern, responsive website showcasing trending products from AliExpress with automatic daily updates.

## Features

- 🔥 **Trending Products** - Curated selection of popular items with thousands of orders
- 📱 **Fully Responsive** - Beautiful design on mobile, tablet, and desktop
- 🎨 **Modern UI** - Sleek dark theme with glassmorphism effects and smooth animations
- 🌓 **Dark/Light Mode** - Toggle between themes with preference saved
- 🔍 **Search & Filter** - Find products by keyword, category, or price range
- 📊 **Sort Options** - Sort by popularity, price, rating, or newest
- 🇮🇱 **Hebrew RTL Support** - Full right-to-left layout with Hebrew translations
- ❤️ **Wishlist** - Save your favorite items (stored in browser)
- 🔄 **Daily Updates** - Automatic product refresh every day at midnight

## Quick Start (Static Site - No Server Needed)

Simply open `public/index.html` in your browser - the site works with embedded mock data!

### With Node.js Server (Optional)

```bash
cd aliexpress-showcase
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🚀 Deploy to GitHub Pages (Free Hosting)

### Option 1: Automatic Deployment (Recommended)

1. **Create a GitHub repository** and push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Build and deployment", select **GitHub Actions**
   - The included workflow (`.github/workflows/deploy.yml`) will automatically deploy

3. **Access your site** at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### Option 2: Manual Deployment

1. Go to **Settings** → **Pages**
2. Under "Source", select **Deploy from a branch**
3. Select `main` branch and `/public` folder (or `/` if you move files to root)
4. Click **Save**

### Other Free Hosting Options

- **Netlify**: Drag & drop the `public` folder at [netlify.com](https://netlify.com)
- **Vercel**: Import from GitHub at [vercel.com](https://vercel.com)
- **Cloudflare Pages**: Connect GitHub at [pages.cloudflare.com](https://pages.cloudflare.com)

## Project Structure

```
aliexpress-showcase/
├── .github/workflows/      # GitHub Actions for deployment
│   └── deploy.yml
├── public/                 # Frontend assets (deploy this folder)
│   ├── index.html         # Main HTML file
│   ├── css/
│   │   └── styles.css     # Complete design system
│   └── js/
│       └── app.js         # Frontend JavaScript
├── server/
│   ├── server.js          # Express server (optional)
│   ├── api/
│   │   └── products.js    # Product API service
│   └── data/
│       └── products.json  # Cached product data
└── package.json
```

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/products` | Get all products |
| `GET /api/products/category/:id` | Get products by category |
| `GET /api/products/trending` | Get trending products |
| `GET /api/products/search?q=` | Search products |
| `GET /api/products/:id` | Get single product |
| `GET /api/categories` | Get categories with counts |
| `POST /api/products/update` | Manually trigger update |

## Categories

- Electronics
- Fashion
- Home & Garden
- Sports
- Beauty
- Toys & Games
- Auto
- Jewelry

## Connecting to Real AliExpress Data

Currently running with mock data. To fetch real products:

1. Sign up at [RapidAPI](https://rapidapi.com)
2. Subscribe to "AliExpress True API" or "Aliexpress DataHub"
3. Get your API key
4. Edit `server/api/products.js` and add your key
5. Uncomment the `fetchFromAliExpress` function
6. Update the `updateProducts` function to use the real API

## Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express
- **Styling**: Custom CSS with CSS Variables, Glassmorphism, Gradients
- **Icons**: Font Awesome 6
- **Fonts**: Inter, Outfit (Google Fonts)
- **Scheduling**: node-cron

## License

MIT License
