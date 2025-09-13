# Vercel Deployment Guide

## Environment Variables for Vercel

Add these environment variables to your Vercel project settings:

### Required Environment Variables:

```
EMAIL_SERVICE=gmail
EMAIL_USER=arisinfo.in@gmail.com
EMAIL_PASS=yqhs zvme mbfy geos
CONTACT_EMAIL=arisinfo.in@gmail.com
ADMIN_EMAIL=arisinfo.in@gmail.com
FRONTEND_URL=https://your-vercel-domain.vercel.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
NODE_ENV=production
```

**Important Notes:**
- The `EMAIL_PASS` should be your Gmail App Password (not your regular password)
- Make sure 2FA is enabled on your Gmail account
- The app password should be 16 characters without spaces (spaces will be automatically removed)
- Test the email functionality after deployment

### How to Add Environment Variables in Vercel:

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable with the values above
5. Make sure to set them for Production, Preview, and Development environments

## API Endpoints

The following API endpoints are available:

- `POST /api/contact` - Contact form submission (including brochure requests)
- `POST /api/newsletter` - Newsletter subscription
- `POST /api/roadmap` - Roadmap selection
- `GET /api/health` - Health check

## Email Service Configuration

The application uses Gmail SMTP with the following configuration:
- **Service**: Gmail
- **Host**: smtp.gmail.com
- **Port**: 587
- **Security**: TLS
- **Authentication**: App Password (not regular password)

## Deployment Steps

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add the environment variables listed above
4. Deploy your application
5. Test the contact forms and brochure functionality

## Testing

After deployment, test the following:
- Contact form submission from all pages
- Brochure download functionality
- Newsletter subscription
- Email notifications are being sent

## Troubleshooting

If emails are not being sent:
1. Verify the Gmail app password is correct
2. Check that 2FA is enabled on the Gmail account
3. Ensure the app password has the correct permissions
4. Check Vercel function logs for any errors
