#!/usr/bin/env node

/**
 * 🔥 Firebase Data Storage Test
 * 
 * This script tests all the data storage functionality for:
 * - Contact forms
 * - Brochure downloads  
 * - Newsletter subscriptions
 * - Roadmap selections
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDXoFyPkjgyspJy4cpqaPYHe70h-DqNf7k',
  authDomain: 'aris-aidataanlayst.firebaseapp.com',
  projectId: 'aris-aidataanlayst',
  storageBucket: 'aris-aidataanlayst.firebasestorage.app',
  messagingSenderId: '1038441051375',
  appId: '1:1038441051375:web:811f7401afc04b8e61171a',
  measurementId: 'G-09B0ZGXG1B'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testAllDataStorage() {
  console.log('🔥 Testing Firebase Data Storage for ARIS Website...\n');

  try {
    // Test 1: Contact Form Storage
    console.log('1️⃣ Testing Contact Form Storage...');
    const contactData = {
      name: 'John Doe',
      email: 'john@example.com',
      company: 'ABC Corp',
      phone: '+1234567890',
      service: 'AI Training',
      course: 'Data Analytics',
      message: 'Interested in your AI training programs',
      source: 'home',
      timestamp: Timestamp.now(),
      status: 'new',
      createdAt: Timestamp.now()
    };
    
    const contactRef = await addDoc(collection(db, 'contact-forms'), contactData);
    console.log('✅ Contact form stored successfully with ID:', contactRef.id);
    console.log('');

    // Test 2: Brochure Download Storage
    console.log('2️⃣ Testing Brochure Download Storage...');
    const brochureData = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1234567890',
      company: 'XYZ Ltd',
      message: 'Requested to download Data Analytics Brochure',
      source: 'brochure',
      timestamp: Timestamp.now(),
      status: 'downloaded',
      createdAt: Timestamp.now()
    };
    
    const brochureRef = await addDoc(collection(db, 'brochure-downloads'), brochureData);
    console.log('✅ Brochure download stored successfully with ID:', brochureRef.id);
    console.log('');

    // Test 3: Newsletter Subscription Storage
    console.log('3️⃣ Testing Newsletter Subscription Storage...');
    const newsletterData = {
      email: 'subscriber@example.com',
      source: 'home',
      timestamp: Timestamp.now(),
      status: 'subscribed',
      createdAt: Timestamp.now()
    };
    
    const newsletterRef = await addDoc(collection(db, 'newsletter-subscriptions'), newsletterData);
    console.log('✅ Newsletter subscription stored successfully with ID:', newsletterRef.id);
    console.log('');

    // Test 4: Roadmap Selection Storage
    console.log('4️⃣ Testing Roadmap Selection Storage...');
    const roadmapData = {
      type: 'course',
      email: 'roadmap@example.com',
      name: 'Roadmap User',
      preferences: ['AI', 'Data Analytics', 'Machine Learning'],
      timestamp: Timestamp.now(),
      status: 'selected',
      createdAt: Timestamp.now()
    };
    
    const roadmapRef = await addDoc(collection(db, 'roadmap-selections'), roadmapData);
    console.log('✅ Roadmap selection stored successfully with ID:', roadmapRef.id);
    console.log('');

    // Test 5: Data Retrieval Test
    console.log('5️⃣ Testing Data Retrieval...');
    
    // Get contact forms count
    const contactFormsSnapshot = await getDocs(collection(db, 'contact-forms'));
    console.log('📊 Total contact forms:', contactFormsSnapshot.size);
    
    // Get brochure downloads count
    const brochureSnapshot = await getDocs(collection(db, 'brochure-downloads'));
    console.log('📊 Total brochure downloads:', brochureSnapshot.size);
    
    // Get newsletter subscriptions count
    const newsletterSnapshot = await getDocs(collection(db, 'newsletter-subscriptions'));
    console.log('📊 Total newsletter subscriptions:', newsletterSnapshot.size);
    
    // Get roadmap selections count
    const roadmapSnapshot = await getDocs(collection(db, 'roadmap-selections'));
    console.log('📊 Total roadmap selections:', roadmapSnapshot.size);
    
    const totalLeads = contactFormsSnapshot.size + brochureSnapshot.size + newsletterSnapshot.size + roadmapSnapshot.size;
    console.log('📊 Total leads:', totalLeads);
    console.log('');

    console.log('🎉 All Firebase data storage tests completed successfully!');
    console.log('✅ Contact forms are being stored in: contact-forms collection');
    console.log('✅ Brochure downloads are being stored in: brochure-downloads collection');
    console.log('✅ Newsletter subscriptions are being stored in: newsletter-subscriptions collection');
    console.log('✅ Roadmap selections are being stored in: roadmap-selections collection');
    console.log('');
    console.log('🔥 Firebase integration is working correctly!');

  } catch (error) {
    console.error('❌ Firebase test failed:', error.message);
    console.error('Error code:', error.code);
    console.error('Stack trace:', error.stack);
  }
}

// Run the test
testAllDataStorage();