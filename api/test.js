module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  try {
    console.log('🧪 Test API called');
    console.log('🔍 Environment check:', {
      NODE_ENV: process.env.NODE_ENV,
      hasEmailUser: !!process.env.EMAIL_USER,
      hasEmailPass: !!process.env.EMAIL_PASS,
      timestamp: new Date().toISOString()
    });
    
    res.status(200).json({
      success: true,
      message: 'Test API is working',
      data: {
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'unknown',
        emailConfigured: !!(process.env.EMAIL_USER && process.env.EMAIL_PASS),
        nodeVersion: process.version
      }
    });
    
  } catch (error) {
    console.error('❌ Test API error:', error);
    res.status(500).json({
      success: false,
      message: 'Test API error',
      error: error.message
    });
  }
}
