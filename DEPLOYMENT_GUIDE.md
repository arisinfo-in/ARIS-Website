# ARIS Deployment Guide for Vercel

## Quick Fix for 404 Error

The 404 error you're experiencing is likely due to missing Vercel configuration. I've created the necessary files:

### Files Created:
1. `vercel.json` - Vercel configuration for SPA routing
2. `.vercelignore` - Excludes unnecessary files from deployment
3. `public/_redirects` - Backup SPA routing configuration

## Deployment Steps:

### 1. Commit and Push Changes
```bash
git add .
git commit -m "Add Vercel configuration for deployment"
git push origin main
```

### 2. Redeploy on Vercel
- Go to your Vercel dashboard
- Find your project
- Click "Redeploy" or trigger a new deployment
- Or simply push to your connected Git repository

### 3. Domain Configuration
If you're still having issues with your custom domain:

1. **Check DNS Settings:**
   - Ensure your domain's nameservers are pointing to Vercel
   - Vercel nameservers: `ns1.vercel-dns.com` and `ns2.vercel-dns.com`

2. **Domain Verification:**
   - Go to Vercel Dashboard → Project Settings → Domains
   - Verify your domain is properly configured
   - Check if there are any pending DNS changes

3. **Wait for Propagation:**
   - DNS changes can take 24-48 hours to fully propagate
   - Use `nslookup yourdomain.com` to check DNS status

### 4. Build Configuration
Your project is configured to:
- Build command: `npm run build`
- Output directory: `dist`
- Framework: Vite (React)

### 5. Environment Variables (if needed)
If your app uses environment variables:
- Go to Vercel Dashboard → Project Settings → Environment Variables
- Add any required variables (like API URLs, etc.)

## Troubleshooting:

### If still getting 404:
1. Check Vercel build logs for any errors
2. Ensure all dependencies are in `package.json` (not just devDependencies)
3. Verify the build completes successfully
4. Check if the domain is properly connected in Vercel dashboard

### If domain not working:
1. Verify nameserver configuration
2. Check domain status in Vercel dashboard
3. Wait for DNS propagation (up to 48 hours)
4. Try accessing via Vercel's default domain first

## Testing:
1. First test with Vercel's default domain (e.g., `your-project.vercel.app`)
2. If that works, the issue is with domain configuration
3. If that doesn't work, the issue is with the build/deployment

The configuration I've added should resolve the 404 error for your React SPA on Vercel.
