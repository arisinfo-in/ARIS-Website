import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase app and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }
  
  try {
    console.log('🧪 Testing Firestore connection...');
    console.log('🔧 Firebase config:', {
      apiKey: process.env.FIREBASE_API_KEY ? 'Set' : 'Missing',
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID
    });
    
    // Test data
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'Test message from API',
      source: 'test',
      timestamp: Timestamp.now(),
      status: 'test',
      createdAt: Timestamp.now()
    };

    console.log('🔥 Attempting to store test data in Firestore...');
    
    // Try to store in contact-forms collection
    const docRef = await addDoc(collection(db, 'website-contacts', 'contact-forms'), testData);
    
    console.log('✅ Test data stored successfully:', docRef.id);
    
    res.status(200).json({
      success: true,
      message: 'Firestore test successful!',
      data: {
        documentId: docRef.id,
        timestamp: new Date().toISOString(),
        firebaseConfig: {
          projectId: process.env.FIREBASE_PROJECT_ID,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN
        }
      }
    });
    
  } catch (error) {
    console.error('❌ Firestore test error:', error);
    console.error('❌ Error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    
    res.status(500).json({
      success: false,
      message: 'Firestore test failed',
      error: error.message,
      details: {
        code: error.code,
        firebaseConfig: {
          projectId: process.env.FIREBASE_PROJECT_ID,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          apiKey: process.env.FIREBASE_API_KEY ? 'Set' : 'Missing'
        }
      }
    });
  }
}
