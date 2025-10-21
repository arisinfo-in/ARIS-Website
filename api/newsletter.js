import nodemailer from 'nodemailer';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase app and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
    
    // Store in Firestore database
    let firestoreStored = false;
    try {
      console.log('🔥 Storing newsletter subscription in Firestore...');
      
      const newsletterData = {
        email,
        source: source || 'website',
        timestamp: Timestamp.now(),
        status: 'active',
        createdAt: Timestamp.now()
      };

      const docRef = await addDoc(collection(db, 'website-contacts', 'newsletter-subscriptions'), newsletterData);
      firestoreStored = true;
      console.log('✅ Newsletter subscription stored in Firestore successfully:', docRef.id);
    } catch (firestoreError) {
      console.error('❌ Firestore storage error:', firestoreError);
      console.warn('⚠️ Firestore storage failed, but continuing with subscription');
    }
    
    res.status(200).json({
      success: true,
      message: 'Successfully subscribed to our newsletter!',
      data: {
        subscribedAt: new Date().toISOString(),
        email: email,
        source: source || 'unknown',
        emailNotificationSent: emailSent,
        firestoreStored: firestoreStored
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

// Create email transporter using environment variables
function createEmailTransporter() {
  try {
    // Get credentials from environment variables
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    
    // Validate required environment variables
    if (!emailUser || !emailPass) {
      console.error('❌ Missing email credentials in environment variables');
      return null;
    }
    
    // Gmail SMTP configuration with enhanced settings for Vercel
    return nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: emailUser,
        pass: emailPass
      },
      tls: {
        rejectUnauthorized: false,
        ciphers: 'SSLv3'
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
