# 🚀 ARIS Backend Integration - Complete Setup Guide

Your ARIS AI Data Analyst website now has a **complete backend API** integrated! Here's everything you need to know.

## ✅ What's Been Set Up

### **Backend Features:**
- ✅ **Node.js + Express** server with TypeScript
- ✅ **Email Service** (Gmail, SendGrid, Mailgun support)
- ✅ **Form Validation** and **Rate Limiting**
- ✅ **Security** (Helmet, CORS, Input sanitization)
- ✅ **API Endpoints** for all forms
- ✅ **Frontend Integration** with Axios

### **API Endpoints:**
- `POST /api/contact` - Contact form submissions
- `POST /api/newsletter` - Newsletter subscriptions  
- `GET /api/roadmap` - Available roadmap types
- `POST /api/roadmap/selection` - Roadmap selections
- `GET /health` - Server health check

## 🚀 Quick Start

### **1. Start Both Frontend & Backend:**
```bash
# Install dependencies (if not done already)
npm install
cd backend && npm install && cd ..

# Start both frontend and backend together
npm run dev:full
```

This will start:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

### **2. Configure Email Service:**

#### **Option A: Gmail (Recommended for testing)**
1. Enable 2-Factor Authentication on your Gmail
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Update `backend/.env`:
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
CONTACT_EMAIL=contact@yourdomain.com
```

#### **Option B: SendGrid (Recommended for production)**
1. Sign up at https://sendgrid.com
2. Get your API key
3. Update `backend/.env`:
```env
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
CONTACT_EMAIL=contact@yourdomain.com
```

### **3. Test the Integration:**
1. Open http://localhost:5173
2. Fill out the contact form
3. Check your email for the notification
4. Try the newsletter subscription

## 📁 Project Structure

```
ARIS Version4/
├── src/                          # Frontend (React + TypeScript)
│   ├── components/               # React components
│   ├── services/
│   │   └── api.ts               # API service (NEW)
│   └── ...
├── backend/                      # Backend (Node.js + Express)
│   ├── src/
│   │   ├── routes/              # API routes
│   │   ├── services/            # Business logic
│   │   ├── middleware/          # Validation & security
│   │   └── types/               # TypeScript types
│   ├── .env                     # Environment variables
│   └── package.json
└── package.json                 # Root package.json with scripts
```

## 🔧 Available Scripts

### **Development:**
```bash
npm run dev:full          # Start both frontend & backend
npm run dev               # Frontend only
npm run backend           # Backend only
```

### **Production:**
```bash
npm run build:full        # Build both frontend & backend
npm run start:full        # Start production servers
```

### **Individual:**
```bash
npm run backend:build     # Build backend only
npm run backend:start     # Start backend only
```

## 📧 Email Configuration

### **Gmail Setup (Easiest):**
1. Go to Google Account settings
2. Enable 2-Factor Authentication
3. Go to App Passwords: https://myaccount.google.com/apppasswords
4. Generate password for "Mail"
5. Use this password in `backend/.env`

### **SendGrid Setup (Production):**
1. Create account at https://sendgrid.com
2. Verify your sender identity
3. Create API key with "Mail Send" permissions
4. Use API key in `backend/.env`

### **Mailgun Setup (Alternative):**
1. Create account at https://mailgun.com
2. Get API key and domain
3. Use credentials in `backend/.env`

## 🌐 Deployment Options

### **Option 1: Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
vercel

# Deploy backend
cd backend
vercel
```

### **Option 2: Railway**
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

### **Option 3: DigitalOcean App Platform**
1. Connect repository
2. Configure build settings
3. Set environment variables

## 🔒 Environment Variables

### **Backend (.env):**
```env
# Server
PORT=5000
NODE_ENV=development

# Email (Choose one)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# OR SendGrid
# SENDGRID_API_KEY=your-key
# SENDGRID_FROM_EMAIL=noreply@domain.com

# Recipients
CONTACT_EMAIL=contact@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com

# CORS
FRONTEND_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### **Frontend (.env):**
```env
# API URL (for production)
VITE_API_URL=https://your-backend-domain.com
```

## 🧪 Testing the API

### **Test Contact Form:**
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message",
    "source": "home"
  }'
```

### **Test Newsletter:**
```bash
curl -X POST http://localhost:5000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "source": "homepage"
  }'
```

### **Test Health Check:**
```bash
curl http://localhost:5000/health
```

## 🐛 Troubleshooting

### **Common Issues:**

1. **Email not sending:**
   - Check email credentials
   - Verify app password for Gmail
   - Check rate limits

2. **CORS errors:**
   - Update `FRONTEND_URL` in backend/.env
   - Check frontend URL

3. **Backend not starting:**
   - Check if port 5000 is available
   - Verify all dependencies installed
   - Check .env file exists

4. **Frontend API errors:**
   - Ensure backend is running
   - Check API_BASE_URL in src/services/api.ts
   - Check browser console for errors

### **Debug Commands:**
```bash
# Check backend logs
cd backend && npm run dev

# Check frontend build
npm run build

# Test API endpoints
curl http://localhost:5000/health
```

## 📊 Monitoring

### **Health Checks:**
- Backend: http://localhost:5000/health
- Contact API: http://localhost:5000/api/contact/health
- Newsletter API: http://localhost:5000/api/newsletter/health
- Roadmap API: http://localhost:5000/api/roadmap/health

### **Logs:**
- Backend logs appear in terminal
- Frontend errors in browser console
- API requests logged automatically

## 🎉 What's Working Now

✅ **Contact Forms** - All 3 forms (Home, Services, Training) send emails
✅ **Newsletter** - Subscriptions with confirmation emails
✅ **Roadmap Selection** - Modal selections tracked
✅ **Form Validation** - Client and server-side validation
✅ **Rate Limiting** - Prevents spam and abuse
✅ **Error Handling** - User-friendly error messages
✅ **Security** - CORS, Helmet, Input sanitization

## 🚀 Next Steps

1. **Configure Email Service** (Gmail/SendGrid)
2. **Test All Forms** on your website
3. **Deploy to Production** (Vercel/Railway)
4. **Monitor Performance** and logs
5. **Add Analytics** if needed

## 📞 Support

If you encounter any issues:
1. Check the logs for error details
2. Verify environment configuration
3. Test API endpoints individually
4. Check email service credentials

Your ARIS AI Data Analyst website now has a **complete, production-ready backend**! 🎉
