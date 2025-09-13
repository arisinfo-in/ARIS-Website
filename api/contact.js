const nodemailer = require('nodemailer');

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
    console.log('🔍 Environment check:', {
      NODE_ENV: process.env.NODE_ENV,
      hasEmailUser: !!process.env.EMAIL_USER,
      hasEmailPass: !!process.env.EMAIL_PASS,
      emailUserLength: process.env.EMAIL_USER ? process.env.EMAIL_USER.length : 0,
      emailPassLength: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0
    });
    
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
    if (!source || !['home', 'services', 'training', 'brochure'].includes(source)) {
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
    
    // Send email notification - with fallback if no env vars
    let emailSent = false;
    try {
      console.log('📧 Attempting to send email notification...');
      
      // Check if email credentials are available
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn('⚠️ Email credentials not configured in Vercel environment variables');
        console.warn('⚠️ Please set EMAIL_USER and EMAIL_PASS in Vercel dashboard');
        console.warn('⚠️ Form will still be submitted successfully, but no email notification will be sent');
        emailSent = false;
      } else {
        emailSent = await sendContactEmail({
          name,
          email,
          company,
          phone,
          service,
          course,
          message,
          source
        });
        
        if (emailSent) {
          console.log('✅ Email notification sent successfully');
        } else {
          console.warn('⚠️ Email notification failed, but continuing with form submission');
        }
      }
    } catch (emailError) {
      console.error('❌ Email sending error:', emailError);
      console.error('❌ Email error details:', {
        message: emailError.message,
        code: emailError.code,
        command: emailError.command,
        response: emailError.response
      });
      // Don't fail the form submission if email fails
    }
    
    // Always return success for form submission
    res.status(200).json({
      success: true,
      message: "Thank you for your message! We'll get back to you within 24 hours.",
      data: {
        submittedAt: new Date().toISOString(),
        source: source,
        emailNotificationSent: emailSent
      }
    });
    
  } catch (error) {
    console.error('❌ Contact form error:', error);
    console.error('❌ Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    // Return a more user-friendly error
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}

// Email sending function
async function sendContactEmail(formData) {
  try {
    console.log('📧 Attempting to send contact email...');
    
    // Create transporter based on environment variables
    const transporter = createEmailTransporter();
    
    if (!transporter) {
      console.warn('⚠️ No email service configured');
      return false;
    }
    console.log('📧 Email transporter created successfully');
    
    // Email content
    const subject = `New Contact Form Submission - ${formData.source.toUpperCase()}`;
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f97316;">New Contact Form Submission</h2>
        <p><strong>Source:</strong> ${formData.source}</p>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        ${formData.company ? `<p><strong>Company:</strong> ${formData.company}</p>` : ''}
        ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
        ${formData.service ? `<p><strong>Service:</strong> ${formData.service}</p>` : ''}
        ${formData.course ? `<p><strong>Course:</strong> ${formData.course}</p>` : ''}
        <p><strong>Message:</strong></p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
          ${formData.message.replace(/\n/g, '<br>')}
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          Submitted on: ${new Date().toLocaleString()}
        </p>
      </div>
    `;
    
    const textContent = `
New Contact Form Submission
Source: ${formData.source}
Name: ${formData.name}
Email: ${formData.email}
${formData.company ? `Company: ${formData.company}` : ''}
${formData.phone ? `Phone: ${formData.phone}` : ''}
${formData.service ? `Service: ${formData.service}` : ''}
${formData.course ? `Course: ${formData.course}` : ''}
Message: ${formData.message}
Submitted on: ${new Date().toLocaleString()}
    `;
    
    // Send email
    console.log('📧 Sending email to arisinfo.in@gmail.com...');
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'arisinfo.in@gmail.com',
      subject: subject,
      text: textContent,
      html: htmlContent,
      replyTo: formData.email
    });
    
    console.log('📧 Email sent successfully:', info.messageId);
    return true;
    
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    console.error('❌ Error details:', {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response
    });
    return false;
  }
}

// Create email transporter based on environment variables
function createEmailTransporter() {
  try {
    // Get credentials from environment variables - NO FALLBACK VALUES
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    
    console.log('📧 Email configuration check:', {
      hasUser: !!emailUser,
      hasPass: !!emailPass,
      userLength: emailUser ? emailUser.length : 0,
      passLength: emailPass ? emailPass.length : 0,
      nodeEnv: process.env.NODE_ENV
    });
    
    // Validate required environment variables
    if (!emailUser || !emailPass) {
      console.error('❌ Missing email credentials in environment variables');
      console.error('❌ EMAIL_USER:', emailUser ? 'SET' : 'MISSING');
      console.error('❌ EMAIL_PASS:', emailPass ? 'SET' : 'MISSING');
      return null;
    }
    
    // Gmail SMTP configuration
    return nodemailer.createTransporter({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: emailUser,
        pass: emailPass.replace(/\s/g, '') // Remove spaces from app password
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    
  } catch (error) {
    console.error('❌ Error creating email transporter:', error);
    return null;
  }
}