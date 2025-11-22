# 🔗 TinyLink - URL Shortener

A modern, full-stack URL shortener application with real-time analytics and a beautiful dark purple-themed UI.

![Node.js](https://img.shields.io/badge/Node.js-22.x-green)
![React](https://img.shields.io/badge/React-19-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-cyan)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

- 🔗 **Smart URL Shortening** - Auto-generated or custom 6-8 character short codes
- 📊 **Real-time Analytics** - Track clicks, timestamps, and detailed link statistics
- 🎨 **Dark Theme UI** - Stunning purple-themed interface with smooth animations
- 📱 **Fully Responsive** - Seamless experience on mobile, tablet, and desktop
- 🔔 **Toast Notifications** - Instant feedback for all user actions
- 🔍 **Smart Search** - Filter links by code or URL in real-time
- 📋 **One-Click Copy** - Instant clipboard copying with visual feedback
- ⚡ **Lightning Fast** - Optimized with RTK Query caching and efficient queries
- 🏥 **Health Monitoring** - Built-in health check endpoint and status page
- 🎯 **Click Tracking** - Automatic analytics on every redirect

## 🎨 Design System

### Color Palette
- **Primary Purple**: `#7C3AED` - Main brand color
- **Violet Accent**: `#8B5CF6` - Secondary highlights
- **Dark Background**: `#1A1528` - Deep purple background
- **Card Background**: `#231F35` - Elevated surfaces
- **Text Primary**: `#F4F3F6` - High contrast text
- **Text Secondary**: `#B8B5C3` - Muted text
- **Border**: `#2E2640` - Subtle borders

## 🚀 Tech Stack

### Backend
- **Node.js 22.x** - JavaScript runtime
- **Express 5.x** - Web framework
- **PostgreSQL** - Relational database (Neon hosted)
- **pg** - PostgreSQL client for Node.js
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 19** - Modern UI library
- **Redux Toolkit Query** - Powerful data fetching and caching
- **React Router DOM v7** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **React Hot Toast** - Elegant notifications
- **Vite** - Next-generation build tool

## 📦 Quick Start

### Prerequisites
- Node.js 22.x or higher
- PostgreSQL database (Neon recommended)
- Git

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/rihanazar1/Tiny-URL.git
cd Tiny-URL
```

**2. Backend Setup**
```bash
cd backend
npm install

# Create .env file
cat > .env << EOF
PORT=3000
DATABASE_URL=your_neon_postgresql_url
EOF

# Start server
npm start
```

**3. Frontend Setup**
```bash
cd frontend
npm install

# Create .env file
cat > .env << EOF
VITE_API_BASE_URL=http://localhost:3000/api/v1
EOF

# Start development server
npm run dev
```

**4. Access the Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Health Check: http://localhost:3000/healthz

## 🔌 API Documentation

### Link Management

**Create Short Link**
```http
POST /api/v1/links
Content-Type: application/json

{
  "url": "https://example.com",
  "short_code": "custom1" // optional
}
```

**Get All Links**
```http
GET /api/v1/links
```

**Get Link Statistics**
```http
GET /api/v1/links/:code
```

**Delete Link**
```http
DELETE /api/v1/links/:code
```

### Redirect

**Short URL Redirect**
```http
GET /:code
```
Redirects to the target URL and increments click counter.

### Health Check

**Server Health Status**
```http
GET /healthz
```

Returns:
```json
{
  "ok": true,
  "version": "1.0"
}
```

## 🗄️ Database Schema

```sql
CREATE TABLE links (
  id SERIAL PRIMARY KEY,
  short_code VARCHAR(10) UNIQUE NOT NULL,
  url TEXT NOT NULL,
  total_clicks INT DEFAULT 0,
  last_clicked TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT short_code_format CHECK (short_code ~ '^[A-Za-z0-9]{6,8}$')
);

CREATE INDEX idx_short_code ON links(short_code);
```

## 🎯 Frontend Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Dashboard | Main page - view, create, and manage links |
| `/code/:code` | Stats | Detailed analytics for a specific link |
| `/healthz` | Health Check | Server status monitoring page |

## 🧪 Testing Guide

### Manual Testing

**1. Create a Link**
- Open http://localhost:5173
- Click "Add New Link"
- Enter URL: `https://google.com`
- Click "Create Short Link"
- ✅ Link appears in dashboard

**2. Test Custom Code**
- Create link with custom code: `github1`
- ✅ Should succeed
- Try same code again
- ✅ Should show "Short code already exists" error

**3. View Statistics**
- Click "View Stats" button (📊 icon)
- ✅ Navigates to `/code/:code`
- ✅ Shows click count, timestamps, and details

**4. Test Redirect**
- Copy short URL
- Open in new tab
- ✅ Redirects to target URL
- ✅ Click count increments

**5. Delete Link**
- Click delete button (🗑️ icon)
- Confirm deletion
- ✅ Link removed from dashboard
- ✅ Short URL returns 404

### API Testing with cURL

**Create Link:**
```bash
curl -X POST http://localhost:3000/api/v1/links \
  -H "Content-Type: application/json" \
  -d '{"url":"https://google.com"}'
```

**Get All Links:**
```bash
curl http://localhost:3000/api/v1/links
```

**Get Link Stats:**
```bash
curl http://localhost:3000/api/v1/links/abc123
```

**Delete Link:**
```bash
curl -X DELETE http://localhost:3000/api/v1/links/abc123
```

**Health Check:**
```bash
curl http://localhost:3000/healthz
```

## 🚀 Deployment

### Backend Deployment (Vercel)

**1. Prepare for Deployment**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

**2. Deploy on Vercel**
- Visit [Vercel Dashboard](https://vercel.com/dashboard)
- Click "Add New" → "Project"
- Import your GitHub repository
- Configure:
  - **Root Directory**: `backend`
  - **Framework Preset**: Other
  - **Build Command**: (leave empty)
  - **Output Directory**: (leave empty)

**3. Environment Variables**
Add in Vercel Dashboard → Settings → Environment Variables:
```
PORT=3000
DATABASE_URL=your_production_neon_url
NODE_ENV=production
```

**4. Deploy!**

### Frontend Deployment (Vercel)

**1. Update Environment Variable**
```env
VITE_API_BASE_URL=https://your-backend.vercel.app/api/v1
```

**2. Deploy on Vercel**
- Import repository
- Configure:
  - **Root Directory**: `frontend`
  - **Framework Preset**: Vite
  - **Build Command**: `npm run build`
  - **Output Directory**: `dist`

**3. Deploy!**

## 📁 Project Structure

```
Tiny-URL/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # PostgreSQL connection
│   │   ├── controllers/
│   │   │   └── linkController.js    # Link CRUD operations
│   │   ├── routes/
│   │   │   └── linkRoutes.js        # API route definitions
│   │   ├── schema/
│   │   │   └── linkSchema.js        # Database table schema
│   │   └── app.js                   # Express app configuration
│   ├── server.js                    # Server entry point
│   ├── vercel.json                  # Vercel deployment config
│   ├── package.json
│   └── .env                         # Environment variables
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── AddLinkForm.jsx      # Create link form
    │   │   ├── LinksTable.jsx       # Links display table
    │   │   ├── Button.jsx           # Reusable button
    │   │   ├── Input.jsx            # Form input
    │   │   ├── Card.jsx             # Container component
    │   │   └── Loader.jsx           # Loading spinner
    │   ├── pages/
    │   │   ├── dashboard/
    │   │   │   └── Dashboard.jsx    # Main dashboard
    │   │   ├── linkstats/
    │   │   │   └── LinkStats.jsx    # Link analytics
    │   │   └── healthcheck/
    │   │       └── HealthCheck.jsx  # Health status page
    │   ├── store/
    │   │   ├── api/
    │   │   │   ├── baseApi.js       # RTK Query setup
    │   │   │   └── linksApi.js      # Link endpoints
    │   │   └── index.js             # Redux store
    │   ├── routes/
    │   │   └── index.jsx            # React Router config
    │   ├── utils/
    │   │   └── toast.js             # Toast notifications
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    └── .env                         # Environment variables
```

## 🎯 Key Features Explained

### Short Code Generation
- **Auto-generated**: Cryptographically random 6-8 character codes
- **Custom codes**: User-defined with strict validation
- **Format**: Alphanumeric only `[A-Za-z0-9]{6,8}`
- **Uniqueness**: Global uniqueness enforced at database level
- **Collision handling**: Returns 409 Conflict if code exists

### Click Analytics
- **Real-time tracking**: Increments on every redirect
- **Timestamp recording**: Captures last clicked time
- **Statistics display**: Shows total clicks and activity
- **Performance**: Optimized queries with database indexes

### Health Monitoring
- **Backend endpoint**: `/healthz` returns JSON status
- **Frontend page**: Visual health check at `/healthz`
- **Status indicators**: Color-coded success/error states
- **Response format**: Standardized health check response

## 📱 Responsive Design

### Desktop (1920px+)
- Full-width table layout
- All columns visible
- Hover effects and tooltips
- Multi-column statistics cards

### Tablet (768px - 1919px)
- Optimized table layout
- Touch-friendly buttons
- Adjusted spacing
- Responsive navigation

### Mobile (< 768px)
- Card-based layout
- Stacked information
- Large touch targets
- Simplified navigation
- Bottom sheet modals

## 🤝 Contributing

We welcome contributions! Here's how you can help:

**1. Fork the Repository**

**2. Create a Feature Branch**
```bash
git checkout -b feature/AmazingFeature
```

**3. Commit Your Changes**
```bash
git commit -m 'Add some AmazingFeature'
```

**4. Push to Branch**
```bash
git push origin feature/AmazingFeature
```

**5. Open a Pull Request**

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Rihan Azar**
- GitHub: [@rihanazar1](https://github.com/rihanazar1)
- Repository: [Tiny-URL](https://github.com/rihanazar1/Tiny-URL)

## 🙏 Acknowledgments

- **React Team** - For React 19 and amazing documentation
- **Redux Team** - For Redux Toolkit and RTK Query
- **Tailwind Labs** - For Tailwind CSS framework
- **Lucide** - For beautiful open-source icons
- **Neon** - For serverless PostgreSQL hosting
- **Vercel** - For seamless deployment platform

## 📞 Support

Need help? Here's how to get support:

- 📫 **Issues**: [Open an issue](https://github.com/rihanazar1/Tiny-URL/issues)
- 📖 **Documentation**: Check the docs in this repository
- 💬 **Discussions**: Use GitHub Discussions for questions

## 🔧 Troubleshooting

### Common Issues

**Database Connection Failed**
```
Solution: Verify DATABASE_URL in backend/.env
Check: Neon database is active and accessible
```

**CORS Errors**
```
Solution: Backend CORS is configured for all origins
Check: Frontend URL matches expected origin
```

**404 on Frontend Routes**
```
Solution: Ensure correct route structure:
- Dashboard: /
- Stats: /code/:code
- Health: /healthz
```

**Links Not Appearing**
```
Solution: Check backend is running on port 3000
Verify: Database connection is successful
Check: Browser console for API errors
```

**Short Code Validation Error**
```
Solution: Codes must be 6-8 alphanumeric characters
Format: [A-Za-z0-9]{6,8}
Example: abc123, GitHub1, Test1234
```

## 🎉 Roadmap

Future enhancements we're considering:

- [ ] QR code generation for each short link
- [ ] Link expiration and scheduling
- [ ] Custom domain support
- [ ] Advanced analytics (geographic, device, referrer)
- [ ] Link categories and tags
- [ ] Bulk link creation via CSV
- [ ] API rate limiting
- [ ] Link preview before redirect
- [ ] Social media meta tags
- [ ] Team collaboration features
- [ ] Link password protection
- [ ] A/B testing for links

---

**Made with 💜 using React, Node.js, and PostgreSQL**

⭐ **Star this repo if you find it helpful!**

## 📊 Repository Stats

![GitHub stars](https://img.shields.io/github/stars/rihanazar1/Tiny-URL?style=social)
![GitHub forks](https://img.shields.io/github/forks/rihanazar1/Tiny-URL?style=social)
![GitHub issues](https://img.shields.io/github/issues/rihanazar1/Tiny-URL)
![GitHub pull requests](https://img.shields.io/github/issues-pr/rihanazar1/Tiny-URL)
![GitHub last commit](https://img.shields.io/github/last-commit/rihanazar1/Tiny-URL)

---

### 🌐 Live Demo

- **Frontend**: [Coming Soon]
- **Backend API**: [Coming Soon]

---

**Happy Coding! 🚀**
