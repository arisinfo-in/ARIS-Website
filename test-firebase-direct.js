import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, set, get } from 'firebase/database';

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

async function testFirebaseDirect() {
  console.log('🔥 Testing Firebase Direct Connection...\n');

  try {
    // Test 1: Store a test contact form
    console.log('1️⃣ Testing Contact Form Storage...');
    const contactRef = ref(database, 'website-contacts/contact-forms');
    const newContactRef = push(contactRef);
    
    const contactData = {
      name: 'Test User',
      email: 'test@example.com',
      company: 'Test Company',
      phone: '+1234567890',
      service: 'AI Training',
      course: 'Data Analytics',
      message: 'This is a direct Firebase test',
      source: 'test',
      timestamp: new Date().toISOString(),
      id: newContactRef.key,
      status: 'new',
      createdAt: Date.now()
    };

    await set(newContactRef, contactData);
    console.log('✅ Contact form stored successfully with ID:', newContactRef.key);
    console.log('');

    // Test 2: Store a test newsletter subscription
    console.log('2️⃣ Testing Newsletter Subscription Storage...');
    const newsletterRef = ref(database, 'website-contacts/newsletter-subscriptions');
    const newNewsletterRef = push(newsletterRef);
    
    const newsletterData = {
      email: 'newsletter@example.com',
      source: 'test',
      timestamp: new Date().toISOString(),
      id: newNewsletterRef.key,
      status: 'subscribed',
      createdAt: Date.now()
    };

    await set(newNewsletterRef, newsletterData);
    console.log('✅ Newsletter subscription stored successfully with ID:', newNewsletterRef.key);
    console.log('');

    // Test 3: Store a test brochure download
    console.log('3️⃣ Testing Brochure Download Storage...');
    const brochureRef = ref(database, 'website-contacts/brochure-downloads');
    const newBrochureRef = push(brochureRef);
    
    const brochureData = {
      name: 'Brochure User',
      email: 'brochure@example.com',
      phone: '+1234567890',
      source: 'brochure',
      timestamp: new Date().toISOString(),
      id: newBrochureRef.key,
      status: 'downloaded',
      createdAt: Date.now()
    };

    await set(newBrochureRef, brochureData);
    console.log('✅ Brochure download stored successfully with ID:', newBrochureRef.key);
    console.log('');

    // Test 4: Store a test roadmap selection
    console.log('4️⃣ Testing Roadmap Selection Storage...');
    const roadmapRef = ref(database, 'website-contacts/roadmap-selections');
    const newRoadmapRef = push(roadmapRef);
    
    const roadmapData = {
      type: 'course',
      email: 'roadmap@example.com',
      name: 'Roadmap User',
      preferences: ['AI', 'Data Analytics'],
      timestamp: new Date().toISOString(),
      id: newRoadmapRef.key,
      status: 'selected',
      createdAt: Date.now()
    };

    await set(newRoadmapRef, roadmapData);
    console.log('✅ Roadmap selection stored successfully with ID:', newRoadmapRef.key);
    console.log('');

    // Test 5: Retrieve and verify data
    console.log('5️⃣ Testing Data Retrieval...');
    const contactSnapshot = await get(contactRef);
    const newsletterSnapshot = await get(newsletterRef);
    const brochureSnapshot = await get(brochureRef);
    const roadmapSnapshot = await get(roadmapRef);

    console.log('✅ Contact Forms Count:', Object.keys(contactSnapshot.val() || {}).length);
    console.log('✅ Newsletter Subscriptions Count:', Object.keys(newsletterSnapshot.val() || {}).length);
    console.log('✅ Brochure Downloads Count:', Object.keys(brochureSnapshot.val() || {}).length);
    console.log('✅ Roadmap Selections Count:', Object.keys(roadmapSnapshot.val() || {}).length);
    console.log('');

    console.log('🎉 All Firebase tests completed successfully!');
    console.log('📊 Check your Firebase console to see the stored data:');
    console.log('🔗 https://console.firebase.google.com/project/aris-aidataanlayst/database');
    console.log('');
    console.log('📋 Test Data Summary:');
    console.log('- Contact Forms: Stored with complete user details');
    console.log('- Newsletter Subscriptions: Stored with email and source');
    console.log('- Brochure Downloads: Stored with contact information');
    console.log('- Roadmap Selections: Stored with preferences and type');

  } catch (error) {
    console.error('❌ Firebase test failed:', error);
    console.error('Error details:', error.message);
  }
}

// Run the test
testFirebaseDirect();
