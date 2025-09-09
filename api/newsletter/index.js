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

// Newsletter validation
const validateNewsletter = (data) => {
  const errors = [];
  
  if (!data.email || typeof data.email !== 'string' || !isValidEmail(data.email.trim())) {
    errors.push({ field: 'email', message: 'Please provide a valid email address' });
  }
  
  if (data.source && typeof data.source === 'string' && data.source.trim().length > 50) {
    errors.push({ field: 'source', message: 'Source must be less than 50 characters' });
  }
  
  return errors;
};

// Send newsletter subscription email
const sendNewsletterEmail = async (emailData) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_USER || 'arisinfo.in@gmail.com',
    to: process.env.ADMIN_EMAIL || 'arisinfo.in@gmail.com',
    subject: 'New Newsletter Subscription',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f97316; border-bottom: 2px solid #f97316; padding-bottom: 10px;">
          New Newsletter Subscription
        </h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Subscription Details</h3>
          <p><strong>Email:</strong> ${emailData.email}</p>
          ${emailData.source ? `<p><strong>Source:</strong> ${emailData.source}</p>` : ''}
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: #d1ecf1; border-radius: 8px;">
          <p style="margin: 0; color: #0c5460; font-size: 14px;">
            <strong>Subscribed:</strong> ${new Date().toLocaleString()}
          </p>
        </div>
      </div>
    `
  };
  
  return await transporter.sendMail(mailOptions);
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
  
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }
  
  try {
    console.log('🔍 Newsletter subscription data received:', req.body);
    
    // Validate newsletter data
    const errors = validateNewsletter(req.body);
    if (errors.length > 0) {
      console.log('❌ Newsletter validation errors:', errors);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }
    
    console.log('✅ Newsletter validation passed');
    
    // Send email notification
    console.log('📧 Sending newsletter subscription email...');
    await sendNewsletterEmail(req.body);
    console.log('✅ Newsletter email sent successfully');
    
    // Log successful subscription
    console.log(`Newsletter subscription from ${req.body.source || 'unknown'}:`, {
      email: req.body.email,
      timestamp: new Date().toISOString()
    });
    
    res.status(200).json({
      success: true,
      message: 'Successfully subscribed to our newsletter!',
      data: {
        subscribedAt: new Date().toISOString(),
        email: req.body.email
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
