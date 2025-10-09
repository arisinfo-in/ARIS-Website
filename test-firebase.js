import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001';

async function testFirebaseIntegration() {
  console.log('🧪 Testing Firebase Integration...\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing Health Check...');
    const healthResponse = await axios.get(`${API_BASE_URL}/health`);
    console.log('✅ Health Check:', healthResponse.data);
    console.log('');

    // Test 2: Contact Form Submission
    console.log('2️⃣ Testing Contact Form Submission...');
    const contactData = {
      name: 'Test User',
      email: 'test@example.com',
      company: 'Test Company',
      phone: '+1234567890',
      service: 'AI Training',
      course: 'Data Analytics',
      message: 'This is a test contact form submission',
      source: 'test'
    };

    const contactResponse = await axios.post(`${API_BASE_URL}/api/contact`, contactData);
    console.log('✅ Contact Form Response:', contactResponse.data);
    console.log('');

    // Test 3: Newsletter Subscription
    console.log('3️⃣ Testing Newsletter Subscription...');
    const newsletterData = {
      email: 'newsletter@example.com',
      source: 'test'
    };

    const newsletterResponse = await axios.post(`${API_BASE_URL}/api/newsletter`, newsletterData);
    console.log('✅ Newsletter Response:', newsletterResponse.data);
    console.log('');

    // Test 4: Roadmap Selection
    console.log('4️⃣ Testing Roadmap Selection...');
    const roadmapData = {
      type: 'course',
      email: 'roadmap@example.com',
      name: 'Roadmap User',
      preferences: ['AI', 'Data Analytics']
    };

    const roadmapResponse = await axios.post(`${API_BASE_URL}/api/roadmap/selection`, roadmapData);
    console.log('✅ Roadmap Selection Response:', roadmapResponse.data);
    console.log('');

    // Test 5: Dashboard Statistics
    console.log('5️⃣ Testing Dashboard Statistics...');
    const statsResponse = await axios.get(`${API_BASE_URL}/api/dashboard/stats`);
    console.log('✅ Dashboard Stats:', statsResponse.data);
    console.log('');

    // Test 6: Get All Contact Forms
    console.log('6️⃣ Testing Get All Contact Forms...');
    const contactsResponse = await axios.get(`${API_BASE_URL}/api/dashboard/contacts`);
    console.log('✅ Contact Forms Count:', contactsResponse.data.data.length);
    console.log('');

    console.log('🎉 All Firebase tests completed successfully!');
    console.log('📊 Check your Firebase console to see the stored data:');
    console.log('🔗 https://console.firebase.google.com/project/aris-aidataanlayst/database');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    console.error('Stack:', error.stack);
  }
}

// Run the test
testFirebaseIntegration();
