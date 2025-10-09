import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, set, get, child } from 'firebase/database';
import { ContactFormData, NewsletterData, RoadmapData } from '../types';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXoFyPkjgyspJy4cpqaPYHe70h-DqNf7k",
  authDomain: "aris-aidataanlayst.firebaseapp.com",
  databaseURL: "https://aris-aidataanlayst-default-rtdb.firebaseio.com",
  projectId: "aris-aidataanlayst",
  storageBucket: "aris-aidataanlayst.firebasestorage.app",
  messagingSenderId: "1038441051375",
  appId: "1:1038441051375:web:811f7401afc04b8e61171a",
  measurementId: "G-09B0ZGXG1B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

class FirebaseService {
  private db = database;

  // Store contact form submission
  async storeContactForm(data: ContactFormData): Promise<boolean> {
    try {
      console.log('🔥 Storing contact form in Firebase...');
      
      const contactRef = ref(this.db, 'website-contacts/contact-forms');
      const newContactRef = push(contactRef);
      
      const contactData = {
        ...data,
        timestamp: new Date().toISOString(),
        id: newContactRef.key,
        status: 'new',
        createdAt: Date.now()
      };

      await set(newContactRef, contactData);
      
      console.log('✅ Contact form stored successfully:', newContactRef.key);
      return true;
    } catch (error) {
      console.error('❌ Error storing contact form:', error);
      return false;
    }
  }

  // Store newsletter subscription
  async storeNewsletterSubscription(data: NewsletterData): Promise<boolean> {
    try {
      console.log('🔥 Storing newsletter subscription in Firebase...');
      
      const newsletterRef = ref(this.db, 'website-contacts/newsletter-subscriptions');
      const newNewsletterRef = push(newsletterRef);
      
      const newsletterData = {
        ...data,
        timestamp: new Date().toISOString(),
        id: newNewsletterRef.key,
        status: 'subscribed',
        createdAt: Date.now()
      };

      await set(newNewsletterRef, newsletterData);
      
      console.log('✅ Newsletter subscription stored successfully:', newNewsletterRef.key);
      return true;
    } catch (error) {
      console.error('❌ Error storing newsletter subscription:', error);
      return false;
    }
  }

  // Store brochure download request
  async storeBrochureDownload(data: ContactFormData): Promise<boolean> {
    try {
      console.log('🔥 Storing brochure download in Firebase...');
      
      const brochureRef = ref(this.db, 'website-contacts/brochure-downloads');
      const newBrochureRef = push(brochureRef);
      
      const brochureData = {
        ...data,
        timestamp: new Date().toISOString(),
        id: newBrochureRef.key,
        status: 'downloaded',
        createdAt: Date.now()
      };

      await set(newBrochureRef, brochureData);
      
      console.log('✅ Brochure download stored successfully:', newBrochureRef.key);
      return true;
    } catch (error) {
      console.error('❌ Error storing brochure download:', error);
      return false;
    }
  }

  // Store roadmap selection
  async storeRoadmapSelection(data: RoadmapData): Promise<boolean> {
    try {
      console.log('🔥 Storing roadmap selection in Firebase...');
      
      const roadmapRef = ref(this.db, 'website-contacts/roadmap-selections');
      const newRoadmapRef = push(roadmapRef);
      
      const roadmapData = {
        ...data,
        timestamp: new Date().toISOString(),
        id: newRoadmapRef.key,
        status: 'selected',
        createdAt: Date.now()
      };

      await set(newRoadmapRef, roadmapData);
      
      console.log('✅ Roadmap selection stored successfully:', newRoadmapRef.key);
      return true;
    } catch (error) {
      console.error('❌ Error storing roadmap selection:', error);
      return false;
    }
  }

  // Get all contact forms
  async getAllContactForms(): Promise<any[]> {
    try {
      const contactRef = ref(this.db, 'website-contacts/contact-forms');
      const snapshot = await get(contactRef);
      
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      }
      return [];
    } catch (error) {
      console.error('❌ Error fetching contact forms:', error);
      return [];
    }
  }

  // Get all newsletter subscriptions
  async getAllNewsletterSubscriptions(): Promise<any[]> {
    try {
      const newsletterRef = ref(this.db, 'website-contacts/newsletter-subscriptions');
      const snapshot = await get(newsletterRef);
      
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      }
      return [];
    } catch (error) {
      console.error('❌ Error fetching newsletter subscriptions:', error);
      return [];
    }
  }

  // Get all brochure downloads
  async getAllBrochureDownloads(): Promise<any[]> {
    try {
      const brochureRef = ref(this.db, 'website-contacts/brochure-downloads');
      const snapshot = await get(brochureRef);
      
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      }
      return [];
    } catch (error) {
      console.error('❌ Error fetching brochure downloads:', error);
      return [];
    }
  }

  // Get all roadmap selections
  async getAllRoadmapSelections(): Promise<any[]> {
    try {
      const roadmapRef = ref(this.db, 'website-contacts/roadmap-selections');
      const snapshot = await get(roadmapRef);
      
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      }
      return [];
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
