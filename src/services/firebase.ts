import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDXoFyPkjgyspJy4cpqaPYHe70h-DqNf7k",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "aris-aidataanlayst.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "aris-aidataanlayst",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "aris-aidataanlayst.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1038441051375",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1038441051375:web:811f7401afc04b8e61171a",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-09B0ZGXG1B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Brochure file paths in Firebase Storage
const BROCHURE_PATHS: Record<string, string> = {
  'data-analytics': 'brochures/ARIS Data Analytics & AI Course Broucher.pdf',
  'vibe-analytics': 'brochures/ARIS Vibe Analytics Course Broucher.pdf.pdf',
  'prompting-ai-tools': 'brochures/ARIS Prompting & AI Tools Brochure.pdf.pdf'
};

/**
 * Get download URL for a brochure from Firebase Storage
 * @param brochureId - The ID of the brochure (data-analytics, vibe-analytics, prompting-ai-tools)
 * @returns Promise<string> - The download URL for the brochure
 */
export const getBrochureUrl = async (brochureId: string): Promise<string> => {
  try {
    const storagePath = BROCHURE_PATHS[brochureId];
    if (!storagePath) {
      throw new Error(`Brochure ID "${brochureId}" not found`);
    }

    const storageRef = ref(storage, storagePath);
    const downloadURL = await getDownloadURL(storageRef);
    
    console.log('[FIREBASE STORAGE] Brochure URL retrieved:', { brochureId, downloadURL });
    return downloadURL;
  } catch (error) {
    console.error('[FIREBASE STORAGE] Error getting brochure URL:', error);
    throw error;
  }
};

/**
 * Get all brochure URLs at once (for preloading)
 */
export const getAllBrochureUrls = async (): Promise<Record<string, string>> => {
  const urls: Record<string, string> = {};
  
  try {
    const promises = Object.keys(BROCHURE_PATHS).map(async (brochureId) => {
      try {
        const url = await getBrochureUrl(brochureId);
        urls[brochureId] = url;
      } catch (error) {
        console.error(`[FIREBASE STORAGE] Failed to get URL for ${brochureId}:`, error);
      }
    });
    
    await Promise.all(promises);
    return urls;
  } catch (error) {
    console.error('[FIREBASE STORAGE] Error getting all brochure URLs:', error);
    return urls;
  }
};

export default { getBrochureUrl, getAllBrochureUrls };

