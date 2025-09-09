// Roadmap types data
const roadmapTypes = [
  {
    id: 'course',
    name: 'AI Course',
    description: 'Comprehensive AI training programs',
    duration: '8-12 weeks',
    level: 'Beginner to Advanced'
  },
  {
    id: 'consulting',
    name: 'AI Consulting',
    description: 'Strategic AI implementation guidance',
    duration: '4-8 weeks',
    level: 'Business Focus'
  },
  {
    id: 'workshop',
    name: 'AI Workshop',
    description: 'Intensive hands-on AI sessions',
    duration: '1-3 days',
    level: 'Practical Skills'
  }
];

// Simple email validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Roadmap validation
const validateRoadmap = (data) => {
  const errors = [];
  
  if (!data.type || !['course', 'consulting', 'workshop'].includes(data.type)) {
    errors.push({ field: 'type', message: 'Invalid roadmap type specified' });
  }
  
  if (data.email && typeof data.email === 'string' && !isValidEmail(data.email.trim())) {
    errors.push({ field: 'email', message: 'Please provide a valid email address' });
  }
  
  if (data.name && typeof data.name === 'string' && (data.name.trim().length < 2 || data.name.trim().length > 100)) {
    errors.push({ field: 'name', message: 'Name must be between 2 and 100 characters' });
  }
  
  if (data.preferences && !Array.isArray(data.preferences)) {
    errors.push({ field: 'preferences', message: 'Preferences must be an array' });
  }
  
  if (data.preferences && Array.isArray(data.preferences)) {
    data.preferences.forEach((pref, index) => {
      if (typeof pref === 'string' && pref.trim().length > 100) {
        errors.push({ field: `preferences[${index}]`, message: 'Each preference must be less than 100 characters' });
      }
    });
  }
  
  return errors;
};

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method === 'GET') {
    // Return roadmap types
    try {
      console.log('📋 Roadmap types requested');
      res.status(200).json({
        success: true,
        message: 'Roadmap types retrieved successfully',
        data: roadmapTypes
      });
    } catch (error) {
      console.error('❌ Roadmap types error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve roadmap types'
      });
    }
    return;
  }
  
  if (req.method === 'POST') {
    try {
      console.log('🔍 Roadmap selection data received:', req.body);
      
      // Validate roadmap data
      const errors = validateRoadmap(req.body);
      if (errors.length > 0) {
        console.log('❌ Roadmap validation errors:', errors);
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors
        });
      }
      
      console.log('✅ Roadmap validation passed');
      
      // Log successful selection
      console.log(`Roadmap selection for ${req.body.type}:`, {
        email: req.body.email || 'not provided',
        name: req.body.name || 'not provided',
        preferences: req.body.preferences || [],
        timestamp: new Date().toISOString()
      });
      
      res.status(200).json({
        success: true,
        message: 'Roadmap selection recorded successfully',
        data: {
          selectedAt: new Date().toISOString(),
          type: req.body.type,
          roadmap: roadmapTypes.find(rt => rt.id === req.body.type)
        }
      });
      
    } catch (error) {
      console.error('❌ Roadmap selection error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to process roadmap selection. Please try again later.'
      });
    }
    return;
  }
  
  res.status(405).json({ 
    success: false, 
    message: 'Method not allowed' 
  });
}
