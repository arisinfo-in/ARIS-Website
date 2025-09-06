// Simple test script to verify backend API
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001';

async function testBackend() {
  console.log('🧪 Testing ARIS Backend API...\n');

  try {
    // Test 1: Health Check
    console.log('1. Testing Health Check...');
    const healthResponse = await axios.get(`${API_BASE_URL}/health`);
    console.log('✅ Health Check:', healthResponse.data.message);
    console.log('   Status:', healthResponse.data.status);
    console.log('   Uptime:', Math.round(healthResponse.data.uptime), 'seconds\n');

    // Test 2: Contact Form
    console.log('2. Testing Contact Form...');
    const contactData = {
      name: 'Test User',
      email: 'test@example.com',
      company: 'Test Company',
      message: 'This is a test message from the API test script.',
      source: 'home'
    };
    
    const contactResponse = await axios.post(`${API_BASE_URL}/api/contact`, contactData);
    console.log('✅ Contact Form:', contactResponse.data.message);
    console.log('   Success:', contactResponse.data.success);
    console.log('   Source:', contactResponse.data.data?.source, '\n');

    // Test 3: Newsletter Subscription
    console.log('3. Testing Newsletter Subscription...');
    const newsletterData = {
      email: 'test@example.com',
      source: 'test-script'
    };
    
    const newsletterResponse = await axios.post(`${API_BASE_URL}/api/newsletter`, newsletterData);
    console.log('✅ Newsletter:', newsletterResponse.data.message);
    console.log('   Success:', newsletterResponse.data.success);
    console.log('   Email:', newsletterResponse.data.data?.email, '\n');

    // Test 4: Roadmap Types
    console.log('4. Testing Roadmap Types...');
    const roadmapResponse = await axios.get(`${API_BASE_URL}/api/roadmap`);
    console.log('✅ Roadmap Types:', roadmapResponse.data.message);
    console.log('   Available Types:', roadmapResponse.data.data?.length || 0);
    roadmapResponse.data.data?.forEach(roadmap => {
      console.log(`   - ${roadmap.name} (${roadmap.id})`);
    });
    console.log('');

    // Test 5: Roadmap Selection
    console.log('5. Testing Roadmap Selection...');
    const roadmapSelectionData = {
      type: 'course',
      email: 'test@example.com',
      name: 'Test User',
      preferences: ['data-analysis', 'machine-learning']
    };
    
    const roadmapSelectionResponse = await axios.post(`${API_BASE_URL}/api/roadmap/selection`, roadmapSelectionData);
    console.log('✅ Roadmap Selection:', roadmapSelectionResponse.data.message);
    console.log('   Success:', roadmapSelectionResponse.data.success);
    console.log('   Type:', roadmapSelectionResponse.data.data?.roadmap?.name, '\n');

    console.log('🎉 All tests passed! Backend is working correctly.');
    console.log('\n📧 Check your email for notifications from the test submissions.');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data?.message || error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Make sure the backend is running:');
      console.log('   cd backend && npm run dev');
    }
    
    if (error.response?.status === 429) {
      console.log('\n💡 Rate limit exceeded. Wait a moment and try again.');
    }
  }
}

// Run the test
testBackend();
