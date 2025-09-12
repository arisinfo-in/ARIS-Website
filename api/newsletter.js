import nodemailer from 'nodemailer';

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
    
    // Send email notification
    let emailSent = false;
    try {
      emailSent = await sendNewsletterEmail({
        email,
        source: source || 'unknown'
      });
      
      if (emailSent) {
        console.log('✅ Newsletter email notification sent successfully');
      } else {
        console.warn('⚠️ Newsletter email notification failed, but continuing with subscription');
      }
    } catch (emailError) {
      console.error('❌ Newsletter email sending error:', emailError);
      // Don't fail the subscription if email fails
    }
    
    res.status(200).json({
      success: true,
      message: 'Successfully subscribed to our newsletter!',
      data: {
        subscribedAt: new Date().toISOString(),
        email: email,
        source: source || 'unknown',
        emailNotificationSent: emailSent
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

// Email sending function for newsletter
async function sendNewsletterEmail(subscriptionData) {
  try {
    // Create transporter based on environment variables
    const transporter = createEmailTransporter();
    
    if (!transporter) {
      console.warn('⚠️ No email service configured');
      return false;
    }
    
    // Email content
    const subject = `New Newsletter Subscription - ${subscriptionData.email}`;
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f97316;">New Newsletter Subscription</h2>
        <p><strong>Email:</strong> ${subscriptionData.email}</p>
        <p><strong>Source:</strong> ${subscriptionData.source}</p>
        <p><strong>Subscribed on:</strong> ${new Date().toLocaleString()}</p>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          This is an automated notification from your ARIS AI Data Analyst website.
        </p>
      </div>
    `;
    
    const textContent = `
New Newsletter Subscription
Email: ${subscriptionData.email}
Source: ${subscriptionData.source}
Subscribed on: ${new Date().toLocaleString()}

This is an automated notification from your ARIS AI Data Analyst website.
    `;
    
    // Send email
    const info = await transporter.sendMail({
      from: 'arisinfo.in@gmail.com',
      to: 'arisinfo.in@gmail.com',
      subject: subject,
      text: textContent,
      html: htmlContent
    });
    
    console.log('📧 Newsletter email sent successfully:', info.messageId);
    return true;
    
  } catch (error) {
    console.error('❌ Newsletter email sending failed:', error);
    return false;
  }
}

// Create email transporter based on environment variables
function createEmailTransporter() {
  try {
    // Gmail SMTP configuration with hardcoded credentials
    return nodemailer.createTransporter({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'arisinfo.in@gmail.com',
        pass: 'yqhs zvme mbfy geos' // Hardcoded Gmail app password (with spaces as provided)
      },
      tls: {
        rejectUnauthorized: false
      },
      connectionTimeout: 60000, // 60 seconds
      greetingTimeout: 30000, // 30 seconds
      socketTimeout: 60000 // 60 seconds
    });
    
  } catch (error) {
    console.error('❌ Error creating email transporter:', error);
    return null;
  }
}
