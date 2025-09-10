module.exports = function handler(req, res) {
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
    console.log('🔍 Contact form data received:', req.body);
    
    // Enhanced validation matching backend requirements
    const { name, email, company, phone, service, course, message, source } = req.body;
    const errors = [];
    
    // Name validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      errors.push({ field: 'name', message: 'Name must be at least 2 characters long' });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      errors.push({ field: 'email', message: 'Please provide a valid email address' });
    }
    
    // Message validation
    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      errors.push({ field: 'message', message: 'Message must be at least 10 characters long' });
    }
    
    // Source validation
    if (!source || !['home', 'services', 'training'].includes(source)) {
      errors.push({ field: 'source', message: 'Invalid source specified' });
    }
    
    // Optional fields validation
    if (company && typeof company === 'string' && company.trim().length > 200) {
      errors.push({ field: 'company', message: 'Company name must be less than 200 characters' });
    }
    
    if (phone && typeof phone === 'string' && (phone.trim().length < 10 || phone.trim().length > 15)) {
      errors.push({ field: 'phone', message: 'Phone number must be between 10 and 15 characters' });
    }
    
    if (service && typeof service === 'string' && service.trim().length > 100) {
      errors.push({ field: 'service', message: 'Service selection must be less than 100 characters' });
    }
    
    if (course && typeof course === 'string' && course.trim().length > 100) {
      errors.push({ field: 'course', message: 'Course selection must be less than 100 characters' });
    }
    
    if (errors.length > 0) {
      console.log('❌ Contact form validation errors:', errors);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }
    
    // Log the submission
    console.log('✅ Contact form submission:', {
      name,
      email,
      company,
      phone,
      service,
      course,
      message,
      source,
      timestamp: new Date().toISOString()
    });
    
    res.status(200).json({
      success: true,
      message: "Thank you for your message! We'll get back to you within 24 hours.",
      data: {
        submittedAt: new Date().toISOString(),
        source: source,
        emailNotificationSent: false // Vercel functions don't have email service
      }
    });
    
  } catch (error) {
    console.error('❌ Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.'
    });
  }
}
