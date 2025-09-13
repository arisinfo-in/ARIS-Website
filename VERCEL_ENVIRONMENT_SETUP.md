# Vercel Environment Variables Setup Guide

## 🚨 CRITICAL: Fix 500 Error on Vercel

The 500 error you're experiencing is caused by missing environment variables in your Vercel deployment. Follow these steps to fix it:

## Step 1: Access Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and log in
2. Find your ARIS project in the dashboard
3. Click on your project name

## Step 2: Navigate to Environment Variables

1. Click on the **"Settings"** tab
2. Click on **"Environment Variables"** in the left sidebar

## Step 3: Add Required Environment Variables

Add these **EXACT** environment variables:

### Required Variables:

| Variable Name | Value | Description |
|---------------|-------|-------------|
| `EMAIL_USER` | `arisinfo.in@gmail.com` | Your Gmail address |
| `EMAIL_PASS` | `yqhs zvme mbfy geos` | Your Gmail App Password (16 characters, no spaces) |
| `NODE_ENV` | `production` | Environment type |

### Important Notes:

1. **EMAIL_PASS Format**: 
   - Must be exactly 16 characters
   - NO spaces (the code will remove them automatically)
   - This is your Gmail App Password, not your regular password

2. **Environment Scope**: 
   - Set for **Production** environment
   - You can also set for Preview if needed

## Step 4: Redeploy

1. After adding the environment variables, go to the **"Deployments"** tab
2. Click the **"Redeploy"** button on your latest deployment
3. Or push a new commit to trigger automatic deployment

## Step 5: Verify Fix

1. Go to your live website
2. Try submitting the contact form
3. Check the Vercel function logs for any errors

## Troubleshooting

### If you still get 500 errors:

1. **Check Vercel Function Logs**:
   - Go to your project dashboard
   - Click on "Functions" tab
   - Click on the failed function
   - Check the logs for specific error messages

2. **Verify Environment Variables**:
   - Make sure they're set for the correct environment
   - Check for typos in variable names
   - Ensure EMAIL_PASS has no spaces

3. **Test Email Credentials**:
   - Verify your Gmail App Password is correct
   - Make sure 2FA is enabled on your Gmail account
   - Try generating a new App Password if needed

## Expected Behavior After Fix

- ✅ Contact forms should submit successfully
- ✅ Brochure download form should work
- ✅ Email notifications should be sent
- ✅ No more 500 errors

## Support

If you continue to have issues, check the Vercel function logs and share the specific error messages for further assistance.
