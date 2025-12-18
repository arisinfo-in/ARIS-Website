# 📤 Upload Brochures to Firebase Storage - Guide

This guide will help you upload the brochure PDFs to Firebase Storage so they can be accessed from your Vercel-deployed website.

## 🎯 Quick Start (Easiest Method)

### Option 1: Firebase Console (Recommended - No Code Required)

1. **Open Firebase Console**
   - Go to: https://console.firebase.google.com/project/aris-aidataanlayst/storage
   - Sign in with your Google account

2. **Create Brochures Folder**
   - Click "Get Started" if Storage is not initialized
   - Click "Create folder" button
   - Name it: `brochures`
   - Click "Create"

3. **Upload PDF Files**
   - Navigate into the `brochures` folder
   - Click "Upload file" button
   - Upload these three files (one at a time) with **EXACT** names:
     - `ARIS Data Analytics & AI Course Broucher.pdf`
     - `ARIS Vibe Analytics Course Broucher.pdf.pdf`
     - `ARIS Prompting & AI Tools Brochure.pdf.pdf`
   - Files are located in: `public/` folder of this project

4. **Make Files Public**
   - After uploading each file, click on it
   - Click the three dots menu (⋮) → "Get download URL"
   - Or go to Storage → Rules and ensure public read access

5. **Set Storage Rules** (Important!)
   - Go to Storage → Rules tab
   - Update rules to allow public read access:
   ```javascript
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       // Allow public read access to brochures
       match /brochures/{fileName} {
         allow read: if true;
         allow write: if request.auth != null;
       }
       
       // Other storage rules...
       match /{allPaths=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```
   - Click "Publish"

---

## 🤖 Automated Upload (Using Script)

### Prerequisites

1. **Get Firebase Service Account Key**
   - Go to: https://console.firebase.google.com/project/aris-aidataanlayst/settings/serviceaccounts/adminsdk
   - Click "Generate new private key"
   - Save the JSON file (e.g., `firebase-service-account.json`)
   - ⚠️ **Keep this file secure - don't commit it to Git!**

2. **Set Environment Variable**
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="/path/to/firebase-service-account.json"
   ```

### Run the Upload Script

```bash
npm run upload-brochures
```

Or directly:
```bash
node upload-brochures.js
```

The script will:
- ✅ Check if all PDF files exist
- 📤 Upload each file to `brochures/` folder in Firebase Storage
- 🔓 Make files publicly readable
- 📎 Display the public URLs for each file

---

## ✅ Verification

After uploading (either method):

1. **Check Firebase Console**
   - Go to Storage → `brochures/` folder
   - Verify all 3 PDF files are there

2. **Test File Access**
   - Click on each file in Firebase Console
   - Copy the "Download URL"
   - Open in browser - should display/download the PDF

3. **Test in Application**
   - Deploy your changes to Vercel
   - Open the brochure modal
   - Fill out the form
   - Click "Download PDF" or "View Online"
   - Should successfully download/view the PDF

---

## 🔧 Troubleshooting

### Files not uploading?
- ✅ Check file names match exactly (case-sensitive)
- ✅ Verify files exist in `public/` folder
- ✅ Check Firebase Storage rules allow write access

### Files not accessible after upload?
- ✅ Verify Storage Rules allow public read for `/brochures/{fileName}`
- ✅ Check file permissions in Firebase Console
- ✅ Try getting a new download URL from Firebase Console

### Script fails with "Permission denied"?
- ✅ Verify service account has Storage Admin role
- ✅ Check `GOOGLE_APPLICATION_CREDENTIALS` path is correct
- ✅ Ensure service account JSON file is valid

### Files show 404 in application?
- ✅ Verify file paths in code match Firebase Storage paths exactly
- ✅ Check Firebase Storage rules
- ✅ Verify Firebase configuration in your app

---

## 📝 File Structure in Firebase Storage

```
Firebase Storage Root
└── brochures/
    ├── ARIS Data Analytics & AI Course Broucher.pdf
    ├── ARIS Vibe Analytics Course Broucher.pdf.pdf
    └── ARIS Prompting & AI Tools Brochure.pdf.pdf
```

---

## 🚀 After Upload

Once files are uploaded and accessible:

1. ✅ Your application code is already configured to use these paths
2. ✅ No code changes needed
3. ✅ Test the brochure functionality on Vercel
4. ✅ Brochures will work reliably across all platforms

---

## 📞 Need Help?

If you encounter issues:
1. Check Firebase Console → Storage → Files
2. Check Firebase Console → Storage → Rules
3. Check browser console for errors
4. Verify Firebase configuration in your app

