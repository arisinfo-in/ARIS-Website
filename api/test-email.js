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
    console.log('🧪 Testing email service...');
    console.log('📧 Environment variables:', {
      hasUser: !!process.env.EMAIL_USER,
      hasPass: !!process.env.EMAIL_PASS,
      userLength: process.env.EMAIL_USER ? process.env.EMAIL_USER.length : 0,
      passLength: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0,
      userValue: process.env.EMAIL_USER,
      passValue: process.env.EMAIL_PASS ? '***' + process.env.EMAIL_PASS.slice(-4) : 'MISSING'
    });
    
    // Create transporter
    const transporter = nodemailer.createTransporter({
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
    
    console.log('📧 Transporter created successfully');
    
    // Test email
    const testEmail = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to self for testing
      subject: 'Test Email from Vercel',
      text: 'This is a test email from Vercel serverless function.',
      html: '<p>This is a test email from Vercel serverless function.</p>'
    };
    
    console.log('📧 Sending test email...');
    const info = await transporter.sendMail(testEmail);
    console.log('✅ Test email sent successfully:', info.messageId);
    
    res.status(200).json({
      success: true,
      message: 'Test email sent successfully',
      messageId: info.messageId,
      environment: process.env.NODE_ENV
    });
    
  } catch (error) {
    console.error('❌ Test email failed:', error);
    console.error('❌ Error details:', {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode,
      responseMessage: error.responseMessage
    });
    
    res.status(500).json({
      success: false,
      message: 'Test email failed',
      error: error.message,
      code: error.code,
      details: {
        command: error.command,
        response: error.response,
        responseCode: error.responseCode,
        responseMessage: error.responseMessage
      }
    });
  }
}