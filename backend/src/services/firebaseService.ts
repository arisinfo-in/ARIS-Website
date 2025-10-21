import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { ContactFormData, NewsletterData, RoadmapData } from '../types';

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

// Validate Firebase configuration
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
  console.error('❌ Missing required Firebase environment variables:', missingVars);
  console.error('📝 Please check your .env file and ensure all Firebase credentials are set');
  throw new Error(`Missing Firebase environment variables: ${missingVars.join(', ')}`);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

class FirebaseService {
  private db = db;

  // Store contact form submission
  async storeContactForm(data: ContactFormData): Promise<boolean> {
    try {
      console.log('🔥 Storing contact form in Firestore...');
      
      const contactData = {
        ...data,
        timestamp: Timestamp.now(),
        status: 'new',
        createdAt: Timestamp.now()
      };

      const docRef = await addDoc(collection(this.db, 'website-contacts', 'contact-forms'), contactData);
      
      console.log('✅ Contact form stored successfully:', docRef.id);
      return true;
    } catch (error) {
      console.error('❌ Error storing contact form:', error);
      return false;
    }
  }

  // Store newsletter subscription
  async storeNewsletterSubscription(data: NewsletterData): Promise<boolean> {
    try {
      console.log('🔥 Storing newsletter subscription in Firestore...');
      
      const newsletterData = {
        ...data,
        timestamp: Timestamp.now(),
        status: 'subscribed',
        createdAt: Timestamp.now()
      };

      const docRef = await addDoc(collection(this.db, 'website-contacts', 'newsletter-subscriptions'), newsletterData);
      
      console.log('✅ Newsletter subscription stored successfully:', docRef.id);
      return true;
    } catch (error) {
      console.error('❌ Error storing newsletter subscription:', error);
      return false;
    }
  }

  // Store brochure download request
  async storeBrochureDownload(data: ContactFormData): Promise<boolean> {
    try {
      console.log('🔥 Storing brochure download in Firestore...');
      
      const brochureData = {
        ...data,
        timestamp: Timestamp.now(),
        status: 'downloaded',
        createdAt: Timestamp.now()
      };

      const docRef = await addDoc(collection(this.db, 'website-contacts', 'brochure-downloads'), brochureData);
      
      console.log('✅ Brochure download stored successfully:', docRef.id);
      return true;
    } catch (error) {
      console.error('❌ Error storing brochure download:', error);
      return false;
    }
  }

  // Store roadmap selection
  async storeRoadmapSelection(data: RoadmapData): Promise<boolean> {
    try {
      console.log('🔥 Storing roadmap selection in Firestore...');
      
      const roadmapData = {
        ...data,
        timestamp: Timestamp.now(),
        status: 'selected',
        createdAt: Timestamp.now()
      };

      const docRef = await addDoc(collection(this.db, 'website-contacts', 'roadmap-selections'), roadmapData);
      
      console.log('✅ Roadmap selection stored successfully:', docRef.id);
      return true;
    } catch (error) {
      console.error('❌ Error storing roadmap selection:', error);
      return false;
    }
  }

  // Get all contact forms
  async getAllContactForms(): Promise<any[]> {
    try {
      const contactFormsRef = collection(this.db, 'website-contacts', 'contact-forms');
      const q = query(contactFormsRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('❌ Error fetching contact forms:', error);
      return [];
    }
  }

  // Get all newsletter subscriptions
  async getAllNewsletterSubscriptions(): Promise<any[]> {
    try {
      const newsletterRef = collection(this.db, 'website-contacts', 'newsletter-subscriptions');
      const q = query(newsletterRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('❌ Error fetching newsletter subscriptions:', error);
      return [];
    }
  }

  // Get all brochure downloads
  async getAllBrochureDownloads(): Promise<any[]> {
    try {
      const brochureRef = collection(this.db, 'website-contacts', 'brochure-downloads');
      const q = query(brochureRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('❌ Error fetching brochure downloads:', error);
      return [];
    }
  }

  // Get all roadmap selections
  async getAllRoadmapSelections(): Promise<any[]> {
    try {
      const roadmapRef = collection(this.db, 'website-contacts', 'roadmap-selections');
      const q = query(roadmapRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('❌ Error fetching roadmap selections:', error);
      return [];
    }
  }

  // Get dashboard statistics
  async getDashboardStats(): Promise<any> {
    try {
      const [contactForms, newsletterSubs, brochureDownloads, roadmapSelections] = await Promise.all([
        this.getAllContactForms(),
        this.getAllNewsletterSubscriptions(),
        this.getAllBrochureDownloads(),
        this.getAllRoadmapSelections()
      ]);

      return {
        totalContactForms: contactForms.length,
        totalNewsletterSubscriptions: newsletterSubs.length,
        totalBrochureDownloads: brochureDownloads.length,
        totalRoadmapSelections: roadmapSelections.length,
        totalLeads: contactForms.length + newsletterSubs.length + brochureDownloads.length + roadmapSelections.length
      };
    } catch (error) {
      console.error('❌ Error fetching dashboard stats:', error);
      return {
        totalContactForms: 0,
        totalNewsletterSubscriptions: 0,
        totalBrochureDownloads: 0,
        totalRoadmapSelections: 0,
        totalLeads: 0
      };
    }
  }
}

export default new FirebaseService();
