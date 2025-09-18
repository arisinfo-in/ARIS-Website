# ARIS AI Data Analyst - Backend API

This is the backend API for the ARIS AI Data Analyst website, built with Node.js, Express, and TypeScript.

## Features

- **Contact Form Handling** - Process contact form submissions from multiple pages
- **Newsletter Subscriptions** - Handle newsletter signups with email confirmations
- **Roadmap Selection** - Manage roadmap type selections and preferences
- **Email Notifications** - Send automated emails using multiple email services
- **Form Validation** - Comprehensive input validation and sanitization
- **Rate Limiting** - Prevent spam and abuse
- **Security** - Helmet.js for security headers and CORS protection

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `env.example` to `.env` and update with your settings:

```bash
cp env.example .env
```

### 3. Email Configuration
Choose one of the following email services:

#### Option A: Gmail SMTP (Recommended for testing)
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

#### Option B: SendGrid
```env
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
```

#### Option C: Mailgun
```env
MAILGUN_API_KEY=your-mailgun-api-key
MAILGUN_DOMAIN=your-mailgun-domain
```

### 4. Run Development Server
```bash
npm run dev
```

### 5. Run Production Build
```bash
npm run build
npm start
```

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Contact Forms
- `POST /api/contact` - Submit contact form
- `GET /api/contact/health` - Contact service health

### Newsletter
- `POST /api/newsletter` - Subscribe to newsletter
- `GET /api/newsletter/health` - Newsletter service health

### Roadmap
- `GET /api/roadmap` - Get available roadmap types
- `POST /api/roadmap/selection` - Submit roadmap selection
- `GET /api/roadmap/health` - Roadmap service health

## Request/Response Examples

### Contact Form Submission
```json
POST /api/contact
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Tech Corp",
  "phone": "+1234567890",
  "service": "AI Consulting",
  "message": "I'm interested in your AI services",
  "source": "home"
}
```

### Newsletter Subscription
```json
POST /api/newsletter
{
  "email": "john@example.com",
  "source": "homepage"
}
```

### Roadmap Selection
```json
POST /api/roadmap/selection
{
  "type": "course",
  "email": "john@example.com",
  "name": "John Doe",
  "preferences": ["data-analysis", "machine-learning"]
}
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `EMAIL_SERVICE` | Email service provider | gmail |
| `EMAIL_USER` | Email username | - |
| `EMAIL_PASS` | Email password/app password | - |
| `CONTACT_EMAIL` | Contact form recipient | - |
| `ADMIN_EMAIL` | Admin email | - |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:5173 |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | 900000 (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 |

## Security Features

- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Request throttling
- **Input Validation** - Data sanitization
- **Error Handling** - Secure error responses

## Deployment

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Set environment variables in Vercel dashboard

### Railway
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

### DigitalOcean App Platform
1. Connect your repository
2. Configure environment variables
3. Deploy

## Development

### Project Structure
```
src/
├── index.ts              # Main server file
├── routes/               # API routes
│   ├── contact.ts        # Contact form routes
│   ├── newsletter.ts     # Newsletter routes
│   └── roadmap.ts        # Roadmap routes
├── services/             # Business logic
│   └── emailService.ts   # Email service
├── middleware/           # Custom middleware
│   └── validation.ts     # Form validation
└── types/                # TypeScript types
    └── index.ts          # Type definitions
```

### Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests (coming soon)

## Troubleshooting

### Common Issues

1. **Email not sending**
   - Check email credentials
   - Verify app password for Gmail
   - Check rate limits

2. **CORS errors**
   - Update `FRONTEND_URL` in environment
   - Check frontend URL configuration

3. **Rate limiting**
   - Adjust `RATE_LIMIT_MAX_REQUESTS`
   - Check client IP restrictions

## Support

For issues and questions:
- Check the logs for error details
- Verify environment configuration
- Test endpoints with Postman/curl

## License

ISC License - See package.json for details
Note: Backend now runs on port 5001 by default to avoid conflicts with macOS AirPlay service on port 5000
