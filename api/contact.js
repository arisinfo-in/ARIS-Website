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
    
    // Send email notification
    let emailSent = false;
    try {
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
    } catch (emailError) {
      console.error('❌ Email sending error:', emailError);
      // Don't fail the form submission if email fails
    }
    
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
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.'
    });
  }
}

// Email sending function
async function sendContactEmail(formData) {
  try {
    // Create transporter based on environment variables
    const transporter = createEmailTransporter();
    
    if (!transporter) {
      console.warn('⚠️ No email service configured');
      return false;
    }
    
    // Email content
    const subject = `New Contact Form Submission from ${formData.name}`;
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
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER || 'noreply@arisinfo.in',
      to: process.env.CONTACT_EMAIL || 'contact@arisinfo.in',
      subject: subject,
      text: textContent,
      html: htmlContent,
      replyTo: formData.email
    });
    
    console.log('📧 Email sent successfully:', info.messageId);
    return true;
    
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    return false;
  }
}

// Create email transporter based on environment variables
function createEmailTransporter() {
  try {
    // Gmail SMTP configuration
    if (process.env.EMAIL_SERVICE === 'gmail' && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
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
    if (process.env.SENDGRID_API_KEY) {
      return nodemailer.createTransporter({
        host: 'smtp.sendgrid.net',
        port: 587,
        secure: false,
        auth: {
          user: 'apikey',
          pass: process.env.SENDGRID_API_KEY
        }
      });
    }
    
    // Mailgun configuration
    if (process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN) {
      return nodemailer.createTransporter({
        host: `smtp.mailgun.org`,
        port: 587,
        secure: false,
        auth: {
          user: process.env.MAILGUN_API_KEY,
          pass: process.env.MAILGUN_DOMAIN
        }
      });
    }
    
    console.warn('⚠️ No email service configured. Please set up EMAIL_SERVICE, SENDGRID_API_KEY, or MAILGUN_API_KEY');
    return null;
    
  } catch (error) {
    console.error('❌ Error creating email transporter:', error);
    return null;
  }
}
