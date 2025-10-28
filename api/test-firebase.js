import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('🔥 Testing Firebase configuration...');
    
    // Check if Firebase environment variables are present
    const requiredEnvVars = [
      'FIREBASE_API_KEY',
      'FIREBASE_AUTH_DOMAIN', 
      'FIREBASE_PROJECT_ID',
      'FIREBASE_STORAGE_BUCKET',
      'FIREBASE_MESSAGING_SENDER_ID',
      'FIREBASE_APP_ID'
    ];

    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      console.error('❌ Missing Firebase environment variables:', missingVars);
      return res.status(500).json({
        success: false,
        error: 'Missing Firebase environment variables',
        missingVariables: missingVars,
        message: 'Please add Firebase environment variables to Vercel deployment'
      });
    }

    console.log('✅ All Firebase environment variables present');

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    console.log('✅ Firebase initialized successfully');

    // Test data storage
    const testData = {
      name: 'Firebase Test',
      email: 'test@example.com',
      message: 'Testing Firebase connection from Vercel',
      source: 'test',
      timestamp: Timestamp.now(),
      status: 'test',
      createdAt: Timestamp.now()
    };

    const docRef = await addDoc(collection(db, 'contact-forms'), testData);
    console.log('✅ Test data stored successfully with ID:', docRef.id);

    res.status(200).json({
      success: true,
      message: 'Firebase configuration test successful',
      data: {
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'production',
        firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
        testDocumentId: docRef.id,
        environmentVariables: {
          FIREBASE_API_KEY: process.env.FIREBASE_API_KEY ? 'Present' : 'Missing',
          FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN ? 'Present' : 'Missing',
          FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID ? 'Present' : 'Missing',
          FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET ? 'Present' : 'Missing',
          FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID ? 'Present' : 'Missing',
          FIREBASE_APP_ID: process.env.FIREBASE_APP_ID ? 'Present' : 'Missing'
        }
      }
    });

  } catch (error) {
    console.error('❌ Firebase test failed:', error);
    
    res.status(500).json({
      success: false,
      error: 'Firebase test failed',
      message: error.message,
      details: {
        code: error.code,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
}
