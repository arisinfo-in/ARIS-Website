# Vercel 500 Error Troubleshooting Guide

## 🚨 IMMEDIATE FIX REQUIRED

Your Vercel deployment is still showing 500 errors because the environment variables are not properly configured. Follow these steps:

## Step 1: Test Your Vercel Function

First, test if your Vercel function is working at all:

**Visit this URL in your browser:**
```
https://your-app-name.vercel.app/api/test
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Test API is working",
  "data": {
    "timestamp": "2025-09-13T10:00:00.000Z",
    "environment": "production",
    "emailConfigured": false,
    "nodeVersion": "v18.x.x"
  }
}
```

If this fails, your Vercel deployment has a fundamental issue.

## Step 2: Configure Environment Variables

### Go to Vercel Dashboard:
1. Visit [vercel.com](https://vercel.com)
2. Login to your account
3. Find your ARIS project
4. Click on the project name

### Navigate to Settings:
1. Click **"Settings"** tab
2. Click **"Environment Variables"** in the left sidebar

### Add These Variables:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `EMAIL_USER` | `arisinfo.in@gmail.com` | Production |
| `EMAIL_PASS` | `yqhs zvme mbfy geos` | Production |
| `NODE_ENV` | `production` | Production |

### Important Notes:
- **EMAIL_PASS**: Must be exactly 16 characters, no spaces
- **Environment**: Select "Production" for all variables
- **Case Sensitive**: Variable names are case-sensitive

## Step 3: Redeploy

After adding environment variables:
1. Go to **"Deployments"** tab
2. Click **"Redeploy"** on the latest deployment
3. Wait for deployment to complete

## Step 4: Test Contact Form

1. Go to your live website
2. Fill out the contact form
3. Submit the form
4. Check if you get a success message

## Step 5: Check Vercel Function Logs

If still getting 500 errors:

1. Go to **"Functions"** tab in Vercel dashboard
2. Click on `api/contact`
3. Check the logs for error messages
4. Look for these specific errors:
   - "Missing email credentials"
   - "Invalid login"
   - "Authentication failed"

## Common Issues & Solutions

### Issue 1: "Missing email credentials"
**Solution:** Environment variables not set properly
- Double-check variable names are exact: `EMAIL_USER`, `EMAIL_PASS`
- Ensure they're set for Production environment
- Redeploy after adding variables

### Issue 2: "Invalid login" or "Authentication failed"
**Solution:** Gmail App Password issue
- Verify the App Password is correct (16 characters)
- Ensure 2FA is enabled on Gmail account
- Generate a new App Password if needed

### Issue 3: Function not found (404)
**Solution:** Deployment issue
- Check if the function file exists in `/api/contact.js`
- Ensure the file is committed to GitHub
- Redeploy the project

### Issue 4: CORS errors
**Solution:** Already handled in the code
- The function includes proper CORS headers
- This should not be the issue

## Testing Commands

### Test Contact Form API Directly:
```bash
curl -X POST https://your-app-name.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message",
    "source": "home"
  }'
```

### Expected Success Response:
```json
{
  "success": true,
  "message": "Thank you for your message! We'll get back to you within 24 hours.",
  "data": {
    "submittedAt": "2025-09-13T10:00:00.000Z",
    "source": "home",
    "emailNotificationSent": true
  }
}
```

## Emergency Fallback

If environment variables still don't work, the form will still submit successfully but won't send email notifications. This is better than a 500 error.

## Support

If you continue to have issues:
1. Share the exact error message from Vercel function logs
2. Confirm the test API (`/api/test`) works
3. Verify environment variables are set correctly

The form should work even without email notifications - the 500 error should be completely resolved.
