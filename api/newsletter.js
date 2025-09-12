export default function handler(req, res) {
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
    console.log('🔍 Newsletter subscription data received:', req.body);
    
    // Enhanced validation
    const { email, source } = req.body;
    const errors = [];
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      errors.push({ field: 'email', message: 'Please provide a valid email address' });
    }
    
    // Source validation (optional)
    if (source && typeof source === 'string' && source.trim().length > 50) {
      errors.push({ field: 'source', message: 'Source must be less than 50 characters' });
    }
    
    if (errors.length > 0) {
      console.log('❌ Newsletter validation errors:', errors);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }
    
    // Log the subscription
    console.log('✅ Newsletter subscription:', {
      email,
      source: source || 'unknown',
      timestamp: new Date().toISOString()
    });
    
    res.status(200).json({
      success: true,
      message: 'Successfully subscribed to our newsletter!',
      data: {
        subscribedAt: new Date().toISOString(),
        email: email,
        source: source || 'unknown'
      }
    });
    
  } catch (error) {
    console.error('❌ Newsletter subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process newsletter subscription. Please try again later.'
    });
  }
}
