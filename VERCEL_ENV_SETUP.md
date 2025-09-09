# Vercel Environment Variables Setup

## Required Environment Variables

Add these environment variables in your Vercel dashboard under **Project Settings > Environment Variables**:

### Email Configuration (Choose one)

#### Option 1: Gmail SMTP (Recommended)
```
EMAIL_SERVICE=gmail
EMAIL_USER=arisinfo.in@gmail.com
EMAIL_PASS=your-app-password
```

#### Option 2: SendGrid
```
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=your-sendgrid-api-key
```

#### Option 3: Mailgun
```
EMAIL_SERVICE=mailgun
MAILGUN_USER=your-mailgun-user
MAILGUN_API_KEY=your-mailgun-api-key
```

### Email Recipients
```
CONTACT_EMAIL=arisinfo.in@gmail.com
ADMIN_EMAIL=arisinfo.in@gmail.com
```

### Environment
```
NODE_ENV=production
```

## How to Add Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** tab
4. Click on **Environment Variables**
5. Add each variable with its value
6. Make sure to set them for **Production** environment
7. Click **Save**

## Gmail App Password Setup

If using Gmail SMTP:

1. Enable 2-Factor Authentication on your Gmail account
2. Go to Google Account settings
3. Navigate to **Security** > **2-Step Verification**
4. Scroll down to **App passwords**
5. Generate a new app password for "Mail"
6. Use this password as `EMAIL_PASS` (not your regular Gmail password)

## Testing

After setting up environment variables:

1. Push your code to GitHub
2. Vercel will automatically deploy
3. Test the forms on your live site
4. Check Vercel function logs if there are any issues
