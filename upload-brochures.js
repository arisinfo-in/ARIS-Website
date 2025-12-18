#!/usr/bin/env node

/**
 * Script to upload brochure PDFs to Firebase Storage
 * 
 * Usage:
 * 1. Get Firebase service account key:
 *    - Go to Firebase Console → Project Settings → Service Accounts
 *    - Click "Generate new private key"
 *    - Save the JSON file
 * 
 * 2. Set environment variable:
 *    export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account-key.json"
 * 
 * 3. Run the script:
 *    node upload-brochures.js
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Firebase configuration
const firebaseConfig = {
  projectId: 'aris-aidataanlayst',
  storageBucket: 'aris-aidataanlayst.firebasestorage.app',
};

// Initialize Firebase Admin
let app;
try {
  // Try to use service account from environment variable
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    if (!fs.existsSync(serviceAccountPath)) {
      throw new Error(`Service account file not found: ${serviceAccountPath}`);
    }
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    app = initializeApp({
      credential: cert(serviceAccount),
      storageBucket: firebaseConfig.storageBucket,
    });
    console.log('✅ Using service account credentials');
  } else {
    // Try to use default credentials (gcloud auth application-default login)
    app = initializeApp({
      projectId: firebaseConfig.projectId,
      storageBucket: firebaseConfig.storageBucket,
    });
    console.log('✅ Using default application credentials');
  }
} catch (error) {
  console.error('❌ Error initializing Firebase Admin:', error.message);
  console.log('\n📝 To fix this:');
  console.log('1. Get service account key from Firebase Console:');
  console.log('   https://console.firebase.google.com/project/aris-aidataanlayst/settings/serviceaccounts/adminsdk');
  console.log('2. Download the JSON key file');
  console.log('3. Set environment variable:');
  console.log('   export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account-key.json"');
  console.log('4. Run this script again');
  process.exit(1);
}

const bucket = getStorage().bucket();

// Brochure files to upload
const brochures = [
  {
    localPath: path.join(__dirname, 'public', 'ARIS Data Analytics & AI Course Broucher.pdf'),
    storagePath: 'brochures/ARIS Data Analytics & AI Course Broucher.pdf',
    name: 'ARIS Data Analytics & AI Course Broucher.pdf'
  },
  {
    localPath: path.join(__dirname, 'public', 'ARIS Vibe Analytics Course Broucher.pdf.pdf'),
    storagePath: 'brochures/ARIS Vibe Analytics Course Broucher.pdf.pdf',
    name: 'ARIS Vibe Analytics Course Broucher.pdf.pdf'
  },
  {
    localPath: path.join(__dirname, 'public', 'ARIS Prompting & AI Tools Brochure.pdf.pdf'),
    storagePath: 'brochures/ARIS Prompting & AI Tools Brochure.pdf.pdf',
    name: 'ARIS Prompting & AI Tools Brochure.pdf.pdf'
  }
];

async function uploadBrochures() {
  console.log('🔥 Starting brochure upload to Firebase Storage...\n');

  // Verify all files exist
  for (const brochure of brochures) {
    if (!fs.existsSync(brochure.localPath)) {
      console.error(`❌ File not found: ${brochure.localPath}`);
      process.exit(1);
    }
  }

  console.log('✅ All brochure files found\n');

  for (const brochure of brochures) {
    try {
      console.log(`📤 Uploading: ${brochure.name}...`);
      
      // Check if file already exists
      const file = bucket.file(brochure.storagePath);
      const [exists] = await file.exists();
      
      if (exists) {
        console.log(`   ⚠️  File already exists. Skipping...`);
        // Get existing URL
        const [url] = await file.getSignedUrl({
          action: 'read',
          expires: '03-09-2491',
        });
        console.log(`   📎 Existing URL: ${url}\n`);
        continue;
      }

      // Upload file to Firebase Storage
      await bucket.upload(brochure.localPath, {
        destination: brochure.storagePath,
        metadata: {
          contentType: 'application/pdf',
          cacheControl: 'public, max-age=31536000',
        },
      });

      // Make file publicly readable
      await file.makePublic();

      // Get public URL
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: '03-09-2491', // Far future date
      });

      console.log(`✅ Uploaded successfully: ${brochure.name}`);
      console.log(`   📎 URL: ${url}\n`);
    } catch (error) {
      console.error(`❌ Error uploading ${brochure.name}:`, error.message);
      if (error.code === 'ENOENT') {
        console.error(`   File not found: ${brochure.localPath}`);
      } else if (error.code === 403) {
        console.error(`   Permission denied. Check Firebase Storage rules allow write access.`);
      }
    }
  }

  console.log('🎉 Upload process completed!');
  console.log('\n📝 Next steps:');
  console.log('1. Verify files in Firebase Console → Storage → brochures/');
  console.log('2. Check Storage Rules allow public read access for /brochures/{fileName}');
  console.log('3. Test brochure download/view in your application');
}

uploadBrochures().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});

