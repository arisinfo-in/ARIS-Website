# 🔥 Firebase Storage - Brochure Upload Guide

## Overview
The brochure PDFs are now served from **Firebase Storage** instead of static files. This ensures reliable file serving on Vercel and all platforms.

## 📁 Firebase Storage Structure

Upload your PDFs to Firebase Storage in the following structure:

```
Firebase Storage Root
└── brochures/
    ├── ARIS Data Analytics & AI Course Broucher.pdf
    ├── ARIS Vibe Analytics Course Broucher.pdf.pdf
    └── ARIS Prompting & AI Tools Brochure.pdf.pdf
```

## 📤 Step-by-Step Upload Instructions

### **Step 1: Access Firebase Console**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **aris-aidataanlayst**
3. Click on **"Storage"** in the left sidebar

### **Step 2: Create Brochures Folder**
1. Click **"Get Started"** if Storage is not initialized
2. Click **"Create folder"** or navigate to root
3. Create a folder named: `brochures`

### **Step 3: Upload PDF Files**
1. Navigate into the `brochures` folder
2. Click **"Upload file"**
3. Upload these three files with **EXACT** names:
   - `ARIS Data Analytics & AI Course Broucher.pdf`
   - `ARIS Vibe Analytics Course Broucher.pdf.pdf`
   - `ARIS Prompting & AI Tools Brochure.pdf.pdf`

### **Step 4: Set Storage Rules (Important!)**
1. Go to **Storage** → **Rules** tab
2. Update the rules to allow public read access for brochures:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow public read access to brochures
    match /brochures/{fileName} {
      allow read: if true;
      allow write: if request.auth != null; // Only authenticated users can upload
    }
    
    // Other storage rules...
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. Click **"Publish"** to save the rules

## ✅ Verification

After uploading, verify the files are accessible:
1. Click on each PDF file in Firebase Storage
2. Copy the **Download URL** from the file details
3. Test the URL in a browser - it should download/open the PDF

## 🔧 Code Configuration

The code is already configured to use these paths:
- `brochures/ARIS Data Analytics & AI Course Broucher.pdf`
- `brochures/ARIS Vibe Analytics Course Broucher.pdf.pdf`
- `brochures/ARIS Prompting & AI Tools Brochure.pdf.pdf`

## 🚀 After Upload

Once files are uploaded:
1. The brochure modal will automatically fetch URLs from Firebase Storage
2. No code changes needed - it's already implemented!
3. Test the brochure download/view functionality

## 📝 Notes

- **File names must match exactly** (including spaces and capitalization)
- **Public read access is required** for brochures to work
- **Firebase Storage URLs are permanent** and work on all platforms
- **No Vercel configuration needed** - Firebase handles file serving

## 🆘 Troubleshooting

### If brochures don't load:
1. Check Firebase Storage rules allow public read access
2. Verify file names match exactly (case-sensitive)
3. Check browser console for Firebase errors
4. Verify Firebase configuration in `src/services/firebase.ts`

### If you see "Permission denied":
- Update Storage rules to allow public read for `/brochures/{fileName}`

### If files are not found:
- Verify files are in the `brochures/` folder (not root)
- Check file names match exactly (including `.pdf` extension)

