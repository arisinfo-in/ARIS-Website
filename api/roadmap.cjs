module.exports = function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method === 'GET') {
    // Return available roadmap types
    try {
      const roadmapTypes = [
        {
          id: 'course',
          name: 'AI Data Analytics Course',
          description: 'Comprehensive course covering data analysis, machine learning, and AI implementation',
          duration: '8 weeks',
          level: 'Beginner to Intermediate'
        },
        {
          id: 'consulting',
          name: 'AI Consulting Services',
          description: 'Expert consultation for AI strategy, implementation, and optimization',
          duration: 'Ongoing',
          level: 'All Levels'
        },
        {
          id: 'workshop',
          name: 'AI Workshop Series',
          description: 'Hands-on workshops covering specific AI tools and techniques',
          duration: '1-3 days',
          level: 'Intermediate to Advanced'
        }
      ];
      
      res.status(200).json({
        success: true,
        message: 'Roadmap types retrieved successfully',
        data: roadmapTypes
      });
    } catch (error) {
      console.error('❌ Roadmap GET error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve roadmap types'
      });
    }
  } else if (req.method === 'POST') {
    // Handle roadmap selection
    try {
      console.log('🔍 Roadmap selection data received:', req.body);
      
      const { type, email, name, preferences } = req.body;
      const errors = [];
      
      // Type validation
      if (!type || !['course', 'consulting', 'workshop'].includes(type)) {
        errors.push({ field: 'type', message: 'Please select a valid roadmap type' });
      }
      
      // Email validation (optional for roadmap selection)
      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (typeof email !== 'string' || !emailRegex.test(email.trim())) {
          errors.push({ field: 'email', message: 'Please provide a valid email address' });
        }
      }
      
      // Name validation (optional)
      if (name && typeof name === 'string' && name.trim().length < 2) {
        errors.push({ field: 'name', message: 'Name must be at least 2 characters long' });
      }
      
      // Preferences validation (optional)
      if (preferences && !Array.isArray(preferences)) {
        errors.push({ field: 'preferences', message: 'Preferences must be an array' });
      }
      
      if (errors.length > 0) {
        console.log('❌ Roadmap selection validation errors:', errors);
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors
        });
      }
      
      // Log the selection
      console.log('✅ Roadmap selection:', {
        type,
        email: email || 'not provided',
        name: name || 'not provided',
        preferences: preferences || [],
        timestamp: new Date().toISOString()
      });
      
      res.status(200).json({
        success: true,
        message: 'Roadmap selection recorded successfully! We\'ll be in touch soon.',
        data: {
          selectedAt: new Date().toISOString(),
          type: type,
          email: email || null,
          name: name || null,
          preferences: preferences || []
        }
      });
      
    } catch (error) {
      console.error('❌ Roadmap selection error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to process roadmap selection. Please try again later.'
      });
    }
  } else {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }
}
