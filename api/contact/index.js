const nodemailer = require('nodemailer');

// Email service configuration
const createTransporter = () => {
  // Gmail SMTP configuration
  if (process.env.EMAIL_SERVICE === 'gmail') {
    return nodemailer.createTransporter({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }
  
  // SendGrid configuration
  if (process.env.EMAIL_SERVICE === 'sendgrid') {
    return nodemailer.createTransporter({
      service: 'SendGrid',
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY
      }
    });
  }
  
  // Mailgun configuration
  if (process.env.EMAIL_SERVICE === 'mailgun') {
    return nodemailer.createTransporter({
      service: 'Mailgun',
      auth: {
        user: process.env.MAILGUN_USER,
        pass: process.env.MAILGUN_API_KEY
      }
    });
  }
  
  throw new Error('No email service configured');
};

// Simple email validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Contact form validation
const validateContactForm = (data) => {
  const errors = [];
  
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters long' });
  }
  
  if (!data.email || typeof data.email !== 'string' || !isValidEmail(data.email.trim())) {
    errors.push({ field: 'email', message: 'Please provide a valid email address' });
  }
  
  if (!data.message || typeof data.message !== 'string' || data.message.trim().length < 10) {
    errors.push({ field: 'message', message: 'Message must be at least 10 characters long' });
  }
  
  if (data.company && typeof data.company === 'string' && data.company.trim().length > 200) {
    errors.push({ field: 'company', message: 'Company name must be less than 200 characters' });
  }
  
  if (data.phone && typeof data.phone === 'string' && (data.phone.trim().length < 10 || data.phone.trim().length > 15)) {
    errors.push({ field: 'phone', message: 'Phone number must be between 10 and 15 characters' });
  }
  
  if (data.service && typeof data.service === 'string' && data.service.trim().length > 100) {
    errors.push({ field: 'service', message: 'Service selection must be less than 100 characters' });
  }
  
  if (data.course && typeof data.course === 'string' && data.course.trim().length > 100) {
    errors.push({ field: 'course', message: 'Course selection must be less than 100 characters' });
  }
  
  if (!data.source || !['home', 'services', 'training', 'contact'].includes(data.source)) {
    errors.push({ field: 'source', message: 'Invalid source specified' });
  }
  
  return errors;
};

// Send email notification
const sendEmailNotification = async (formData) => {
  const transporter = createTransporter();
  
  const sourceMap = {
    'home': 'HOME',
    'services': 'SERVICES', 
    'training': 'TRAINING',
    'contact': 'CONTACT'
  };
  
  const sourceText = sourceMap[formData.source] || 'UNKNOWN';
  
  const mailOptions = {
    from: process.env.EMAIL_USER || 'arisinfo.in@gmail.com',
    to: process.env.CONTACT_EMAIL || 'arisinfo.in@gmail.com',
    subject: `New Contact Form Submission - ${sourceText}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f97316; border-bottom: 2px solid #f97316; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          ${formData.company ? `<p><strong>Company:</strong> ${formData.company}</p>` : ''}
          ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
          ${formData.service ? `<p><strong>Service of Interest:</strong> ${formData.service}</p>` : ''}
          ${formData.course ? `<p><strong>Course of Interest:</strong> ${formData.course}</p>` : ''}
          <p><strong>Source:</strong> ${sourceText}</p>
        </div>
        
        <div style="background: #e9ecef; padding: 20px; border-radius: 8px;">
          <h3 style="color: #333; margin-top: 0;">Message</h3>
          <p style="white-space: pre-wrap;">${formData.message}</p>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: #d1ecf1; border-radius: 8px;">
          <p style="margin: 0; color: #0c5460; font-size: 14px;">
            <strong>Submitted:</strong> ${new Date().toLocaleString()}
          </p>
        </div>
      </div>
    `
  };
  
  return await transporter.sendMail(mailOptions);
};

module.exports = async function handler(req, res) {
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
    
    // Validate form data
    const errors = validateContactForm(req.body);
    if (errors.length > 0) {
      console.log('❌ Validation errors:', errors);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }
    
    console.log('✅ Contact form validation passed');
    
    // Send email notification
    console.log('📧 Sending email notification...');
    await sendEmailNotification(req.body);
    console.log('✅ Email sent successfully');
    
    // Log successful submission
    console.log(`Contact form submitted from ${req.body.source}:`, {
      name: req.body.name,
      email: req.body.email,
      timestamp: new Date().toISOString()
    });
    
    res.status(200).json({
      success: true,
      message: "Thank you for your message! We'll get back to you within 24 hours.",
      data: {
        submittedAt: new Date().toISOString(),
        source: req.body.source
      }
    });
    
  } catch (error) {
    console.error('❌ Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email notification. Please try again later.'
    });
  }
}
