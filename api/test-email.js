const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('🧪 Testing Gmail connection...');
    
    // Test Gmail connection
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'arisinfo.in@gmail.com',
        pass: 'yqhszvmembfygeos'
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    console.log('📧 Verifying Gmail connection...');
    await transporter.verify();
    console.log('✅ Gmail connection verified successfully!');

    // Send test email
    console.log('📧 Sending test email...');
    const info = await transporter.sendMail({
      from: 'arisinfo.in@gmail.com',
      to: 'arisinfo.in@gmail.com',
      subject: 'Test Email from ARIS Website',
      text: 'This is a test email to verify Gmail SMTP is working.',
      html: '<p>This is a test email to verify Gmail SMTP is working.</p>'
    });

    console.log('✅ Test email sent successfully:', info.messageId);

    res.status(200).json({
      success: true,
      message: 'Gmail test successful!',
      data: {
        messageId: info.messageId,
        verified: true
      }
    });

  } catch (error) {
    console.error('❌ Gmail test failed:', error);
    res.status(500).json({
      success: false,
      error: 'Gmail test failed',
      details: {
        message: error.message,
        code: error.code,
        command: error.command,
        response: error.response
      }
    });
  }
}
